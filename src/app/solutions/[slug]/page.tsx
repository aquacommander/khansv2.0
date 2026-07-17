import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSolution, solutions } from "@/content/solutions";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectCTA } from "@/components/sections/project-cta";
import { ButtonLink } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const s = getSolution(params.slug);
  if (!s) return {};
  return { title: `${s.title} — ${s.type}`, description: s.outcome };
}

export default function SolutionPage({
  params,
}: {
  params: { slug: string };
}) {
  const s = getSolution(params.slug);
  if (!s) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`${s.type} · ${s.duration}`}
        index={s.priceLabel}
        titleLines={[s.title]}
        lead={s.outcome}
        crumbs={[
          { label: "Solutions", href: "/solutions" },
          { label: s.title },
        ]}
      />

      <div className="shell pb-24 md:pb-32">
        <div className="page-grid gap-y-14">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <div className="border-t border-line pt-10">
                <h2 className="heading-sub mb-6">What it is</h2>
                <p className="body-large text-[1.05rem]">{s.description}</p>
                <div className="mt-10">
                  <ButtonLink href="/start" variant="solid">
                    Book this engagement
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-start-9 lg:col-span-4 space-y-12">
            <Reveal>
              <div className="border-t border-line pt-10">
                <div className="label-system mb-6">You receive</div>
                <ul className="space-y-3">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-3 body-large text-[0.98rem]">
                      <span className="text-status mt-1">—</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal>
              <div className="border-t border-line pt-10">
                <div className="label-system mb-6">Ideal for</div>
                <div className="flex flex-wrap gap-2">
                  {s.idealFor.map((f) => (
                    <span
                      key={f}
                      className="label-system border border-line rounded-full px-3 py-1.5"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <ProjectCTA />
    </>
  );
}
