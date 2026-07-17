import { site } from "@/content/site";

/**
 * Server-side lead record / backup delivery.
 *
 * NOTE: the primary email delivery happens in the BROWSER via Web3Forms
 * (see lib/web3forms.ts) because their free plan rejects server-to-server
 * calls. This path is a belt-and-braces backup:
 *
 *   1. RESEND_API_KEY set → also send server-side via Resend
 *   2. otherwise          → log the lead so it is never lost
 */

export const LEAD_INBOX = process.env.LEAD_INBOX || site.email; // zain@thekhanstruct.com

export type DeliveryResult = { delivered: boolean; via: string; error?: string };

export async function sendLeadEmail({
  subject,
  body,
  replyTo,
}: {
  subject: string;
  body: string;
  replyTo?: string;
}): Promise<DeliveryResult> {
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.LEAD_FROM || "Khanstruct <onboarding@resend.dev>",
          to: [LEAD_INBOX],
          subject,
          text: body,
          ...(replyTo ? { reply_to: replyTo } : {}),
        }),
      });
      if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
      return { delivered: true, via: "resend" };
    } catch (err) {
      console.error("[lead] resend failed", err);
      return { delivered: false, via: "resend", error: String(err) };
    }
  }

  // Web3Forms already emailed this from the browser — log a server copy.
  console.info(`\n[lead] ${subject}\n${body}\n`);
  return { delivered: false, via: "log" };
}
