"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  revealStagger,
  revealVariants,
  viewport,
  type RevealVariant,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "span";
  delay?: number;
  variant?: RevealVariant;
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={revealVariants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={revealStagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
}) {
  return (
    <motion.div className={cn(className)} variants={revealVariants[variant]}>
      {children}
    </motion.div>
  );
}
