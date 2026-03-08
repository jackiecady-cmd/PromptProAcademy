import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { users, sessions } from "./models/auth";
export * from "./models/auth";

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  email: text("email").notNull(),
  productType: text("product_type").notNull(), // 'base_analysis', 'royal_blood', 'heritage_book_standard', etc.
  amount: integer("amount").notNull(), // in cents
  status: text("status").notNull(), // 'pending', 'completed', 'failed'
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  stripeSessionId: text("stripe_session_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  fulfillmentStatus: text("fulfillment_status"), // 'pending', 'ordered_blurb', 'ordered_lulu', 'shipped', 'delivered'
  vendorCost: integer("vendor_cost"), // actual cost paid to Blurb/Lulu in cents
  trackingNumber: text("tracking_number"),
  customerName: text("customer_name"),
  shippingAddress: text("shipping_address"),
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
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

export type InsertDnaReport = z.infer<typeof insertDnaReportSchema>;
export type DnaReport = typeof dnaReports.$inferSelect;

export type InsertLearnerProgress = z.infer<typeof insertLearnerProgressSchema>;
export type LearnerProgress = typeof learnerProgress.$inferSelect;

export type InsertEarnedBadge = z.infer<typeof insertEarnedBadgeSchema>;
export type EarnedBadge = typeof earnedBadges.$inferSelect;

// Subscriptions for recurring courses
export const subscriptions = pgTable("subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  courseType: text("course_type").notNull(), // 'latin', 'egyptian', etc.
  stripeSubscriptionId: text("stripe_subscription_id"),
  stripeCustomerId: text("stripe_customer_id"),
  status: text("status").notNull(), // 'active', 'canceled', 'past_due'
  currentPeriodEnd: timestamp("current_period_end"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).omit({
  id: true,
  createdAt: true,
});

export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Subscription = typeof subscriptions.$inferSelect;

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

// DNA Uploads - Raw DNA zip files
export const dnaUploads = pgTable("dna_uploads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  originalFilename: text("original_filename").notNull(),
  storedFilename: text("stored_filename").notNull(),
  fileSize: integer("file_size").notNull(),
  source: text("source").notNull(),
  status: text("status").notNull().default("uploaded"),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
});

export const insertDnaUploadSchema = createInsertSchema(dnaUploads).omit({
  id: true,
  uploadedAt: true,
});

export type InsertDnaUpload = z.infer<typeof insertDnaUploadSchema>;
export type DnaUpload = typeof dnaUploads.$inferSelect;

// Family Tree - Store family members
export const familyMembers = pgTable("family_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  name: text("name").notNull(),
  relationship: text("relationship").notNull(),
  birthYear: text("birth_year"),
  birthPlace: text("birth_place"),
  deathYear: text("death_year"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// DNA Findings - Save discoveries from research
export const dnaFindings = pgTable("dna_findings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  content: text("content").notNull(),
  source: text("source"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertFamilyMemberSchema = createInsertSchema(familyMembers).omit({
  id: true,
  createdAt: true,
});

export const insertDnaFindingSchema = createInsertSchema(dnaFindings).omit({
  id: true,
  createdAt: true,
});

export type InsertFamilyMember = z.infer<typeof insertFamilyMemberSchema>;
export type FamilyMember = typeof familyMembers.$inferSelect;

export type InsertDnaFinding = z.infer<typeof insertDnaFindingSchema>;
export type DnaFinding = typeof dnaFindings.$inferSelect;

// Vibe Code Academy - Semesters/Courses
export const vibeCodeSemesters = pgTable("vibe_code_semesters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  semesterNumber: integer("semester_number").notNull(),
  price: integer("price").notNull(), // in cents
  isActive: boolean("is_active").default(true),
});

// Vibe Code Academy - Lessons within semesters
export const vibeCodeLessons = pgTable("vibe_code_lessons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  semesterId: varchar("semester_id").references(() => vibeCodeSemesters.id).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  lessonOrder: integer("lesson_order").notNull(),
  videoUrl: text("video_url"),
  hasQuiz: boolean("has_quiz").default(false),
  quizQuestions: text("quiz_questions"), // JSON stringified
});

// Vibe Code Academy - Student enrollment and progress
export const vibeCodeEnrollments = pgTable("vibe_code_enrollments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  semesterId: varchar("semester_id").references(() => vibeCodeSemesters.id).notNull(),
  status: text("status").notNull(), // 'active', 'completed', 'paused'
  enrolledAt: timestamp("enrolled_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  stripePaymentId: text("stripe_payment_id"),
});

// Vibe Code Academy - Lesson progress
export const vibeCodeProgress = pgTable("vibe_code_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  lessonId: varchar("lesson_id").references(() => vibeCodeLessons.id).notNull(),
  completed: boolean("completed").default(false),
  quizScore: integer("quiz_score"),
  completedAt: timestamp("completed_at"),
});

// Vibe Code Academy - Certificates
export const vibeCodeCertificates = pgTable("vibe_code_certificates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  semesterId: varchar("semester_id").references(() => vibeCodeSemesters.id).notNull(),
  certificateNumber: text("certificate_number").notNull(),
  issuedAt: timestamp("issued_at").defaultNow().notNull(),
  studentName: text("student_name").notNull(),
});

// Insert Schemas for Vibe Code Academy
export const insertVibeCodeSemesterSchema = createInsertSchema(vibeCodeSemesters).omit({
  id: true,
});

export const insertVibeCodeLessonSchema = createInsertSchema(vibeCodeLessons).omit({
  id: true,
});

export const insertVibeCodeEnrollmentSchema = createInsertSchema(vibeCodeEnrollments).omit({
  id: true,
  enrolledAt: true,
  completedAt: true,
});

export const insertVibeCodeProgressSchema = createInsertSchema(vibeCodeProgress).omit({
  id: true,
  completedAt: true,
});

export const insertVibeCodeCertificateSchema = createInsertSchema(vibeCodeCertificates).omit({
  id: true,
  issuedAt: true,
});

// Types for Vibe Code Academy
export type InsertVibeCodeSemester = z.infer<typeof insertVibeCodeSemesterSchema>;
export type VibeCodeSemester = typeof vibeCodeSemesters.$inferSelect;

export type InsertVibeCodeLesson = z.infer<typeof insertVibeCodeLessonSchema>;
export type VibeCodeLesson = typeof vibeCodeLessons.$inferSelect;

export type InsertVibeCodeEnrollment = z.infer<typeof insertVibeCodeEnrollmentSchema>;
export type VibeCodeEnrollment = typeof vibeCodeEnrollments.$inferSelect;

export type InsertVibeCodeProgress = z.infer<typeof insertVibeCodeProgressSchema>;
export type VibeCodeProgress = typeof vibeCodeProgress.$inferSelect;

export type InsertVibeCodeCertificate = z.infer<typeof insertVibeCodeCertificateSchema>;
export type VibeCodeCertificate = typeof vibeCodeCertificates.$inferSelect;

// My Side of the Story - Archetypes (character templates)
export const storyArchetypes = pgTable("story_archetypes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(), // 'protagonist', 'antagonist', 'mentor', 'shadow', etc.
  traits: text("traits"), // JSON array of personality traits
  colorTheme: text("color_theme"), // hex color for the archetype
});

