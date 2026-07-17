"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/logo";

/**
 * Full-screen intro that plays the branded logo-reveal video the first time
 * a visitor lands (once per session). Fades out when the video ends or the
 * visitor skips. Skipped entirely under prefers-reduced-motion.
 */
export function IntroSplash() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reduced) return;
    if (sessionStorage.getItem("khanstruct-intro")) return;
    sessionStorage.setItem("khanstruct-intro", "1");
    setActive(true);
    document.documentElement.classList.add("no-scroll");
  }, [reduced]);

  const dismiss = () => {
    setActive(false);
    document.documentElement.classList.remove("no-scroll");
  };

  useEffect(() => {
    if (!active) return;
    // Safety: never trap the visitor if the video stalls.
    const max = setTimeout(dismiss, 11000);
    videoRef.current?.play().catch(() => dismiss());
    return () => clearTimeout(max);
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[120] bg-black flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <video
            ref={videoRef}
            className="h-full w-full object-contain"
            src="/media/intro.mp4"
            muted
            playsInline
            autoPlay
            preload="auto"
            onEnded={dismiss}
            aria-hidden="true"
          />

          {/* Skip */}
          <button
            onClick={dismiss}
            className="absolute bottom-8 right-8 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white/70 hover:text-white transition-colors flex items-center gap-2"
          >
            Skip intro
            <span className="inline-block h-px w-6 bg-white/50" />
          </button>

          {/* Brand tag */}
          <div className="absolute bottom-8 left-8 flex items-center gap-3">
            <Logo onDark className="h-5" />
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white/50">Studio</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
