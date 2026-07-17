import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/content/work";
import { projectArt } from "@/content/media";
import { AbstractMedia } from "@/components/ui/abstract-media";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectCTA } from "@/components/sections/project-cta";
import { Reveal } from "@/components/motion/reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return {};
  return { title: p.title, description: p.summary };
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) notFound();

  const meta = [
    { label: "Industry", value: p.industry },
    { label: "Classification", value: p.classification },
    { label: "Location", value: p.location },
    { label: "Year", value: String(p.year) },
  ];

  return (
    <>
      <PageHeader
        eyebrow={p.classification}
        index={p.index}
        titleLines={[p.title]}
        lead={p.summary}
        crumbs={[{ label: "Work", href: "/work" }, { label: p.title }]}
      />

      <div className="shell pb-24 md:pb-32">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line mb-16">
            <AbstractMedia {...projectArt[p.slug]} seed={p.slug} alt={p.title} />
            <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(12,13,9,0.72), rgba(12,13,9,0) 45%)" }} />
            <span className="absolute bottom-6 left-6 label-system" style={{ color: "rgba(243,242,238,0.9)" }}>
              {p.title} — production system
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-line">
          {meta.map((m) => (
            <div key={m.label} className="border-b md:border-b-0 md:border-r border-line last:border-r-0 py-8 md:pr-6 md:pl-6 first:md:pl-0">
              <div className="label-system mb-3">{m.label}</div>
              <div className="text-lg font-medium tracking-[-0.02em]">{m.value}</div>
            </div>
          ))}
        </div>

        <div className="page-grid mt-20">
          <div className="col-span-12 lg:col-span-8">
            <Reveal>
              <p className="heading-sub font-normal text-ink" style={{ lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                {p.summary}
              </p>
              <p className="body-large mt-8 text-[1.05rem]">
                Delivered through the Khanstruct BuildLoop — discovery and mapping,
                incremental build with weekly demonstrations, evaluation and
                observability at launch, and a documented handover to the team that
                runs it today.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <ProjectCTA />
    </>
  );
}
