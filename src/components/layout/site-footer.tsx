import Link from "next/link";
import { footerColumns, site, socials } from "@/content/site";
import { Arrow } from "@/components/ui/primitives";
import { Logo } from "@/components/ui/logo";
import { SocialIcon } from "@/components/ui/social-icons";
import { LocationClock } from "./location-clock";

export function SiteFooter() {
  return (
    <footer className="bg-inverse text-inverse-text">
      <div className="shell py-20 md:py-28">
        <div className="page-grid gap-y-14">
          {/* Brand + signal */}
          <div className="col-span-12 lg:col-span-6">
            <Logo onDark className="h-9 mb-6" />
            <p className="body-large max-w-md" style={{ color: "var(--inverse-muted)" }}>
              {site.tagline} A studio building AI systems, data platforms, and
              software that hold up in production.
            </p>

            <form
              className="mt-10 flex items-center gap-3 border-b pb-3 max-w-md"
              style={{ borderColor: "var(--inverse-line)" }}
              action="/contact"
            >
              <input
                type="email"
                placeholder="Subscribe to Signal — email"
                className="flex-1 bg-transparent outline-none text-inverse-text placeholder:text-[color:var(--inverse-muted)] text-sm"
                aria-label="Email for newsletter"
              />
              <button type="submit" aria-label="Subscribe" className="text-inverse-text">
                <Arrow />
              </button>
            </form>

            {/* Social */}
            <div className="mt-10 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5"
                  style={{ borderColor: "var(--inverse-line)", color: "var(--inverse-muted)" }}
                >
                  <SocialIcon
                    name={s.key}
                    className="h-[15px] w-[15px] transition-colors duration-300 group-hover:text-[color:var(--inverse-text)]"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title} className="col-span-6 sm:col-span-4 lg:col-span-2">
              <div className="label-system mb-6" style={{ color: "var(--inverse-muted)" }}>
                {col.title}
              </div>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="link-underline text-[0.95rem]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div
          className="mt-20 pt-6 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-4 label-system"
          style={{ borderColor: "var(--inverse-line)", color: "var(--inverse-muted)" }}
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© 2026 {site.legalName}</span>
            <Link href="/privacy" className="link-underline">
              Privacy
            </Link>
            <Link href="/terms" className="link-underline">
              Terms
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <LocationClock />
            <span className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--status)" }}
                aria-hidden
              />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
