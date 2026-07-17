/**
 * The Khanstruct qualifier funnel.
 *
 * Replaces the "contact us" black hole: instead of a blank message box we
 * interview the visitor, score them, and recommend the engagement that fits.
 * Questions live here as data — add/reorder without touching the component.
 */

import { getSolution } from "./solutions";

export interface Option {
  value: string;
  label: string;
  hint?: string;
  /** Only used by the scored steps (timeline / budget). */
  weight?: number;
}

/* ---------------- Step 1 — what are you dealing with? ---------------- */
export const challenges: Option[] = [
  { value: "product", label: "A product to build", hint: "An app, platform, or SaaS that doesn't exist yet" },
  { value: "workflow", label: "A workflow to improve", hint: "Manual, repetitive work that should be automated" },
  { value: "data", label: "Disconnected data & systems", hint: "Numbers you can't trust or tools that don't talk" },
  { value: "ai", label: "An AI opportunity", hint: "You think AI applies — you want it done properly" },
  { value: "direction", label: "Unclear technical direction", hint: "You need a senior read before committing" },
];

/* ---------------- Step 2 — where are you now? ---------------- */
export const stages: Option[] = [
  { value: "exploring", label: "Just exploring" },
  { value: "requirements", label: "Requirements defined" },
  { value: "prototype", label: "A prototype exists" },
  { value: "building", label: "Already in development" },
  { value: "live", label: "Live system in production" },
];

/* ---------------- Step 3 — what's blocking progress? ---------------- */
export const blockers: Option[] = [
  { value: "direction", label: "Unclear direction" },
  { value: "complexity", label: "Technical complexity" },
  { value: "capacity", label: "No internal capacity" },
  { value: "ux", label: "Poor UX" },
  { value: "data", label: "Data fragmentation" },
  { value: "integration", label: "Integration problems" },
  { value: "scale", label: "Reliability & scale" },
  { value: "security", label: "Security & compliance" },
];

/* ---------------- Step 4 — timing & budget (the scored step) ---------------- */
export const timelines: Option[] = [
  { value: "now", label: "Right now", weight: 3 },
  { value: "2weeks", label: "Within 2 weeks", weight: 2 },
  { value: "1-2months", label: "In 1–2 months", weight: 1 },
  { value: "exploring", label: "Just exploring", weight: 0 },
];

export const budgets: Option[] = [
  { value: "15k+", label: "$15k+", weight: 3 },
  { value: "5-15k", label: "$5k – $15k", weight: 2 },
  { value: "1-5k", label: "$1k – $5k", weight: 1 },
  { value: "under1k", label: "Under $1k", weight: 0 },
];

/* ---------------- Answers ---------------- */
export interface LeadAnswers {
  challenge: string;
  stage: string;
  blockers: string[];
  timeline: string;
  budget: string;
  success: string;
  name: string;
  email: string;
  company?: string;
  links?: string;
}

/* ---------------- Scoring — the activity check ---------------- */
export type Priority = "hot" | "warm" | "cold";

export const PRIORITY_META: Record<Priority, { label: string; marker: string }> = {
  hot: { label: "High priority", marker: "🔴" },
  warm: { label: "Warm lead", marker: "🟡" },
  cold: { label: "Exploratory", marker: "🔵" },
};

const weightOf = (opts: Option[], value: string) =>
  opts.find((o) => o.value === value)?.weight ?? 0;

export function scoreLead(a: Pick<LeadAnswers, "timeline" | "budget">) {
  const score = weightOf(timelines, a.timeline) + weightOf(budgets, a.budget);
  const priority: Priority = score >= 5 ? "hot" : score >= 3 ? "warm" : "cold";
  return { score, max: 6, priority, ...PRIORITY_META[priority] };
}

/* ---------------- Recommendation — map answers to a real engagement ----------------
   Returns a slug from content/solutions.ts so the visitor is told how to start. */
export function recommendEngagement(
  a: Pick<LeadAnswers, "challenge" | "stage" | "blockers">,
): string {
  const has = (b: string) => a.blockers.includes(b);

  // Security is a strong, specific signal.
  if (has("security") && (a.challenge === "workflow" || a.challenge === "data" || a.challenge === "product")) {
    return "secure-portal-starter";
  }

  switch (a.challenge) {
    case "direction":
      return "architecture-review";
    case "ai":
      if (a.stage === "exploring") return "ai-readiness-assessment";
      if (has("data")) return "rag-knowledge-base-starter";
      return "ai-opportunity-sprint";
    case "workflow":
      return "workflow-automation-sprint";
    case "data":
      return "dashboard-starter";
    case "product":
      if (a.stage === "exploring" || a.stage === "requirements") return "saas-mvp-sprint";
      return "architecture-review";
    default:
      return "ai-opportunity-sprint";
  }
}

/* ---------------- Human-readable label helpers ---------------- */
const labelOf = (opts: Option[], value: string) =>
  opts.find((o) => o.value === value)?.label ?? value;

export const labels = {
  challenge: (v: string) => labelOf(challenges, v),
  stage: (v: string) => labelOf(stages, v),
  timeline: (v: string) => labelOf(timelines, v),
  budget: (v: string) => labelOf(budgets, v),
  blockers: (vs: string[]) => vs.map((v) => labelOf(blockers, v)).join(", ") || "—",
};

/* ---------------- The email the studio receives ---------------- */
export function buildLeadSummary(a: LeadAnswers) {
  const s = scoreLead(a);
  const rec = recommendEngagement(a);
  const solution = getSolution(rec);

  return [
    `${s.marker} Priority: ${s.label} (score ${s.score}/${s.max})`,
    `Recommended: ${solution?.title ?? rec} (${solution?.duration ?? "—"})`,
    ``,
    `Dealing with: ${labels.challenge(a.challenge)}`,
    `Stage:        ${labels.stage(a.stage)}`,
    `Blocked by:   ${labels.blockers(a.blockers)}`,
    `Timeline:     ${labels.timeline(a.timeline)}`,
    `Budget:       ${labels.budget(a.budget)}`,
    ``,
    `Success looks like:`,
    a.success || "—",
    ``,
    `Name:    ${a.name}`,
    `Email:   ${a.email}`,
    `Company: ${a.company || "—"}`,
    `Links:   ${a.links || "—"}`,
  ].join("\n");
}

export function buildLeadSubject(a: LeadAnswers) {
  const s = scoreLead(a);
  return `${s.marker} ${s.label} — ${labels.challenge(a.challenge)} — ${a.name}`;
}
