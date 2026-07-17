import { techStack } from "@/content/stack";
import { Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

const ACCENTS = [
  "var(--accent)",
  "var(--accent-2)",
  "var(--accent-3)",
  "var(--accent-4)",
  "var(--accent)",
  "var(--accent-2)",
];

export function TechStack() {
  return (
    <section className="shell py-24 md:py-36">
      <div className="page-grid items-end">
        <div className="col-span-12 lg:col-span-8">
          <Reveal variant="left">
            <Eyebrow label="Preferred tooling" index="Stack / 06" tone="var(--accent-2)" />
          </Reveal>
          <div className="mt-8">
            <SplitHeading
              as="h2"
              className="heading-section"
              lines={["Boring where it", "should be boring."]}
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 mt-8 lg:mt-0">
          <Reveal variant="right">
            <p className="body-large">
              We reach for proven tools and stay current on what&apos;s genuinely
              better. The stack serves the outcome, never the other way around.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 border-t border-line">
        {techStack.map((group, gi) => {
          const accent = ACCENTS[gi % ACCENTS.length];
          return (
            <Reveal key={group.label}>
              <div className="grid grid-cols-12 gap-4 items-baseline border-b border-line py-7">
                <div className="col-span-12 md:col-span-3 label-system flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ background: accent }}
                    aria-hidden
                  />
                  {group.label}
                </div>
                <div className="col-span-12 md:col-span-9 flex flex-wrap gap-2.5">
                  {group.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-line px-3.5 py-1.5 text-[0.92rem] font-medium tracking-[-0.01em] text-ink transition-colors duration-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
