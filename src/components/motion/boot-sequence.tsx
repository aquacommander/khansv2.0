"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { pad } from "@/lib/utils";

const MESSAGES = [
  "system.init()",
  `booting → /khanstruct ${site.version}`,
  "loading models…",
  "compiling interface…",
  "ready.",
];

export function BootSequence() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const [pct, setPct] = useState(0);
  const [msg, setMsg] = useState(0);

  useEffect(() => {
    const seen = sessionStorage.getItem("khanstruct-intro");
    if (seen || reduced) return;
    sessionStorage.setItem("khanstruct-intro", "1");
    setActive(true);
    document.documentElement.classList.add("no-scroll");

    const start = performance.now();
    const DURATION = 1700;
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      setPct(Math.round(eased * 100));
      setMsg(Math.min(MESSAGES.length - 1, Math.floor(eased * MESSAGES.length)));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setActive(false);
          document.documentElement.classList.remove("no-scroll");
        }, 260);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-inverse text-inverse-text"
          style={{ padding: "var(--shell-x)" }}
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between font-mono text-xs tracking-[0.14em] uppercase">
            <span>{site.legalName}</span>
            <span className="tabular">{pad(pct, 3)} / 100</span>
          </div>

          <div className="max-w-3xl">
            <div className="font-mono text-sm mb-6 h-6 tracking-[0.06em]" style={{ color: "var(--inverse-muted)" }}>
              {MESSAGES[msg]}
            </div>
            <div className="heading-sub" style={{ letterSpacing: "-0.03em" }}>
              Engineering intelligence into the everyday.
            </div>
          </div>

          <div>
            <div className="h-px w-full" style={{ background: "var(--inverse-line)" }}>
              <motion.div
                className="h-px bg-inverse-text"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-xs tracking-[0.14em] uppercase" style={{ color: "var(--inverse-muted)" }}>
              <span>
                {site.location.city} · {site.location.region}
              </span>
              <span>2026</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
