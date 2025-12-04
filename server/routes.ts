import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCaseReviewSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { setupAuth, isAuthenticated, isAdmin } from "./replitAuth";
import { promises as fs } from "fs";
import path from "path";
import multer from "multer";
import { sendNewCaseNotification, sendCaseConfirmation, sendStatusUpdateNotification, isEmailConfigured, testEmailConnection } from "./email";

const UPLOADS_DIR = path.join(process.cwd(), "uploads");

const fileStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      await fs.mkdir(UPLOADS_DIR, { recursive: true });
      cb(null, UPLOADS_DIR);
    } catch (error) {
      cb(error as Error, UPLOADS_DIR);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage: fileStorage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "image/gif",
      "text/plain",
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Allowed: PDF, DOC, DOCX, JPG, PNG, GIF, TXT"));
    }
  },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Replit Auth
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Case Review routes
  app.post("/api/case-reviews", async (req: any, res) => {
    try {
      const parseResult = insertCaseReviewSchema.safeParse(req.body);
      
      if (!parseResult.success) {
        const validationError = fromZodError(parseResult.error);
        return res.status(400).json({
          message: "Validation failed",
          errors: validationError.details,
        });
      }

      const userId = req.user?.claims?.sub;
      const caseReview = await storage.createCaseReview(parseResult.data, userId);
      
      // Send email notifications (non-blocking)
      Promise.all([
        sendNewCaseNotification({
          id: caseReview.id,
          name: caseReview.name,
          email: caseReview.email,
          serviceType: caseReview.serviceType || undefined,
          urgency: caseReview.urgency,
          caseSummary: caseReview.caseSummary,
        }),
        sendCaseConfirmation({
          name: caseReview.name,
          email: caseReview.email,
          id: caseReview.id,
        }),
      ]).catch(err => console.error("[Email] Error sending notifications:", err));
      
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

  app.get("/api/case-reviews", isAuthenticated, isAdmin, async (req, res) => {
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

  app.get("/api/case-reviews/:id", isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const caseReview = await storage.getCaseReview(id);
      
      if (!caseReview) {
        return res.status(404).json({
          message: "Case review not found",
        });
      }

      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (caseReview.userId !== userId && user?.role !== "admin") {
        return res.status(403).json({
          message: "Access denied",
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

  // User's case reviews for dashboard
  app.get("/api/my-cases", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const cases = await storage.getUserCaseReviews(userId);
      return res.json(cases);
    } catch (error) {
      console.error("Error fetching user cases:", error);
      return res.status(500).json({
        message: "Failed to fetch your cases",
      });
    }
  });

  app.patch("/api/case-reviews/:id/status", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      // Get current case to track status change
      const currentCase = await storage.getCaseReview(id);
      if (!currentCase) {
        return res.status(404).json({ message: "Case review not found" });
      }
      
      const previousStatus = currentCase.status;
      const caseReview = await storage.updateCaseReviewStatus(id, status);
      if (!caseReview) {
        return res.status(404).json({ message: "Case review not found" });
      }
      
      // Send status update notification (non-blocking)
      if (previousStatus !== status) {
        sendStatusUpdateNotification({
          name: caseReview.name,
          email: caseReview.email,
          id: caseReview.id,
          status,
          previousStatus,
        }).catch(err => console.error("[Email] Error sending status update:", err));
      }
      
      return res.json(caseReview);
    } catch (error) {
      console.error("Error updating case status:", error);
      return res.status(500).json({ message: "Failed to update status" });
    }
  });

  // Case Notes routes
  app.post("/api/case-reviews/:id/notes", isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const { content, isInternal } = req.body;
      const userId = req.user.claims.sub;

      const caseReview = await storage.getCaseReview(id);
      if (!caseReview) {
        return res.status(404).json({ message: "Case not found" });
      }

      const user = await storage.getUser(userId);
      if (caseReview.userId !== userId && user?.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }

      const note = await storage.createCaseNote({
        caseId: id,
        authorId: userId,
        content,
        isInternal: isInternal ? "true" : "false",
      });
      
      return res.status(201).json(note);
    } catch (error) {
      console.error("Error creating case note:", error);
      return res.status(500).json({ message: "Failed to create note" });
    }
  });

  app.get("/api/case-reviews/:id/notes", isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.claims.sub;

      const caseReview = await storage.getCaseReview(id);
      if (!caseReview) {
        return res.status(404).json({ message: "Case not found" });
      }

      const user = await storage.getUser(userId);
      if (caseReview.userId !== userId && user?.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }

      let notes = await storage.getCaseNotes(id);
      
      if (user?.role !== "admin") {
        notes = notes.filter(note => note.isInternal !== "true");
      }
      
      return res.json(notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      return res.status(500).json({ message: "Failed to fetch notes" });
    }
  });

  // Case Studies routes (public)
  app.get("/api/case-studies", async (req, res) => {
    try {
      const caseStudies = await storage.getPublishedCaseStudies();
      return res.json(caseStudies);
    } catch (error) {
      console.error("Error fetching case studies:", error);
      return res.status(500).json({ message: "Failed to fetch case studies" });
    }
  });

  app.get("/api/case-studies/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const study = await storage.getCaseStudy(id);
      
      if (!study || study.isPublished !== "true") {
        return res.status(404).json({ message: "Case study not found" });
      }
      
      return res.json(study);
    } catch (error) {
      console.error("Error fetching case study:", error);
      return res.status(500).json({ message: "Failed to fetch case study" });
    }
  });

  // Admin case studies management
  app.post("/api/admin/case-studies", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const study = await storage.createCaseStudy(req.body);
      return res.status(201).json(study);
    } catch (error) {
      console.error("Error creating case study:", error);
      return res.status(500).json({ message: "Failed to create case study" });
    }
  });

  app.patch("/api/admin/case-studies/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const study = await storage.updateCaseStudy(id, req.body);
      
      if (!study) {
        return res.status(404).json({ message: "Case study not found" });
      }
      
      return res.json(study);
    } catch (error) {
      console.error("Error updating case study:", error);
      return res.status(500).json({ message: "Failed to update case study" });
    }
  });

  // Resources routes (public)
  app.get("/api/resources", async (req, res) => {
    try {
      const resources = await storage.getPublishedResources();
      return res.json(resources);
    } catch (error) {
      console.error("Error fetching resources:", error);
      return res.status(500).json({ message: "Failed to fetch resources" });
    }
  });

  app.get("/api/resources/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const resource = await storage.getResource(id);
      
      if (!resource || resource.isPublished !== "true") {
        return res.status(404).json({ message: "Resource not found" });
      }
      
      return res.json(resource);
    } catch (error) {
      console.error("Error fetching resource:", error);
      return res.status(500).json({ message: "Failed to fetch resource" });
    }
  });

  // Admin resources management
  app.post("/api/admin/resources", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const resource = await storage.createResource(req.body);
      return res.status(201).json(resource);
    } catch (error) {
      console.error("Error creating resource:", error);
      return res.status(500).json({ message: "Failed to create resource" });
    }
  });

  app.patch("/api/admin/resources/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const resource = await storage.updateResource(id, req.body);
      
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      
      return res.json(resource);
    } catch (error) {
      console.error("Error updating resource:", error);
      return res.status(500).json({ message: "Failed to update resource" });
    }
  });

  // Blog Posts routes (public)
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      return res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post || post.isPublished !== "true") {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      return res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      return res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Admin blog management
  app.get("/api/admin/blog", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      return res.json(posts);
    } catch (error) {
      console.error("Error fetching all blog posts:", error);
      return res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.post("/api/admin/blog", isAuthenticated, isAdmin, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const post = await storage.createBlogPost({
        ...req.body,
        authorId: userId,
      });
      return res.status(201).json(post);
    } catch (error) {
      console.error("Error creating blog post:", error);
      return res.status(500).json({ message: "Failed to create blog post" });
    }
  });

  app.patch("/api/admin/blog/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.updateBlogPost(id, req.body);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      return res.json(post);
    } catch (error) {
      console.error("Error updating blog post:", error);
      return res.status(500).json({ message: "Failed to update blog post" });
    }
  });

  // Availability routes (public for viewing)
  app.get("/api/availability", async (req, res) => {
    try {
      const slots = await storage.getActiveAvailabilitySlots();
      return res.json(slots);
    } catch (error) {
      console.error("Error fetching availability:", error);
      return res.status(500).json({ message: "Failed to fetch availability" });
    }
  });

  // Admin availability management
  app.post("/api/admin/availability", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const slot = await storage.createAvailabilitySlot(req.body);
      return res.status(201).json(slot);
    } catch (error) {
      console.error("Error creating availability slot:", error);
      return res.status(500).json({ message: "Failed to create slot" });
    }
  });

  app.patch("/api/admin/availability/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const slot = await storage.updateAvailabilitySlot(id, req.body);
      
      if (!slot) {
        return res.status(404).json({ message: "Availability slot not found" });
      }
      
      return res.json(slot);
    } catch (error) {
      console.error("Error updating availability slot:", error);
      return res.status(500).json({ message: "Failed to update slot" });
    }
  });

  app.delete("/api/admin/availability/:id", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteAvailabilitySlot(id);
      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting availability slot:", error);
      return res.status(500).json({ message: "Failed to delete slot" });
    }
  });

  // Bookings routes
  app.get("/api/bookings", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      return res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.get("/api/my-bookings", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const bookings = await storage.getUserBookings(userId);
      return res.json(bookings);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      return res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.post("/api/bookings", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const booking = await storage.createBooking({
        ...req.body,
        userId,
      });
      return res.status(201).json(booking);
    } catch (error) {
      console.error("Error creating booking:", error);
      return res.status(500).json({ message: "Failed to create booking" });
    }
  });

  app.patch("/api/bookings/:id", isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.claims.sub;
      
      const booking = await storage.getBooking(id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      const user = await storage.getUser(userId);
      if (booking.userId !== userId && user?.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }

      const updated = await storage.updateBooking(id, req.body);
      return res.json(updated);
    } catch (error) {
      console.error("Error updating booking:", error);
      return res.status(500).json({ message: "Failed to update booking" });
    }
  });

  // Email configuration status (admin only)
  app.get("/api/admin/email-status", isAuthenticated, isAdmin, async (req, res) => {
    return res.json({ configured: isEmailConfigured() });
  });

  // Test email connection (admin only)
  app.post("/api/admin/email-test", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const result = await testEmailConnection();
      return res.json(result);
    } catch (error) {
      console.error("Error testing email connection:", error);
      return res.status(500).json({ success: false, message: "Failed to test email connection" });
    }
  });

  // Evidence File routes
  app.post("/api/case-reviews/:caseId/evidence", isAuthenticated, upload.single("file"), async (req: any, res) => {
    try {
      const { caseId } = req.params;
      const userId = req.user.claims.sub;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ message: "No file provided" });
      }

      const caseReview = await storage.getCaseReview(caseId);
      if (!caseReview) {
        await fs.unlink(file.path);
        return res.status(404).json({ message: "Case not found" });
      }

      const user = await storage.getUser(userId);
      if (caseReview.userId !== userId && user?.role !== "admin") {
        await fs.unlink(file.path);
        return res.status(403).json({ message: "Access denied" });
      }

      const evidenceFile = await storage.createEvidenceFile({
        caseId,
        uploadedBy: userId,
        fileName: file.originalname,
        fileType: file.mimetype,
        fileSize: String(file.size),
        storagePath: file.filename,
      });

      return res.status(201).json(evidenceFile);
    } catch (error) {
      console.error("Error uploading evidence file:", error);
      if (req.file) {
        await fs.unlink(req.file.path).catch(() => {});
      }
      return res.status(500).json({ message: "Failed to upload file" });
    }
  });

  app.get("/api/case-reviews/:caseId/evidence", isAuthenticated, async (req: any, res) => {
    try {
      const { caseId } = req.params;
      const userId = req.user.claims.sub;

      const caseReview = await storage.getCaseReview(caseId);
      if (!caseReview) {
        return res.status(404).json({ message: "Case not found" });
      }

      const user = await storage.getUser(userId);
      if (caseReview.userId !== userId && user?.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }

      const files = await storage.getEvidenceFiles(caseId);
      return res.json(files);
    } catch (error) {
      console.error("Error fetching evidence files:", error);
      return res.status(500).json({ message: "Failed to fetch files" });
    }
  });

  app.get("/api/evidence/:id/download", isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.claims.sub;

      const file = await storage.getEvidenceFile(id);
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }

      const caseReview = await storage.getCaseReview(file.caseId);
      if (!caseReview) {
        return res.status(404).json({ message: "Case not found" });
      }

      const user = await storage.getUser(userId);
      if (caseReview.userId !== userId && user?.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }

      const filePath = path.join(UPLOADS_DIR, file.storagePath);
      
      try {
        await fs.access(filePath);
      } catch {
        return res.status(404).json({ message: "File not found on disk" });
      }

      res.setHeader("Content-Disposition", `attachment; filename="${file.fileName}"`);
      res.setHeader("Content-Type", file.fileType);
      
      const fileBuffer = await fs.readFile(filePath);
      return res.send(fileBuffer);
    } catch (error) {
      console.error("Error downloading evidence file:", error);
      return res.status(500).json({ message: "Failed to download file" });
    }
  });

  app.delete("/api/evidence/:id", isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.claims.sub;

      const file = await storage.getEvidenceFile(id);
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }

      const caseReview = await storage.getCaseReview(file.caseId);
      if (!caseReview) {
        return res.status(404).json({ message: "Case not found" });
      }

      const user = await storage.getUser(userId);
      if (caseReview.userId !== userId && user?.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }

      const filePath = path.join(UPLOADS_DIR, file.storagePath);
      await fs.unlink(filePath).catch(() => {});
      await storage.deleteEvidenceFile(id);

      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting evidence file:", error);
      return res.status(500).json({ message: "Failed to delete file" });
    }
  });

  return httpServer;
}
