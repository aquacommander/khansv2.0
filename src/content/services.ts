export interface Service {
  slug: string;
  title: string;
  description: string;
}

export interface ServiceCategory {
  slug: string;
  index: string;
  title: string;
  positioning: string;
  description: string;
  services: Service[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "ai-and-automation",
    index: "01",
    title: "AI & Automation",
    positioning: "Production AI systems, not experiments.",
    description:
      "We build language, retrieval, and agentic systems that run in production with evaluation, monitoring, and human oversight — engineered to survive contact with real data and real users.",
    services: [
      { slug: "ai-agents", title: "AI Agents & Copilots", description: "Task-scoped agents with tool access, guardrails, and human-in-the-loop review." },
      { slug: "rag-knowledge-bases", title: "RAG Knowledge Bases", description: "Grounded retrieval over your documents with citations and freshness controls." },
      { slug: "document-ai", title: "Document AI", description: "Extract structured, cited data from contracts, invoices, and forms." },
      { slug: "workflow-automation", title: "Workflow Automation", description: "Trigger-driven pipelines that connect systems and retry on failure." },
      { slug: "model-fine-tuning", title: "Model Fine-Tuning", description: "Adapt open and hosted models to your domain with measured lift." },
      { slug: "llm-evaluation", title: "LLM Evaluation Suites", description: "Offline and online eval harnesses that gate every model change." },
      { slug: "computer-vision", title: "Computer Vision", description: "Detection, classification, and OCR pipelines for real-world imagery." },
      { slug: "conversational-interfaces", title: "Conversational Interfaces", description: "Chat and voice surfaces wired to your data and actions." },
      { slug: "ai-strategy", title: "AI Strategy & Readiness", description: "Opportunity mapping, risk framing, and a sequenced build plan." },
    ],
  },
  {
    slug: "saas-and-product",
    index: "02",
    title: "SaaS & Product Development",
    positioning: "From first commit to paying customers.",
    description:
      "End-to-end product engineering for founders and teams — architecture, multi-tenancy, billing, and the unglamorous plumbing that makes software sellable.",
    services: [
      { slug: "mvp-development", title: "MVP Development", description: "A focused, shippable first version in weeks, not quarters." },
      { slug: "multi-tenant-architecture", title: "Multi-Tenant Architecture", description: "Isolation, roles, and per-tenant configuration done right." },
      { slug: "billing-and-subscriptions", title: "Billing & Subscriptions", description: "Metered and seat-based billing with Stripe, dunning, and invoicing." },
      { slug: "admin-consoles", title: "Admin & Ops Consoles", description: "Internal tooling your team actually wants to use." },
      { slug: "feature-development", title: "Feature Development", description: "Sprint-based delivery against a live roadmap." },
      { slug: "product-refactors", title: "Product Refactors", description: "Rescue and re-architect codebases that have stopped scaling." },
      { slug: "onboarding-flows", title: "Onboarding & Activation", description: "Flows that turn signups into activated, retained users." },
    ],
  },
  {
    slug: "web-and-mobile",
    index: "03",
    title: "Web & Mobile Applications",
    positioning: "Interfaces engineered like products.",
    description:
      "High-craft web and mobile front ends with real performance budgets, accessibility, and motion that serves the content rather than distracting from it.",
    services: [
      { slug: "marketing-sites", title: "Marketing Sites", description: "Editorial, fast, measurable sites that convert." },
      { slug: "web-applications", title: "Web Applications", description: "Complex app front ends with robust state and data flows." },
      { slug: "mobile-apps", title: "Mobile Applications", description: "React Native and native builds for iOS and Android." },
      { slug: "design-systems", title: "Design Systems", description: "Token-driven component libraries your team can extend." },
      { slug: "performance-optimization", title: "Performance Optimization", description: "Core Web Vitals work with real user monitoring." },
      { slug: "accessibility", title: "Accessibility Engineering", description: "WCAG-aligned interfaces validated with real assistive tech." },
    ],
  },
  {
    slug: "business-systems",
    index: "04",
    title: "Business Systems & Portals",
    positioning: "The systems that run the business.",
    description:
      "Client portals, internal platforms, and back-office systems that replace spreadsheets, email chains, and manual handoffs with auditable software.",
    services: [
      { slug: "client-portals", title: "Client Portals", description: "Per-client workspaces with secure document exchange and audit logs." },
      { slug: "crm-and-erp", title: "CRM & ERP Extensions", description: "Custom workflows on top of the systems you already run." },
      { slug: "internal-tools", title: "Internal Tools", description: "Operational tooling built around how your team actually works." },
      { slug: "approval-workflows", title: "Approval Workflows", description: "Routing, sign-off, and audit trails for regulated processes." },
      { slug: "scheduling-systems", title: "Scheduling & Booking", description: "Availability, resources, and reminders in one system." },
      { slug: "reporting-portals", title: "Reporting Portals", description: "Self-serve dashboards for clients and stakeholders." },
    ],
  },
  {
    slug: "api-and-integration",
    index: "05",
    title: "API & System Integration",
    positioning: "Making your systems talk.",
    description:
      "APIs, webhooks, and integration layers that connect the tools your business depends on — with retries, idempotency, and observability built in.",
    services: [
      { slug: "api-design", title: "API Design & Build", description: "REST and GraphQL APIs designed for longevity." },
      { slug: "third-party-integrations", title: "Third-Party Integrations", description: "Connect payment, comms, and vendor systems reliably." },
      { slug: "webhooks-and-events", title: "Webhooks & Events", description: "Event-driven integrations with delivery guarantees." },
      { slug: "data-sync", title: "Data Synchronization", description: "Bi-directional sync with conflict resolution." },
      { slug: "legacy-integration", title: "Legacy Integration", description: "Wrap and modernize systems you can't replace yet." },
      { slug: "middleware", title: "Middleware & Gateways", description: "Auth, rate limiting, and routing between services." },
    ],
  },
  {
    slug: "data-and-reporting",
    index: "06",
    title: "Data Engineering & Reporting",
    positioning: "Decisions grounded in trustworthy data.",
    description:
      "Pipelines, warehouses, and reporting layers that turn scattered operational data into a single, reliable source of truth.",
    services: [
      { slug: "data-pipelines", title: "Data Pipelines", description: "Ingestion and transformation that runs on schedule and self-heals." },
      { slug: "warehousing", title: "Warehousing & Modeling", description: "Dimensional models on Postgres, Snowflake, or BigQuery." },
      { slug: "dashboards", title: "Dashboards & BI", description: "Decision-ready reporting for operators and leadership." },
      { slug: "etl-elt", title: "ETL / ELT", description: "Reliable extract-load-transform with lineage and tests." },
      { slug: "data-quality", title: "Data Quality & Observability", description: "Freshness, volume, and schema checks that page you early." },
      { slug: "analytics-instrumentation", title: "Analytics Instrumentation", description: "Event tracking designed around real questions." },
    ],
  },
  {
    slug: "cloud-and-devops",
    index: "07",
    title: "Cloud, DevOps & Infrastructure",
    positioning: "Infrastructure that stays boring.",
    description:
      "Cloud architecture, CI/CD, and infrastructure-as-code that make deploys uneventful and outages rare — and recoverable when they aren't.",
    services: [
      { slug: "cloud-architecture", title: "Cloud Architecture", description: "Right-sized AWS and GCP foundations, not over-engineered ones." },
      { slug: "ci-cd", title: "CI/CD Pipelines", description: "Automated build, test, and deploy on every change." },
      { slug: "infrastructure-as-code", title: "Infrastructure as Code", description: "Terraform-managed, reviewable, reproducible infrastructure." },
      { slug: "containerization", title: "Containerization", description: "Docker and orchestration tuned for your workloads." },
      { slug: "observability", title: "Observability", description: "Metrics, logs, traces, and alerts that mean something." },
      { slug: "cost-optimization", title: "Cloud Cost Optimization", description: "Cut spend without cutting reliability." },
    ],
  },
  {
    slug: "security-engineering",
    index: "08",
    title: "Security Engineering",
    positioning: "Security as an engineering discipline.",
    description:
      "Authentication, authorization, and hardening built into the system — plus reviews and threat modeling that catch issues before they ship.",
    services: [
      { slug: "auth-and-identity", title: "Auth & Identity", description: "SSO, MFA, and fine-grained access control." },
      { slug: "security-reviews", title: "Security Reviews", description: "Code and architecture reviews against real threat models." },
      { slug: "compliance-readiness", title: "Compliance Readiness", description: "SOC 2 and privacy groundwork built into the codebase." },
      { slug: "secrets-management", title: "Secrets Management", description: "Vaulted secrets, rotation, and least-privilege access." },
      { slug: "penetration-support", title: "Pen-Test Remediation", description: "Turn findings into prioritized, verified fixes." },
    ],
  },
  {
    slug: "design",
    index: "09",
    title: "UI/UX & Product Design",
    positioning: "Design that engineers can build.",
    description:
      "Interface and product design grounded in the constraints of real systems — research, information design, and interaction that ships as written.",
    services: [
      { slug: "product-design", title: "Product Design", description: "Flows, wireframes, and interaction design end to end." },
      { slug: "ui-design", title: "UI Design", description: "High-fidelity interfaces built on a real token system." },
      { slug: "ux-research", title: "UX Research", description: "Interviews and testing that de-risk what you build next." },
      { slug: "brand-systems", title: "Brand & Identity", description: "Visual systems that scale across product and marketing." },
      { slug: "prototyping", title: "Prototyping", description: "Interactive prototypes to validate before you build." },
    ],
  },
  {
    slug: "maintenance-and-growth",
    index: "10",
    title: "Maintenance & Growth",
    positioning: "Software is never finished.",
    description:
      "Ongoing engineering, monitoring, and iteration that keep systems healthy and moving forward after launch.",
    services: [
      { slug: "support-retainers", title: "Support Retainers", description: "Reserved senior engineering capacity every month." },
      { slug: "monitoring", title: "Monitoring & On-Call", description: "Proactive alerting and incident response." },
      { slug: "iterative-improvement", title: "Iterative Improvement", description: "Continuous, measured improvement against your goals." },
      { slug: "dependency-upgrades", title: "Upgrades & Migrations", description: "Keep platforms current and secure without downtime." },
      { slug: "seo-and-growth", title: "SEO & Growth Engineering", description: "Technical growth work grounded in measurement." },
    ],
  },
];

export const totalServiceCount = serviceCategories.reduce(
  (n, c) => n + c.services.length,
  0,
);

export function getCategory(slug: string) {
  return serviceCategories.find((c) => c.slug === slug);
}

export function getService(categorySlug: string, serviceSlug: string) {
  const category = getCategory(categorySlug);
  const service = category?.services.find((s) => s.slug === serviceSlug);
  return service ? { category, service } : null;
}
