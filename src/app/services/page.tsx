import type { Metadata } from "next";
import Link from "next/link";
import { serviceCategories, totalServiceCount } from "@/content/services";
import { categoryArt } from "@/content/media";
import { AbstractMedia } from "@/components/ui/abstract-media";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectCTA } from "@/components/sections/project-cta";
import { Arrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "What We Build",
  description:
    "Khanstruct builds across ten technical disciplines — AI, product, data, cloud, and more — all to a single production standard.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What we build"
        index={`${totalServiceCount} services`}
        titleLines={["Ten disciplines.", "One standard."]}
        lead="A complete engineering studio. Pick the capability you need, or bring us the problem and we'll tell you which ones it touches."
      />

      <div className="shell pb-24 md:pb-32">
        {serviceCategories.map((cat) => (
          <Reveal key={cat.slug}>
            <div className="border-t border-line py-14 md:py-16 page-grid gap-y-8">
              <div className="col-span-12 md:col-span-4">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line mb-6">
                  <AbstractMedia {...categoryArt[cat.slug]} seed={cat.slug} alt={cat.title} />
                </div>
                <div className="label-system mb-5 flex items-center gap-3">
                  <span className="text-ink">{cat.index}</span>
                  <span>{cat.services.length} services</span>
                </div>
                <h2 className="heading-sub mb-4">{cat.title}</h2>
                <p className="body-large text-[0.98rem] mb-6">{cat.description}</p>
                <Link
                  href={`/services/${cat.slug}`}
                  className="inline-flex items-center gap-2 label-system text-ink link-underline"
                >
                  Explore {cat.title} <Arrow />
                </Link>
              </div>

              <div className="col-span-12 md:col-start-6 md:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-line">
                  {cat.services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${cat.slug}/${s.slug}`}
                      className="zoom-row group border-b border-line sm:odd:border-r py-5 px-4 sm:px-5 flex items-start justify-between gap-4 hover:bg-surface"
                    >
                      <div>
                        <div className="font-medium tracking-[-0.02em] mb-1">{s.title}</div>
                        <div className="body-large text-[0.85rem]">{s.description}</div>
                      </div>
                      <Arrow className="mt-1 shrink-0 opacity-0 transition-all duration-500 ease-editorial group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <ProjectCTA />
    </>
  );
}
