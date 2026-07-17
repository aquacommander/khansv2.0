import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, serviceCategories } from "@/content/services";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectCTA } from "@/components/sections/project-cta";
import { Arrow, ButtonLink } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

export function generateStaticParams() {
  return serviceCategories.flatMap((c) =>
    c.services.map((s) => ({ category: c.slug, service: s.slug })),
  );
}

export function generateMetadata({
  params,
}: {
  params: { category: string; service: string };
}): Metadata {
  const found = getService(params.category, params.service);
  if (!found) return {};
  return {
    title: `${found.service.title} — ${found.category!.title}`,
    description: found.service.description,
  };
}

export default function ServicePage({
  params,
}: {
  params: { category: string; service: string };
}) {
  const found = getService(params.category, params.service);
  if (!found) notFound();
  const { category, service } = found;
  const related = category!.services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHeader
        eyebrow={category!.title}
        index="Service"
        titleLines={[service.title]}
        lead={service.description}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: category!.title, href: `/services/${category!.slug}` },
          { label: service.title },
        ]}
      />

      <div className="shell pb-24 md:pb-32">
        <div className="page-grid gap-y-12">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <div className="border-t border-line pt-10">
                <h2 className="heading-sub mb-6">How we approach it</h2>
                <div className="space-y-5 body-large text-[1.05rem]">
                  <p>
                    Every {service.title.toLowerCase()} engagement runs through the
                    Khanstruct BuildLoop — discovery, mapping, and design before a
                    line of production code, then incremental delivery with weekly
                    demonstrations.
                  </p>
                  <p>
                    We scope tightly, measure what we ship, and hand over
                    documentation and runbooks so your team owns the result. No
                    black boxes, no surprise reveals.
                  </p>
                </div>
                <div className="mt-10">
                  <ButtonLink href="/start" variant="solid">
                    Discuss this service
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-start-9 lg:col-span-4">
            <div className="border-t border-line pt-10">
              <div className="label-system mb-6">Related in {category!.title}</div>
              <ul className="flex flex-col">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/services/${category!.slug}/${r.slug}`}
                      className="zoom-row group flex items-center justify-between gap-3 border-b border-line py-4 px-3 -mx-3 hover:bg-surface"
                    >
                      <span className="font-medium tracking-[-0.02em]">{r.title}</span>
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
