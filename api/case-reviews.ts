import { insertCaseReviewSchema } from "../shared/schema";
import { fromZodError } from "zod-validation-error";
import {
  sendNewCaseNotification,
  sendCaseConfirmation,
  isEmailConfigured,
} from "../server/email";

// Vercel Node.js serverless function to handle
// public case review submissions from the contact form.
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  if (!isEmailConfigured()) {
    return res.status(500).json({
      message:
        "Email service is not configured. Please try again later or contact us directly.",
    });
  }

  let body = req.body as unknown;

  // Fallback in case the runtime doesn't auto‑parse JSON
  if (!body) {
    try {
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(Buffer.from(chunk));
      }
      const raw = Buffer.concat(chunks).toString("utf8");
      if (raw) {
        body = JSON.parse(raw);
      }
    } catch {
      // ignore, validation below will catch invalid input
    }
  }

  const parseResult = insertCaseReviewSchema.safeParse(body);

  if (!parseResult.success) {
    const validationError = fromZodError(parseResult.error);
    return res.status(400).json({
      message: "Validation failed",
      errors: validationError.details,
    });
  }

  const data = parseResult.data;
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

  try {
    const [adminOk, userOk] = await Promise.all([
      sendNewCaseNotification({
        id,
        name: data.name,
        email: data.email,
        serviceType: data.serviceType || undefined,
        urgency: data.urgency,
        caseSummary: data.caseSummary,
      }),
      sendCaseConfirmation({
        name: data.name,
        email: data.email,
        id,
      }),
    ]);

    if (!adminOk || !userOk) {
      return res.status(500).json({
        message:
          "We could not send confirmation emails right now. Please try again later.",
      });
    }

    return res.status(201).json({
      message: "Case review request submitted successfully",
      id,
    });
  } catch (error) {
    console.error("Error handling case review submission:", error);
    return res.status(500).json({
      message: "Failed to submit case review request",
    });
  }
}

