import Link from "next/link";
import { demos } from "@/content/demos";
import { demoArt } from "@/content/media";
import { AbstractMedia } from "@/components/ui/abstract-media";
import { Arrow, Eyebrow } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

export function DemoGrid() {
  return (
    <section className="shell py-24 md:py-36">
      <div className="page-grid items-end">
        <div className="col-span-12 lg:col-span-8">
          <Reveal>
            <Eyebrow label="Demo Lab" index="Proof / 04" tone="var(--accent)" />
          </Reveal>
          <div className="mt-8">
            <SplitHeading
              as="h2"
              className="heading-section"
              lines={["Explore it before", "you commission it."]}
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 mt-8 lg:mt-0">
          <p className="body-large">
            Working demonstrations of the systems we build. Not slideware —
            interactive proof you can understand in minutes.
          </p>
        </div>
      </div>

      <RevealGroup className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line">
        {demos.map((demo) => (
          <RevealItem key={demo.slug} variant="blur">
            <Link
              href={`/demo-lab/${demo.slug}`}
              className="accent-bar group flex flex-col h-full bg-canvas overflow-hidden transition-colors duration-500 ease-editorial hover:bg-surface"
              style={{ ["--bar" as string]: demoArt[demo.slug].tone }}
            >
              {/* Large preview image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <AbstractMedia {...demoArt[demo.slug]} seed={demo.slug} alt={demo.name} className="transition-transform duration-700 ease-editorial group-hover:scale-[1.04]" />
                <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(12,13,9,0.55), rgba(12,13,9,0) 55%)" }} />
                <span
                  className="absolute top-5 left-5 label-system font-semibold rounded-full px-3 py-1.5"
                  style={{ color: "#fff", background: demoArt[demo.slug].tone }}
                >
                  {demo.category}
                </span>
              </div>

              <div className="p-8 md:p-10 flex flex-col flex-1">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] mb-3">
                  {demo.name}
                </h3>
                <p className="body-large text-[0.98rem] max-w-md">{demo.headline}</p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-x-3 gap-y-1 label-system">
                    {demo.tags.map((t) => (
                      <span key={t}>/ {t}</span>
                    ))}
                  </div>
                  <span
                    className="inline-flex items-center gap-2 label-system font-semibold shrink-0"
                    style={{ color: demoArt[demo.slug].tone }}
                  >
                    Launch
                    <Arrow className="transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
