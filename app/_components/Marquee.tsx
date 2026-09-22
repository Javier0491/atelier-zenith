"use client";

import { motion, useReducedMotion } from "framer-motion";

const phrases = ["DISEÑO ESTRATÉGICO", "DESARROLLO WEB", "IDENTIDAD VISUAL"];

function Strip() {
  return (
    <span className="flex shrink-0 items-center">
      {phrases.map((phrase) => (
        <span key={phrase} className="flex items-center">
          <span>{phrase}</span>
          <span className="mx-[0.35em] text-[0.4em] [-webkit-text-stroke:0] text-gold/60">•</span>
        </span>
      ))}
    </span>
  );
}

export function Marquee() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-label="Diseño estratégico, desarrollo web, identidad visual" className="overflow-hidden py-24 md:py-36">
      {/* Two identical strips: sliding by -50% lands exactly on the start of the second. */}
      <motion.div
        aria-hidden
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        className="flex w-max whitespace-nowrap font-serif text-7xl font-light leading-none text-transparent [-webkit-text-stroke:1px_#C5A059] md:text-9xl lg:text-[11rem]"
      >
        <Strip />
        <Strip />
      </motion.div>
    </section>
  );
}
