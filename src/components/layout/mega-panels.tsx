"use client";

import Link from "next/link";
import type { NavMenu } from "@/content/nav";
import { serviceCategories, totalServiceCount } from "@/content/services";
import { solutions } from "@/content/solutions";
import { categoryArt } from "@/content/media";
import { AbstractMedia } from "@/components/ui/abstract-media";
import { Arrow } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

function MenuHead({
  eyebrow,
  title,
  accent,
  viewAll,
  onNavigate,
}: {
  eyebrow: string;
  title: React.ReactNode;
  accent?: string;
  viewAll?: { label: string; href: string };
  onNavigate: () => void;
}) {
  return (
    <div className="flex items-end justify-between mb-4 pb-3 border-b border-line">
      <div>
        <div className="label-system mb-1.5 text-[0.62rem]">{eyebrow}</div>
        <h3 className="text-lg md:text-xl font-semibold tracking-[-0.03em]">
          {title}
          {accent && (
            <>
              {" "}
              <span className="italic-accent" style={{ fontWeight: 400 }}>{accent}</span>
            </>
          )}
        </h3>
      </div>
      {viewAll && (
        <Link href={viewAll.href} onClick={onNavigate} className="hidden md:inline-flex items-center gap-1.5 label-system text-ink link-underline">
          {viewAll.label} <Arrow />
        </Link>
      )}
    </div>
  );
}

/* ---------- What We Build: readable image cards ---------- */
export function MegaServices({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div>
      <MenuHead
        eyebrow={`Our expertise · ${totalServiceCount} services`}
        title="Ten disciplines,"
        accent="one team."
        viewAll={{ label: "View all services", href: "/services" }}
        onNavigate={onNavigate}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {serviceCategories.map((cat) => {
          const art = categoryArt[cat.slug];
          return (
            <Link
              key={cat.slug}
              href={`/services/${cat.slug}`}
              onClick={onNavigate}
              className="group flex flex-col rounded-xl border border-line overflow-hidden bg-canvas transition-colors duration-300 hover:bg-surface"
            >
              <div className="relative h-[76px] overflow-hidden">
                <AbstractMedia {...art} seed={cat.slug} alt={cat.title} className="transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-2 left-2 label-system text-[0.55rem] rounded-full bg-black/45 px-2 py-0.5" style={{ color: "rgba(243,242,238,0.92)" }}>
                  {cat.services.length} services
                </span>
              </div>
              <div className="p-3 flex flex-col flex-1">
                <div className="font-semibold text-[0.85rem] leading-tight tracking-[-0.02em] mb-2">
                  {cat.title}
                </div>
                <span className="mt-auto inline-flex items-center gap-1.5 label-system text-[0.58rem] text-ink-muted group-hover:text-ink transition-colors">
                  Learn more
                  <Arrow className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Custom solution bar */}
      <Link
        href="/start"
        onClick={onNavigate}
        className="mt-4 rounded-xl border border-line bg-surface/60 px-5 py-4 flex items-center justify-between gap-4 group transition-colors hover:bg-surface"
      >
        <div>
          <span className="font-semibold tracking-[-0.02em]">Need a custom solution?</span>
          <span className="body-large text-[0.85rem] ml-2 hidden sm:inline">
            Tell us the problem — we&apos;ll map it to the right disciplines.
          </span>
        </div>
        <span className="inline-flex items-center gap-2 label-system text-ink shrink-0">
          Book a consultation
          <Arrow className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </div>
  );
}

/* ---------- Solutions: two-column time-boxed list ---------- */
export function MegaSolutions({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div>
      <MenuHead
        eyebrow="Solutions · Sprints & Starters"
        title="Time-boxed engagements,"
        accent="clear outcomes."
        viewAll={{ label: "View all", href: "/solutions" }}
        onNavigate={onNavigate}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        {solutions.map((s) => (
          <Link
            key={s.slug}
            href={`/solutions/${s.slug}`}
            onClick={onNavigate}
            className="group flex gap-3.5 border-b border-line py-2 last:border-b-0 md:[&:nth-last-child(2)]:border-b-0"
          >
            <span className="label-system text-[0.58rem] whitespace-nowrap pt-1 w-12 shrink-0" style={{ color: "var(--status)" }}>
              {s.duration}
            </span>
            <span className="min-w-0">
              <span className="font-semibold tracking-[-0.02em] text-[0.88rem] flex items-center gap-2 leading-tight">
                {s.title}
                <Arrow className="opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0.5" />
              </span>
              <span className="text-ink-muted text-[0.74rem] block leading-tight mt-0.5 truncate">{s.outcome}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ---------- Generic columns (Industries, Demo Lab, Work, Resources, Company) ---------- */
export function MegaColumns({
  menu,
  onNavigate,
}: {
  menu: NavMenu;
  onNavigate: () => void;
}) {
  const links = menu.links ?? [];
  return (
    <div>
      {menu.intro && (
        <MenuHead
          eyebrow={menu.intro.eyebrow ?? ""}
          title={menu.intro.title}
          viewAll={menu.intro.viewAll}
          onNavigate={onNavigate}
        />
      )}

      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-0",
          links.length > 6 && "lg:grid-cols-3",
        )}
      >
        {links.map((link) => (
          <Link
            key={`${link.href}-${link.label}`}
            href={link.href}
            onClick={onNavigate}
            className="group border-b border-line py-2 flex items-center gap-2"
          >
            <span className="min-w-0 flex-1">
              <span className="font-semibold tracking-[-0.02em] text-[0.88rem] block leading-tight">{link.label}</span>
              {link.blurb && <span className="text-ink-muted text-[0.74rem] block leading-tight mt-0.5">{link.blurb}</span>}
            </span>
            <Arrow className="shrink-0 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
