"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative flex h-[calc(100svh-5rem)] flex-col items-center justify-center px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 24, letterSpacing: "0.02em" }}
        animate={{ opacity: 1, y: 0, letterSpacing: "0.08em" }}
        transition={{ duration: 1.8, ease }}
        className="font-serif text-5xl font-light leading-none sm:text-7xl md:text-8xl lg:text-9xl"
      >
        ATELIER ZENITH
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.8, ease }}
        className="mt-10 h-px w-16 origin-center bg-gold"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.1, ease }}
        className="mt-8 text-[10px] font-light tracking-[0.5em] text-foreground/70 sm:text-xs"
      >
        ELEVANDO LA ESTÉTICA
      </motion.p>

      <motion.a
        href="#estudio"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.5, ease }}
        className="group mt-16 inline-flex items-center gap-3 border border-gold px-10 py-4 text-[10px] tracking-[0.4em] transition-colors duration-700 ease-luxe hover:bg-gold hover:text-black"
      >
        EXPLORAR
        <ArrowDown
          strokeWidth={1}
          className="size-3.5 transition-transform duration-700 ease-luxe group-hover:translate-y-0.5"
        />
      </motion.a>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
        className="absolute bottom-10 text-[9px] tracking-[0.4em] text-foreground/40"
      >
        EST. MMXXVI
      </motion.span>
    </section>
  );
}
