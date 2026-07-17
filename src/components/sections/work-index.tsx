import Link from "next/link";
import { projects, workArchiveCount } from "@/content/work";
import { projectArt } from "@/content/media";
import { AbstractMedia } from "@/components/ui/abstract-media";
import { Arrow, Eyebrow } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

const VARIANTS = ["scale", "up", "blur"] as const;

export function WorkIndex() {
  return (
    <section className="bg-surface">
      <div className="shell py-24 md:py-36">
        <div className="page-grid items-end">
          <div className="col-span-12 lg:col-span-8">
            <Reveal variant="left">
              <Eyebrow label="Selected deployments" index="Work / 05" tone="var(--accent-4)" />
            </Reveal>
            <div className="mt-8">
              <SplitHeading
                as="h2"
                className="heading-section"
                lines={["Systems running", "in production."]}
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 mt-8 lg:mt-0">
            <Reveal variant="right">
              <Link href="/work" className="inline-flex items-center gap-2 label-system text-accent-4 link-underline">
                View archive ({workArchiveCount}) <Arrow />
              </Link>
            </Reveal>
          </div>
        </div>

        <RevealGroup className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => {
            const tone = projectArt[p.slug].tone;
            return (
              <RevealItem key={p.slug} variant={VARIANTS[i % VARIANTS.length]}>
                <Link
                  href={`/work/${p.slug}`}
                  className="accent-bar card-lift group flex flex-col h-full bg-canvas border border-line rounded-2xl overflow-hidden transition-colors duration-500 hover:bg-canvas"
                  style={{ ["--bar" as string]: tone }}
                >
                  {/* Large image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <AbstractMedia {...projectArt[p.slug]} seed={p.slug} alt={p.title} className="transition-transform duration-700 ease-editorial group-hover:scale-[1.05]" />
                    <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(12,13,9,0.6), rgba(12,13,9,0) 55%)" }} />
                    <span
                      className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full font-mono text-[0.62rem] font-semibold"
                      style={{ background: tone, color: "#0c0d09" }}
                    >
                      {p.index}
                    </span>
                    <span className="absolute bottom-4 left-4 label-system tabular" style={{ color: "rgba(243,242,238,0.9)" }}>
                      {p.location} · {p.year}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <span
                      className="self-start label-system font-semibold rounded-full px-2.5 py-1 mb-3"
                      style={{ color: tone, background: `color-mix(in srgb, ${tone} 13%, transparent)` }}
                    >
                      {p.classification}
                    </span>
                    <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] mb-2 flex items-center gap-2">
                      {p.title}
                      <Arrow className="opacity-0 transition-all duration-500 ease-editorial group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </h3>
                    <p className="body-large text-[0.9rem]">{p.summary}</p>
                    <div className="mt-4 pt-4 border-t border-line label-system">{p.industry}</div>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
