export interface Capability {
  index: string;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Demo {
  slug: string;
  category: string;
  name: string;
  headline: string;
  intro: string;
  tags: string[];
  positioning: string;
  idea: { heading: string; paragraphs: string[] };
  capabilities: Capability[];
  workflow: string[];
  trust: { heading: string; body: string };
  useCases: string[];
  faqs: FAQ[];
}

export const demos: Demo[] = [
  {
    slug: "ai-document-assistant",
    category: "AI & Automation",
    name: "AI Document Assistant",
    headline: "Turn contracts and invoices into structured, cited data.",
    intro:
      "Upload a stack of documents and get back clean, structured fields — every value linked to where it came from, with uncertain values flagged for human review.",
    tags: ["Extraction", "Citations", "Human review", "Export"],
    positioning: "Stop retyping PDFs. Start trusting the output.",
    idea: {
      heading: "The idea",
      paragraphs: [
        "Somewhere in your business, a person is retyping numbers from PDFs into a spreadsheet. It's slow, it's error-prone, and it doesn't scale.",
        "The AI Document Assistant reads contracts, invoices, and forms, extracts the fields you care about, and cites the exact place each value came from — so you can verify in seconds instead of re-reading pages.",
      ],
    },
    capabilities: [
      { index: "01", title: "Structured extraction", description: "Pull named fields from messy documents into a clean schema." },
      { index: "02", title: "Source citations", description: "Every value links back to the page and location it came from." },
      { index: "03", title: "Confidence flags", description: "Uncertain values are surfaced for human review, not silently guessed." },
      { index: "04", title: "One-click export", description: "Send verified data to your spreadsheet, database, or system of record." },
    ],
    workflow: ["Upload", "Read", "Extract", "Cite", "Export"],
    trust: {
      heading: "Built for verification, not blind trust",
      body: "Every extracted value carries a citation and a confidence score. Low-confidence fields route to a reviewer before anything is exported, and nothing leaves the system without a clear audit trail.",
    },
    useCases: [
      "Finance teams processing invoices",
      "Legal teams reviewing contracts",
      "Operations reconciling forms",
      "Procurement handling purchase orders",
    ],
    faqs: [
      { question: "What document types does it handle?", answer: "PDFs, scanned images, and common office formats — including low-quality scans, which route to review more often." },
      { question: "How accurate is the extraction?", answer: "Accuracy depends on document quality and how well the schema is defined. We tune against your real documents and report measured accuracy before go-live." },
      { question: "What happens to uncertain values?", answer: "They're flagged with their confidence score and held for human review. Nothing low-confidence is exported automatically." },
      { question: "Can it export to our systems?", answer: "Yes — CSV, database writes, or direct API integration with your system of record." },
      { question: "Is our data used to train models?", answer: "No. Your documents stay within your environment and are never used for training." },
      { question: "How long does setup take?", answer: "A working pilot on your document types typically takes two to four weeks." },
    ],
  },
  {
    slug: "rag-knowledge-base",
    category: "AI & Automation",
    name: "RAG Knowledge Base",
    headline: "Answers grounded in your documents — with citations.",
    intro:
      "Ask a question and get an answer built only from your own knowledge base, with citations to the source passages, so your team can trust and verify every response.",
    tags: ["Retrieval", "Grounding", "Citations", "Freshness"],
    positioning: "Your knowledge, searchable in plain language.",
    idea: {
      heading: "The idea",
      paragraphs: [
        "Your organization's knowledge is buried across documents, wikis, and PDFs. Finding the right answer means knowing where to look — and most people don't.",
        "A RAG knowledge base retrieves the relevant passages and grounds every answer in them, so people ask in plain language and get answers they can trace back to the source.",
      ],
    },
    capabilities: [
      { index: "01", title: "Grounded answers", description: "Responses are built only from retrieved passages, not model guesses." },
      { index: "02", title: "Inline citations", description: "Each claim links to the exact source it came from." },
      { index: "03", title: "Freshness control", description: "New and updated documents are indexed so answers stay current." },
      { index: "04", title: "Access-aware", description: "People only get answers from documents they're allowed to see." },
    ],
    workflow: ["Ask", "Retrieve", "Ground", "Answer", "Cite"],
    trust: {
      heading: "It cites, or it says it doesn't know",
      body: "When the knowledge base doesn't contain an answer, the system says so instead of inventing one. Every answer it does give is backed by retrievable, permission-checked source passages.",
    },
    useCases: [
      "Support teams answering customer questions",
      "New hires ramping on internal knowledge",
      "Sales teams finding product answers",
      "Compliance teams checking policy",
    ],
    faqs: [
      { question: "Where does it get its answers?", answer: "Only from the documents you connect. It doesn't answer from the model's general knowledge unless you explicitly allow it." },
      { question: "How does it stay up to date?", answer: "Documents are re-indexed on a schedule or on change, so answers reflect the current version." },
      { question: "Does it respect permissions?", answer: "Yes. Retrieval is access-aware, so people only see answers drawn from documents they're authorized to read." },
      { question: "What if it doesn't know?", answer: "It says so. Grounding means no source, no confident answer." },
      { question: "Can we embed it in our product?", answer: "Yes — as a chat surface, a search box, or an API your own front end calls." },
      { question: "What data formats are supported?", answer: "PDFs, docs, HTML, Markdown, and most structured text sources." },
    ],
  },
  {
    slug: "secure-client-portal",
    category: "Business Systems",
    name: "Secure Client Portal",
    headline: "Per-client workspaces with document sharing and a full audit log.",
    intro:
      "Give every client their own secure workspace to exchange documents and collaborate — white-labeled to your brand, with a complete audit trail of who did what.",
    tags: ["Workspaces", "Secure sharing", "Audit log", "White-label"],
    positioning: "Stop sending sensitive files over email.",
    idea: {
      heading: "The idea",
      paragraphs: [
        "Sensitive client files get traded over email threads no one can track. It's a security risk and a support headache.",
        "A secure client portal gives each client a private workspace with controlled document exchange, real access management, and an audit log that records every action — replacing the email chaos with something you can stand behind.",
      ],
    },
    capabilities: [
      { index: "01", title: "Per-client workspaces", description: "Every client gets an isolated, private space with their own members." },
      { index: "02", title: "Secure document exchange", description: "Upload, share, and revoke access to files with real controls." },
      { index: "03", title: "Complete audit logging", description: "Every view, upload, and download is recorded and reviewable." },
      { index: "04", title: "White-label branding", description: "Your logo, your colors, your domain — not a third-party product." },
    ],
    workflow: ["Invite", "Sign in", "Share", "Collaborate", "Audit"],
    trust: {
      heading: "Every action, on the record",
      body: "Access is scoped per client and per role, sign-in is protected with modern auth, and the audit log gives you a defensible record of exactly who accessed what and when.",
    },
    useCases: [
      "Accounting & finance firms",
      "Legal practices",
      "Consultancies & agencies",
      "Healthcare & regulated services",
    ],
    faqs: [
      { question: "How is access controlled?", answer: "Per-client workspaces with role-based permissions. Clients only ever see their own space." },
      { question: "What does the audit log capture?", answer: "Sign-ins, document views, uploads, downloads, and permission changes — each timestamped and attributable." },
      { question: "Can we use our own branding?", answer: "Yes. The portal is fully white-labeled, including your domain." },
      { question: "How are documents secured?", answer: "Encrypted at rest and in transit, with signed, expiring access links." },
      { question: "Does it support MFA?", answer: "Yes — multi-factor authentication and SSO options are available." },
      { question: "Can clients collaborate with our team?", answer: "Yes, within their workspace, with every interaction captured in the audit trail." },
    ],
  },
  {
    slug: "workflow-automation",
    category: "AI & Automation",
    name: "Workflow Automation",
    headline: "Connect your systems with automations that retry and report.",
    intro:
      "Replace manual, multi-step processes with automations that trigger on real events, move data between your systems, retry on failure, and tell you when something breaks.",
    tags: ["Triggers", "Integrations", "Retries", "Observability"],
    positioning: "The work that happens between your tools, automated.",
    idea: {
      heading: "The idea",
      paragraphs: [
        "Someone on your team is the human glue between systems — copying a record from one tool into another, chasing status, catching what falls through.",
        "Workflow automation turns that glue into software: event-triggered pipelines that move data reliably, retry when a system is down, and surface failures instead of hiding them.",
      ],
    },
    capabilities: [
      { index: "01", title: "Event triggers", description: "Kick off work from webhooks, schedules, or system events." },
      { index: "02", title: "Multi-system steps", description: "Read and write across the tools your business runs on." },
      { index: "03", title: "Automatic retries", description: "Transient failures are retried with backoff, not dropped." },
      { index: "04", title: "Full observability", description: "See every run, its status, and where it failed." },
    ],
    workflow: ["Trigger", "Steps", "Systems", "Retry", "Observe"],
    trust: {
      heading: "Reliable when systems aren't",
      body: "Real integrations fail intermittently. These automations are built with idempotency, retries, and dead-letter handling so a downstream outage becomes a delayed run, not lost data.",
    },
    useCases: [
      "Lead routing and CRM sync",
      "Order and fulfillment pipelines",
      "Reporting and reconciliation",
      "Onboarding and provisioning",
    ],
    faqs: [
      { question: "What systems can it connect?", answer: "Anything with an API or webhook — CRMs, payment systems, email, databases, and internal services." },
      { question: "What happens when a step fails?", answer: "It retries with backoff. Persistent failures are captured and surfaced for review rather than lost." },
      { question: "Can we see what's running?", answer: "Yes. Every run is logged with its status, inputs, and failure point." },
      { question: "Is it safe to re-run?", answer: "Automations are built to be idempotent so re-runs don't duplicate work." },
      { question: "Can we change the logic later?", answer: "Yes — workflows are versioned and editable as your process evolves." },
      { question: "How is this different from off-the-shelf tools?", answer: "It's built around your exact process, with production-grade reliability and no per-task pricing surprises." },
    ],
  },
];

export function getDemo(slug: string) {
  return demos.find((d) => d.slug === slug);
}
