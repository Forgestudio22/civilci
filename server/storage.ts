import { type User, type InsertUser, type CaseReview, type InsertCaseReview } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createCaseReview(caseReview: InsertCaseReview): Promise<CaseReview>;
  getCaseReviews(): Promise<CaseReview[]>;
  getCaseReview(id: string): Promise<CaseReview | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private caseReviews: Map<string, CaseReview>;

  constructor() {
    this.users = new Map();
    this.caseReviews = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createCaseReview(insertCaseReview: InsertCaseReview): Promise<CaseReview> {
    const id = randomUUID();
    const caseReview: CaseReview = {
      ...insertCaseReview,
      id,
      phone: insertCaseReview.phone || null,
      createdAt: new Date(),
    };
    this.caseReviews.set(id, caseReview);
    return caseReview;
  }

  async getCaseReviews(): Promise<CaseReview[]> {
    return Array.from(this.caseReviews.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getCaseReview(id: string): Promise<CaseReview | undefined> {
    return this.caseReviews.get(id);
  }
}

export const storage = new MemStorage();
