import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCaseReviewSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/case-reviews", async (req, res) => {
    try {
      const parseResult = insertCaseReviewSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        const validationError = fromZodError(parseResult.error);
        return res.status(400).json({
          message: "Validation failed",
          errors: validationError.details,
        });
      }

      const caseReview = await storage.createCaseReview(parseResult.data);
      
      return res.status(201).json({
        message: "Case review request submitted successfully",
        id: caseReview.id,
      });
    } catch (error) {
      console.error("Error creating case review:", error);
      return res.status(500).json({
        message: "Failed to submit case review request",
      });
    }
  });

  app.get("/api/case-reviews", async (req, res) => {
    try {
      const caseReviews = await storage.getCaseReviews();
      return res.json(caseReviews);
    } catch (error) {
      console.error("Error fetching case reviews:", error);
      return res.status(500).json({
        message: "Failed to fetch case reviews",
      });
    }
  });

  app.get("/api/case-reviews/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const caseReview = await storage.getCaseReview(id);
      
      if (!caseReview) {
        return res.status(404).json({
          message: "Case review not found",
        });
      }
      
      return res.json(caseReview);
    } catch (error) {
      console.error("Error fetching case review:", error);
      return res.status(500).json({
        message: "Failed to fetch case review",
      });
    }
  });

  return httpServer;
}
