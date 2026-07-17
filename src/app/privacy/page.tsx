import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Khanstruct handles the information you share with us.",
};

const sections = [
  {
    h: "What we collect",
    p: "When you contact us, we collect the details you provide — name, email, company, and a description of your project. We also collect basic, privacy-respecting analytics about how the site is used.",
  },
  {
    h: "How we use it",
    p: "We use your information solely to respond to your inquiry, deliver work you've engaged us for, and improve the site. We do not sell your data.",
  },
  {
    h: "Data retention",
    p: "We retain inquiry data for as long as needed to serve you and meet our legal obligations, then delete it. You can request deletion at any time.",
  },
  {
    h: "Third parties",
    p: "We use a small number of processors (email, analytics, hosting) that handle data on our behalf under their own privacy terms. We choose vendors that take privacy seriously.",
  },
  {
    h: "Your rights",
    p: `You can request access to, correction of, or deletion of your data. Email ${site.email} and we'll respond promptly.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        index="Privacy"
        titleLines={["Privacy policy"]}
        lead="Plain-language summary of how we handle your information. This is a template — replace with counsel-reviewed policy before launch."
      />
      <div className="shell pb-24 md:pb-32 max-w-3xl">
        <div className="border-t border-line">
          {sections.map((s) => (
            <div key={s.h} className="border-b border-line py-10">
              <h2 className="heading-sub mb-4">{s.h}</h2>
              <p className="body-large text-[1.05rem] text-ink">{s.p}</p>
            </div>
          ))}
        </div>
        <p className="label-system mt-10">Last updated — 2026</p>
      </div>
    </>
  );
}
