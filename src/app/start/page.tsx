import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHeader } from "@/components/layout/page-header";
import { Qualifier } from "@/components/funnel/qualifier";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Five short questions. We'll tell you which engagement fits and reply within one business day.",
};

export default function StartPage() {
  return (
    <>
      <PageHeader
        eyebrow="Five questions, two minutes"
        index="Start a project"
        titleLines={["Tell us what", "you're building."]}
        lead="No blank message box. Answer five short questions and we'll come back with the engagement that fits — and a real plan, not a brochure."
      />

      <section className="shell pb-24 md:pb-32">
        <div className="page-grid">
          <div className="col-span-12 lg:col-span-8">
            <div className="border-t border-line pt-12">
              <Qualifier />
            </div>
          </div>

          {/* Reassurance rail */}
          <aside className="col-span-12 lg:col-start-10 lg:col-span-3 mt-14 lg:mt-0">
            <Reveal variant="right">
              <div className="border-t border-line pt-12 space-y-8">
                <div>
                  <div className="label-system mb-2" style={{ color: "var(--accent)" }}>
                    Reply time
                  </div>
                  <p className="body-large text-[0.95rem] text-ink">
                    One business day, from an engineer.
                  </p>
                </div>
                <div>
                  <div className="label-system mb-2" style={{ color: "var(--accent-2)" }}>
                    No pressure
                  </div>
                  <p className="body-large text-[0.95rem]">
                    If we&apos;re not the right fit, we&apos;ll say so and point you somewhere better.
                  </p>
                </div>
                <div>
                  <div className="label-system mb-2" style={{ color: "var(--accent-3)" }}>
                    Prefer email?
                  </div>
                  <a href={`mailto:${site.email}`} className="body-large text-[0.95rem] text-ink link-underline">
                    {site.email}
                  </a>
                </div>
                <div>
                  <div className="label-system mb-2" style={{ color: "var(--accent-4)" }}>
                    Availability
                  </div>
                  <p className="body-large text-[0.95rem] text-ink">{site.availability}</p>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
