import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  email: text("email").notNull(),
  productType: text("product_type").notNull(), // 'base_analysis', 'royal_blood', etc.
  amount: integer("amount").notNull(), // in cents
  status: text("status").notNull(), // 'pending', 'completed', 'failed'
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  stripeSessionId: text("stripe_session_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const dnaReports = pgTable("dna_reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  orderId: varchar("order_id").references(() => orders.id).notNull(),
  reportType: text("report_type").notNull(), // 'base', 'royal', 'tribe', etc.
  reportData: text("report_data"), // JSON stringified report data
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// PromptPro Academy - Learning Progress
export const learnerProgress = pgTable("learner_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  lessonId: text("lesson_id").notNull(),
  completed: boolean("completed").default(false),
  score: integer("score"), // quiz score if applicable
  completedAt: timestamp("completed_at"),
});

export const earnedBadges = pgTable("earned_badges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  badgeId: text("badge_id").notNull(), // 'explorer', 'storyteller', 'strategist', 'mentor'
  earnedAt: timestamp("earned_at").defaultNow().notNull(),
});

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const insertDnaReportSchema = createInsertSchema(dnaReports).omit({
  id: true,
  createdAt: true,
});

export const insertLearnerProgressSchema = createInsertSchema(learnerProgress).omit({
  id: true,
  completedAt: true,
});

export const insertEarnedBadgeSchema = createInsertSchema(earnedBadges).omit({
  id: true,
  earnedAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

export type InsertDnaReport = z.infer<typeof insertDnaReportSchema>;
export type DnaReport = typeof dnaReports.$inferSelect;

export type InsertLearnerProgress = z.infer<typeof insertLearnerProgressSchema>;
export type LearnerProgress = typeof learnerProgress.$inferSelect;

export type InsertEarnedBadge = z.infer<typeof insertEarnedBadgeSchema>;
export type EarnedBadge = typeof earnedBadges.$inferSelect;

// Chat conversations for AI chatbot
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull().references(() => conversations.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const insertConversationSchema = createInsertSchema(conversations).omit({
  id: true,
  createdAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true,
});

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
