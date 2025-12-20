import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertOrderSchema } from "@shared/schema";
import Stripe from "stripe";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2024-12-18.acacia",
  });

  // Create checkout session
  app.post("/api/checkout/create-session", async (req, res) => {
    try {
      const { email, firstName, lastName, productType, amount } = req.body;

      // Validate input
      const schema = z.object({
        email: z.string().email(),
        firstName: z.string(),
        lastName: z.string(),
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

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: getProductName(data.productType),
                description: "DNA and Family History Analysis",
              },
              unit_amount: data.amount,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.REPL_SLUG ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co` : 'http://localhost:5000'}/dashboard?success=true&order_id=${order.id}`,
        cancel_url: `${process.env.REPL_SLUG ? `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co` : 'http://localhost:5000'}/checkout?canceled=true`,
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
      res.status(400).json({ error: error.message });
    }
  });

  // Stripe webhook handler
  app.post("/api/webhook/stripe", async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig as string,
        process.env.STRIPE_WEBHOOK_SECRET || ""
      );
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        if (orderId) {
          await storage.updateOrderStatus(orderId, "completed", new Date());
          await storage.updateOrderStripeInfo(orderId, session.payment_intent as string);

          // Here you would trigger report generation
          console.log(`Order ${orderId} completed successfully`);
        }
        break;

      case "payment_intent.payment_failed":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment failed:", paymentIntent.id);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
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

  return httpServer;
}

function getProductName(productType: string): string {
  const names: Record<string, string> = {
    base_analysis: "Base DNA Analysis Package",
    royal_blood: "Royal Blood Check",
    holocaust_survivor: "Holocaust Survivor Search",
    native_tribe: "Native Tribe Trace",
    ancient_dna: "Ancient DNA Match",
  };
  return names[productType] || "DNA Analysis Service";
}
