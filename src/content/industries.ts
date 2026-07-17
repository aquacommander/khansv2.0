export interface Industry {
  slug: string;
  title: string;
  blurb: string;
  description: string;
  needs: string[];
}

export const industries: Industry[] = [
  { slug: "startups", title: "Startups", blurb: "MVPs, investor demos, AI prototypes", description: "Move from idea to a fundable, demoable product without accruing the technical debt that sinks the next raise.", needs: ["MVP development", "Investor-ready demos", "AI prototypes", "Architecture that scales"] },
  { slug: "agencies", title: "Agencies", blurb: "Client portals, dashboards, white-label dev", description: "White-label engineering capacity that lets your agency deliver software outcomes without hiring a full team.", needs: ["Client portals", "Reporting dashboards", "White-label builds", "Overflow capacity"] },
  { slug: "healthcare", title: "Healthcare", blurb: "Patient intake, secure portals, Document AI", description: "Secure, auditable systems for intake and records — built with privacy and compliance in mind from day one.", needs: ["Patient intake", "Secure portals", "Document AI", "Compliance readiness"] },
  { slug: "fintech", title: "FinTech", blurb: "Financial dashboards, secure APIs, reporting", description: "Reliable financial software with the security posture, observability, and reporting that regulated products demand.", needs: ["Financial dashboards", "Secure APIs", "Reporting", "Auth & identity"] },
  { slug: "local-businesses", title: "Local Businesses", blurb: "Booking, CRM, payment integration", description: "Practical software that replaces spreadsheets and manual work — booking, payments, and customer records in one place.", needs: ["Booking & scheduling", "CRM", "Payment integration", "Automation"] },
  { slug: "e-commerce", title: "E-commerce", blurb: "Stores, integrations, ops automation", description: "Storefronts and the operational plumbing behind them — integrations, fulfillment, and automation that scale with orders.", needs: ["Storefronts", "Integrations", "Ops automation", "Analytics"] },
  { slug: "real-estate", title: "Real Estate", blurb: "Listings, CRMs, transaction tools", description: "Listing platforms, transaction management, and CRM workflows tailored to how deals actually get done.", needs: ["Listings", "CRM", "Transaction tools", "Portals"] },
  { slug: "education", title: "Education", blurb: "LMS, scheduling, parent portals", description: "Learning platforms, scheduling, and communication tools that serve students, staff, and families alike.", needs: ["LMS", "Scheduling", "Parent portals", "Reporting"] },
  { slug: "professional-services", title: "Professional Services", blurb: "Practice mgmt, portals, automation", description: "Practice-management systems and secure client portals that free your team from administrative drag.", needs: ["Practice management", "Client portals", "Automation", "Document AI"] },
  { slug: "logistics", title: "Logistics", blurb: "Dispatch, tracking, fleet tools", description: "Dispatch, tracking, and fleet tooling with the reliability and observability that operations depend on.", needs: ["Dispatch", "Tracking", "Fleet tools", "Integrations"] },
  { slug: "construction", title: "Construction", blurb: "Project mgmt, field tools, docs", description: "Field-ready project management and document systems that work on the job site, not just the office.", needs: ["Project management", "Field tools", "Document systems", "Portals"] },
  { slug: "marketing-teams", title: "Marketing Teams", blurb: "Automation, dashboards, AI", description: "Automation, analytics, and AI tooling that give marketing teams leverage without another disconnected SaaS bill.", needs: ["Automation", "Dashboards", "AI content tooling", "Attribution"] },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
