"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { FAQ } from "@/content/demos";
import { pad } from "@/lib/utils";

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-line">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-line">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-start justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="flex items-baseline gap-5">
                <span className="label-system">{pad(i + 1)}</span>
                <span className="text-lg md:text-xl font-medium tracking-[-0.02em]">
                  {faq.question}
                </span>
              </span>
              <span
                className="shrink-0 text-2xl leading-none mt-1 transition-transform duration-500 ease-editorial"
                style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                aria-hidden
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="body-large text-[1rem] pb-8 md:pl-[3.4rem] max-w-2xl">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
