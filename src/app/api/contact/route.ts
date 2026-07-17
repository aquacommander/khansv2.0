import { NextResponse } from "next/server";

interface Payload {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  projectType?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Server-side validation (never trust the client).
  const required: (keyof Payload)[] = [
    "firstName",
    "lastName",
    "email",
    "projectType",
    "message",
  ];
  for (const key of required) {
    if (!String(body[key] ?? "").trim()) {
      return NextResponse.json(
        { error: `Missing field: ${key}` },
        { status: 422 },
      );
    }
  }
  if (!EMAIL_RE.test(String(body.email))) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }

  // ---------------------------------------------------------------
  // Production integration points (wire up as needed):
  //   1. Spam protection  — verify a Turnstile/hCaptcha token here
  //   2. Persistence      — store the inquiry (DB / queue)
  //   3. Notification     — email the studio (Resend / Postmark)
  //   4. Confirmation     — auto-reply to the sender
  //   5. CRM              — create a lead (HubSpot / Pipedrive)
  //   6. Analytics        — emit a server-side conversion event
  // For now we log and acknowledge so the flow is end-to-end.
  // ---------------------------------------------------------------
  console.info("[contact] new inquiry", {
    name: `${body.firstName} ${body.lastName}`,
    email: body.email,
    projectType: body.projectType,
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
