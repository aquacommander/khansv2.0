export const site = {
  name: "Khanstruct",
  legalName: "Khanstruct LLC",
  tagline: "Engineering intelligence into the everyday.",
  description:
    "Khanstruct is a studio building production-grade AI systems, data platforms, and software products — designed, measured, and shipped with senior engineering review.",
  founder: "Zain Khan",
  version: "v2.0",
  availability: "Available · Q4 2026",
  email: "zain@thekhanstruct.com",
  phone: "+1 (918) 555-0142",
  location: {
    city: "Tulsa",
    region: "Oklahoma, USA",
    address: "108 E Reconciliation Way, Tulsa, OK 74103",
    timezone: "America/Chicago",
    station: "Downtown / Greenwood District",
    coordinates: "36.1560° N, 95.9928° W",
    lat: 36.156,
    lng: -95.9928,
  },
  url: "https://khanstruct.com",
} as const;

/** Social profiles shown in the footer. Update the handles to the real ones. */
export const socials = [
  { key: "x", label: "X", href: "https://x.com/khanstruct" },
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/khanstruct" },
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/khanstruct" },
  { key: "youtube", label: "YouTube", href: "https://www.youtube.com/@khanstruct" },
] as const;

export type SocialKey = (typeof socials)[number]["key"];

export const primaryNav = [
  { label: "What We Build", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "Demo Lab", href: "/demo-lab" },
  { label: "Work", href: "/work" },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/company" },
] as const;

export const footerColumns = [
  {
    title: "Studio",
    links: [
      { label: "What We Build", href: "/services" },
      { label: "Solutions", href: "/solutions" },
      { label: "Demo Lab", href: "/demo-lab" },
      { label: "Selected Work", href: "/work" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Disciplines",
    links: [
      { label: "AI & Automation", href: "/services/ai-and-automation" },
      { label: "SaaS & Product", href: "/services/saas-and-product" },
      { label: "Web & Mobile", href: "/services/web-and-mobile" },
      { label: "Data & Reporting", href: "/services/data-and-reporting" },
      { label: "Cloud & DevOps", href: "/services/cloud-and-devops" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company/about" },
      { label: "Industries", href: "/industries" },
      { label: "Resources", href: "/resources" },
      { label: "Careers", href: "/company/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;
