/**
 * Web3Forms delivery — runs in the BROWSER.
 *
 * Web3Forms' free plan rejects server-to-server calls ("use our API in client
 * side"), so the funnel submits directly from the visitor's browser. Access keys
 * are public by design: a key only permits submitting to your own form, so
 * exposing it via NEXT_PUBLIC_ is expected and safe.
 *
 * MULTI-INBOX: a Web3Forms key is bound to exactly one receiving inbox, so to
 * reach several people we submit once per key — one email per key, in parallel.
 * Add as many NEXT_PUBLIC_WEB3FORMS_KEY_N as you need.
 */

const ENDPOINT = "https://api.web3forms.com/submit";

/** Every configured key, in priority order. Empty/missing ones are dropped. */
export const WEB3FORMS_KEYS: string[] = [
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY_2,
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY_3,
]
  .map((k) => (k ?? "").trim())
  .filter(Boolean);

export interface LeadPayload {
  subject: string;
  message: string;
  replyTo: string;
  name: string;
}

export interface DeliveryReport {
  /** True when at least one inbox received it. */
  ok: boolean;
  sent: number;
  total: number;
  errors: string[];
}

async function submitToKey(key: string, p: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: p.subject,
        from_name: `Khanstruct — ${p.name}`,
        name: p.name,
        email: p.replyTo,
        message: p.message,
        botcheck: "", // honeypot — must stay empty
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data?.success === false) {
      return { ok: false, error: data?.message || `Web3Forms ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Network error" };
  }
}

/**
 * Sends the lead to every configured inbox. Resolves ok:true if ANY inbox
 * received it — one misconfigured key must never cost us the lead.
 */
export async function sendLeadViaWeb3Forms(p: LeadPayload): Promise<DeliveryReport> {
  const keys = WEB3FORMS_KEYS;
  if (keys.length === 0) {
    return { ok: false, sent: 0, total: 0, errors: ["No Web3Forms key configured"] };
  }

  const results = await Promise.all(keys.map((k) => submitToKey(k, p)));
  const sent = results.filter((r) => r.ok).length;
  const errors = results.filter((r) => !r.ok).map((r) => r.error ?? "Unknown error");

  // Surface partial failures so a silently-dead inbox gets noticed.
  if (errors.length) console.warn("[web3forms] some inboxes failed:", errors);

  return { ok: sent > 0, sent, total: keys.length, errors };
}
