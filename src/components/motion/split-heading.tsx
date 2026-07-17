"use client";

import { motion } from "framer-motion";
import { lineReveal, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Renders a heading whose lines reveal from a clipping mask.
 * Pass an array of strings — each becomes a masked line.
 */
export function SplitHeading({
  lines,
  className,
  as: Tag = "h2",
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag className={cn(className)}>
      {lines.map((line, i) => (
        <span
          key={i}
          style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}
        >
          <motion.span
            style={{ display: "block", willChange: "transform" }}
            variants={lineReveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ delay: i * 0.08 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
