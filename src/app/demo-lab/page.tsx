import type { Metadata } from "next";
import Link from "next/link";
import { demos } from "@/content/demos";
import { demoArt } from "@/content/media";
import { AbstractMedia } from "@/components/ui/abstract-media";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectCTA } from "@/components/sections/project-cta";
import { Arrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Demo Lab",
  description:
    "Working demonstrations of the systems Khanstruct builds — document AI, RAG knowledge bases, secure portals, and workflow automation.",
};

export default function DemoLabPage() {
  return (
    <>
      <PageHeader
        eyebrow="Demo Lab"
        index="Proof layer"
        titleLines={["See it work", "before you buy it."]}
        lead="Interactive demonstrations of the systems we build. Understand the shape of a solution in minutes — then talk to us about your version."
      />

      <div className="shell pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line">
          {demos.map((demo) => (
            <Reveal key={demo.slug}>
              <Link
                href={`/demo-lab/${demo.slug}`}
                className="group flex flex-col justify-between h-full bg-canvas transition-colors duration-500 hover:bg-surface"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <AbstractMedia {...demoArt[demo.slug]} seed={demo.slug} alt={demo.name} className="transition-transform duration-700 ease-editorial group-hover:scale-105" />
                  <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(12,13,9,0.6), rgba(12,13,9,0) 45%)" }} />
                  <span className="absolute top-5 left-5 label-system" style={{ color: "rgba(243,242,238,0.9)" }}>{demo.category}</span>
                  <Arrow className="absolute top-5 right-5 text-inverse-text transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <div className="p-8 md:p-10">
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] mb-3">
                    {demo.name}
                  </h2>
                  <p className="body-large text-[0.98rem] max-w-md">{demo.headline}</p>
                  <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 label-system">
                    {demo.tags.map((t) => (
                      <span key={t}>/ {t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectCTA />
    </>
  );
}
