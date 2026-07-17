import { team } from "@/content/team";
import { Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { CommitmentSlider } from "./commitment-slider";
import { TeamRoster } from "./team-roster";

export function About() {
  return (
    <section className="shell py-24 md:py-36">
      <Reveal>
        <Eyebrow label="A studio building intelligence as infrastructure" index="About / 01" tone="var(--accent)" />
      </Reveal>

      <div className="page-grid mt-12">
        <div className="col-span-12 lg:col-span-9">
          <SplitHeading
            as="h2"
            className="heading-section"
            lines={[
              "We treat AI as an",
              "engineering medium —",
              "not a demo.",
            ]}
          />
        </div>
      </div>

      <div className="page-grid mt-10">
        <div className="col-span-12 md:col-span-8 lg:col-start-5 lg:col-span-6">
          <Reveal variant="blur">
            <p className="body-large">
              Models are only useful once they become infrastructure: evaluated,
              monitored, and reliable enough to trust in production. We build
              systems designed to survive hype cycles and keep delivering
              commercial outcomes long after launch.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Team */}
      <div className="mt-24 md:mt-28">
        <Reveal>
          <Eyebrow label="The people behind the work" index="The team" tone="var(--accent-2)" />
        </Reveal>

        {/* Founder quote */}
        <div className="page-grid mt-10">
          <div className="col-span-12 lg:col-span-9">
            <Reveal variant="blur">
              <blockquote className="heading-sub font-normal text-ink" style={{ lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                &ldquo;I started Khanstruct to build AI and software the way it should be
                built — measured, reliable, and accountable to a real outcome. Every
                engagement gets senior review, because that&apos;s the only way to ship
                something that lasts.&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-4">
                <span className="h-px w-10" style={{ background: "var(--accent)" }} />
                <div>
                  <span className="font-semibold tracking-[-0.02em]">Zain Khan</span>
                  <span className="label-system ml-3" style={{ color: "var(--accent)" }}>Founder</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Compact roster */}
        <div className="mt-14">
          <TeamRoster members={team} columns={4} />
        </div>
      </div>

      <div className="mt-24 md:mt-28">
        <Reveal>
          <Eyebrow label="Our operating commitments" index="How we work" tone="var(--accent-4)" />
        </Reveal>
        <CommitmentSlider />
      </div>
    </section>
  );
}
