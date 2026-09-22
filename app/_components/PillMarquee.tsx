"use client";

import { motion, useReducedMotion } from "framer-motion";

const rows = [
  {
    label: "SERVICIOS",
    items: ["Diseño Web", "Branding", "Generación de Leads", "SEO"],
    direction: "left" as const,
  },
  {
    label: "SECTORES",
    items: ["Bienes Raíces", "Salud", "E-commerce", "Servicios Profesionales"],
    direction: "right" as const,
  },
];

function Pill({ children }: { children: string }) {
  return (
    <span className="flex shrink-0 items-center gap-3 rounded-full border border-foreground/15 bg-foreground/[0.03] px-6 py-3 text-[11px] tracking-[0.2em] text-foreground/80 backdrop-blur-sm">
      <span className="size-1 rounded-full bg-gold" />
      {children.toUpperCase()}
    </span>
  );
}

function Row({ label, items, direction }: (typeof rows)[number]) {
  const reduceMotion = useReducedMotion();
  // Repeat the list so one strip is wider than any screen, then render it twice:
  // sliding by exactly 50% lands on the start of the second copy, seamlessly.
  const strip = [...items, ...items, ...items];
  const from = direction === "left" ? "0%" : "-50%";
  const to = direction === "left" ? "-50%" : "0%";

  return (
    <div className="flex items-center gap-6 sm:gap-10">
      <span className="w-24 shrink-0 text-[10px] tracking-[0.4em] text-gold sm:w-32">{label}</span>
      <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <motion.div
          animate={reduceMotion ? undefined : { x: [from, to] }}
          transition={{ duration: 45, ease: "linear", repeat: Infinity }}
          className="flex w-max"
        >
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-3 pr-3">
              {strip.map((item, i) => (
                <Pill key={`${item}-${i}`}>{item}</Pill>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export function PillMarquee() {
  return (
    <section className="flex flex-col gap-5 px-6 pb-32 sm:px-12 md:pb-44">
      {rows.map((row) => (
        <Row key={row.label} {...row} />
      ))}
    </section>
  );
}
