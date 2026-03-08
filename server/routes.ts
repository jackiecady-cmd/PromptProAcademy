import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema, insertFamilyMemberSchema, insertDnaFindingSchema } from "@shared/schema";
import Stripe from "stripe";
import { z } from "zod";
import { getChatbotResponse, getTutorResponse, translateToLatin, generateLatinPrayer, getDNAGuideResponse, getVibeCodeTutorResponse } from "./chatbot";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const dnaUploadStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `dna-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const dnaUpload = multer({
  storage: dnaUploadStorage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === ".zip") {
      cb(null, true);
    } else {
      cb(new Error("Only .zip files are accepted"));
    }
  },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Set up Replit Auth
  await setupAuth(app);
  registerAuthRoutes(app);
  
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    console.warn("Warning: STRIPE_SECRET_KEY not set. Payment features will be disabled.");
  }
  
  const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

  // Create checkout session
  app.post("/api/checkout/create-session", async (req, res) => {
    try {
      if (!stripe) {
        return res.status(503).json({ error: "Payment service not configured" });
      }

      const { email, firstName, lastName, productType, amount } = req.body;

      // Validate input
      const schema = z.object({
        email: z.string().email(),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        productType: z.string(),
        amount: z.number().positive(),
      });

      const data = schema.parse({ email, firstName, lastName, productType, amount });

      // Create or get user
      let user = await storage.getUserByEmail(data.email);
      if (!user) {
        user = await storage.createUser({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        });
      }

      // Create order
      const order = await storage.createOrder({
        userId: user.id,
        email: data.email,
        productType: data.productType,
        amount: data.amount,
        status: "pending",
      });

      // Determine base URL
      const baseUrl = process.env.REPL_SLUG && process.env.REPL_OWNER 
        ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
        : `http://localhost:${process.env.PORT || 5000}`;

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: getProductName(data.productType),
                description: getProductDescription(data.productType),
              },
              unit_amount: data.amount,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${baseUrl}/dashboard?success=true&order_id=${order.id}`,
        cancel_url: `${baseUrl}/checkout?canceled=true`,
        customer_email: data.email,
        metadata: {
          orderId: order.id,
          userId: user.id,
        },
      });

      // Update order with Stripe session ID
      await storage.updateOrderStripeInfo(order.id, undefined, session.id);

      res.json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
      console.error("Checkout error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid input data" });
      }
      res.status(400).json({ error: error.message });
    }
  });

  // Stripe webhook handler - uses rawBody for signature verification
  app.post("/api/webhook/stripe", async (req, res) => {
    if (!stripe) {
      return res.status(503).json({ error: "Payment service not configured" });
    }

    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    // Use rawBody which was captured by express.json() middleware
    const rawBody = (req as any).rawBody;

    if (!webhookSecret) {
      console.warn("STRIPE_WEBHOOK_SECRET not configured, skipping signature verification");
      // In development without webhook secret, still process the event
      try {
        const event = req.body;
        await handleStripeEvent(event);
        return res.json({ received: true });
      } catch (err: any) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        sig as string,
        webhookSecret
      );
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    await handleStripeEvent(event);

    res.json({ received: true });
  });

  async function handleStripeEvent(event: Stripe.Event) {
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        if (orderId) {
          await storage.updateOrderStatus(orderId, "completed", new Date());
          await storage.updateOrderStripeInfo(orderId, session.payment_intent as string, session.id);
          console.log(`Order ${orderId} completed successfully`);
        }
        break;

      case "checkout.session.expired":
        const expiredSession = event.data.object as Stripe.Checkout.Session;
        const expiredOrderId = expiredSession.metadata?.orderId;
        if (expiredOrderId) {
          await storage.updateOrderStatus(expiredOrderId, "expired");
          console.log(`Order ${expiredOrderId} expired`);
        }
        break;

      case "payment_intent.payment_failed":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment failed:", paymentIntent.id);
        // Find order by payment intent and mark as failed
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }

  app.get("/api/promo/free-spots", async (_req, res) => {
    try {
      const count = await storage.countFreePromoOrders();
      const remaining = Math.max(0, 20 - count);
      res.json({ total: 20, used: count, remaining });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/checkout/free", async (req, res) => {
    try {
      const { email, firstName, lastName } = req.body;

      const schema = z.object({
        email: z.string().email(),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
      });

      const data = schema.parse({ email, firstName, lastName });

      let user = await storage.getUserByEmail(data.email);
      if (!user) {
        user = await storage.createUser({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        });
      }

      const result = await storage.claimFreePromoOrder(user.id, data.email);

      if (!result.success) {
        const statusCode = result.error?.includes("already claimed") ? 409 : 410;
        return res.status(statusCode).json({ error: result.error });
      }

      res.json({ success: true, orderId: result.orderId });
    } catch (error: any) {
      console.error("Free checkout error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid input data" });
      }
      res.status(400).json({ error: error.message });
    }
  });

  // Get user orders
  app.get("/api/orders/:email", async (req, res) => {
    try {
      const { email } = req.params;
      const orders = await storage.getOrdersByEmail(email);
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all orders (admin)
  app.get("/api/orders/all", async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update order fulfillment status (admin)
  app.patch("/api/orders/:orderId/fulfillment", async (req, res) => {
    try {
      const { orderId } = req.params;
      const { fulfillmentStatus, vendorCost } = req.body;
      await storage.updateOrderFulfillment(orderId, fulfillmentStatus, vendorCost);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get user reports
  app.get("/api/reports/user/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const reports = await storage.getReportsByUserId(userId);
      res.json(reports);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      stripe: !!stripe,
      timestamp: new Date().toISOString() 
    });
  });

  // AI Chatbot endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }
      const response = await getChatbotResponse(message);
      res.json({ response });
    } catch (error: any) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to process message" });
    }
  });

  // AI Tutor endpoint for PromptPro Academy
  app.post("/api/tutor", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }
      const response = await getTutorResponse(message);
      res.json({ response });
    } catch (error: any) {
      console.error("Tutor error:", error);
      res.status(500).json({ error: "Failed to process message" });
    }
  });

  // DNA Research Guide
  app.post("/api/dna-guide", async (req, res) => {
    try {
      const { message, currentStep, history } = req.body;
      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }
      const response = await getDNAGuideResponse(
        message, 
        currentStep || 1,
        history || []
      );
      res.json({ response });
    } catch (error: any) {
      console.error("DNA Guide error:", error);
      res.status(500).json({ error: "Failed to process message" });
    }
  });

  // Latin Translation API
  app.post("/api/latin/translate", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Text is required" });
      }
      const result = await translateToLatin(text);
      res.json(result);
    } catch (error: any) {
      console.error("Latin translation error:", error);
      res.status(500).json({ error: "Failed to translate" });
    }
  });

  // Latin Prayer Generator
  app.post("/api/latin/prayer", async (req, res) => {
    try {
      const { intention, tone, deity } = req.body;
      if (!intention || typeof intention !== "string") {
        return res.status(400).json({ error: "Intention is required" });
      }
      const result = await generateLatinPrayer(intention, tone || "reverent", deity);
      res.json({ phrases: result });
    } catch (error: any) {
      console.error("Prayer generation error:", error);
      res.status(500).json({ error: "Failed to generate prayer" });
    }
  });

  // Latin Course Subscription
  app.post("/api/subscribe/latin", async (req, res) => {
    try {
      if (!stripe) {
        return res.status(503).json({ error: "Payment service not configured" });
      }

      const baseUrl = process.env.REPL_SLUG && process.env.REPL_OWNER 
        ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
        : `http://localhost:${process.env.PORT || 5000}`;

      // Create Stripe checkout session for subscription
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Sacred Latin Pronunciation Course",
                description: "Monthly subscription - Master Latin pronunciation for rituals, prayers, and invocations",
              },
              unit_amount: 1900, // $19.00
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${baseUrl}/latin?success=true`,
        cancel_url: `${baseUrl}/latin?canceled=true`,
        metadata: {
          courseType: "latin",
        },
      });

      res.json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
      console.error("Subscription error:", error);
      res.status(400).json({ error: error.message });
    }
  });

  // ========== Family Tree API ==========
  
  // Get family members
  app.get("/api/family/:email", async (req, res) => {
    try {
      const { email } = req.params;
      const members = await storage.getFamilyMembersByEmail(decodeURIComponent(email));
      res.json(members);
    } catch (error: any) {
      console.error("Get family error:", error);
      res.status(500).json({ error: "Failed to get family members" });
    }
  });

  // Add family member
  app.post("/api/family", async (req, res) => {
    try {
      const data = insertFamilyMemberSchema.parse(req.body);
      const member = await storage.createFamilyMember(data);
      res.json(member);
    } catch (error: any) {
      console.error("Add family member error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid data" });
      }
      res.status(500).json({ error: "Failed to add family member" });
    }
  });

  // Update family member
  app.put("/api/family/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const member = await storage.updateFamilyMember(id, req.body);
      if (!member) {
        return res.status(404).json({ error: "Member not found" });
      }
      res.json(member);
    } catch (error: any) {
      console.error("Update family member error:", error);
      res.status(500).json({ error: "Failed to update family member" });
    }
  });

  // Delete family member
  app.delete("/api/family/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteFamilyMember(id);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Delete family member error:", error);
      res.status(500).json({ error: "Failed to delete family member" });
    }
  });

  // ========== DNA Findings API ==========

  // Get findings
  app.get("/api/findings/:email", async (req, res) => {
    try {
      const { email } = req.params;
      const findings = await storage.getDnaFindingsByEmail(decodeURIComponent(email));
      res.json(findings);
    } catch (error: any) {
      console.error("Get findings error:", error);
      res.status(500).json({ error: "Failed to get findings" });
    }
  });

  // Add finding
  app.post("/api/findings", async (req, res) => {
    try {
      const data = insertDnaFindingSchema.parse(req.body);
      const finding = await storage.createDnaFinding(data);
      res.json(finding);
    } catch (error: any) {
      console.error("Add finding error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid data" });
      }
      res.status(500).json({ error: "Failed to add finding" });
    }
  });

  // Delete finding
  app.delete("/api/findings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteDnaFinding(id);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Delete finding error:", error);
      res.status(500).json({ error: "Failed to delete finding" });
    }
  });

  // ========== DNA Upload API ==========

  app.post("/api/dna-upload", dnaUpload.single("dnaFile"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "No file uploaded. Please select a .zip file." });
      }

      const email = req.body.email;
      const source = req.body.source || "unknown";

      if (!email) {
        fs.unlinkSync(file.path);
        return res.status(400).json({ error: "Email is required" });
      }

      const upload = await storage.createDnaUpload({
        email,
        originalFilename: file.originalname,
        storedFilename: file.filename,
        fileSize: file.size,
        source,
        status: "uploaded",
      });

      res.json({
        success: true,
        upload: {
          id: upload.id,
          originalFilename: upload.originalFilename,
          fileSize: upload.fileSize,
          source: upload.source,
          status: upload.status,
          uploadedAt: upload.uploadedAt,
        },
      });
    } catch (error: any) {
      console.error("DNA upload error:", error);
      if (error.message === "Only .zip files are accepted") {
        return res.status(400).json({ error: "Only .zip files are accepted. Please zip your raw DNA file first." });
      }
      res.status(500).json({ error: "Failed to upload DNA file" });
    }
  });

  app.get("/api/dna-uploads/:email", async (req, res) => {
    try {
      const { email } = req.params;
      const uploads = await storage.getDnaUploadsByEmail(decodeURIComponent(email));
      res.json(uploads.map((u) => ({
        id: u.id,
        originalFilename: u.originalFilename,
        fileSize: u.fileSize,
        source: u.source,
        status: u.status,
        uploadedAt: u.uploadedAt,
      })));
    } catch (error: any) {
      res.status(500).json({ error: "Failed to get uploads" });
    }
  });

  app.delete("/api/dna-uploads/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const upload = await storage.deleteDnaUpload(id);
      if (upload) {
        const filePath = path.join(uploadsDir, upload.storedFilename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to delete upload" });
    }
  });

  // Vibe Code Academy - AI Tutor
  app.post("/api/vibe-code/tutor", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const response = await getVibeCodeTutorResponse(message);
      res.json({ response });
    } catch (error: any) {
      console.error("Vibe Code tutor error:", error);
      res.status(500).json({ error: "Failed to get tutor response" });
    }
  });

  // Vibe Code Academy - Enrollment
  app.post("/api/vibe-code/enroll", async (req, res) => {
    try {
      if (!stripe) {
        return res.status(503).json({ error: "Payment service not configured" });
      }

      const { email, firstName, lastName, semesterId } = req.body;

      const schema = z.object({
        email: z.string().email(),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        semesterId: z.string(),
      });

      const data = schema.parse({ email, firstName, lastName, semesterId });

      // Create or get user
      let user = await storage.getUserByEmail(data.email);
      if (!user) {
        user = await storage.createUser({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        });
      }

      // Price for semester 1
      const amount = 29900; // $299

      // Create order
      const order = await storage.createOrder({
        userId: user.id,
        email: data.email,
        productType: `vibe_code_${data.semesterId}`,
        amount: amount,
        status: "pending",
      });

      // Determine base URL
      const baseUrl = process.env.REPLIT_DEPLOYMENT === "1"
        ? `https://${process.env.REPLIT_DEV_DOMAIN || ''}`
        : process.env.REPL_SLUG && process.env.REPL_OWNER 
          ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
          : `http://localhost:${process.env.PORT || 5000}`;

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Vibe Code Academy - Semester 1",
                description: "Foundations of Vibe Coding - 8 week course with certificate",
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${baseUrl}/vibe-code?success=true&enrolled=true`,
        cancel_url: `${baseUrl}/vibe-code/enroll?canceled=true`,
        customer_email: data.email,
        metadata: {
          orderId: order.id,
          userId: user.id,
          courseType: "vibe_code",
          semesterId: data.semesterId,
        },
      });

      // Update order with Stripe session ID
      await storage.updateOrderStripeInfo(order.id, undefined, session.id);

      res.json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
      console.error("Vibe Code enrollment error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid input data" });
      }
      res.status(400).json({ error: error.message });
    }
  });

  return httpServer;
}

function getProductName(productType: string): string {
  const names: Record<string, string> = {
    // WhoamI DNA Products
    base_analysis: "Base DNA Analysis Package",
    base_analysis_free: "Base DNA Analysis Package (First 20 Free)",
    royal_blood: "Royal Blood Check",
    holocaust_survivor: "Holocaust Survivor Search",
    native_tribe: "Native Tribe Trace",
    ancient_dna: "Ancient DNA Match",
    heritage_book: "Heritage Book - Printed Family Story",
    heritage_book_standard: "Heritage Book - Standard Edition",
    heritage_book_deluxe: "Heritage Book - Deluxe Edition",
    heritage_book_legacy: "Heritage Book - Legacy Edition",
    // PromptPro Academy Products
    academy_starter: "PromptPro Academy - Starter Course",
    academy_foundation: "PromptPro Academy - Foundation Course",
    academy_professional: "PromptPro Academy - Professional Certification",
  };
  return names[productType] || "WhoamI Service";
}

function getProductDescription(productType: string): string {
  const descriptions: Record<string, string> = {
    base_analysis: "Unified DNA report from multiple providers",
    base_analysis_free: "Unified DNA report - Free lifetime access (First 20 promo)",
    royal_blood: "Trace your royal ancestry connections",
    holocaust_survivor: "Connect with Holocaust survivor records",
    native_tribe: "Discover your indigenous heritage",
    ancient_dna: "Match with ancient DNA samples",
    heritage_book: "Your family history in a beautiful printed book",
    heritage_book_standard: "50+ page softcover family history book",
    heritage_book_deluxe: "100+ page hardcover premium family history book",
    heritage_book_legacy: "150+ page leather-bound archival family history book",
    academy_starter: "Learn AI basics through ancestry research",
    academy_foundation: "Master prompt engineering fundamentals",
    academy_professional: "Career-ready AI skills with certification",
  };
  return descriptions[productType] || "Premium service from WhoamI";
}
