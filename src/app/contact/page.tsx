import type { Metadata } from "next";
import { site } from "@/content/site";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Tell us what you're building. We read every inquiry and reply within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Start a project"
        index="Contact"
        titleLines={["Tell us what", "you're building."]}
        lead="Describe what you're building, what you've tried, and what's blocking you. We reply within one business day."
      />

      <div className="shell pb-24 md:pb-32">
        <div className="page-grid gap-y-16">
          {/* Contact info */}
          <div className="col-span-12 lg:col-span-4">
            <div className="border-t border-line pt-10 space-y-10">
              <div>
                <div className="label-system mb-3">Email</div>
                <a href={`mailto:${site.email}`} className="text-lg font-medium link-underline">
                  {site.email}
                </a>
              </div>
              <div>
                <div className="label-system mb-3">Phone</div>
                <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="text-lg font-medium link-underline">
                  {site.phone}
                </a>
              </div>
              <div>
                <div className="label-system mb-3">Studio</div>
                <p className="text-lg font-medium leading-snug">{site.location.address}</p>
              </div>
              <div>
                <div className="label-system mb-3">Availability</div>
                <p className="text-lg font-medium flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--status)" }} />
                  {site.availability}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="col-span-12 lg:col-start-6 lg:col-span-7">
            <div className="border-t border-line pt-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* Location */}
      <section className="bg-surface">
        <div className="shell py-24 md:py-32">
          <Reveal>
            <Eyebrow label="Where we are" index="Location" />
          </Reveal>
          <div className="page-grid mt-10 items-end">
            <div className="col-span-12 lg:col-span-7">
              <h2 className="heading-section">
                From {site.location.city}, <span className="italic-accent" style={{ fontWeight: 400 }}>to the world.</span>
              </h2>
            </div>
            <div className="col-span-12 lg:col-start-9 lg:col-span-4 mt-8 lg:mt-0 space-y-6">
              <div>
                <div className="label-system mb-2">Address</div>
                <p className="body-large text-[1rem] text-ink">{site.location.address}</p>
              </div>
              <div>
                <div className="label-system mb-2">Nearest</div>
                <p className="body-large text-[1rem] text-ink">{site.location.station}</p>
              </div>
              <div>
                <div className="label-system mb-2">Coordinates</div>
                <p className="body-large text-[1rem] text-ink tabular">{site.location.coordinates}</p>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(site.location.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex label-system text-ink link-underline"
              >
                Get directions →
              </a>
            </div>
          </div>

          <div className="relative h-[380px] md:h-[460px] overflow-hidden rounded-2xl border border-line mt-14">
            <iframe
              title={`Khanstruct studio — ${site.location.address}`}
              src={`https://maps.google.com/maps?q=${site.location.lat},${site.location.lng}&z=15&hl=en&output=embed`}
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
