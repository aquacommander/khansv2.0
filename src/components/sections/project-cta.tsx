import { site } from "@/content/site";
import { ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

export function ProjectCTA() {
  return (
    <section className="bg-inverse text-inverse-text">
      <div className="shell py-24 md:py-36">
        <Reveal>
          <Eyebrow label="Start a project" index="Let's talk" dark tone="var(--accent)" />
        </Reveal>

        <div className="page-grid mt-10 items-end">
          <div className="col-span-12 lg:col-span-8">
            <SplitHeading
              as="h2"
              className="heading-section"
              lines={["Tell us what", "you're building."]}
            />
          </div>
          <div className="col-span-12 lg:col-span-4 mt-8 lg:mt-0">
            <p className="body-large" style={{ color: "var(--inverse-muted)" }}>
              What have you tried, and what&apos;s blocking you? Send it over. We read
              every message and reply within one business day.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row gap-4">
          <ButtonLink href="/start" variant="accent-inverse">
            Start a project
          </ButtonLink>
          <ButtonLink href="/solutions" variant="inverse">
            Book a sprint
          </ButtonLink>
        </div>

        <div
          className="mt-16 pt-6 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 label-system"
          style={{ borderColor: "var(--inverse-line)", color: "var(--inverse-muted)" }}
        >
          <span>{site.email}</span>
          <span>{site.availability}</span>
          <span>
            {site.location.city}, {site.location.region}
          </span>
        </div>
      </div>
    </section>
  );
}
