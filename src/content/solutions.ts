export interface Solution {
  slug: string;
  type: "Sprint" | "Starter" | "Assessment";
  duration: string;
  title: string;
  outcome: string;
  description: string;
  deliverables: string[];
  idealFor: string[];
  priceLabel?: string;
}

export const solutions: Solution[] = [
  {
    slug: "ai-opportunity-sprint",
    type: "Sprint",
    duration: "2 weeks",
    title: "AI Opportunity Sprint",
    outcome: "A ranked, costed roadmap of where AI actually pays off.",
    description:
      "We interview your team, audit your workflows and data, and return a prioritized set of AI opportunities with feasibility, risk, and expected impact — plus a working proof-of-concept for the top candidate.",
    deliverables: [
      "Opportunity map with impact/effort scoring",
      "Data & readiness assessment",
      "One working proof-of-concept",
      "Sequenced 90-day build plan",
    ],
    idealFor: ["Teams exploring AI", "Operations leaders", "Founders scoping v1"],
    priceLabel: "Fixed scope",
  },
  {
    slug: "saas-mvp-sprint",
    type: "Sprint",
    duration: "6 weeks",
    title: "SaaS MVP Sprint",
    outcome: "A shippable, sellable first version of your product.",
    description:
      "From architecture to auth, billing, and a polished front end — a focused MVP built to real engineering standards so it can carry your first paying customers, not just a demo.",
    deliverables: [
      "Product architecture & data model",
      "Auth, billing, and core flows",
      "Deployed staging + production",
      "Handover docs & runbook",
    ],
    idealFor: ["Funded founders", "Product teams", "Internal ventures"],
    priceLabel: "Fixed scope",
  },
  {
    slug: "workflow-automation-sprint",
    type: "Sprint",
    duration: "3 weeks",
    title: "Workflow Automation Sprint",
    outcome: "One painful manual process, fully automated.",
    description:
      "We take a high-friction operational workflow — data entry, routing, reconciliation — and replace it with an observable, retrying automation your team can trust.",
    deliverables: [
      "Process map & integration plan",
      "Production automation with retries",
      "Observability & alerting",
      "Team training session",
    ],
    idealFor: ["Ops-heavy teams", "Agencies", "Back-office functions"],
    priceLabel: "Fixed scope",
  },
  {
    slug: "secure-portal-starter",
    type: "Starter",
    duration: "4 weeks",
    title: "Secure Portal Starter",
    outcome: "A branded, secure client portal you can launch.",
    description:
      "Per-client workspaces, secure document exchange, and a full audit log — white-labeled to your brand and ready to onboard real clients.",
    deliverables: [
      "Multi-tenant portal foundation",
      "Document sharing + audit log",
      "White-label theming",
      "Deployment & handover",
    ],
    idealFor: ["Professional services", "Agencies", "Finance & legal teams"],
    priceLabel: "Starter package",
  },
  {
    slug: "rag-knowledge-base-starter",
    type: "Starter",
    duration: "4 weeks",
    title: "RAG Knowledge Base Starter",
    outcome: "Grounded answers over your own documents.",
    description:
      "A retrieval system that answers questions from your knowledge base with citations, freshness controls, and evaluation so you can trust what it says.",
    deliverables: [
      "Document ingestion pipeline",
      "Grounded, cited answering",
      "Evaluation harness",
      "Embeddable chat surface",
    ],
    idealFor: ["Support teams", "Knowledge-heavy orgs", "Internal enablement"],
    priceLabel: "Starter package",
  },
  {
    slug: "dashboard-starter",
    type: "Starter",
    duration: "3 weeks",
    title: "Dashboard Starter",
    outcome: "One reliable place to see the numbers that matter.",
    description:
      "We wire your operational data into a fast, self-serve dashboard with a trustworthy data model underneath — no more copy-pasting spreadsheets.",
    deliverables: [
      "Data model & pipeline",
      "Core dashboards",
      "Access control",
      "Refresh & monitoring",
    ],
    idealFor: ["Leadership teams", "Operators", "Client reporting"],
    priceLabel: "Starter package",
  },
  {
    slug: "ai-readiness-assessment",
    type: "Assessment",
    duration: "1 week",
    title: "AI Readiness Assessment",
    outcome: "An honest read on whether you're ready to build.",
    description:
      "A structured review of your data, tooling, and processes against what production AI actually requires — with a clear go / not-yet recommendation.",
    deliverables: [
      "Readiness scorecard",
      "Risk & gap analysis",
      "Prioritized recommendations",
      "Executive summary",
    ],
    idealFor: ["Leadership", "Teams pre-investment", "Risk & compliance"],
    priceLabel: "Fixed fee",
  },
  {
    slug: "architecture-review",
    type: "Assessment",
    duration: "1 week",
    title: "Software Architecture Review",
    outcome: "A clear-eyed map of your system's risks and next moves.",
    description:
      "Senior review of your codebase and infrastructure — scalability, security, and maintainability — delivered as prioritized, actionable findings.",
    deliverables: [
      "Architecture assessment",
      "Risk register",
      "Prioritized remediation plan",
      "Technical walkthrough",
    ],
    idealFor: ["Scaling teams", "Post-acquisition", "Pre-fundraise diligence"],
    priceLabel: "Fixed fee",
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
