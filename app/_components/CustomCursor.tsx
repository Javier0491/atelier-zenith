"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const FINE_POINTER = "(pointer: fine)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(FINE_POINTER);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// Only mouse/trackpad users get the custom cursor; touch devices keep native behaviour.
function useFinePointer() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );
}

const INTERACTIVE = "a, button, [data-cursor]";
const spring = { stiffness: 450, damping: 40, mass: 0.6 };

export function CustomCursor() {
  const enabled = useFinePointer();
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, spring);
  const y = useSpring(mouseY, spring);

  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };
    // pointerover bubbles, so one global listener covers every link and button.
    const onOver = (e: PointerEvent) => {
      const target = (e.target as Element).closest<HTMLElement>(INTERACTIVE);
      setHovering(Boolean(target));
      setLabel(target?.dataset.cursorLabel ?? null);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  const size = label ? 88 : hovering ? 56 : 14;

  return (
    <motion.div
      aria-hidden
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 z-[100]"
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          backgroundColor: hovering ? "rgba(197, 160, 89, 0.3)" : "rgba(197, 160, 89, 0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold backdrop-blur-[1px]"
      >
        {label && (
          <span className="text-[9px] font-medium tracking-[0.3em] text-foreground">{label}</span>
        )}
      </motion.div>
    </motion.div>
  );
}
