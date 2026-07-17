export interface Project {
  index: string;
  slug: string;
  title: string;
  industry: string;
  location: string;
  classification: string;
  year: number;
  summary: string;
}

export const projects: Project[] = [
  {
    index: "01",
    slug: "meridian-intake",
    title: "Meridian Intake Engine",
    industry: "Legal Services",
    location: "Dallas, US",
    classification: "Document AI",
    year: 2026,
    summary:
      "Automated client intake and contract extraction cutting manual review time by a measured 70%.",
  },
  {
    index: "02",
    slug: "cardinal-vision",
    title: "Cardinal Vision Platform",
    industry: "Manufacturing",
    location: "Tulsa, US",
    classification: "Computer Vision",
    year: 2025,
    summary:
      "A defect-detection pipeline running on the line, flagging faults before they leave the floor.",
  },
  {
    index: "03",
    slug: "atlas-knowledge",
    title: "Atlas Knowledge Base",
    industry: "SaaS",
    location: "Remote",
    classification: "RAG System",
    year: 2025,
    summary:
      "Grounded, cited answering over a support corpus that deflected a third of inbound tickets.",
  },
  {
    index: "04",
    slug: "harbor-routing",
    title: "Harbor Routing Autopilot",
    industry: "Logistics",
    location: "Houston, US",
    classification: "Automation",
    year: 2025,
    summary:
      "Event-driven dispatch automation that reconciles orders across three legacy systems.",
  },
  {
    index: "05",
    slug: "verdant-portal",
    title: "Verdant Client Portal",
    industry: "Financial Services",
    location: "Kansas City, US",
    classification: "Business Systems",
    year: 2024,
    summary:
      "A white-labeled secure portal with full audit logging, replacing email-based file exchange.",
  },
  {
    index: "06",
    slug: "northwind-analytics",
    title: "Northwind Analytics",
    industry: "Retail",
    location: "Oklahoma City, US",
    classification: "Data Engineering",
    year: 2024,
    summary:
      "A unified warehouse and reporting layer giving leadership one trustworthy view of the numbers.",
  },
];

export const workArchiveCount = 18;
