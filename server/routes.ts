import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema } from "@shared/schema";
import Stripe from "stripe";
import { z } from "zod";
import { getChatbotResponse, getTutorResponse, translateToLatin, generateLatinPrayer, getVibeCodeTutorResponse } from "./chatbot";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { getAppUrl } from "./lib/app-url";

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

      const { email, firstName, lastName, productType } = req.body;

      const allowedPrices: Record<string, number> = {
        academy_foundation: 3500,
        academy_professional: 7500,
        academy_bundle: 6000,
        latin_lifetime: 1500,
      };

      const schema = z.object({
        email: z.string().email(),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        productType: z.string(),
      });

      const data = schema.parse({ email, firstName, lastName, productType });

      const serverAmount = allowedPrices[data.productType];
      if (serverAmount === undefined) {
        return res.status(400).json({ error: "Invalid product type" });
      }

      // Create or get user
      let user = await storage.getUserByEmail(data.email);
      if (!user) {
        user = await storage.createUser({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        });
      }

      const order = await storage.createOrder({
        userId: user.id,
        email: data.email,
        productType: data.productType,
        amount: serverAmount,
        status: "pending",
      });

      const baseUrl = getAppUrl();

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
              unit_amount: serverAmount,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${baseUrl}/academy?success=true&order_id=${order.id}`,
        cancel_url: `${baseUrl}/academy/checkout?canceled=true`,
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

  // Latin free promo - check spots
  app.get("/api/promo/latin-free-spots", async (_req, res) => {
    try {
      const count = await storage.countLatinFreePromoOrders();
      const remaining = Math.max(0, 20 - count);
      res.json({ total: 20, used: count, remaining });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Latin free promo - claim
  app.post("/api/checkout/latin-free", async (req, res) => {
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

      const result = await storage.claimLatinFreePromo(user.id, data.email);

      if (!result.success) {
        const statusCode = result.error?.includes("already claimed") ? 409 : 410;
        return res.status(statusCode).json({ error: result.error });
      }

      res.json({ success: true, orderId: result.orderId });
    } catch (error: any) {
      console.error("Latin free checkout error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid input data" });
      }
      res.status(400).json({ error: error.message });
    }
  });

  // Academy Professional free promo - check spots
  app.get("/api/promo/academy-pro-free", async (_req, res) => {
    try {
      const count = await storage.countAcademyProFreeOrders();
      const remaining = Math.max(0, 5 - count);
      res.json({ total: 5, used: count, remaining });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Academy Professional free promo - claim
  app.post("/api/checkout/academy-pro-free", async (req, res) => {
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

      const result = await storage.claimAcademyProFree(user.id, data.email);

      if (!result.success) {
        const statusCode = result.error?.includes("already claimed") ? 409 : 410;
        return res.status(statusCode).json({ error: result.error });
      }

      res.json({ success: true, orderId: result.orderId });
    } catch (error: any) {
      console.error("Academy Pro free checkout error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid input data" });
      }
      res.status(400).json({ error: error.message });
    }
  });

  // Academy Foundation free promo - check spots
  app.get("/api/promo/academy-foundation-free", async (_req, res) => {
    try {
      const count = await storage.countAcademyFoundationFreeOrders();
      const remaining = Math.max(0, 5 - count);
      res.json({ total: 5, used: count, remaining });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Academy Foundation free promo - claim
  app.post("/api/checkout/academy-foundation-free", async (req, res) => {
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

      const result = await storage.claimAcademyFoundationFree(user.id, data.email);

      if (!result.success) {
        const statusCode = result.error?.includes("already claimed") ? 409 : 410;
        return res.status(statusCode).json({ error: result.error });
      }

      res.json({ success: true, orderId: result.orderId });
    } catch (error: any) {
      console.error("Academy Foundation free checkout error:", error);
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

  // Latin Course - Early bird spots check
  app.get("/api/promo/latin-earlybird", async (_req, res) => {
    try {
      const count = await storage.countLatinLifetimeOrders();
      const earlyBirdLimit = 10;
      const isEarlyBird = count < earlyBirdLimit;
      const earlyBirdRemaining = Math.max(0, earlyBirdLimit - count);
      res.json({ isEarlyBird, earlyBirdRemaining, price: isEarlyBird ? 1200 : 1500, totalSold: count });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Latin Course - Lifetime Purchase ($12 early bird / $15 regular)
  app.post("/api/checkout/latin-lifetime", async (req, res) => {
    try {
      if (!stripe) {
        return res.status(503).json({ error: "Payment service not configured" });
      }

      const schema = z.object({
        email: z.string().email(),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
      });
      const data = schema.parse(req.body);

      const count = await storage.countLatinLifetimeOrders();
      const isEarlyBird = count < 10;
      const price = isEarlyBird ? 1200 : 1500;
      const priceLabel = isEarlyBird ? "$12" : "$15";

      let user = await storage.getUserByEmail(data.email);
      if (!user) {
        user = await storage.createUser({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        });
      }

      const order = await storage.createOrder({
        userId: user.id,
        email: data.email,
        productType: "latin_lifetime",
        amount: price,
        status: "pending",
      });

      const baseUrl = getAppUrl();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Sacred Latin Course — Lifetime Access",
                description: `One-time ${priceLabel} payment. All lessons, Healthcare Mode, quizzes, translator — forever. No subscription.`,
              },
              unit_amount: price,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${baseUrl}/latin?success=true&order_id=${order.id}`,
        cancel_url: `${baseUrl}/latin?canceled=true`,
        customer_email: data.email,
        metadata: {
          orderId: order.id,
          userId: user.id,
          courseType: "latin_lifetime",
          earlyBird: isEarlyBird ? "true" : "false",
        },
      });

      await storage.updateOrderStripeInfo(order.id, undefined, session.id);

      res.json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
      console.error("Latin lifetime checkout error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid input data" });
      }
      res.status(400).json({ error: error.message });
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

      const baseUrl = getAppUrl();

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
    latin_course_free: "Sacred Latin Course (First 20 Free - Lifetime)",
    latin_lifetime: "Sacred Latin Course — Lifetime Access",
    academy_starter: "PromptPro Academy - Starter Course",
    academy_foundation: "PromptPro Academy - Foundation Course",
    academy_professional: "PromptPro Academy - Professional Certification",
    academy_professional_free: "PromptPro Academy - Professional (First 5 Free)",
    academy_foundation_free: "PromptPro Academy - Foundation (First 5 Free)",
    academy_bundle: "PromptPro Academy - Bundle Deal (Foundation + Professional)",
  };
  return names[productType] || "Service";
}

function getProductDescription(productType: string): string {
  const descriptions: Record<string, string> = {
    latin_course_free: "Sacred Latin course - Free lifetime access (First 20 promo)",
    latin_lifetime: "Full Latin course - One-time lifetime purchase",
    academy_starter: "Learn AI prompt engineering basics",
    academy_foundation: "Master prompt engineering fundamentals",
    academy_professional: "Career-ready AI skills with certification",
    academy_professional_free: "Professional AI certification - Free access (First 5 promo)",
    academy_foundation_free: "Foundation prompt engineering - Free access (First 5 promo)",
    academy_bundle: "Foundation + Professional courses bundled at a discount",
  };
  return descriptions[productType] || "Premium service";
}
