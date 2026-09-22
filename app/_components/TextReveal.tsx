"use client";

import { motion, type Variants } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

type TextRevealProps = {
  text: string;
  className?: string;
  /** Seconds before the first word starts rising. */
  delay?: number;
  /** Seconds between consecutive words. */
  stagger?: number;
};

/**
 * Reveals each word from below its own clipping mask, one after another.
 * Renders inline, so it can sit inside any heading or paragraph.
 */
export function TextReveal({ text, className, delay = 0, stagger = 0.12 }: TextRevealProps) {
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const words = text.split(" ");
  const word: Variants = {
    hidden: { y: "110%" },
    visible: { y: "0%", transition: { duration: 1.2, ease } },
  };

  return (
    <motion.span
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={container}
      className={className}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
          {/* Keep the natural space inside the mask so words don't collide. */}
          {i < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}
