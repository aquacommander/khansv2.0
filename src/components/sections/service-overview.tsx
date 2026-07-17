import Link from "next/link";
import { serviceCategories, totalServiceCount } from "@/content/services";
import { categoryArt } from "@/content/media";
import { AbstractMedia } from "@/components/ui/abstract-media";
import { Arrow, Eyebrow } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

export function ServiceOverview() {
  return (
    <section className="shell py-24 md:py-36">
      <div className="page-grid items-end">
        <div className="col-span-12 lg:col-span-8">
          <Reveal>
            <Eyebrow label={`What we build · ${totalServiceCount} services`} index="Services / 02" tone="var(--accent-2)" />
          </Reveal>
          <div className="mt-8">
            <SplitHeading as="h2" className="heading-section" lines={["Ten disciplines,", "one team."]} />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 mt-8 lg:mt-0">
          <Reveal variant="right">
            <p className="body-large">
              {totalServiceCount} services across ten technical disciplines —
              engineered to the same production standard.
            </p>
            <Link href="/services" className="mt-6 inline-flex items-center gap-2 label-system text-accent hover-accent link-underline">
              View all services <Arrow />
            </Link>
          </Reveal>
        </div>
      </div>

      <RevealGroup className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {serviceCategories.map((cat) => {
          const art = categoryArt[cat.slug];
          return (
            <RevealItem key={cat.slug} variant="scale">
              <Link
                href={`/services/${cat.slug}`}
                className="accent-bar card-lift group relative overflow-hidden rounded-2xl aspect-[3/4] flex flex-col justify-between p-5 text-inverse-text"
                style={{ ["--bar" as string]: art.tone }}
              >
                <div className="absolute inset-0 transition-transform duration-700 ease-editorial group-hover:scale-[1.04]">
                  <AbstractMedia {...art} seed={cat.slug} alt={cat.title} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(12,13,9,0.9), rgba(12,13,9,0.1))" }} />
                </div>
                <div className="relative">
                  <span
                    className="inline-block label-system rounded-full px-2.5 py-1 text-[0.6rem] font-semibold"
                    style={{ color: "#fff", background: art.tone }}
                  >
                    {cat.services.length} services
                  </span>
                </div>
                <div className="relative">
                  <div className="font-semibold tracking-[-0.02em] leading-tight mb-1.5">{cat.title}</div>
                  <span className="inline-flex items-center gap-1.5 label-system text-[0.6rem]" style={{ color: "rgba(243,242,238,0.78)" }}>
                    Learn more
                    <Arrow className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}
