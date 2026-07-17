import type { Metadata } from "next";
import Link from "next/link";
import { resources } from "@/content/resources";
import { resourceArt } from "@/content/media";
import { AbstractMedia } from "@/components/ui/abstract-media";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectCTA } from "@/components/sections/project-cta";
import { Arrow } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Field notes from the studio — articles, guides, and playbooks on building AI systems and software that ship.",
};

export default function ResourcesPage() {
  const [feature, ...rest] = resources;
  const fArt = resourceArt[feature.slug];
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        index="Field notes"
        titleLines={["How we think", "about building."]}
        lead="Practical writing on shipping AI systems and software — the engineering practices, not the hype."
      />

      <div className="shell pb-24 md:pb-32">
        {/* Featured */}
        <Reveal>
          <Link
            href="/resources"
            className="group grid grid-cols-1 lg:grid-cols-2 gap-px bg-line border border-line rounded-2xl overflow-hidden mb-4"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
              <AbstractMedia {...fArt} seed={feature.slug} alt={feature.title} className="transition-transform duration-700 ease-editorial group-hover:scale-105" />
            </div>
            <div className="bg-canvas p-8 md:p-12 flex flex-col justify-between">
              <span className="label-system">{feature.category} · Featured</span>
              <div className="mt-10">
                <h2 className="text-2xl md:text-4xl font-semibold tracking-[-0.03em] mb-4">{feature.title}</h2>
                <p className="body-large">{feature.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 label-system text-ink">
                  Read · {feature.readTime}
                  <Arrow className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </div>
          </Link>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {rest.map((res) => {
            const art = resourceArt[res.slug];
            return (
              <RevealItem key={res.slug} variant="blur">
                <Link href="/resources" className="accent-bar card-lift group flex flex-col h-full bg-canvas border border-line rounded-2xl overflow-hidden transition-colors duration-500 hover:bg-surface" style={{ ["--bar" as string]: art.tone }}>
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <AbstractMedia {...art} seed={res.slug} alt={res.title} className="transition-transform duration-700 ease-editorial group-hover:scale-105" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="label-system mb-3">{res.category} · {res.readTime}</span>
                    <h3 className="text-lg font-semibold tracking-[-0.02em] mb-2">{res.title}</h3>
                    <p className="body-large text-[0.88rem]">{res.excerpt}</p>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>

      <ProjectCTA />
    </>
  );
}
