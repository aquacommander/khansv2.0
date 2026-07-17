import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { demos, getDemo } from "@/content/demos";
import { demoArt } from "@/content/media";
import { AbstractMedia } from "@/components/ui/abstract-media";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectCTA } from "@/components/sections/project-cta";
import { Arrow, ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { FAQAccordion } from "@/components/ui/accordion";

export function generateStaticParams() {
  return demos.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const d = getDemo(params.slug);
  if (!d) return {};
  return {
    title: `${d.name} · Demo Lab`,
    description: d.headline,
  };
}

export default function DemoPage({ params }: { params: { slug: string } }) {
  const demo = getDemo(params.slug);
  if (!demo) notFound();

  return (
    <>
      {/* Hero */}
      <header className="shell pt-[calc(var(--header-h)+5rem)] md:pt-[calc(var(--header-h)+7rem)] pb-16 md:pb-24">
        <Reveal>
          <Link href="/demo-lab" className="label-system inline-flex items-center gap-2 link-underline mb-10">
            ← Back to Demo Lab
          </Link>
        </Reveal>
        <Reveal>
          <Eyebrow label={demo.category} index="Demo Lab" />
        </Reveal>
        <div className="mt-8 max-w-5xl">
          <SplitHeading as="h1" className="heading-section" lines={[demo.headline]} />
        </div>
        <div className="page-grid mt-10 items-end">
          <div className="col-span-12 md:col-span-7 lg:col-span-6">
            <Reveal>
              <p className="body-large">{demo.intro}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonLink href="/start" variant="solid">
                  Request a walkthrough
                </ButtonLink>
                <ButtonLink href="/demo-lab">Back to lab</ButtonLink>
              </div>
            </Reveal>
          </div>
          <div className="col-span-12 md:col-span-5 lg:col-start-8 lg:col-span-5 mt-10 md:mt-0">
            <div className="border-t border-line pt-6 flex flex-wrap gap-x-4 gap-y-2 label-system">
              {demo.tags.map((t) => (
                <span key={t}>/ {t}</span>
              ))}
            </div>
            <p className="mt-6 italic-accent text-xl text-ink-muted">{demo.positioning}</p>
          </div>
        </div>
      </header>

      {/* Hero media band */}
      <div className="shell pb-16 md:pb-24">
        <Reveal>
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-line">
            <AbstractMedia {...demoArt[demo.slug]} seed={`${demo.slug}-hero`} alt={demo.name} />
            <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(12,13,9,0.72), rgba(12,13,9,0) 45%)" }} />
            <span className="absolute bottom-6 left-6 label-system" style={{ color: "rgba(243,242,238,0.9)" }}>
              {demo.name} — live demonstration
            </span>
          </div>
        </Reveal>
      </div>

      {/* 01 The idea */}
      <section className="bg-surface">
        <div className="shell py-24 md:py-32">
          <Reveal>
            <Eyebrow label={demo.idea.heading} index="01" />
          </Reveal>
          <div className="page-grid mt-10">
            <div className="col-span-12 lg:col-span-8">
              <div className="space-y-6">
                {demo.idea.paragraphs.map((p, i) => (
                  <Reveal key={i}>
                    <p className="heading-sub font-normal text-ink" style={{ letterSpacing: "-0.02em", lineHeight: 1.18 }}>
                      {p}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 What it does — capabilities */}
      <section className="shell py-24 md:py-32">
        <Reveal>
          <Eyebrow label="What it does" index="02" />
        </Reveal>
        <RevealGroup className="mt-12 grid grid-cols-1 md:grid-cols-2 border-t border-line">
          {demo.capabilities.map((c, i) => (
            <RevealItem
              key={c.index}
              className={`border-b border-line py-10 md:px-8 ${i % 2 === 0 ? "md:border-r md:pl-0" : ""}`}
            >
              <div className="label-system mb-6">{c.index}</div>
              <h3 className="heading-sub mb-4">{c.title}</h3>
              <p className="body-large text-[0.98rem]">{c.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* 03 How it works — workflow */}
      <section className="bg-inverse text-inverse-text">
        <div className="shell py-24 md:py-32">
          <Reveal>
            <Eyebrow label="How it works" index="03" dark tone="var(--accent-2)" />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-px bg-[color:var(--inverse-line)] border border-[color:var(--inverse-line)]">
            {demo.workflow.map((step, i) => (
              <Reveal key={step} className="bg-inverse p-8 min-h-[180px] flex flex-col justify-between">
                <span className="label-system" style={{ color: "var(--inverse-muted)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-2xl font-semibold tracking-[-0.03em] mt-8">{step}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 Trust */}
      <section className="shell py-24 md:py-32">
        <Reveal>
          <Eyebrow label="Trust & reliability" index="04" />
        </Reveal>
        <div className="page-grid mt-10">
          <div className="col-span-12 lg:col-span-4">
            <h2 className="heading-sub">{demo.trust.heading}</h2>
          </div>
          <div className="col-span-12 lg:col-start-6 lg:col-span-7 mt-6 lg:mt-0">
            <Reveal>
              <p className="body-large text-[1.15rem] text-ink">{demo.trust.body}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 05 Use cases */}
      <section className="bg-surface">
        <div className="shell py-24 md:py-32">
          <Reveal>
            <Eyebrow label="Who it's for" index="05" />
          </Reveal>
          <div className="mt-12 border-t border-line">
            {demo.useCases.map((u, i) => (
              <Reveal key={u} variant="scale">
                <div className="zoom-row flex items-baseline gap-6 border-b border-line py-6 px-4 -mx-4 hover:bg-canvas">
                  <span className="label-system">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-xl md:text-2xl font-medium tracking-[-0.02em]">{u}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06 FAQ */}
      <section className="shell py-24 md:py-32">
        <Reveal>
          <Eyebrow label="Questions" index="06" />
        </Reveal>
        <div className="mt-12 max-w-4xl">
          <FAQAccordion faqs={demo.faqs} />
        </div>
      </section>

      {/* Related demos */}
      <section className="shell pb-24">
        <div className="label-system mb-8 border-t border-line pt-8">More from the lab</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-line border border-line">
          {demos
            .filter((d) => d.slug !== demo.slug)
            .map((d) => (
              <Link
                key={d.slug}
                href={`/demo-lab/${d.slug}`}
                className="group bg-canvas p-8 flex flex-col justify-between min-h-[160px] transition-colors duration-500 hover:bg-surface"
              >
                <span className="label-system">{d.category}</span>
                <span className="font-semibold tracking-[-0.02em] text-lg mt-8 flex items-center gap-2">
                  {d.name}
                  <Arrow className="opacity-0 transition-all duration-500 group-hover:opacity-100" />
                </span>
              </Link>
            ))}
        </div>
      </section>

      <ProjectCTA />
    </>
  );
}
