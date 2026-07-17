import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Terms",
  description: "The terms that govern use of the Khanstruct website.",
};

const sections = [
  {
    h: "Use of this site",
    p: "This website is provided for informational purposes. By using it, you agree to use it lawfully and not to disrupt or misuse the service.",
  },
  {
    h: "Intellectual property",
    p: "The Khanstruct name, brand, copy, and original media on this site are our property. Don't reproduce them without permission.",
  },
  {
    h: "Engagements",
    p: "Nothing on this site is a binding offer. Project work is governed by a separate written agreement that defines scope, deliverables, and terms.",
  },
  {
    h: "No warranty",
    p: "This site is provided “as is,” without warranties of any kind. We work to keep it accurate and available but can't guarantee it.",
  },
  {
    h: "Limitation of liability",
    p: "To the extent permitted by law, we are not liable for indirect or consequential damages arising from use of this site.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        index="Terms"
        titleLines={["Terms of use"]}
        lead="Template terms of use. Replace with counsel-reviewed terms before launch."
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
