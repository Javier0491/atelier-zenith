"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

// Each line gets its own indent to create the asymmetric rhythm.
const lines = [
  { text: "Creemos en el diseño atemporal.", indent: "md:pl-0" },
  { text: "Cada proyecto es una obra", indent: "md:pl-[18%]" },
  { text: "meticulosamente curada", indent: "md:pl-[6%]", italic: true },
  { text: "donde convergen la visión,", indent: "md:pl-[32%]" },
  { text: "la técnica y el propósito.", indent: "md:pl-[12%]" },
];

export function Manifesto() {
  return (
    <section
      id="estudio"
      className="flex justify-center px-6 py-40 sm:px-12 md:py-64"
    >
      <div className="w-full max-w-5xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2, ease }}
          className="mb-16 text-[10px] tracking-[0.5em] text-gold"
        >
          — MANIFIESTO
        </motion.p>

        <blockquote className="font-serif text-3xl font-light leading-snug sm:text-4xl md:text-5xl lg:text-6xl">
          {lines.map((line, i) => (
            <motion.span
              key={line.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1.4, delay: i * 0.15, ease }}
              className={`block ${line.indent} ${line.italic ? "italic text-gold" : ""}`}
            >
              {line.text}
            </motion.span>
          ))}
        </blockquote>
      </div>
    </section>
  );
}
