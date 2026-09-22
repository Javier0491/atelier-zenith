"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** How long the preloader holds before lifting (ms). */
const HOLD_MS = 2000;
/** Seconds the curtain takes to slide away. */
const EXIT_S = 1;

/**
 * Seconds from page load until the page is revealed. Entrance animations
 * underneath (e.g. the Hero) should wait this long so they aren't missed.
 */
export const INTRO_DELAY = HOLD_MS / 1000 + EXIT_S * 0.6;

const ease = [0.76, 0, 0.24, 1] as const;

// Lives in the root layout, which persists across client navigations,
// so it only plays on a full page load.
export function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const timer = setTimeout(() => setVisible(false), HOLD_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={() => (document.documentElement.style.overflow = "")}>
      {visible && (
        <motion.div
          key="preloader"
          aria-hidden
          exit={{ y: "-100%" }}
          transition={{ duration: EXIT_S, ease }}
          className="fixed inset-0 z-[9999] flex h-screen w-screen flex-col items-center justify-center bg-background"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.2em", filter: "blur(6px)" }}
            animate={{ opacity: 1, letterSpacing: "0.4em", filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="pl-[0.4em] font-serif text-2xl font-light text-gold sm:text-4xl"
          >
            ATELIER ZENITH
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: HOLD_MS / 1000, ease: "linear" }}
            className="mt-8 h-px w-24 origin-left bg-gold/60"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
