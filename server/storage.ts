import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import {
  users,
  orders,
  dnaReports,
  familyMembers,
  dnaFindings,
  type User,
  type InsertUser,
  type Order,
  type InsertOrder,
  type DnaReport,
  type InsertDnaReport,
  type FamilyMember,
  type InsertFamilyMember,
  type DnaFinding,
  type InsertDnaFinding,
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

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

  // DNA Findings
  getDnaFindingsByEmail(email: string): Promise<DnaFinding[]>;
  createDnaFinding(finding: InsertDnaFinding): Promise<DnaFinding>;
  deleteDnaFinding(id: string): Promise<void>;
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
    await this.db.delete(familyMembers).where(eq(familyMembers.id, id));
  }

  // DNA Findings
  async getDnaFindingsByEmail(email: string): Promise<DnaFinding[]> {
    return await this.db.select().from(dnaFindings).where(eq(dnaFindings.email, email)).orderBy(desc(dnaFindings.createdAt));
  }

  async createDnaFinding(finding: InsertDnaFinding): Promise<DnaFinding> {
    const result = await this.db.insert(dnaFindings).values(finding).returning();
    return result[0];
  }

  async deleteDnaFinding(id: string): Promise<void> {
    await this.db.delete(dnaFindings).where(eq(dnaFindings.id, id));
  }
}

export const storage = new DatabaseStorage();
