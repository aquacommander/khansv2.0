import type { Metadata } from "next";
import Link from "next/link";
import { industries } from "@/content/industries";
import { industryArt } from "@/content/media";
import { AbstractMedia } from "@/components/ui/abstract-media";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectCTA } from "@/components/sections/project-cta";
import { Arrow } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Software and AI systems built for how your industry actually works — from startups and agencies to healthcare, fintech, and logistics.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        index={`${industries.length} sectors`}
        titleLines={["Software for how", "you actually work."]}
        lead="We adapt the same production standard to the realities of your sector — the workflows, constraints, and language your team already lives in."
      />

      <div className="shell pb-24 md:pb-32">
        <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {industries.map((ind) => {
            const art = industryArt[ind.slug];
            return (
              <RevealItem key={ind.slug} variant="scale">
                <Link
                  href={`/industries/${ind.slug}`}
                  className="accent-bar card-lift group flex flex-col h-full bg-canvas border border-line rounded-2xl overflow-hidden transition-colors duration-500 hover:bg-surface"
                  style={{ ["--bar" as string]: art.tone }}
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <AbstractMedia {...art} seed={ind.slug} alt={ind.title} className="transition-transform duration-700 ease-editorial group-hover:scale-105" />
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h2 className="text-xl font-semibold tracking-[-0.02em] mb-2 flex items-center gap-2">
                      {ind.title}
                      <Arrow className="opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </h2>
                    <p className="body-large text-[0.9rem]">{ind.blurb}</p>
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
