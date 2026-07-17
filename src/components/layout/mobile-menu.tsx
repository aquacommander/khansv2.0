"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navMenus } from "@/content/nav";
import { serviceCategories } from "@/content/services";
import { solutions } from "@/content/solutions";
import { site } from "@/content/site";
import { Logo } from "@/components/ui/logo";
import { pad } from "@/lib/utils";

function childrenFor(key: string): { label: string; href: string }[] {
  if (key === "services")
    return serviceCategories.map((c) => ({ label: c.title, href: `/services/${c.slug}` }));
  if (key === "solutions")
    return solutions.map((s) => ({ label: s.title, href: `/solutions/${s.slug}` }));
  const menu = navMenus.find((m) => m.key === key);
  return (menu?.links ?? []).map((l) => ({ label: l.label, href: l.href }));
}

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("no-scroll", open);
    return () => document.documentElement.classList.remove("no-scroll");
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] bg-inverse text-inverse-text lg:hidden flex flex-col"
          style={{ padding: "var(--shell-x)" }}
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between shrink-0" style={{ height: "var(--header-h)" }}>
            <Logo onDark className="h-6" />
            <button onClick={onClose} className="label-system text-inverse-text" aria-label="Close menu">
              Close ×
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto mt-4">
            {navMenus.map((menu, i) => {
              const kids = childrenFor(menu.key);
              const isOpen = expanded === menu.key;
              return (
                <div key={menu.key} className="border-t" style={{ borderColor: "var(--inverse-line)" }}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={menu.href}
                      onClick={onClose}
                      className="flex items-baseline gap-4 py-4 flex-1"
                    >
                      <span className="font-mono text-xs" style={{ color: "var(--inverse-muted)" }}>{pad(i + 1)}</span>
                      <span className="text-2xl font-semibold tracking-[-0.03em]">{menu.label}</span>
                    </Link>
                    {kids.length > 0 && (
                      <button
                        onClick={() => setExpanded(isOpen ? null : menu.key)}
                        className="p-3 text-2xl leading-none"
                        style={{ transform: isOpen ? "rotate(45deg)" : "none", transition: "transform .4s" }}
                        aria-label={`Toggle ${menu.label}`}
                      >
                        +
                      </button>
                    )}
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 pl-9 flex flex-col gap-2.5">
                          {kids.map((k) => (
                            <Link key={k.href + k.label} href={k.href} onClick={onClose} className="body-large text-[0.95rem]" style={{ color: "var(--inverse-muted)" }}>
                              {k.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="flex flex-col gap-4 pt-4 shrink-0">
            <Link href="/start" onClick={onClose} className="btn btn--inverse justify-center">
              Start a project
            </Link>
            <div className="flex items-center justify-between label-system" style={{ color: "var(--inverse-muted)" }}>
              <span>{site.email}</span>
              <span>{site.availability}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
