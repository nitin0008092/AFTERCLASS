import { Resend } from "resend";
import { RegistrationRecord } from "./supabase";

const resendApiKey = process.env.RESEND_API_KEY;
const notifyEmail = process.env.AFTERCLASS_NOTIFY_EMAIL || "afterclass121@gmail.com";
const fromEmail = process.env.EMAIL_FROM || "AFTERCLASS <onboarding@resend.dev>";

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export interface EmailDispatchResult {
  internalStatus: "sent" | "failed" | "skipped_no_api_key";
  customerStatus: "sent" | "failed" | "skipped_no_api_key";
  errors?: string[];
}

/**
 * Dispatches internal founder notification and customer confirmation emails via Resend.
 * Gracefully logs and skips if RESEND_API_KEY is not yet configured.
 */
export async function sendRegistrationEmails(
  reg: RegistrationRecord
): Promise<EmailDispatchResult> {
  const result: EmailDispatchResult = {
    internalStatus: "skipped_no_api_key",
    customerStatus: "skipped_no_api_key",
    errors: [],
  };

  if (!resend) {
    console.info(
      `[AFTERCLASS EMAIL] Resend API key not configured. Mocking email delivery for Reg ID: ${reg.registration_id}`
    );
    return result;
  }

  const firstName = reg.customer_name.trim().split(" ")[0] || "there";
  const formattedDate = new Date(reg.created_at).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  // 1. Email A: Internal Founder Notification (to afterclass121@gmail.com)
  try {
    const internalSubject = `New AFTERCLASS Interest Registration — ${reg.product_name}`;
    const internalHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #F5F2EB; padding: 32px; color: #171717;">
        <div style="max-width: 580px; margin: 0 auto; background: #FFFFFF; border: 1px solid #171717; padding: 28px;">
          <div style="border-bottom: 2px solid #171717; padding-bottom: 16px; margin-bottom: 24px;">
            <p style="font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: #777A61; margin: 0 0 6px 0; font-weight: 700;">
              INTERNAL FOUNDER ALERT // LAXYA • NITIN • MIMANSHA
            </p>
            <h1 style="font-size: 22px; font-weight: 800; letter-spacing: -0.03em; margin: 0; text-transform: uppercase;">
              New Customer Registration
            </h1>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 13px; line-height: 1.6;">
            <tr>
              <td style="padding: 8px 0; color: #777A61; text-transform: uppercase; font-size: 11px; width: 38%; font-weight: 600;">Registration ID</td>
              <td style="padding: 8px 0; font-family: monospace; font-weight: 700; color: #171717;">${reg.registration_id}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #777A61; text-transform: uppercase; font-size: 11px; font-weight: 600;">Timestamp</td>
              <td style="padding: 8px 0; color: #171717;">${formattedDate} (IST)</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #777A61; text-transform: uppercase; font-size: 11px; font-weight: 600;">Customer Name</td>
              <td style="padding: 8px 0; font-weight: 600; color: #171717;">${reg.customer_name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #777A61; text-transform: uppercase; font-size: 11px; font-weight: 600;">Customer Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${reg.customer_email}" style="color: #171717; text-decoration: underline;">${reg.customer_email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #777A61; text-transform: uppercase; font-size: 11px; font-weight: 600;">Phone Number</td>
              <td style="padding: 8px 0; color: #171717;">${reg.phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #777A61; text-transform: uppercase; font-size: 11px; font-weight: 600;">Selected Concept</td>
              <td style="padding: 8px 0; font-weight: 700; color: #171717;">${reg.product_name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #777A61; text-transform: uppercase; font-size: 11px; font-weight: 600;">Colourway</td>
              <td style="padding: 8px 0; color: #171717;">${reg.colour}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #777A61; text-transform: uppercase; font-size: 11px; font-weight: 600;">Requested Size</td>
              <td style="padding: 8px 0; font-weight: 700; color: #171717;">${reg.size}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #777A61; text-transform: uppercase; font-size: 11px; font-weight: 600;">Requested Quantity</td>
              <td style="padding: 8px 0; color: #171717;">${reg.quantity} pc</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #777A61; text-transform: uppercase; font-size: 11px; font-weight: 600;">Referral Source</td>
              <td style="padding: 8px 0; color: #171717;">${reg.referral_source || "Direct Website"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #777A61; text-transform: uppercase; font-size: 11px; font-weight: 600;">Status</td>
              <td style="padding: 8px 0; text-transform: uppercase; font-weight: 700; color: #777A61;">${reg.status}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #B8B5AE; font-size: 11px; color: #777A61; text-align: center;">
            AFTERCLASS ATELIER • SECURE FOUNDER SYSTEM
          </div>
        </div>
      </div>
    `;

    const internalRes = await resend.emails.send({
      from: fromEmail,
      to: [notifyEmail],
      subject: internalSubject,
      html: internalHtml,
      headers: {
        "X-Entity-Ref-ID": reg.registration_id,
      },
    });

    if (internalRes.error) {
      result.internalStatus = "failed";
      result.errors?.push(`Internal email failed: ${internalRes.error.message}`);
    } else {
      result.internalStatus = "sent";
    }
  } catch (err: unknown) {
    result.internalStatus = "failed";
    const errorMsg = err instanceof Error ? err.message : String(err);
    result.errors?.push(`Internal email error: ${errorMsg}`);
  }

  // 2. Email B: Branded Customer Confirmation (to reg.customer_email)
  // Note: Resend's free sandbox (onboarding@resend.dev) only delivers to the account owner email.
  // Once a custom domain is verified, it delivers to all customers.
  const isSandbox = fromEmail.includes("onboarding@resend.dev");
  const isOwnerEmail =
    reg.customer_email.toLowerCase() === notifyEmail.toLowerCase() ||
    reg.customer_email.toLowerCase() === "mishra7764@gmail.com";

  if (isSandbox && !isOwnerEmail) {
    result.customerStatus = "skipped_sandbox_no_domain" as "skipped_no_api_key";
    console.info(
      `[AFTERCLASS EMAIL] Customer confirmation for ${reg.customer_email} skipped because Resend sandbox requires a custom domain to email external recipients.`
    );
    return result;
  }

  try {
    const customerSubject = "You're on the AFTERCLASS list.";
    const customerHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #F5F2EB; padding: 40px 16px; color: #171717; margin: 0;">
        <div style="max-width: 560px; margin: 0 auto; background: #FFFFFF; border: 1px solid #171717; padding: 36px 28px;">
          <div style="margin-bottom: 28px; border-bottom: 1px solid #171717; padding-bottom: 16px;">
            <p style="font-size: 24px; font-weight: 900; letter-spacing: -0.04em; margin: 0; text-transform: uppercase;">
              AFTERCLASS
            </p>
            <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #777A61; margin: 4px 0 0 0;">
              Everyday uniform. Individual expression.
            </p>
          </div>

          <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px 0; color: #171717;">
            Hey ${firstName},
          </p>

          <p style="font-size: 14px; line-height: 1.6; margin: 0 0 16px 0; color: #171717;">
            Thanks for showing interest in AFTERCLASS.
          </p>

          <p style="font-size: 14px; line-height: 1.6; margin: 0 0 16px 0; color: #171717;">
            We're building something for the hours beyond the routine, and we're glad you want to be part of it.
          </p>

          <div style="background: #F5F2EB; border-left: 3px solid #171717; padding: 14px 18px; margin: 20px 0;">
            <p style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #777A61; margin: 0 0 4px 0;">
              REGISTERED INTEREST
            </p>
            <p style="font-size: 14px; font-weight: 700; color: #171717; margin: 0 0 2px 0;">
              ${reg.product_name}
            </p>
            <p style="font-size: 12px; color: #171717; margin: 0;">
              Size: <strong>${reg.size}</strong> • Colour: <strong>${reg.colour}</strong> • Qty: <strong>${reg.quantity}</strong>
            </p>
            <p style="font-size: 11px; font-family: monospace; color: #777A61; margin: 6px 0 0 0;">
              Registration ID: ${reg.registration_id}
            </p>
          </div>

          <p style="font-size: 14px; line-height: 1.6; margin: 0 0 16px 0; color: #171717;">
            Our team will review responses and share launch updates as we get closer to launch.
          </p>

          <p style="font-size: 12px; line-height: 1.6; margin: 0 0 24px 0; color: #777A61; border-top: 1px dashed #B8B5AE; padding-top: 14px;">
            This is a free interest registration, not a confirmed order. No payment has been taken, and product availability and final pricing are not guaranteed.
          </p>

          <p style="font-size: 14px; line-height: 1.6; margin: 0 0 24px 0; color: #171717;">
            Until then, stay tuned. There's more coming.
          </p>

          <div style="border-top: 1px solid #171717; padding-top: 20px; font-size: 12px; line-height: 1.5; color: #171717;">
            <strong style="text-transform: uppercase; letter-spacing: 0.05em;">AFTERCLASS</strong><br />
            <span>Everyday uniform. Individual expression.</span><br />
            <span style="color: #777A61;">Independent streetwear. Made for what's next.</span><br />
            <span style="color: #B8B5AE; font-size: 11px;">Planned Launch: 31 December 2026</span>
          </div>
        </div>
      </div>
    `;

    const customerRes = await resend.emails.send({
      from: fromEmail,
      to: [reg.customer_email],
      subject: customerSubject,
      html: customerHtml,
      headers: {
        "X-Entity-Ref-ID": reg.registration_id,
      },
    });

    if (customerRes.error) {
      result.customerStatus = "failed";
      result.errors?.push(`Customer email failed: ${customerRes.error.message}`);
    } else {
      result.customerStatus = "sent";
    }
  } catch (err: unknown) {
    result.customerStatus = "failed";
    const errorMsg = err instanceof Error ? err.message : String(err);
    result.errors?.push(`Customer email error: ${errorMsg}`);
  }

  return result;
}
