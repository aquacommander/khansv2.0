import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, serviceCategories } from "@/content/services";
import { categoryArt } from "@/content/media";
import { AbstractMedia } from "@/components/ui/abstract-media";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectCTA } from "@/components/sections/project-cta";
import { Arrow, ButtonLink } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

export function generateStaticParams() {
  return serviceCategories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string };
}): Metadata {
  const cat = getCategory(params.category);
  if (!cat) return {};
  return { title: cat.title, description: cat.description };
}

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const cat = getCategory(params.category);
  if (!cat) notFound();

  const others = serviceCategories.filter((c) => c.slug !== cat.slug);

  return (
    <>
      <PageHeader
        eyebrow={cat.positioning}
        index={`Discipline ${cat.index}`}
        titleLines={[cat.title]}
        lead={cat.description}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: cat.title },
        ]}
      />

      <div className="shell pb-8">
        <ButtonLink href="/start" variant="solid">
          Start a {cat.title} project
        </ButtonLink>
      </div>

      <div className="shell pt-14">
        <Reveal>
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-line">
            <AbstractMedia {...categoryArt[cat.slug]} seed={`${cat.slug}-hero`} alt={cat.title} />
            <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(12,13,9,0.72), rgba(12,13,9,0) 45%)" }} />
            <span className="absolute bottom-6 left-6 label-system" style={{ color: "rgba(243,242,238,0.9)" }}>
              {cat.title} — {cat.services.length} services
            </span>
          </div>
        </Reveal>
      </div>

      {/* Service list */}
      <div className="shell py-16 md:py-24">
        <div className="label-system mb-8">{cat.services.length} services</div>
        <div className="border-t border-line">
          {cat.services.map((s, i) => (
            <Reveal key={s.slug} variant="scale">
              <Link
                href={`/services/${cat.slug}/${s.slug}`}
                className="zoom-row group grid grid-cols-12 gap-4 items-baseline border-b border-line py-8 hover:bg-surface px-4 md:px-6 -mx-4 md:-mx-6"
              >
                <span className="col-span-2 md:col-span-1 label-system">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="col-span-10 md:col-span-4 text-xl md:text-2xl font-semibold tracking-[-0.03em]">
                  {s.title}
                </span>
                <span className="col-span-12 md:col-span-6 body-large text-[0.98rem]">
                  {s.description}
                </span>
                <span className="col-span-12 md:col-span-1 flex md:justify-end">
                  <Arrow className="transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Other disciplines */}
      <div className="bg-surface">
        <div className="shell py-20 md:py-28">
          <div className="label-system mb-10">Other disciplines</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-line border border-line">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="zoom-in group bg-surface p-6 flex flex-col justify-between min-h-[140px] transition-colors duration-500 hover:bg-canvas"
              >
                <span className="label-system">{o.index}</span>
                <span className="font-medium tracking-[-0.02em] mt-8 flex items-center gap-2">
                  {o.title}
                  <Arrow className="opacity-0 transition-all duration-500 group-hover:opacity-100" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <ProjectCTA />
    </>
  );
}
