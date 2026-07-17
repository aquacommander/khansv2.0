import type { Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* Base fade-up */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

/* Slide in from the left */
export const revealLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

/* Slide in from the right */
export const revealRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

/* Scale + fade — good for cards and media */
export const revealScale: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE },
  },
};

/* Blur + fade — soft, editorial */
export const revealBlur: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

export type RevealVariant =
  | "up"
  | "left"
  | "right"
  | "scale"
  | "blur";

export const revealVariants: Record<RevealVariant, Variants> = {
  up: reveal,
  left: revealLeft,
  right: revealRight,
  scale: revealScale,
  blur: revealBlur,
};

export const revealStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

export const lineReveal: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.85, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

/* Continuous hover pop for cards driven by whileHover */
export const cardHover = {
  rest: { y: 0 },
  hover: { y: -6, transition: { duration: 0.4, ease: EASE } },
};

export const viewport = { once: true, margin: "0px 0px -12% 0px" };
