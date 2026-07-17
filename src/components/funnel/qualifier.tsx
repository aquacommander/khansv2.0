"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  blockers as blockerOpts,
  budgets,
  buildLeadSubject,
  buildLeadSummary,
  challenges,
  recommendEngagement,
  scoreLead,
  stages,
  timelines,
  type LeadAnswers,
  type Option,
} from "@/content/funnel";
import { getSolution } from "@/content/solutions";
import { site } from "@/content/site";
import { Arrow } from "@/components/ui/primitives";
import { track } from "@/lib/analytics";
import { sendLeadViaWeb3Forms } from "@/lib/web3forms";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

type StepId = "challenge" | "stage" | "blockers" | "timing" | "details";

const STEPS: { id: StepId; title: string; sub: string }[] = [
  { id: "challenge", title: "What are you dealing with?", sub: "Pick the closest fit — we'll get specific later." },
  { id: "stage", title: "Where are you now?", sub: "So we know what already exists." },
  { id: "blockers", title: "What's blocking progress?", sub: "Select any that apply." },
  { id: "timing", title: "Timing & budget", sub: "This tells us how to sequence the work." },
  { id: "details", title: "Where should we reach you?", sub: "We reply within one business day." },
];

const empty: LeadAnswers = {
  challenge: "", stage: "", blockers: [], timeline: "", budget: "",
  success: "", name: "", email: "", company: "", links: "",
};

