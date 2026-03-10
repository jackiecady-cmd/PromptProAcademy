import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import {
  users,
  orders,
  dnaReports,
  dnaUploads,
  familyMembers,
  dnaFindings,
  type User,
  type InsertUser,
  type Order,
  type InsertOrder,
  type DnaReport,
  type InsertDnaReport,
  type DnaUpload,
  type InsertDnaUpload,
  type FamilyMember,
  type InsertFamilyMember,
  type DnaFinding,
  type InsertDnaFinding,
} from "@shared/schema";
import { eq, desc, and, sql } from "drizzle-orm";

const { Pool } = pg;

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Orders
  getOrder(id: string): Promise<Order | undefined>;
  getOrdersByUserId(userId: string): Promise<Order[]>;
  getOrdersByEmail(email: string): Promise<Order[]>;
  getAllOrders(): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: string, status: string, completedAt?: Date): Promise<Order | undefined>;
  updateOrderStripeInfo(id: string, paymentIntentId?: string, sessionId?: string): Promise<Order | undefined>;
  updateOrderFulfillment(id: string, fulfillmentStatus: string, vendorCost?: number): Promise<Order | undefined>;

  // DNA Reports
  getDnaReport(id: string): Promise<DnaReport | undefined>;
  getReportsByUserId(userId: string): Promise<DnaReport[]>;
  createDnaReport(report: InsertDnaReport): Promise<DnaReport>;

  // Family Tree
  getFamilyMembersByEmail(email: string): Promise<FamilyMember[]>;
  createFamilyMember(member: InsertFamilyMember): Promise<FamilyMember>;
  updateFamilyMember(id: string, member: Partial<InsertFamilyMember>): Promise<FamilyMember | undefined>;
  deleteFamilyMember(id: string): Promise<void>;

  // DNA Uploads
  createDnaUpload(upload: InsertDnaUpload): Promise<DnaUpload>;
  getDnaUploadsByEmail(email: string): Promise<DnaUpload[]>;
  deleteDnaUpload(id: string): Promise<DnaUpload | undefined>;

  // DNA Findings
  getDnaFindingsByEmail(email: string): Promise<DnaFinding[]>;
  getDnaFindingsByMember(familyMemberId: string): Promise<DnaFinding[]>;
  createDnaFinding(finding: InsertDnaFinding): Promise<DnaFinding>;
  deleteDnaFinding(id: string): Promise<void>;

  // Promo
  countFreePromoOrders(): Promise<number>;
  claimFreePromoOrder(userId: string, email: string): Promise<{ success: boolean; orderId?: string; error?: string }>;
  countLatinFreePromoOrders(): Promise<number>;
  claimLatinFreePromo(userId: string, email: string): Promise<{ success: boolean; orderId?: string; error?: string }>;
  countLatinLifetimeOrders(): Promise<number>;
  countAcademyProFreeOrders(): Promise<number>;
  claimAcademyProFree(userId: string, email: string): Promise<{ success: boolean; orderId?: string; error?: string }>;
  countAcademyFoundationFreeOrders(): Promise<number>;
  claimAcademyFoundationFree(userId: string, email: string): Promise<{ success: boolean; orderId?: string; error?: string }>;
}

class DatabaseStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;

  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    this.db = drizzle(pool);
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(user).returning();
    return result[0];
  }

  // Orders
  async getOrder(id: string): Promise<Order | undefined> {
    const result = await this.db.select().from(orders).where(eq(orders.id, id)).limit(1);
    return result[0];
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    return await this.db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
  }

  async getOrdersByEmail(email: string): Promise<Order[]> {
    return await this.db.select().from(orders).where(eq(orders.email, email)).orderBy(desc(orders.createdAt));
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const result = await this.db.insert(orders).values(order).returning();
    return result[0];
  }

  async updateOrderStatus(id: string, status: string, completedAt?: Date): Promise<Order | undefined> {
    const result = await this.db
      .update(orders)
      .set({ status, completedAt: completedAt || new Date() })
      .where(eq(orders.id, id))
      .returning();
    return result[0];
  }

  async updateOrderStripeInfo(id: string, paymentIntentId?: string, sessionId?: string): Promise<Order | undefined> {
    const result = await this.db
      .update(orders)
      .set({ 
        stripePaymentIntentId: paymentIntentId,
        stripeSessionId: sessionId,
      })
      .where(eq(orders.id, id))
      .returning();
    return result[0];
  }

  async updateOrderFulfillment(id: string, fulfillmentStatus: string, vendorCost?: number): Promise<Order | undefined> {
    const result = await this.db
      .update(orders)
      .set({ 
        fulfillmentStatus,
        vendorCost,
      })
      .where(eq(orders.id, id))
      .returning();
    return result[0];
  }

  // DNA Reports
  async getDnaReport(id: string): Promise<DnaReport | undefined> {
    const result = await this.db.select().from(dnaReports).where(eq(dnaReports.id, id)).limit(1);
    return result[0];
  }

  async getReportsByUserId(userId: string): Promise<DnaReport[]> {
    return await this.db.select().from(dnaReports).where(eq(dnaReports.userId, userId)).orderBy(desc(dnaReports.createdAt));
  }

  async createDnaReport(report: InsertDnaReport): Promise<DnaReport> {
    const result = await this.db.insert(dnaReports).values(report).returning();
    return result[0];
  }

  // Family Tree
  async getFamilyMembersByEmail(email: string): Promise<FamilyMember[]> {
    return await this.db.select().from(familyMembers).where(eq(familyMembers.email, email)).orderBy(familyMembers.createdAt);
  }

  async createFamilyMember(member: InsertFamilyMember): Promise<FamilyMember> {
    const result = await this.db.insert(familyMembers).values(member).returning();
    return result[0];
  }

  async updateFamilyMember(id: string, member: Partial<InsertFamilyMember>): Promise<FamilyMember | undefined> {
    const result = await this.db.update(familyMembers).set(member).where(eq(familyMembers.id, id)).returning();
    return result[0];
  }

  async deleteFamilyMember(id: string): Promise<void> {
    await this.db.update(dnaFindings).set({ familyMemberId: null }).where(eq(dnaFindings.familyMemberId, id));
    await this.db.delete(familyMembers).where(eq(familyMembers.id, id));
  }

  // DNA Findings
  async getDnaFindingsByEmail(email: string): Promise<DnaFinding[]> {
    return await this.db.select().from(dnaFindings).where(eq(dnaFindings.email, email)).orderBy(desc(dnaFindings.createdAt));
  }

  async getDnaFindingsByMember(familyMemberId: string): Promise<DnaFinding[]> {
    return await this.db.select().from(dnaFindings).where(eq(dnaFindings.familyMemberId, familyMemberId)).orderBy(desc(dnaFindings.createdAt));
  }

  async createDnaFinding(finding: InsertDnaFinding): Promise<DnaFinding> {
    const result = await this.db.insert(dnaFindings).values(finding).returning();
    return result[0];
  }

  async createDnaUpload(upload: InsertDnaUpload): Promise<DnaUpload> {
    const result = await this.db.insert(dnaUploads).values(upload).returning();
    return result[0];
  }

  async getDnaUploadsByEmail(email: string): Promise<DnaUpload[]> {
    return await this.db.select().from(dnaUploads).where(eq(dnaUploads.email, email)).orderBy(desc(dnaUploads.uploadedAt));
  }

  async deleteDnaUpload(id: string): Promise<DnaUpload | undefined> {
    const result = await this.db.delete(dnaUploads).where(eq(dnaUploads.id, id)).returning();
    return result[0];
  }

  async deleteDnaFinding(id: string): Promise<void> {
    await this.db.delete(dnaFindings).where(eq(dnaFindings.id, id));
  }

  async countFreePromoOrders(): Promise<number> {
    const result = await this.db
      .select({ count: sql<number>`count(*)::int` })
      .from(orders)
      .where(
        and(
          eq(orders.productType, "base_analysis_free"),
          eq(orders.status, "completed")
        )
      );
    return result[0]?.count ?? 0;
  }

  async claimFreePromoOrder(userId: string, email: string): Promise<{ success: boolean; orderId?: string; error?: string }> {
    return await this.db.transaction(async (tx) => {
      const countResult = await tx
        .select({ count: sql<number>`count(*)::int` })
        .from(orders)
        .where(
          and(
            eq(orders.productType, "base_analysis_free"),
            eq(orders.status, "completed")
          )
        );
      const currentCount = countResult[0]?.count ?? 0;

      if (currentCount >= 20) {
        return { success: false, error: "Sorry, all 20 free spots have been claimed!" };
      }

      const existingResult = await tx
        .select({ count: sql<number>`count(*)::int` })
        .from(orders)
        .where(
          and(
            eq(orders.email, email),
            eq(orders.productType, "base_analysis_free"),
            eq(orders.status, "completed")
          )
        );

      if ((existingResult[0]?.count ?? 0) > 0) {
        return { success: false, error: "You have already claimed your free analysis." };
      }

      const orderResult = await tx
        .insert(orders)
        .values({
          userId,
          email,
          productType: "base_analysis_free",
          amount: 0,
          status: "completed",
          completedAt: new Date(),
        })
        .returning();

      return { success: true, orderId: orderResult[0].id };
    });
  }

  async countLatinFreePromoOrders(): Promise<number> {
    const result = await this.db
      .select({ count: sql<number>`count(*)::int` })
      .from(orders)
      .where(
        and(
          eq(orders.productType, "latin_course_free"),
          eq(orders.status, "completed")
        )
      );
    return result[0]?.count ?? 0;
  }

  async claimLatinFreePromo(userId: string, email: string): Promise<{ success: boolean; orderId?: string; error?: string }> {
    return await this.db.transaction(async (tx) => {
      await tx.execute(sql`SELECT pg_advisory_xact_lock(100)`);

      const countResult = await tx
        .select({ count: sql<number>`count(*)::int` })
        .from(orders)
        .where(
          and(
            eq(orders.productType, "latin_course_free"),
            eq(orders.status, "completed")
          )
        );
      const currentCount = countResult[0]?.count ?? 0;

      if (currentCount >= 20) {
        return { success: false, error: "Sorry, all 20 free lifetime spots have been claimed!" };
      }

      const existingResult = await tx
        .select({ count: sql<number>`count(*)::int` })
        .from(orders)
        .where(
          and(
            eq(orders.email, email),
            eq(orders.productType, "latin_course_free"),
            eq(orders.status, "completed")
          )
        );

      if ((existingResult[0]?.count ?? 0) > 0) {
        return { success: false, error: "You have already claimed your free lifetime access." };
      }

      const orderResult = await tx
        .insert(orders)
        .values({
          userId,
          email,
          productType: "latin_course_free",
          amount: 0,
          status: "completed",
          completedAt: new Date(),
        })
        .returning();

      return { success: true, orderId: orderResult[0].id };
    });
  }

  async countLatinLifetimeOrders(): Promise<number> {
    const result = await this.db
      .select({ count: sql<number>`count(*)::int` })
      .from(orders)
      .where(
        and(
          eq(orders.productType, "latin_lifetime"),
          eq(orders.status, "completed")
        )
      );
    return result[0]?.count ?? 0;
  }

  async countAcademyProFreeOrders(): Promise<number> {
    const result = await this.db
      .select({ count: sql<number>`count(*)::int` })
      .from(orders)
      .where(
        and(
          eq(orders.productType, "academy_professional_free"),
          eq(orders.status, "completed")
        )
      );
    return result[0]?.count ?? 0;
  }

  async claimAcademyProFree(userId: string, email: string): Promise<{ success: boolean; orderId?: string; error?: string }> {
    return await this.db.transaction(async (tx) => {
      await tx.execute(sql`SELECT pg_advisory_xact_lock(200)`);

      const countResult = await tx
        .select({ count: sql<number>`count(*)::int` })
        .from(orders)
        .where(
          and(
            eq(orders.productType, "academy_professional_free"),
            eq(orders.status, "completed")
          )
        );
      const currentCount = countResult[0]?.count ?? 0;

      if (currentCount >= 5) {
        return { success: false, error: "Sorry, all 5 free Professional spots have been claimed!" };
      }

      const existingResult = await tx
        .select({ count: sql<number>`count(*)::int` })
        .from(orders)
        .where(
          and(
            eq(orders.email, email),
            eq(orders.productType, "academy_professional_free"),
            eq(orders.status, "completed")
          )
        );

      if ((existingResult[0]?.count ?? 0) > 0) {
        return { success: false, error: "You have already claimed your free Professional access." };
      }

      const orderResult = await tx
        .insert(orders)
        .values({
          userId,
          email,
          productType: "academy_professional_free",
          amount: 0,
          status: "completed",
          completedAt: new Date(),
        })
        .returning();

      return { success: true, orderId: orderResult[0].id };
    });
  }

  async countAcademyFoundationFreeOrders(): Promise<number> {
    const result = await this.db
      .select({ count: sql<number>`count(*)::int` })
      .from(orders)
      .where(
        and(
          eq(orders.productType, "academy_foundation_free"),
          eq(orders.status, "completed")
        )
      );
    return result[0]?.count ?? 0;
  }

  async claimAcademyFoundationFree(userId: string, email: string): Promise<{ success: boolean; orderId?: string; error?: string }> {
    return await this.db.transaction(async (tx) => {
      await tx.execute(sql`SELECT pg_advisory_xact_lock(201)`);

      const countResult = await tx
        .select({ count: sql<number>`count(*)::int` })
        .from(orders)
        .where(
          and(
            eq(orders.productType, "academy_foundation_free"),
            eq(orders.status, "completed")
          )
        );
      const currentCount = countResult[0]?.count ?? 0;

      if (currentCount >= 5) {
        return { success: false, error: "Sorry, all 5 free Foundation spots have been claimed!" };
      }

      const existingResult = await tx
        .select({ count: sql<number>`count(*)::int` })
        .from(orders)
        .where(
          and(
            eq(orders.email, email),
            eq(orders.productType, "academy_foundation_free"),
            eq(orders.status, "completed")
          )
        );

      if ((existingResult[0]?.count ?? 0) > 0) {
        return { success: false, error: "You have already claimed your free Foundation access." };
      }

      const orderResult = await tx
        .insert(orders)
        .values({
          userId,
          email,
          productType: "academy_foundation_free",
          amount: 0,
          status: "completed",
          completedAt: new Date(),
        })
        .returning();

      return { success: true, orderId: orderResult[0].id };
    });
  }
}

export const storage = new DatabaseStorage();
