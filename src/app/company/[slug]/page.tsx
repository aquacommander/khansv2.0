import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { companyPages, getCompanyPage } from "@/content/company";
import { companyArt } from "@/content/media";
import { team } from "@/content/team";
import { AbstractMedia } from "@/components/ui/abstract-media";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectCTA } from "@/components/sections/project-cta";
import { TeamRoster } from "@/components/sections/team-roster";
import { Arrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

export function generateStaticParams() {
  return companyPages.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = getCompanyPage(params.slug);
  if (!page) return {};
  return { title: page.title, description: page.lead };
}

export default function CompanySubPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = getCompanyPage(params.slug);
  if (!page) notFound();
  const art = companyArt[page.slug];
  const others = companyPages.filter((p) => p.slug !== page.slug);

  return (
    <>
      <PageHeader
        eyebrow={page.tagline}
        index="Company"
        titleLines={[page.title]}
        lead={page.lead}
        crumbs={[{ label: "Company", href: "/company" }, { label: page.title }]}
      />

      <div className="shell pb-24 md:pb-32">
        <Reveal>
          <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-line mb-16">
            <AbstractMedia {...art} seed={`${page.slug}-hero`} alt={page.title} />
          </div>
        </Reveal>

        <div className="page-grid gap-y-12">
          <div className="col-span-12 lg:col-span-8">
            <div className="border-t border-line pt-10 space-y-6">
              {page.body.map((p, i) => (
                <Reveal key={i}>
                  <p className="body-large text-[1.15rem] text-ink">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-start-10 lg:col-span-3">
            <div className="border-t border-line pt-10">
              <div className="label-system mb-6">More</div>
              <ul>
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/company/${o.slug}`} className="zoom-row group flex items-center justify-between gap-3 border-b border-line py-4 px-3 -mx-3 hover:bg-surface">
                      <span className="font-medium tracking-[-0.02em] text-[0.95rem]">{o.title}</span>
                      <Arrow className="opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {page.slug === "team" && (
          <div className="mt-20">
            <Reveal>
              <div className="label-system mb-8" style={{ color: "var(--accent-2)" }}>
                The roster
              </div>
            </Reveal>
            <TeamRoster members={team} columns={4} />
          </div>
        )}
      </div>

      <ProjectCTA />
    </>
  );
}
