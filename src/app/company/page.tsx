import type { Metadata } from "next";
import Link from "next/link";
import { companyPages } from "@/content/company";
import { companyArt } from "@/content/media";
import { AbstractMedia } from "@/components/ui/abstract-media";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectCTA } from "@/components/sections/project-cta";
import { Arrow } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Company",
  description:
    "A studio, not an agency. How Khanstruct works, what we believe, and who's behind the work.",
};

export default function CompanyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Company"
        index="Studio"
        titleLines={["A studio,", "not an agency."]}
        lead="Small, senior, and accountable to outcomes. Here's how we work and what we believe."
      />

      <div className="shell pb-24 md:pb-32">
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companyPages.map((page) => {
            const art = companyArt[page.slug];
            return (
              <RevealItem key={page.slug} variant="scale">
                <Link href={`/company/${page.slug}`} className="accent-bar card-lift group flex flex-col h-full bg-canvas border border-line rounded-2xl overflow-hidden transition-colors duration-500 hover:bg-surface" style={{ ["--bar" as string]: art.tone }}>
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <AbstractMedia {...art} seed={page.slug} alt={page.title} className="transition-transform duration-700 ease-editorial group-hover:scale-105" />
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <span className="label-system mb-3">{page.tagline}</span>
                    <h2 className="text-xl font-semibold tracking-[-0.02em] mb-2 flex items-center gap-2">
                      {page.title}
                      <Arrow className="opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </h2>
                    <p className="body-large text-[0.9rem]">{page.lead}</p>
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