export function Qualifier() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<LeadAnswers>(empty);
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [result, setResult] = useState<{ recommended: string } | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => { track("funnel_open"); }, []);
  useEffect(() => {
    if (status === "idle") track("funnel_step", { step: step + 1, id: STEPS[step].id });
  }, [step, status]);

  const set = <K extends keyof LeadAnswers>(k: K, v: LeadAnswers[K]) =>
    setA((prev) => ({ ...prev, [k]: v }));

  const toggleBlocker = (v: string) =>
    setA((p) => ({
      ...p,
      blockers: p.blockers.includes(v) ? p.blockers.filter((b) => b !== v) : [...p.blockers, v],
    }));

  const canContinue = () => {
    switch (STEPS[step].id) {
      case "challenge": return !!a.challenge;
      case "stage": return !!a.stage;
      case "blockers": return true; // optional
      case "timing": return !!a.timeline && !!a.budget;
      case "details": return !!a.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email);
    }
  };

  const next = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else void submit();
  };

  async function submit() {
    setStatus("submitting");
    setErr(null);

    const recommended = recommendEngagement(a);
    const score = scoreLead(a);

    try {
      // 1 — Deliver the email to every configured inbox (one send per key).
      //     Web3Forms only accepts browser-side calls, so this is the actual
      //     delivery and we wait on it. ok = at least one inbox received it.
      const sent = await sendLeadViaWeb3Forms({
        subject: buildLeadSubject(a),
        message: buildLeadSummary(a),
        replyTo: a.email,
        name: a.name,
      });
      if (!sent.ok) throw new Error(sent.errors[0] || "Could not send");
      track("funnel_delivered", { sent: sent.sent, total: sent.total });

      // 2 — Record it server-side (scoring + optional CRM). Fire-and-forget:
      //     a CRM hiccup must never cost us the lead.
      void fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(a),
      }).catch(() => {});

      setResult({ recommended });
      setStatus("done");
      track("funnel_submit", {
        priority: score.priority,
        challenge: a.challenge,
        budget: a.budget,
        timeline: a.timeline,
        recommended,
      });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
      setStatus("error");
    }
  }

  /* ---------------- Completion ---------------- */
  if (status === "done" && result) {
    return <Complete recommended={result.recommended} name={a.name} />;
  }

  const current = STEPS[step];
  const pct = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="max-w-3xl">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between label-system mb-3">
          <span className="tabular">
            <span style={{ color: "var(--accent)" }}>{String(step + 1).padStart(2, "0")}</span>
            {" / "}{String(STEPS.length).padStart(2, "0")}
          </span>
          <span>{current.sub}</span>
        </div>
        <div className="h-[3px] w-full rounded-full bg-line overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "var(--accent)" }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -28 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <h2 className="heading-sub mb-8">{current.title}</h2>

          {current.id === "challenge" && (
            <Cards options={challenges} value={a.challenge} onPick={(v) => { set("challenge", v); setTimeout(() => setStep(1), 180); }} />
          )}

          {current.id === "stage" && (
            <Cards options={stages} value={a.stage} onPick={(v) => { set("stage", v); setTimeout(() => setStep(2), 180); }} />
          )}

          {current.id === "blockers" && (
            <div className="flex flex-wrap gap-2.5">
              {blockerOpts.map((o) => {
                const on = a.blockers.includes(o.value);
                return (
                  <button
                    key={o.value}
                    onClick={() => toggleBlocker(o.value)}
                    className={cn(
                      "rounded-full border px-4 py-2.5 text-[0.9rem] font-medium transition-all duration-300",
                      on ? "text-white border-transparent" : "border-line text-ink hover:border-line-strong",
                    )}
                    style={on ? { background: "var(--accent)" } : undefined}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          )}

          {current.id === "timing" && (
            <div className="space-y-9">
              <div>
                <div className="label-system mb-4">How soon do you need it?</div>
                <Chips options={timelines} value={a.timeline} onPick={(v) => set("timeline", v)} />
              </div>
              <div>
                <div className="label-system mb-4">What&apos;s the budget?</div>
                <Chips options={budgets} value={a.budget} onPick={(v) => set("budget", v)} tone="var(--accent-2)" />
              </div>
            </div>
          )}

          {current.id === "details" && (
            <div className="space-y-7">
              <div>
                <label className="label-system mb-3 block">What would success look like?</label>
                <textarea
                  rows={3}
                  value={a.success}
                  onChange={(e) => set("success", e.target.value)}
                  placeholder="What has to be true for this to be worth doing?"
                  className="w-full bg-transparent border-b border-line-strong outline-none py-3 text-lg resize-none focus:border-ink transition-colors placeholder:text-ink-muted"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                <Field label="Name" value={a.name} onChange={(v) => set("name", v)} />
                <Field label="Email" type="email" value={a.email} onChange={(v) => set("email", v)} />
                <Field label="Company" optional value={a.company ?? ""} onChange={(v) => set("company", v)} />
                <Field label="Links (repo, deck, site)" optional value={a.links ?? ""} onChange={(v) => set("links", v)} />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <div className="mt-12 flex items-center gap-4">
        {step > 0 && (
          <button onClick={() => setStep((s) => s - 1)} className="btn py-2.5 px-4" disabled={status === "submitting"}>
            Back
          </button>
        )}
        <button
          onClick={next}
          disabled={!canContinue() || status === "submitting"}
          className={cn("btn btn--accent", (!canContinue() || status === "submitting") && "opacity-40 pointer-events-none")}
        >
          {status === "submitting" ? "Sending…" : step === STEPS.length - 1 ? "Send it over" : "Continue"}
          <Arrow />
        </button>
        {current.id === "blockers" && a.blockers.length === 0 && (
          <span className="label-system">Optional — skip if unsure</span>
        )}
      </div>

      {status === "error" && (
        <p className="mt-5 label-system" style={{ color: "var(--accent)" }}>
          {err} — or email us directly at {site.email}
        </p>
      )}
    </div>
  );
}

/* ---------------- Pieces ---------------- */

function Cards({ options, value, onPick }: { options: Option[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((o) => {
        const on = value === o.value;
        return (
          <button
            key={o.value}
            onClick={() => onPick(o.value)}
            className={cn(
              "zoom-in text-left rounded-xl border p-5 transition-all duration-300",
              on ? "border-transparent bg-surface" : "border-line hover:bg-surface",
            )}
            style={on ? { boxShadow: "inset 0 0 0 2px var(--accent)" } : undefined}
          >
            <div className="font-semibold tracking-[-0.02em] mb-1">{o.label}</div>
            {o.hint && <div className="text-ink-muted text-[0.82rem] leading-snug">{o.hint}</div>}
          </button>
        );
      })}
    </div>
  );
}

function Chips({ options, value, onPick, tone = "var(--accent)" }: { options: Option[]; value: string; onPick: (v: string) => void; tone?: string }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((o) => {
        const on = value === o.value;
        return (
          <button
            key={o.value}
            onClick={() => onPick(o.value)}
            className={cn(
              "rounded-full border px-4 py-2.5 text-[0.9rem] font-medium transition-all duration-300",
              on ? "text-white border-transparent" : "border-line text-ink hover:border-line-strong",
            )}
            style={on ? { background: tone } : undefined}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Field({ label, value, onChange, type = "text", optional }: { label: string; value: string; onChange: (v: string) => void; type?: string; optional?: boolean }) {
  return (
    <div>
      <label className="label-system mb-3 block">
        {label} {optional && <span className="text-ink-muted">(optional)</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-b border-line-strong outline-none py-3 text-lg focus:border-ink transition-colors"
      />
    </div>
  );
}

/* ---------------- Completion state ---------------- */

function Complete({ recommended, name }: { recommended: string; name: string }) {
  const s = getSolution(recommended);
  const steps = [
    "We read your answers and check them against what we've built before.",
    "You get a reply within one business day — from an engineer, not a bot.",
    "If it's a fit, we scope the engagement below and send a fixed plan.",
  ];
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="max-w-3xl">
      <div className="label-system mb-5 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full pulse-dot" style={{ background: "var(--status)" }} />
        Received
      </div>
      <h2 className="heading-section mb-6">Thanks, {name.split(" ")[0] || "there"}.</h2>
      <p className="body-large max-w-xl mb-12">
        Your answers are with us. Based on what you described, here&apos;s where we&apos;d suggest starting.
      </p>

      {/* Recommended engagement */}
      {s && (
        <Link
          href={`/solutions/${s.slug}`}
          className="zoom-in accent-bar group block rounded-2xl border border-line p-7 md:p-9 bg-surface/60 mb-12"
          style={{ ["--bar" as string]: "var(--accent)" }}
        >
          <div className="label-system mb-3" style={{ color: "var(--accent)" }}>
            Recommended · {s.type} · {s.duration}
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] mb-3">{s.title}</h3>
          <p className="body-large text-[1rem] mb-5">{s.outcome}</p>
          <span className="inline-flex items-center gap-2 label-system text-ink">
            View this engagement
            <Arrow className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </Link>
      )}

      {/* What happens next */}
      <div className="label-system mb-6">What happens next</div>
      <ol className="border-t border-line mb-12">
        {steps.map((t, i) => (
          <li key={i} className="flex gap-5 border-b border-line py-5">
            <span className="font-mono text-xs pt-1" style={{ color: "var(--accent)" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="body-large text-[1rem] text-ink">{t}</span>
          </li>
        ))}
      </ol>

      <div className="flex flex-wrap items-center gap-4">
        <Link href="/work" className="btn">Meanwhile, see our work <Arrow /></Link>
        <a href={`mailto:${site.email}`} className="label-system link-underline">
          Or email {site.email}
        </a>
      </div>
    </motion.div>
  );
}
