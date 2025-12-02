import {
  users,
  caseReviews,
  caseNotes,
  evidenceFiles,
  caseStudies,
  resources,
  blogPosts,
  availabilitySlots,
  bookings,
  type User,
  type UpsertUser,
  type CaseReview,
  type InsertCaseReview,
  type CaseNote,
  type InsertCaseNote,
  type EvidenceFile,
  type InsertEvidenceFile,
  type CaseStudy,
  type InsertCaseStudy,
  type Resource,
  type InsertResource,
  type BlogPost,
  type InsertBlogPost,
  type AvailabilitySlot,
  type InsertAvailabilitySlot,
  type Booking,
  type InsertBooking,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Case Review operations
  createCaseReview(caseReview: InsertCaseReview, userId?: string): Promise<CaseReview>;
  getCaseReviews(): Promise<CaseReview[]>;
  getCaseReview(id: string): Promise<CaseReview | undefined>;
  getUserCaseReviews(userId: string): Promise<CaseReview[]>;
  updateCaseReviewStatus(id: string, status: string): Promise<CaseReview | undefined>;
  
  // Case Notes operations
  createCaseNote(note: InsertCaseNote): Promise<CaseNote>;
  getCaseNotes(caseId: string): Promise<CaseNote[]>;
  
  // Evidence Files operations
  createEvidenceFile(file: InsertEvidenceFile): Promise<EvidenceFile>;
  getEvidenceFiles(caseId: string): Promise<EvidenceFile[]>;
  deleteEvidenceFile(id: string): Promise<void>;
  
  // Case Studies operations
  createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy>;
  getCaseStudies(): Promise<CaseStudy[]>;
  getPublishedCaseStudies(): Promise<CaseStudy[]>;
  getCaseStudy(id: string): Promise<CaseStudy | undefined>;
  updateCaseStudy(id: string, data: Partial<InsertCaseStudy>): Promise<CaseStudy | undefined>;
  
  // Resources operations
  createResource(resource: InsertResource): Promise<Resource>;
  getResources(): Promise<Resource[]>;
  getPublishedResources(): Promise<Resource[]>;
  getResource(id: string): Promise<Resource | undefined>;
  updateResource(id: string, data: Partial<InsertResource>): Promise<Resource | undefined>;
  
  // Blog Posts operations
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  updateBlogPost(id: string, data: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  
  // Availability operations
  createAvailabilitySlot(slot: InsertAvailabilitySlot): Promise<AvailabilitySlot>;
  getAvailabilitySlots(): Promise<AvailabilitySlot[]>;
  getActiveAvailabilitySlots(): Promise<AvailabilitySlot[]>;
  updateAvailabilitySlot(id: string, data: Partial<InsertAvailabilitySlot>): Promise<AvailabilitySlot | undefined>;
  deleteAvailabilitySlot(id: string): Promise<void>;
  
  // Bookings operations
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookings(): Promise<Booking[]>;
  getUserBookings(userId: string): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  updateBooking(id: string, data: Partial<InsertBooking>): Promise<Booking | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Case Review operations
  async createCaseReview(insertCaseReview: InsertCaseReview, userId?: string): Promise<CaseReview> {
    const [caseReview] = await db
      .insert(caseReviews)
      .values({
        ...insertCaseReview,
        userId: userId || null,
        phone: insertCaseReview.phone || null,
      })
      .returning();
    return caseReview;
  }

  async getCaseReviews(): Promise<CaseReview[]> {
    return db.select().from(caseReviews).orderBy(desc(caseReviews.createdAt));
  }

  async getCaseReview(id: string): Promise<CaseReview | undefined> {
    const [caseReview] = await db.select().from(caseReviews).where(eq(caseReviews.id, id));
    return caseReview;
  }

  async getUserCaseReviews(userId: string): Promise<CaseReview[]> {
    return db.select().from(caseReviews).where(eq(caseReviews.userId, userId)).orderBy(desc(caseReviews.createdAt));
  }

  async updateCaseReviewStatus(id: string, status: string): Promise<CaseReview | undefined> {
    const [caseReview] = await db
      .update(caseReviews)
      .set({ status, updatedAt: new Date() })
      .where(eq(caseReviews.id, id))
      .returning();
    return caseReview;
  }

  // Case Notes operations
  async createCaseNote(note: InsertCaseNote): Promise<CaseNote> {
    const [caseNote] = await db.insert(caseNotes).values(note).returning();
    return caseNote;
  }

  async getCaseNotes(caseId: string): Promise<CaseNote[]> {
    return db.select().from(caseNotes).where(eq(caseNotes.caseId, caseId)).orderBy(desc(caseNotes.createdAt));
  }

  // Evidence Files operations
  async createEvidenceFile(file: InsertEvidenceFile): Promise<EvidenceFile> {
    const [evidenceFile] = await db.insert(evidenceFiles).values(file).returning();
    return evidenceFile;
  }

  async getEvidenceFiles(caseId: string): Promise<EvidenceFile[]> {
    return db.select().from(evidenceFiles).where(eq(evidenceFiles.caseId, caseId)).orderBy(desc(evidenceFiles.createdAt));
  }

  async deleteEvidenceFile(id: string): Promise<void> {
    await db.delete(evidenceFiles).where(eq(evidenceFiles.id, id));
  }

  // Case Studies operations
  async createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy> {
    const [study] = await db.insert(caseStudies).values(caseStudy).returning();
    return study;
  }

  async getCaseStudies(): Promise<CaseStudy[]> {
    return db.select().from(caseStudies).orderBy(desc(caseStudies.createdAt));
  }

  async getPublishedCaseStudies(): Promise<CaseStudy[]> {
    return db.select().from(caseStudies).where(eq(caseStudies.isPublished, "true")).orderBy(desc(caseStudies.publishedAt));
  }

  async getCaseStudy(id: string): Promise<CaseStudy | undefined> {
    const [study] = await db.select().from(caseStudies).where(eq(caseStudies.id, id));
    return study;
  }

  async updateCaseStudy(id: string, data: Partial<InsertCaseStudy>): Promise<CaseStudy | undefined> {
    const [study] = await db
      .update(caseStudies)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(caseStudies.id, id))
      .returning();
    return study;
  }

  // Resources operations
  async createResource(resource: InsertResource): Promise<Resource> {
    const [res] = await db.insert(resources).values(resource).returning();
    return res;
  }

  async getResources(): Promise<Resource[]> {
    return db.select().from(resources).orderBy(desc(resources.createdAt));
  }

  async getPublishedResources(): Promise<Resource[]> {
    return db.select().from(resources).where(eq(resources.isPublished, "true")).orderBy(desc(resources.publishedAt));
  }

  async getResource(id: string): Promise<Resource | undefined> {
    const [res] = await db.select().from(resources).where(eq(resources.id, id));
    return res;
  }

  async updateResource(id: string, data: Partial<InsertResource>): Promise<Resource | undefined> {
    const [res] = await db
      .update(resources)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(resources.id, id))
      .returning();
    return res;
  }

  // Blog Posts operations
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [blogPost] = await db.insert(blogPosts).values(post).returning();
    return blogPost;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts).where(eq(blogPosts.isPublished, "true")).orderBy(desc(blogPosts.publishedAt));
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async updateBlogPost(id: string, data: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const [post] = await db
      .update(blogPosts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return post;
  }

  // Availability operations
  async createAvailabilitySlot(slot: InsertAvailabilitySlot): Promise<AvailabilitySlot> {
    const [availability] = await db.insert(availabilitySlots).values(slot).returning();
    return availability;
  }

  async getAvailabilitySlots(): Promise<AvailabilitySlot[]> {
    return db.select().from(availabilitySlots);
  }

  async getActiveAvailabilitySlots(): Promise<AvailabilitySlot[]> {
    return db.select().from(availabilitySlots).where(eq(availabilitySlots.isActive, "true"));
  }

  async updateAvailabilitySlot(id: string, data: Partial<InsertAvailabilitySlot>): Promise<AvailabilitySlot | undefined> {
    const [slot] = await db
      .update(availabilitySlots)
      .set(data)
      .where(eq(availabilitySlots.id, id))
      .returning();
    return slot;
  }

  async deleteAvailabilitySlot(id: string): Promise<void> {
    await db.delete(availabilitySlots).where(eq(availabilitySlots.id, id));
  }

  // Bookings operations
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db.insert(bookings).values(booking).returning();
    return newBooking;
  }

  async getBookings(): Promise<Booking[]> {
    return db.select().from(bookings).orderBy(desc(bookings.scheduledDate));
  }

  async getUserBookings(userId: string): Promise<Booking[]> {
    return db.select().from(bookings).where(eq(bookings.userId, userId)).orderBy(desc(bookings.scheduledDate));
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking;
  }

  async updateBooking(id: string, data: Partial<InsertBooking>): Promise<Booking | undefined> {
    const [booking] = await db
      .update(bookings)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(bookings.id, id))
      .returning();
    return booking;
  }
}

export const storage = new DatabaseStorage();
