import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const caseReviews = pgTable("case_reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  caseSummary: text("case_summary").notNull(),
  urgency: text("urgency").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCaseReviewSchema = createInsertSchema(caseReviews).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  caseSummary: z.string().min(50, "Please provide at least 50 characters describing your case"),
  urgency: z.enum(["low", "medium", "high", "critical"], {
    required_error: "Please select an urgency level",
  }),
});

export type InsertCaseReview = z.infer<typeof insertCaseReviewSchema>;
export type CaseReview = typeof caseReviews.$inferSelect;