// My Side of the Story - Writer profiles (anonymous)
export const storyWriters = pgTable("story_writers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  penName: text("pen_name").notNull(),
  bio: text("bio"),
  totalEarnings: integer("total_earnings").default(0), // in cents
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// My Side of the Story - Stories
export const stories = pgTable("stories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  writerId: varchar("writer_id").references(() => storyWriters.id).notNull(),
  title: text("title").notNull(),
  synopsis: text("synopsis"),
  content: text("content").notNull(), // JSON of story panels/pages
  archetypeIds: text("archetype_ids"), // JSON array of archetype IDs used
  status: text("status").notNull(), // 'draft', 'submitted', 'published', 'archived'
  isAnonymous: boolean("is_anonymous").default(true),
  contentWarnings: text("content_warnings"), // JSON array of warnings
  viewCount: integer("view_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  publishedAt: timestamp("published_at"),
});

// My Side of the Story - Reader subscriptions
export const storySubscriptions = pgTable("story_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  stripeSubscriptionId: text("stripe_subscription_id"),
  stripeCustomerId: text("stripe_customer_id"),
  status: text("status").notNull(), // 'active', 'canceled', 'past_due'
  currentPeriodEnd: timestamp("current_period_end"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// My Side of the Story - Story reads (for tracking/payments to writers)
export const storyReads = pgTable("story_reads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  storyId: varchar("story_id").references(() => stories.id).notNull(),
  readerEmail: text("reader_email").notNull(),
  readAt: timestamp("read_at").defaultNow().notNull(),
});

// Insert Schemas for My Side of the Story
export const insertStoryArchetypeSchema = createInsertSchema(storyArchetypes).omit({
  id: true,
});

export const insertStoryWriterSchema = createInsertSchema(storyWriters).omit({
  id: true,
  totalEarnings: true,
  createdAt: true,
});

export const insertStorySchema = createInsertSchema(stories).omit({
  id: true,
  viewCount: true,
  createdAt: true,
  publishedAt: true,
});

export const insertStorySubscriptionSchema = createInsertSchema(storySubscriptions).omit({
  id: true,
  createdAt: true,
});

export const insertStoryReadSchema = createInsertSchema(storyReads).omit({
  id: true,
  readAt: true,
});

// Types for My Side of the Story
export type InsertStoryArchetype = z.infer<typeof insertStoryArchetypeSchema>;
export type StoryArchetype = typeof storyArchetypes.$inferSelect;

export type InsertStoryWriter = z.infer<typeof insertStoryWriterSchema>;
export type StoryWriter = typeof storyWriters.$inferSelect;

export type InsertStory = z.infer<typeof insertStorySchema>;
export type Story = typeof stories.$inferSelect;

export type InsertStorySubscription = z.infer<typeof insertStorySubscriptionSchema>;
export type StorySubscription = typeof storySubscriptions.$inferSelect;

export type InsertStoryRead = z.infer<typeof insertStoryReadSchema>;
export type StoryRead = typeof storyReads.$inferSelect;
