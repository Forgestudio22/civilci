import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM_EMAIL = process.env.FROM_EMAIL || 'Civil CI <noreply@civilci.com>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contact@civilci.com';

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  if (!resend) {
    console.log('[Email] Resend not configured - email would be sent:', {
      to: options.to,
      subject: options.subject,
    });
    return false;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    if (error) {
      console.error('[Email] Failed to send:', error);
      return false;
    }

    console.log('[Email] Sent successfully:', data?.id);
    return true;
  } catch (error) {
    console.error('[Email] Error sending email:', error);
    return false;
  }
}

export async function sendNewCaseNotification(caseData: {
  id: string;
  name: string;
  email: string;
  serviceType?: string;
  urgency: string;
  caseSummary: string;
}): Promise<boolean> {
  const serviceLabels: Record<string, string> = {
    "case-reconstruction": "Case Reconstruction",
    "misconduct-review": "Misconduct Review",
    "affidavit-support": "Affidavit Support",
    "pro-se-support": "Pro-Se Support",
    "strategy-session": "Strategy Session",
    "document-organization": "Document Organization",
    "complaint-support": "Complaint Support",
    "timeline-map": "Timeline Map",
    "accountability-package": "Accountability Package",
    "not-sure": "Not Sure Yet",
  };

  const urgencyColors: Record<string, string> = {
    low: "#6b7280",
    medium: "#eab308",
    high: "#f97316",
    critical: "#ef4444",
  };

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #1a1a1a; color: #e5e5e5; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #262626; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #8b1a1a; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Civil CI</h1>
            <p style="color: #d4af37; margin: 5px 0 0 0; font-size: 14px;">New Case Review Submission</p>
          </div>
          
          <div style="padding: 30px;">
            <div style="background-color: #333333; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
              <h2 style="color: #d4af37; margin: 0 0 15px 0; font-size: 18px;">Case Details</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #9ca3af; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #e5e5e5; font-weight: 500;">${caseData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9ca3af;">Email:</td>
                  <td style="padding: 8px 0; color: #e5e5e5;">${caseData.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9ca3af;">Service:</td>
                  <td style="padding: 8px 0; color: #e5e5e5;">${caseData.serviceType ? serviceLabels[caseData.serviceType] || caseData.serviceType : 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #9ca3af;">Urgency:</td>
                  <td style="padding: 8px 0;">
                    <span style="background-color: ${urgencyColors[caseData.urgency]}22; color: ${urgencyColors[caseData.urgency]}; padding: 4px 12px; border-radius: 4px; text-transform: uppercase; font-size: 12px; font-weight: 600;">
                      ${caseData.urgency}
                    </span>
                  </td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #333333; border-radius: 6px; padding: 20px;">
              <h3 style="color: #d4af37; margin: 0 0 10px 0; font-size: 16px;">Case Summary</h3>
              <p style="color: #e5e5e5; line-height: 1.6; margin: 0; white-space: pre-wrap;">${caseData.caseSummary}</p>
            </div>
            
            <div style="margin-top: 25px; text-align: center;">
              <a href="${process.env.REPLIT_DEV_DOMAIN || 'https://civilci.com'}/admin/cases" 
                 style="display: inline-block; background-color: #8b1a1a; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 500;">
                Review in Admin Portal
              </a>
            </div>
          </div>
          
          <div style="background-color: #1a1a1a; padding: 20px; text-align: center; border-top: 1px solid #333333;">
            <p style="color: #6b7280; margin: 0; font-size: 12px;">
              This is an automated notification from Civil CI.<br>
              Case ID: ${caseData.id}
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
New Case Review Submission

Name: ${caseData.name}
Email: ${caseData.email}
Service: ${caseData.serviceType ? serviceLabels[caseData.serviceType] || caseData.serviceType : 'Not specified'}
Urgency: ${caseData.urgency.toUpperCase()}

Case Summary:
${caseData.caseSummary}

Review in Admin Portal: ${process.env.REPLIT_DEV_DOMAIN || 'https://civilci.com'}/admin/cases

Case ID: ${caseData.id}
  `;

  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `[Civil CI] New ${caseData.urgency.toUpperCase()} Case Review: ${caseData.name}`,
    html,
    text,
  });
}

export async function sendCaseConfirmation(caseData: {
  name: string;
  email: string;
  id: string;
}): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #1a1a1a; color: #e5e5e5; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #262626; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #8b1a1a; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Civil CI</h1>
            <p style="color: #d4af37; margin: 5px 0 0 0; font-size: 14px;">Case Review Confirmation</p>
          </div>
          
          <div style="padding: 30px;">
            <h2 style="color: #e5e5e5; margin: 0 0 20px 0;">Thank you, ${caseData.name}</h2>
            
            <p style="color: #9ca3af; line-height: 1.8; margin: 0 0 20px 0;">
              We have received your case review request. Your submission is now under review by our team.
            </p>
            
            <div style="background-color: #333333; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
              <p style="color: #9ca3af; margin: 0 0 5px 0; font-size: 14px;">Your Case Reference:</p>
              <p style="color: #d4af37; margin: 0; font-size: 18px; font-family: monospace;">${caseData.id.slice(0, 8).toUpperCase()}</p>
            </div>
            
            <h3 style="color: #e5e5e5; margin: 25px 0 15px 0; font-size: 16px;">What happens next?</h3>
            
            <ol style="color: #9ca3af; line-height: 2; padding-left: 20px; margin: 0;">
              <li>Our team will review your submission within 24-48 hours</li>
              <li>We may reach out for additional information if needed</li>
              <li>You'll receive an email when your case status is updated</li>
            </ol>
            
            <p style="color: #9ca3af; line-height: 1.8; margin: 25px 0 0 0; padding-top: 20px; border-top: 1px solid #333333;">
              If you have urgent concerns, please reply to this email or contact us directly.
            </p>
          </div>
          
          <div style="background-color: #1a1a1a; padding: 20px; text-align: center; border-top: 1px solid #333333;">
            <p style="color: #d4af37; margin: 0 0 5px 0; font-size: 14px; font-style: italic;">
              "What's wrong is wrong. We expose the lies and fight for the justice you deserve."
            </p>
            <p style="color: #6b7280; margin: 0; font-size: 12px;">
              Civil CI - Civil Citizens Intelligence
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Thank you, ${caseData.name}

We have received your case review request. Your submission is now under review by our team.

Your Case Reference: ${caseData.id.slice(0, 8).toUpperCase()}

What happens next?
1. Our team will review your submission within 24-48 hours
2. We may reach out for additional information if needed
3. You'll receive an email when your case status is updated

If you have urgent concerns, please reply to this email or contact us directly.

---
"What's wrong is wrong. We expose the lies and fight for the justice you deserve."
Civil CI - Civil Citizens Intelligence
  `;

  return sendEmail({
    to: caseData.email,
    subject: `[Civil CI] Case Review Received - Reference ${caseData.id.slice(0, 8).toUpperCase()}`,
    html,
    text,
  });
}

export async function sendStatusUpdateNotification(caseData: {
  name: string;
  email: string;
  id: string;
  status: string;
  previousStatus: string;
}): Promise<boolean> {
  const statusMessages: Record<string, string> = {
    "in-progress": "Our team has begun working on your case. We're actively reviewing the information you provided.",
    "under-review": "Your case is currently under detailed review. We may reach out if we need additional information.",
    "completed": "We have completed our review of your case. Please check your dashboard or expect a follow-up communication with our findings.",
    "closed": "Your case has been closed. If you have questions or need to reopen your case, please contact us.",
  };

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #1a1a1a; color: #e5e5e5; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #262626; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #8b1a1a; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Civil CI</h1>
            <p style="color: #d4af37; margin: 5px 0 0 0; font-size: 14px;">Case Status Update</p>
          </div>
          
          <div style="padding: 30px;">
            <h2 style="color: #e5e5e5; margin: 0 0 20px 0;">Hello, ${caseData.name}</h2>
            
            <p style="color: #9ca3af; line-height: 1.8; margin: 0 0 20px 0;">
              Your case status has been updated.
            </p>
            
            <div style="background-color: #333333; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
              <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
                <span style="color: #6b7280; text-transform: capitalize;">${caseData.previousStatus}</span>
                <span style="color: #d4af37;">→</span>
                <span style="color: #d4af37; font-weight: 600; text-transform: capitalize;">${caseData.status}</span>
              </div>
            </div>
            
            <p style="color: #e5e5e5; line-height: 1.8; margin: 0 0 20px 0;">
              ${statusMessages[caseData.status] || 'Your case status has been updated.'}
            </p>
            
            <div style="background-color: #333333; border-radius: 6px; padding: 15px; margin-bottom: 20px;">
              <p style="color: #9ca3af; margin: 0 0 5px 0; font-size: 14px;">Case Reference:</p>
              <p style="color: #d4af37; margin: 0; font-size: 16px; font-family: monospace;">${caseData.id.slice(0, 8).toUpperCase()}</p>
            </div>
            
            <p style="color: #9ca3af; line-height: 1.8; margin: 0;">
              If you have any questions about your case, please don't hesitate to reach out.
            </p>
          </div>
          
          <div style="background-color: #1a1a1a; padding: 20px; text-align: center; border-top: 1px solid #333333;">
            <p style="color: #6b7280; margin: 0; font-size: 12px;">
              Civil CI - Civil Citizens Intelligence
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Hello, ${caseData.name}

Your case status has been updated.

Status Change: ${caseData.previousStatus} → ${caseData.status}

${statusMessages[caseData.status] || 'Your case status has been updated.'}

Case Reference: ${caseData.id.slice(0, 8).toUpperCase()}

If you have any questions about your case, please don't hesitate to reach out.

---
Civil CI - Civil Citizens Intelligence
  `;

  return sendEmail({
    to: caseData.email,
    subject: `[Civil CI] Case Status Updated: ${caseData.status.toUpperCase()}`,
    html,
    text,
  });
}

export function isEmailConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}

export async function testEmailConnection(): Promise<{ success: boolean; message: string }> {
  if (!resend) {
    return { success: false, message: "Resend API key not configured" };
  }

  try {
    const { data, error } = await resend.domains.list();
    
    if (error) {
      return { success: false, message: `Connection failed: ${error.message}` };
    }
    
    return { success: true, message: "Email service connected successfully" };
  } catch (error: any) {
    return { success: false, message: `Connection error: ${error.message || "Unknown error"}` };
  }
}
