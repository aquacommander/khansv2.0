"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navMenus } from "@/content/nav";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { MobileMenu } from "./mobile-menu";
import { MegaServices, MegaSolutions, MegaColumns } from "./mega-panels";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mega menu on route change.
  useEffect(() => setActive(null), [pathname]);

  const openMenu = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActive(key);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActive(null), 140);
  };

  const activeMenu = navMenus.find((m) => m.key === active);
  const solid = scrolled || active !== null;
  // Homepage opens on a dark video hero — use light header text until scrolled.
  const overDark = pathname === "/" && !solid;

  return (
    <>
      <div onMouseLeave={scheduleClose}>
        <header
          className={cn(
            "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-editorial",
            solid ? "bg-canvas/90 backdrop-blur-md border-b border-line" : "bg-transparent border-b border-transparent",
            overDark && "text-inverse-text",
          )}
        >
          <div className="shell flex items-center justify-between gap-6" style={{ height: "var(--header-h)" }}>
            <div className="flex items-center gap-7 xl:gap-10 min-w-0">
              <Link href="/" className="flex items-center shrink-0" aria-label="Khanstruct home" onMouseEnter={() => openMenu("__none")}>
                <Logo onDark={overDark} className="h-6 md:h-[26px]" />
              </Link>

              <nav className="hidden lg:flex items-center gap-x-5 xl:gap-x-6">
              {navMenus.map((menu) => (
                <Link
                  key={menu.key}
                  href={menu.href}
                  onMouseEnter={() => openMenu(menu.key)}
                  className={cn(
                    "label-system flex items-center gap-1 py-2 transition-colors whitespace-nowrap",
                    overDark
                      ? "!text-[color:rgba(243,242,238,0.82)] hover:!text-[color:var(--inverse-text)]"
                      : active === menu.key
                        ? "text-ink"
                        : "text-ink-muted hover:text-ink",
                  )}
                >
                  {menu.label}
                  <svg width="9" height="9" viewBox="0 0 10 10" className={cn("transition-transform duration-300", active === menu.key && "rotate-180")} aria-hidden>
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  </svg>
                </Link>
              ))}
              </nav>
            </div>

            <div className="flex items-center gap-5 shrink-0">
              <span
                className="hidden xl:flex items-center gap-2 label-system"
                style={overDark ? { color: "rgba(243,242,238,0.82)" } : undefined}
                onMouseEnter={() => openMenu("__none")}
              >
                <span className="h-1.5 w-1.5 rounded-full pulse-dot" style={{ background: "var(--status)" }} aria-hidden />
                {site.availability}
              </span>
              <Link href="/start" className="hidden sm:inline-flex btn btn--accent py-2.5 px-4" onMouseEnter={() => openMenu("__none")}>
                Start a project
              </Link>
              <button className="lg:hidden flex flex-col gap-1.5 p-1" onClick={() => setOpen(true)} aria-label="Open menu">
                <span className={cn("block h-px w-6", overDark ? "bg-inverse-text" : "bg-ink")} />
                <span className={cn("block h-px w-6", overDark ? "bg-inverse-text" : "bg-ink")} />
              </button>
            </div>
          </div>
        </header>

        {/* Mega-menu panel */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              key={activeMenu.key}
              className="fixed inset-x-0 z-40 hidden lg:block"
              style={{ top: "var(--header-h)" }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => openMenu(activeMenu.key)}
              onMouseLeave={scheduleClose}
            >
              <div className="shell pt-1.5 pb-6 flex justify-center">
                <div
                  className={cn(
                    "w-full bg-canvas border border-line rounded-2xl shadow-[0_24px_70px_-40px_rgba(0,0,0,0.35)] p-5 md:p-6 max-h-[78vh] overflow-y-auto",
                    activeMenu.type === "services"
                      ? "max-w-6xl"
                      : activeMenu.type === "solutions"
                        ? "max-w-2xl"
                        : (activeMenu.links?.length ?? 0) > 6
                          ? "max-w-3xl"
                          : "max-w-lg",
                  )}
                >
                  {activeMenu.type === "services" && <MegaServices onNavigate={() => setActive(null)} />}
                  {activeMenu.type === "solutions" && <MegaSolutions onNavigate={() => setActive(null)} />}
                  {activeMenu.type === "columns" && <MegaColumns menu={activeMenu} onNavigate={() => setActive(null)} />}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scrim behind the panel (visual only — never captures the pointer) */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              className="fixed inset-0 z-30 bg-ink/10 hidden lg:block pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
