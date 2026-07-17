export interface Resource {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
}

export const resources: Resource[] = [
  { slug: "ai-that-ships", category: "Playbook", title: "AI that ships: from demo to production", excerpt: "The engineering practices that separate a compelling demo from a system you can put in front of customers.", readTime: "8 min" },
  { slug: "rag-done-right", category: "Guide", title: "RAG done right: grounding, citations, and eval", excerpt: "How to build retrieval systems that answer from your data and tell you when they don't know.", readTime: "11 min" },
  { slug: "buildloop-explained", category: "Article", title: "Inside the Khanstruct BuildLoop", excerpt: "Why we demonstrate working software every week, and how it removes surprise reveals from a project.", readTime: "6 min" },
  { slug: "measuring-ai", category: "Guide", title: "Measuring AI: evaluation before deployment", excerpt: "A practical approach to offline and online evaluation that gates every model change.", readTime: "9 min" },
  { slug: "secure-portals", category: "Playbook", title: "Building a secure client portal", excerpt: "Per-client isolation, audit logging, and the trust decisions that matter most.", readTime: "7 min" },
  { slug: "automation-reliability", category: "Article", title: "Automation that survives outages", excerpt: "Idempotency, retries, and observability — making integrations reliable when systems aren't.", readTime: "5 min" },
];

export const resourceCategories = ["Article", "Guide", "Playbook", "Signal"];

export function getResource(slug: string) {
  return resources.find((r) => r.slug === slug);
}
