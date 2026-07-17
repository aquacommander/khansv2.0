import type { Metadata } from "next";
import Link from "next/link";
import { solutions } from "@/content/solutions";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectCTA } from "@/components/sections/project-cta";
import { Arrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Solutions — Sprints & Starters",
  description:
    "Fixed-scope engagements: sprints, starters, and assessments. Know the duration, the deliverables, and the outcome before you begin.",
};

const types = ["Sprint", "Starter", "Assessment"] as const;

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Productized engagements"
        index="Solutions"
        titleLines={["Know the scope.", "Know the outcome."]}
        lead="Services answer what we can do. Solutions answer what you can buy, how long it takes, and exactly what you'll receive."
      />

      <div className="shell pb-24 md:pb-32">
        {types.map((type) => {
          const items = solutions.filter((s) => s.type === type);
          return (
            <div key={type} className="border-t border-line py-14">
              <div className="label-system mb-10">
                {type}s — {items.length}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
                {items.map((s) => (
                  <Reveal key={s.slug}>
                    <Link
                      href={`/solutions/${s.slug}`}
                      className="group flex flex-col justify-between h-full bg-canvas p-8 transition-colors duration-500 hover:bg-surface min-h-[280px]"
                    >
                      <div className="flex items-center justify-between label-system">
                        <span>{s.type}</span>
                        <span>{s.duration}</span>
                      </div>
                      <div className="mt-12">
                        <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.03em] mb-3">
                          {s.title}
                        </h3>
                        <p className="body-large text-[0.95rem]">{s.outcome}</p>
                        <span className="mt-6 inline-flex items-center gap-2 label-system text-ink">
                          View engagement
                          <Arrow className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <ProjectCTA />
    </>
  );
}
