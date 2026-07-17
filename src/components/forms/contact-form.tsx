"use client";

import { useState } from "react";
import { Arrow } from "@/components/ui/primitives";

const PROJECT_TYPES = [
  "LLM & agents",
  "RAG / knowledge base",
  "Computer vision",
  "Automation",
  "SaaS product",
  "Data & reporting",
  "Strategy / assessment",
  "Other",
];

type Status = "idle" | "submitting" | "success" | "error";

interface Errors {
  [key: string]: string;
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  function validate(data: FormData): Errors {
    const e: Errors = {};
    const req = (k: string, label: string) => {
      if (!String(data.get(k) ?? "").trim()) e[k] = `${label} is required.`;
    };
    req("firstName", "First name");
    req("lastName", "Last name");
    req("email", "Email");
    req("projectType", "Project type");
    req("message", "Project description");
    const email = String(data.get("email") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email address.";
    return e;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line p-10 md:p-14">
        <div className="label-system mb-6 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--status)" }} />
          Message received
        </div>
        <h3 className="heading-sub mb-4">Thanks — we&apos;ve got it.</h3>
        <p className="body-large max-w-md">
          We read every inquiry and reply within one business day. If it&apos;s
          urgent, email us directly and mention it in the subject line.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Field name="firstName" label="First name" error={errors.firstName} />
        <Field name="lastName" label="Last name" error={errors.lastName} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Field name="email" label="Email" type="email" error={errors.email} />
        <Field name="company" label="Company" optional />
      </div>

      <div>
        <label className="label-system mb-4 block">Project type</label>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((t) => (
            <label key={t} className="cursor-pointer">
              <input type="radio" name="projectType" value={t} className="peer sr-only" />
              <span className="label-system border border-line rounded-full px-4 py-2 inline-block transition-colors peer-checked:bg-ink peer-checked:text-canvas peer-checked:border-ink">
                {t}
              </span>
            </label>
          ))}
        </div>
        {errors.projectType && <p className="mt-2 label-system text-status">{errors.projectType}</p>}
      </div>

      <div>
        <label htmlFor="message" className="label-system mb-3 block">
          Project description
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="What are you building, what have you tried, and what's blocking you?"
          className="w-full bg-transparent border-b border-line-strong outline-none py-3 text-lg resize-none focus:border-ink transition-colors placeholder:text-ink-muted"
        />
        {errors.message && <p className="mt-2 label-system text-status">{errors.message}</p>}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
        <button type="submit" className="btn btn--solid" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send inquiry"}
          <Arrow />
        </button>
        <span className="label-system">Response within one business day</span>
      </div>
      {status === "error" && (
        <p className="label-system text-status">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  optional,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  optional?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="label-system mb-3 block">
        {label} {optional && <span className="text-ink-muted">(optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="w-full bg-transparent border-b border-line-strong outline-none py-3 text-lg focus:border-ink transition-colors"
      />
      {error && <p className="mt-2 label-system text-status">{error}</p>}
    </div>
  );
}
