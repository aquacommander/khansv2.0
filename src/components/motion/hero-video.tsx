"use client";

import { useEffect, useRef } from "react";

/**
 * Muted, looping background video for the hero.
 * - autoplays only when in view (pauses offscreen to save power)
 * - honours prefers-reduced-motion (stays on the poster frame)
 * - poster shows instantly while the video streams in
 */
export function HeroVideo({
  mp4,
  webm,
  poster,
  className,
}: {
  mp4: string;
  webm?: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const tryPlay = () => {
      el.play().catch(() => {
        /* autoplay can be blocked; poster remains visible */
      });
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else el.pause();
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    >
      {webm && <source src={webm} type="video/webm" />}
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
