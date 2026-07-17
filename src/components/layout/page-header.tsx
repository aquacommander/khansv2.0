import Link from "next/link";
import { Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

export interface Crumb {
  label: string;
  href?: string;
}

export function PageHeader({
  eyebrow,
  index,
  titleLines,
  lead,
  crumbs,
}: {
  eyebrow: string;
  index?: string;
  titleLines: string[];
  lead?: string;
  crumbs?: Crumb[];
}) {
  return (
    <header className="shell pt-[calc(var(--header-h)+5rem)] md:pt-[calc(var(--header-h)+7rem)] pb-16 md:pb-20">
      {crumbs && (
        <Reveal>
          <nav className="label-system flex items-center gap-2 mb-10">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                {c.href ? (
                  <Link href={c.href} className="link-underline">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-ink">{c.label}</span>
                )}
                {i < crumbs.length - 1 && <span aria-hidden>/</span>}
              </span>
            ))}
          </nav>
        </Reveal>
      )}

      <Reveal>
        <Eyebrow label={eyebrow} index={index} />
      </Reveal>

      <div className="mt-8 max-w-5xl">
        <SplitHeading as="h1" className="heading-section" lines={titleLines} />
      </div>

      {lead && (
        <div className="page-grid mt-10">
          <div className="col-span-12 md:col-span-8 lg:col-span-6">
            <Reveal>
              <p className="body-large">{lead}</p>
            </Reveal>
          </div>
        </div>
      )}
    </header>
  );
}
