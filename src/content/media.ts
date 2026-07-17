import type { ArtVariant } from "@/components/ui/abstract-media";

export interface Art {
  variant: ArtVariant;
  tone: string;
  // Real photo — overrides the generated art. Swap the file in /public/media
  // to change the picture; delete `src` to fall back to generated art.
  src?: string;
}

// Discipline (service category) visuals
export const categoryArt: Record<string, Art> = {
  "ai-and-automation": { variant: "circuit", tone: "#5f8a70", src: "/media/services/ai-and-automation.jpg" },
  "saas-and-product": { variant: "grid", tone: "#6b7280", src: "/media/services/saas-and-product.jpg" },
  "web-and-mobile": { variant: "device", tone: "#8a6f6f", src: "/media/services/web-and-mobile.jpg" },
  "business-systems": { variant: "strata", tone: "#6a7d7d", src: "/media/services/business-systems.jpg" },
  "api-and-integration": { variant: "orbit", tone: "#8a7d5f", src: "/media/services/api-and-integration.jpg" },
  "data-and-reporting": { variant: "bars", tone: "#5f6f8a", src: "/media/services/data-and-reporting.jpg" },
  "cloud-and-devops": { variant: "mesh", tone: "#5f758a", src: "/media/services/cloud-and-devops.jpg" },
  "security-engineering": { variant: "matrix", tone: "#4f7d59", src: "/media/services/security-engineering.jpg" },
  design: { variant: "lens", tone: "#8a6f83", src: "/media/services/design.jpg" },
  "maintenance-and-growth": { variant: "topo", tone: "#6f8a5f", src: "/media/services/maintenance-and-growth.jpg" },
};

// Demo visuals
export const demoArt: Record<string, Art> = {
  "ai-document-assistant": { variant: "strata", tone: "#5f8a70", src: "/media/demos/ai-document-assistant.jpg" },
  "rag-knowledge-base": { variant: "circuit", tone: "#5f6f8a", src: "/media/demos/rag-knowledge-base.jpg" },
  "secure-client-portal": { variant: "matrix", tone: "#4f7d59", src: "/media/demos/secure-client-portal.jpg" },
  "workflow-automation": { variant: "orbit", tone: "#8a7d5f", src: "/media/demos/workflow-automation.jpg" },
};

// Project visuals
export const projectArt: Record<string, Art> = {
  "meridian-intake": { variant: "strata", tone: "#6a7d7d", src: "/media/work/meridian-intake.jpg" },
  "cardinal-vision": { variant: "lens", tone: "#8a6f6f", src: "/media/work/cardinal-vision.jpg" },
  "atlas-knowledge": { variant: "circuit", tone: "#5f6f8a", src: "/media/work/atlas-knowledge.jpg" },
  "harbor-routing": { variant: "orbit", tone: "#8a7d5f", src: "/media/work/harbor-routing.jpg" },
  "verdant-portal": { variant: "matrix", tone: "#4f7d59", src: "/media/work/verdant-portal.jpg" },
  "northwind-analytics": { variant: "bars", tone: "#5f758a", src: "/media/work/northwind-analytics.jpg" },
};

// Industry visuals
export const industryArt: Record<string, Art> = {
  startups: { variant: "grid", tone: "#5f8a70", src: "/media/industries/startups.jpg" },
  agencies: { variant: "lens", tone: "#8a6f83", src: "/media/industries/agencies.jpg" },
  healthcare: { variant: "mesh", tone: "#5f758a", src: "/media/industries/healthcare.jpg" },
  fintech: { variant: "bars", tone: "#5f6f8a", src: "/media/industries/fintech.jpg" },
  "local-businesses": { variant: "strata", tone: "#8a7d5f", src: "/media/industries/local-businesses.jpg" },
  "e-commerce": { variant: "orbit", tone: "#6a7d7d", src: "/media/industries/e-commerce.jpg" },
  "real-estate": { variant: "device", tone: "#8a6f6f", src: "/media/industries/real-estate.jpg" },
  education: { variant: "topo", tone: "#6f8a5f", src: "/media/industries/education.jpg" },
  "professional-services": { variant: "circuit", tone: "#6b7280", src: "/media/industries/professional-services.jpg" },
  logistics: { variant: "orbit", tone: "#8a7d5f", src: "/media/industries/logistics.jpg" },
  construction: { variant: "strata", tone: "#8a6f6f", src: "/media/industries/construction.jpg" },
  "marketing-teams": { variant: "mesh", tone: "#8a6f83", src: "/media/industries/marketing-teams.jpg" },
};

// Company visuals
export const companyArt: Record<string, Art> = {
  about: { variant: "grid", tone: "#5f8a70", src: "/media/company/about.jpg" },
  buildloop: { variant: "orbit", tone: "#8a7d5f", src: "/media/company/buildloop.jpg" },
  philosophy: { variant: "topo", tone: "#5f758a", src: "/media/company/philosophy.jpg" },
  team: { variant: "mesh", tone: "#6b7280", src: "/media/company/team.jpg" },
  careers: { variant: "device", tone: "#8a6f6f", src: "/media/company/careers.jpg" },
  partners: { variant: "circuit", tone: "#6a7d7d", src: "/media/company/partners.jpg" },
};

// Resource visuals
export const resourceArt: Record<string, Art> = {
  "ai-that-ships": { variant: "circuit", tone: "#5f8a70", src: "/media/resources/ai-that-ships.jpg" },
  "rag-done-right": { variant: "mesh", tone: "#5f6f8a", src: "/media/resources/rag-done-right.jpg" },
  "buildloop-explained": { variant: "orbit", tone: "#8a7d5f", src: "/media/resources/buildloop-explained.jpg" },
  "measuring-ai": { variant: "bars", tone: "#5f758a", src: "/media/resources/measuring-ai.jpg" },
  "secure-portals": { variant: "matrix", tone: "#4f7d59", src: "/media/resources/secure-portals.jpg" },
  "automation-reliability": { variant: "topo", tone: "#6f8a5f", src: "/media/resources/automation-reliability.jpg" },
};

const VARIANTS: ArtVariant[] = [
  "grid", "circuit", "bars", "mesh", "topo", "orbit", "strata", "device", "lens", "matrix",
];
const TONES = ["#5f8a70", "#6b7280", "#5f6f8a", "#8a7d5f", "#6a7d7d", "#8a6f83"];

// Deterministic fallback for anything without an explicit assignment.
export function artFor(seed: string, i = 0): Art {
  return {
    variant: VARIANTS[i % VARIANTS.length],
    tone: TONES[i % TONES.length],
  };
}
