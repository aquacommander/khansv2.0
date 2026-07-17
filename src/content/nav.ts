import { industries } from "./industries";
import { demos } from "./demos";
import { companyPages } from "./company";

export interface NavLink {
  label: string;
  href: string;
  blurb?: string;
}

export type NavMenuType = "services" | "solutions" | "columns";

export interface NavMenu {
  key: string;
  label: string;
  href: string;
  type: NavMenuType;
  // For "columns" menus:
  intro?: { eyebrow?: string; title?: string; viewAll?: NavLink };
  links?: NavLink[];
}

export const navMenus: NavMenu[] = [
  { key: "services", label: "What We Build", href: "/services", type: "services" },
  { key: "solutions", label: "Solutions", href: "/solutions", type: "solutions" },
  {
    key: "industries",
    label: "Industries",
    href: "/industries",
    type: "columns",
    intro: { eyebrow: "Industries", title: "Software for how you actually work.", viewAll: { label: "All industries", href: "/industries" } },
    links: industries.map((i) => ({ label: i.title, href: `/industries/${i.slug}`, blurb: i.blurb })),
  },
  {
    key: "demo-lab",
    label: "Demo Lab",
    href: "/demo-lab",
    type: "columns",
    intro: { eyebrow: "Demo Lab", title: "See it work before you buy it.", viewAll: { label: "All demos", href: "/demo-lab" } },
    links: demos.map((d) => ({ label: d.name, href: `/demo-lab/${d.slug}`, blurb: d.category })),
  },
  {
    key: "work",
    label: "Work",
    href: "/work",
    type: "columns",
    intro: { eyebrow: "Work", title: "Systems running in production.", viewAll: { label: "View archive", href: "/work" } },
    links: [
      { label: "Case Studies", href: "/work", blurb: "Selected client work" },
      { label: "Solution Blueprints", href: "/solutions", blurb: "Reusable architectures" },
      { label: "Results & Outcomes", href: "/work", blurb: "What we've moved" },
    ],
  },
  {
    key: "resources",
    label: "Resources",
    href: "/resources",
    type: "columns",
    intro: { eyebrow: "Resources", title: "Field notes from the studio.", viewAll: { label: "All resources", href: "/resources" } },
    links: [
      { label: "Articles", href: "/resources", blurb: "Notes on building" },
      { label: "Guides", href: "/resources", blurb: "How-to, in depth" },
      { label: "Playbooks", href: "/resources", blurb: "Repeatable approaches" },
      { label: "Signal", href: "/contact", blurb: "Our newsletter" },
    ],
  },
  {
    key: "company",
    label: "Company",
    href: "/company",
    type: "columns",
    intro: { eyebrow: "Company", title: "A studio, not an agency.", viewAll: { label: "About us", href: "/company/about" } },
    links: companyPages.map((p) => ({ label: p.title.replace("The ", "").replace("Khanstruct ", ""), href: `/company/${p.slug}`, blurb: p.tagline })),
  },
];
