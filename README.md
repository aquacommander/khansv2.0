# Khanstruct — v2

A clean-room, architecturally-equivalent agency website in the editorial /
engineering-console style: a multi-layered studio platform with a service
taxonomy, productized engagements, a proof-layer Demo Lab, a work archive, and a
precise conversion path. All content, branding, and media are original to
Khanstruct.

## Stack

- **Next.js 14** (App Router) · **React 18** · **TypeScript** (strict)
- **Tailwind CSS** + CSS variables (design tokens)
- **Framer Motion** — boot sequence, line reveals, scroll choreography
- Content-driven — every page reads from typed data in `src/content/`

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (SSG)
npm run start      # serve the build
npm run type-check # tsc --noEmit
```

## Architecture

```
src/
├── app/                     # routes (App Router)
│   ├── page.tsx             # homepage
│   ├── services/            # directory → [category] → [service]  (81 services)
│   ├── solutions/           # directory → [slug]  (sprints/starters/assessments)
│   ├── demo-lab/            # directory → [slug]  (shared demo template)
│   ├── work/                # directory → [slug]
│   ├── contact/             # form + location
│   ├── api/contact/route.ts # server-validated inquiry endpoint
│   ├── privacy · terms · not-found · sitemap · robots
├── components/
│   ├── layout/              # header, mobile-menu, footer, clock, page-header
│   ├── motion/              # boot-sequence, reveal, split-heading
│   ├── sections/            # hero, about, service-overview, build-loop,
│   │                        #   demo-grid, work-index, tech-stack, project-cta
│   ├── forms/               # contact-form (client + server validation)
│   └── ui/                  # primitives, accordion
├── content/                 # site, services, solutions, demos, work, process, stack
├── lib/                     # motion variants, utils
└── styles/                  # globals.css (tokens + typography + grid)
```

## Design system

Tokens live in `src/styles/globals.css` (`:root`). Typography roles:
`.heading-display`, `.heading-section`, `.heading-sub`, `.label-system`,
`.body-large`, `.italic-accent`. Layout uses a 12-column `.page-grid` inside a
`.shell` container. Motion respects `prefers-reduced-motion`, and the boot
sequence plays once per session (`sessionStorage`).

## Content

All copy, service catalog, engagements, demos, and projects are edited in
`src/content/*.ts`. Adding a service, solution, demo, or project automatically
produces its page, sitemap entry, and cross-links — no JSX changes required.

## The client funnel (`/start`)

Every "Start a project" CTA leads to `/start` — a five-step qualifier instead of a
blank message box. It interviews the visitor, **scores** them, and **recommends a
real engagement**.

- **Steps** — what are you dealing with · where are you now · what's blocking you ·
  timing & budget · details. All defined as data in
  [`src/content/funnel.ts`](src/content/funnel.ts) — add/reorder questions without
  touching the component.
- **Scoring** — `timeline + budget` (max 6): `≥5` 🔴 High priority · `≥3` 🟡 Warm ·
  `<3` 🔵 Exploratory. Scored **server-side** so it can't be spoofed. The priority is
  internal — the visitor never sees it.
- **Recommendation** — answers map to one of the eight engagements in
  `content/solutions.ts` (e.g. security blocker → Secure Portal Starter; unclear
  direction → Architecture Review), so the visitor is told *how to start*.
- **Completion state** — the recommended engagement, what happens next, and reply
  time (not just "thanks").
- **Delivery (multi-inbox)** — a ranked, formatted summary is emailed via
  **Web3Forms, submitted from the browser** ([`lib/web3forms.ts`](src/lib/web3forms.ts)).
  Their free plan rejects server-to-server calls, so keys must be `NEXT_PUBLIC_` —
  by design: a key is public and only permits posting to your own form.
  **One key = one inbox**, so the funnel submits **once per key** and every
  configured inbox gets its own copy (`NEXT_PUBLIC_WEB3FORMS_KEY`,
  `..._KEY_2`, `..._KEY_3`). Sends run in parallel and succeed if **any** inbox
  accepts — one dead key never costs a lead; partial failures are logged to the
  console. `/api/lead` then records it server-side (scoring + optional Notion CRM,
  fire-and-forget) and can additionally send via Resend if `RESEND_API_KEY` is set.
  See `.env.example`.
- **Analytics** — emits `funnel_open`, `funnel_step`, `funnel_submit` via
  [`src/lib/analytics.ts`](src/lib/analytics.ts) (a silent no-op until GA4 is wired).

`/contact` remains for people who just want the plain form.

## Hero video

The homepage hero plays a muted, looping background video of a team collaborating
(`public/media/hero/team.mp4` + `.webm`, with `team-poster.jpg` shown while it
loads). It autoplays only while in view, pauses offscreen, and honours
`prefers-reduced-motion` (staying on the poster). Swap those three files to change
the clip — the component lives in
[`src/components/motion/hero-video.tsx`](src/components/motion/hero-video.tsx).
The current clip is a Pexels stock video (Pexels license, no attribution
required); replace with your own footage before production if you prefer.

## Images

Topical photos live in `public/media/<section>/<slug>.jpg` (services, demos,
work, industries, company, resources) and are mapped to content in
[`src/content/media.ts`](src/content/media.ts). Each entry has a `variant` +
`tone` (for the generated SVG art) and a `src` (the photo). **`src` wins when
present; delete it to fall back to generated art.** To change a picture, drop a
new file at the same path — no code change needed.

The **ten service disciplines** use custom branded poster images in
`public/media/services/<slug>.jpg` (portrait, re-encoded from the supplied PNGs
to keep them light). The **demos, work, industries, company, and resources**
images are curated Pexels photos (Pexels license — free, no attribution
required), each chosen per function around a development-and-cooperation theme
(teams collaborating, developers coding, planning sessions, infrastructure,
security). To change any picture, drop a new file at the same
`public/media/<section>/<slug>.jpg` path — no code change. Every image carries
descriptive `alt` text, and `AbstractMedia` also accepts video via a real `src`
swap if you extend it.
