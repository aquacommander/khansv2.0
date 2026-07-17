"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { commitments } from "@/content/process";
import { AbstractMedia, type ArtVariant } from "@/components/ui/abstract-media";
import { Arrow } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const SLIDE_MS = 5200;

const themes: { accent: string; variant: ArtVariant; tone: string }[] = [
  { accent: "var(--accent)", variant: "orbit", tone: "#cb5a2c" },
  { accent: "var(--accent-2)", variant: "circuit", tone: "#3a6ea5" },
  { accent: "var(--accent-4)", variant: "bars", tone: "#7a5ea8" },
];

export function CommitmentSlider() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1);
  const go = useCallback((next: number) => {
    setDir(next > active || (active === commitments.length - 1 && next === 0) ? 1 : -1);
    setActive((next + commitments.length) % commitments.length);
    setProgress(0);
  }, [active]);

  // Auto-advance with a progress bar.
  useEffect(() => {
    if (reduced || paused) return;
    let p = 0;
    let prev = performance.now();
    let id = 0;
    const loop = (now: number) => {
      const dt = now - prev;
      prev = now;
      p += (dt / SLIDE_MS) * 100;
      if (p >= 100) {
        p = 0;
        setDir(1);
        setActive((a) => (a + 1) % commitments.length);
      }
      setProgress(p);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [reduced, paused, active]);

  const theme = themes[active];
  const c = commitments[active];

  return (
    <div
      className="mt-16 border-t border-line pt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Curation tab list */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <ul className="flex flex-col">
            {commitments.map((item, i) => {
              const t = themes[i];
              const isActive = i === active;
              return (
                <li key={item.index}>
                  <button
                    onClick={() => go(i)}
                    className="group w-full text-left py-4 border-b border-line relative"
                    aria-current={isActive}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="font-mono text-xs transition-colors duration-300"
                        style={{ color: isActive ? t.accent : "var(--ink-muted)" }}
                      >
                        {item.index}
                      </span>
                      <span
                        className={cn(
                          "text-lg md:text-xl font-semibold tracking-[-0.02em] transition-colors duration-300",
                          isActive ? "text-ink" : "text-ink-muted group-hover:text-ink",
                        )}
                      >
                        {item.title}
                      </span>
                    </div>
                    {/* progress bar under the active tab */}
                    {isActive && (
                      <span className="absolute left-0 -bottom-px h-[2px] w-full overflow-hidden">
                        <span
                          className="block h-full"
                          style={{
                            width: `${reduced ? 100 : progress}%`,
                            background: t.accent,
                            transition: reduced ? undefined : "width 80ms linear",
                          }}
                        />
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Prev / next + counter */}
          <div className="flex items-center justify-between mt-8">
            <div className="label-system tabular">
              <span style={{ color: theme.accent }}>{c.index}</span> / {String(commitments.length).padStart(2, "0")}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => go(active - 1)}
                className="h-9 w-9 rounded-full border border-line flex items-center justify-center transition-colors hover:bg-surface rotate-180"
                aria-label="Previous"
              >
                <Arrow />
              </button>
              <button
                onClick={() => go(active + 1)}
                className="h-9 w-9 rounded-full border border-line flex items-center justify-center transition-colors hover:bg-surface"
                aria-label="Next"
              >
                <Arrow />
              </button>
            </div>
          </div>
        </div>

        {/* Sliding detail panel */}
        <div className="lg:col-span-8">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/50 min-h-[340px] md:min-h-[380px]">
            {/* Generated visual, crossfading per slide */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`bg-${active}`}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 0.9, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <AbstractMedia variant={theme.variant} tone={theme.tone} seed={`commit-${c.index}`} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(115deg, rgba(12,13,9,0.92) 30%, rgba(12,13,9,0.45) 100%)" }} />
              </motion.div>
            </AnimatePresence>

            {/* Sliding text content */}
            <div className="relative h-full p-8 md:p-12 text-inverse-text min-h-[340px] md:min-h-[380px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`slide-${active}`}
                  initial={{ opacity: 0, x: dir * 44 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -44 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-full flex flex-col justify-end"
                >
                  {/* watermark number */}
                  <span
                    className="absolute top-0 right-0 text-[7rem] md:text-[10rem] font-semibold leading-none tracking-[-0.05em] pointer-events-none"
                    style={{ color: theme.accent, opacity: 0.16 }}
                  >
                    {c.index}
                  </span>

                  <div className="max-w-xl">
                    <span
                      className="inline-block label-system rounded-full px-3 py-1 mb-5 font-semibold"
                      style={{ color: "#fff", background: theme.accent }}
                    >
                      Commitment {c.index}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] mb-4">
                      {c.title}
                    </h3>
                    <p className="body-large text-[1.05rem]" style={{ color: "rgba(243,242,238,0.85)" }}>
                      {c.body}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
