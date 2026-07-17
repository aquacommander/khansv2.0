export interface CompanyPage {
  slug: string;
  title: string;
  tagline: string;
  lead: string;
  body: string[];
}

export const companyPages: CompanyPage[] = [
  {
    slug: "about",
    title: "About Khanstruct",
    tagline: "Who we are",
    lead: "A studio building intelligence as infrastructure — founded on the belief that AI is an engineering discipline, not a demo.",
    body: [
      "Khanstruct is a small, senior team led by Zain Khan. We build production-grade AI systems, data platforms, and software products for teams who need something that works, ships, and holds up after launch.",
      "We work in tight, measured loops. Every engagement runs through the Khanstruct BuildLoop, produces artifacts you can see, and ends with documentation and runbooks so your team owns the result.",
    ],
  },
  {
    slug: "buildloop",
    title: "The Khanstruct BuildLoop",
    tagline: "How we ship",
    lead: "Seven steps that repeat across every engagement — discovery to improvement, with a visible artifact at each stage.",
    body: [
      "Discover, Map, Design, Build, Validate, Launch, Improve. It's a loop, not a hand-off: we demonstrate working software weekly, so there are no surprise reveals and no black boxes.",
      "The BuildLoop is why our work is predictable. You always know what stage we're in, what the next artifact is, and how it ladders up to your outcome.",
    ],
  },
  {
    slug: "philosophy",
    title: "Technology Philosophy",
    tagline: "What we believe",
    lead: "Boring where it should be boring. Rigorous where it counts. Accountable to outcomes, not novelty.",
    body: [
      "We treat AI as a medium, not a magic trick. Models are only useful once they become infrastructure — evaluated, monitored, and reliable. We reach for proven tools and adopt new ones only when they're genuinely better.",
      "Everything we ship has tests, observability, and runbooks. We measure lift instead of assuming it, and we're honest when something isn't ready.",
    ],
  },
  {
    slug: "team",
    title: "Team",
    tagline: "The humans",
    lead: "Senior engineers who have shipped and operated real systems — and review every line that ships under our name.",
    body: [
      "We keep the team small and senior on purpose. There's no layer of junior handoffs between you and the people building your system.",
      "Every engagement gets senior engineering review, and the person who designs your architecture is the person who builds it.",
    ],
  },
  {
    slug: "careers",
    title: "Careers",
    tagline: "Open roles",
    lead: "We hire senior engineers who care about craft, measurement, and outcomes. Small team, real ownership.",
    body: [
      "We're always interested in exceptional engineers who've operated production systems and want to do their best work in a focused studio.",
      "No open listings at the moment — but if that's you, send us what you've built and why it mattered. We read every message.",
    ],
  },
  {
    slug: "partners",
    title: "Partners",
    tagline: "Our stack and allies",
    lead: "The platforms we build on and the partners we bring in when a project needs specialist depth.",
    body: [
      "We build on proven infrastructure — AWS, GCP, Vercel — and integrate best-in-class tools for auth, billing, data, and AI.",
      "When a project needs specialist depth beyond our core, we bring in trusted partners rather than pretend to do everything ourselves.",
    ],
  },
];

export function getCompanyPage(slug: string) {
  return companyPages.find((p) => p.slug === slug);
}
