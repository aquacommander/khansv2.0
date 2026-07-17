import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getIndustry, industries } from "@/content/industries";
import { industryArt } from "@/content/media";
import { AbstractMedia } from "@/components/ui/abstract-media";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectCTA } from "@/components/sections/project-cta";
import { Arrow, ButtonLink } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const ind = getIndustry(params.slug);
  if (!ind) return {};
  return { title: `${ind.title} — Industries`, description: ind.description };
}

export default function IndustryPage({
  params,
}: {
  params: { slug: string };
}) {
  const ind = getIndustry(params.slug);
  if (!ind) notFound();
  const art = industryArt[ind.slug];
  const others = industries.filter((i) => i.slug !== ind.slug).slice(0, 6);

  return (
    <>
      <PageHeader
        eyebrow={ind.blurb}
        index="Industry"
        titleLines={[ind.title]}
        lead={ind.description}
        crumbs={[{ label: "Industries", href: "/industries" }, { label: ind.title }]}
      />

      <div className="shell pb-24 md:pb-32">
        <Reveal>
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-line mb-16">
            <AbstractMedia {...art} seed={`${ind.slug}-hero`} alt={ind.title} />
          </div>
        </Reveal>

        <div className="page-grid gap-y-12">
          <div className="col-span-12 lg:col-span-7">
            <div className="border-t border-line pt-10">
              <h2 className="heading-sub mb-6">What we typically build</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                {ind.needs.map((n) => (
                  <div key={n} className="flex gap-3 border-b border-line py-4 body-large text-[1rem] text-ink">
                    <span className="text-status">—</span>
                    {n}
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <ButtonLink href="/start" variant="solid">
                  Talk about {ind.title.toLowerCase()}
                </ButtonLink>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-start-9 lg:col-span-4">
            <div className="border-t border-line pt-10">
              <div className="label-system mb-6">Other industries</div>
              <ul>
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/industries/${o.slug}`} className="zoom-row group flex items-center justify-between gap-3 border-b border-line py-4 px-3 -mx-3 hover:bg-surface">
                      <span className="font-medium tracking-[-0.02em]">{o.title}</span>
                      <Arrow className="opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ProjectCTA />
    </>
  );
}
