import { NextResponse } from "next/server";
import {
  buildLeadSubject,
  buildLeadSummary,
  recommendEngagement,
  scoreLead,
  type LeadAnswers,
} from "@/content/funnel";
import { sendLeadEmail } from "@/lib/lead-email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Partial<LeadAnswers>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Server-side validation — never trust the client.
  const required: (keyof LeadAnswers)[] = [
    "challenge",
    "stage",
    "timeline",
    "budget",
    "name",
    "email",
  ];
  for (const key of required) {
    if (!String(body[key] ?? "").trim()) {
      return NextResponse.json({ error: `Missing field: ${key}` }, { status: 422 });
    }
  }
  if (!EMAIL_RE.test(String(body.email))) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }

  const answers: LeadAnswers = {
    challenge: String(body.challenge),
    stage: String(body.stage),
    blockers: Array.isArray(body.blockers) ? body.blockers.map(String) : [],
    timeline: String(body.timeline),
    budget: String(body.budget),
    success: String(body.success ?? ""),
    name: String(body.name),
    email: String(body.email),
    company: body.company ? String(body.company) : "",
    links: body.links ? String(body.links) : "",
  };

  // Score + recommend on the server so the result can't be spoofed.
  const score = scoreLead(answers);
  const recommended = recommendEngagement(answers);

  const delivery = await sendLeadEmail({
    subject: buildLeadSubject(answers),
    body: buildLeadSummary(answers),
    replyTo: answers.email,
  });

  // ---------------------------------------------------------------
  // Optional CRM write (Notion) — fire-and-forget so it never blocks
  // the visitor. Enable by setting NOTION_TOKEN + NOTION_DB_ID.
  // ---------------------------------------------------------------
  if (process.env.NOTION_TOKEN && process.env.NOTION_DB_ID) {
    void writeToNotion(answers, score.label, recommended).catch((e) =>
      console.error("[lead] notion write failed", e),
    );
  }

  return NextResponse.json(
    { ok: true, recommended, priority: score.priority, delivered: delivery.delivered },
    { status: 200 },
  );
}

async function writeToNotion(a: LeadAnswers, priority: string, recommended: string) {
  await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: process.env.NOTION_DB_ID },
      properties: {
        Name: { title: [{ text: { content: a.name } }] },
        Email: { email: a.email },
        Company: { rich_text: [{ text: { content: a.company || "" } }] },
        Priority: { select: { name: priority } },
        Recommended: { rich_text: [{ text: { content: recommended } }] },
        Timeline: { rich_text: [{ text: { content: a.timeline } }] },
        Budget: { rich_text: [{ text: { content: a.budget } }] },
      },
    }),
  });
}
