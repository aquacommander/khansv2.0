"use client";

import { motion } from "framer-motion";
import { buildLoop } from "@/content/process";
import { Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { StepIcon } from "./process-icons";
import { EASE, viewport } from "@/lib/motion";

const TONES = [
  "var(--accent)",
  "var(--accent-2)",
  "var(--accent-3)",
  "var(--accent-4)",
  "var(--accent)",
  "var(--accent-2)",
  "var(--accent-3)",
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const node = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
};

export function BuildLoop() {
  return (
    <section className="bg-inverse text-inverse-text">
      <div className="shell py-20 md:py-28">
        {/* Header */}
        <div className="page-grid items-end mb-14 md:mb-16">
          <div className="col-span-12 lg:col-span-7">
            <Reveal variant="left">
              <Eyebrow label="The Khanstruct BuildLoop" index="Process / 03" dark tone="var(--accent-3)" />
            </Reveal>
            <div className="mt-7">
              <SplitHeading as="h2" className="heading-section" lines={["A loop, not a hand-off."]} />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 mt-6 lg:mt-0">
            <Reveal variant="right">
              <p className="body-large" style={{ color: "var(--inverse-muted)" }}>
                Seven steps that repeat every engagement — each one produces an
                artifact you can see. No surprise reveals.
              </p>
            </Reveal>
          </div>
        </div>

        {/* ---------- Desktop: horizontal flow ---------- */}
        <motion.div
          className="hidden lg:block relative"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {/* connector line + traveling dot */}
          <div className="absolute left-0 right-0 top-7 h-px" style={{ background: "var(--inverse-line)" }}>
            <span
              className="flow-dot absolute -top-[3px] h-[7px] w-[7px] rounded-full"
              style={{ background: "var(--accent)", boxShadow: "0 0 12px 2px var(--accent)" }}
            />
          </div>

          <div className="grid grid-cols-7 gap-3">
            {buildLoop.map((step, i) => (
              <motion.div key={step.index} variants={node} className="group relative text-center px-1">
                {/* icon node (masks the line) */}
                <div className="relative z-10 mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-inverse transition-transform duration-500 ease-editorial group-hover:-translate-y-1"
                  style={{ boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${TONES[i]} 55%, var(--inverse-line))` }}
                >
                  <StepIcon step={i} className="h-6 w-6" />
                  <span
                    className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full font-mono text-[0.55rem] font-semibold"
                    style={{ background: TONES[i], color: "#0c0d09" }}
                  >
                    {step.index}
                  </span>
                </div>
                <div className="text-[0.95rem] font-semibold tracking-[-0.02em] mb-1">{step.title}</div>
                <div className="label-system text-[0.56rem] leading-tight" style={{ color: "var(--inverse-muted)" }}>
                  {step.artifact}
                </div>
              </motion.div>
            ))}
          </div>

          {/* loop-back indicator */}
          <div className="mt-12 flex items-center justify-center gap-3 label-system" style={{ color: "var(--inverse-muted)" }}>
            <StepIcon step={6} className="h-4 w-4" />
            <span>Then the loop repeats — measure, learn, and improve</span>
          </div>
        </motion.div>

        {/* ---------- Mobile / tablet: compact grid ---------- */}
        <motion.div
          className="lg:hidden grid grid-cols-2 sm:grid-cols-3 gap-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {buildLoop.map((step, i) => (
            <motion.div
              key={step.index}
              variants={node}
              className="rounded-xl p-4 flex flex-col gap-3"
              style={{ boxShadow: `inset 0 0 0 1px var(--inverse-line)` }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${TONES[i]} 55%, var(--inverse-line))` }}
                >
                  <StepIcon step={i} className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs" style={{ color: TONES[i] }}>{step.index}</span>
              </div>
              <div>
                <div className="text-sm font-semibold tracking-[-0.02em]">{step.title}</div>
                <div className="label-system text-[0.55rem] mt-1 leading-tight" style={{ color: "var(--inverse-muted)" }}>
                  {step.artifact}
                </div>
              </div>
            </motion.div>
          ))}
          <div className="col-span-2 sm:col-span-3 flex items-center gap-2 label-system mt-1" style={{ color: "var(--inverse-muted)" }}>
            <StepIcon step={6} className="h-4 w-4" />
            Then the loop repeats.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
