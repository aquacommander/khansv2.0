"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import { heroMetrics } from "@/content/stack";
import { ButtonLink } from "@/components/ui/primitives";
import { HeroVideo } from "@/components/motion/hero-video";
import { EASE } from "@/lib/motion";

const line = {
  hidden: { y: "110%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, ease: EASE, delay: 0.15 + i * 0.09 },
  }),
};

function Masked({ children, i }: { children: React.ReactNode; i: number }) {
  return (
    <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.05em" }}>
      <motion.span
        style={{ display: "block", willChange: "transform" }}
        variants={line}
        custom={i}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end pb-14 pt-[calc(var(--header-h)+2rem)] overflow-hidden bg-inverse text-inverse-text">
      {/* Background video — team collaborating on a plan */}
      <div className="absolute inset-0 z-0">
        <HeroVideo
          mp4="/media/hero/team.mp4"
          webm="/media/hero/team.webm"
          poster="/media/hero/team-poster.jpg"
          className="h-full w-full object-cover"
        />
        {/* Scrims for legibility: darken toward the bottom + a slight global tint */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(12,13,9,0.94) 6%, rgba(12,13,9,0.55) 42%, rgba(12,13,9,0.42) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 90% at 20% 100%, rgba(12,13,9,0.6), transparent 60%)" }}
        />
      </div>

      <div className="shell w-full relative z-10">
        {/* Metadata row */}
        <motion.div
          className="flex flex-wrap items-center gap-x-8 gap-y-2 label-system mb-10 [&_*]:!text-[color:var(--inverse-text)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full pulse-dot" style={{ background: "var(--status)" }} />
            {site.availability}
          </span>
          <span>AI · Software · Data Studio</span>
          <span className="hidden sm:inline" style={{ color: "var(--inverse-muted)" }}>
            Est. {site.location.city} — {site.version} · Operational
          </span>
        </motion.div>

        {/* Display headline */}
        <h1 className="heading-display">
          <Masked i={0}>ENGINEERING</Masked>
          <Masked i={1}>
            <span className="italic-accent" style={{ fontWeight: 400, color: "var(--accent)" }}>
              intelligence
            </span>
          </Masked>
          <Masked i={2}>AT SCALE.</Masked>
        </h1>

        {/* Positioning + actions */}
        <div className="page-grid mt-12 items-end">
          <motion.div
            className="col-span-12 md:col-span-6 lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          >
            <p className="body-large" style={{ color: "rgba(243,242,238,0.82)" }}>
              Khanstruct builds production-grade AI systems, autonomous agents,
              and decision platforms — designed, measured, and shipped by senior
              engineers.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/start" variant="accent">
                Start a project
              </ButtonLink>
              <ButtonLink href="/demo-lab" variant="inverse">
                Explore the Demo Lab
              </ButtonLink>
            </div>
          </motion.div>

          {/* Metrics */}
          <motion.div
            className="col-span-12 md:col-span-6 lg:col-start-8 lg:col-span-5 mt-10 md:mt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.75 }}
          >
            <div className="grid grid-cols-3 gap-4 border-t pt-6" style={{ borderColor: "var(--inverse-line)" }}>
              {heroMetrics.map((m, i) => (
                <div key={m.label}>
                  <div
                    className="text-2xl md:text-3xl font-semibold tracking-[-0.03em] tabular"
                    style={{ color: ["var(--accent)", "#6ea8e0", "#7fc08b"][i] }}
                  >
                    {m.value}
                  </div>
                  <div className="label-system mt-2 leading-tight" style={{ color: "var(--inverse-muted)" }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="shell mt-14 flex items-center gap-3 label-system relative z-10"
        style={{ color: "var(--inverse-muted)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <motion.span
          className="block h-8 w-px"
          style={{ background: "var(--inverse-line)" }}
          animate={{ scaleY: [0.3, 1, 0.3], transformOrigin: "top" }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        Scroll to explore
      </motion.div>
    </section>
  );
}
