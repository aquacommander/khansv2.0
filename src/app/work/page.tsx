import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/work";
import { projectArt } from "@/content/media";
import { AbstractMedia } from "@/components/ui/abstract-media";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectCTA } from "@/components/sections/project-cta";
import { Arrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "A selection of systems Khanstruct has shipped to production across AI, data, and software.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Selected deployments"
        index="Work"
        titleLines={["Systems running", "in production."]}
        lead="A selection of what we've shipped. Every engagement is measured, documented, and handed over to the teams that run it."
      />

      <div className="shell pb-24 md:pb-32">
        <div className="hidden md:grid grid-cols-12 gap-4 label-system pb-4 border-b border-line-strong">
          <span className="col-span-1">Idx</span>
          <span className="col-span-4">Project</span>
          <span className="col-span-3">Industry</span>
          <span className="col-span-2">Classification</span>
          <span className="col-span-1">Location</span>
          <span className="col-span-1 text-right">Year</span>
        </div>
        <div>
          {projects.map((p) => (
            <Reveal key={p.slug} variant="scale">
              <Link
                href={`/work/${p.slug}`}
                className="zoom-row group grid grid-cols-12 gap-x-4 gap-y-1 items-center border-b border-line py-7 hover:bg-surface px-4 md:px-6 -mx-4 md:-mx-6"
              >
                <span className="col-span-2 md:col-span-1 label-system">{p.index}</span>
                <span className="col-span-10 md:col-span-4 text-lg md:text-2xl font-semibold tracking-[-0.02em] flex items-center gap-4">
                  <span className="relative h-11 w-16 overflow-hidden rounded-md shrink-0 border border-line">
                    <AbstractMedia {...projectArt[p.slug]} seed={p.slug} alt={p.title} />
                  </span>
                  {p.title}
                  <Arrow className="opacity-0 -translate-x-1 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0" />
                </span>
                <span className="col-span-6 md:col-span-3 body-large text-[0.9rem]">{p.industry}</span>
                <span className="col-span-6 md:col-span-2 label-system">{p.classification}</span>
                <span className="hidden md:block md:col-span-1 label-system">{p.location}</span>
                <span className="col-span-12 md:col-span-1 label-system md:text-right tabular">{p.year}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectCTA />
    </>
  );
}
