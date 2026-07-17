export interface StackGroup {
  label: string;
  tools: string[];
}

export const techStack: StackGroup[] = [
  {
    label: "AI",
    tools: ["OpenAI", "Anthropic", "Llama", "LangGraph", "pgvector", "Modal", "Weights & Biases"],
  },
  {
    label: "Frontend",
    tools: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Astro"],
  },
  {
    label: "Backend",
    tools: ["Node.js", "Go", "Python", "Rust", "FastAPI", "tRPC"],
  },
  {
    label: "Data",
    tools: ["PostgreSQL", "Snowflake", "BigQuery", "dbt", "Redis", "ClickHouse"],
  },
  {
    label: "Infrastructure",
    tools: ["AWS", "GCP", "Docker", "Terraform", "Vercel", "GitHub Actions"],
  },
  {
    label: "Auth & Billing",
    tools: ["Stripe", "Auth0", "WorkOS", "Clerk"],
  },
];

export const heroMetrics = [
  { value: "40+", label: "Systems shipped to production" },
  { value: "99.9%", label: "Median production uptime" },
  { value: "100%", label: "Senior engineering review" },
];
