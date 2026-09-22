"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

// TODO: cite a source for each figure before publishing.
const stats = [
  { value: 59, suffix: "%", label: "Más intención de compra" },
  { value: 4, suffix: "x", label: "Más visibilidad de marca" },
  { value: 46, suffix: "%", label: "Juzga la credibilidad por el diseño" },
  { value: 23, prefix: "+", suffix: "%", label: "Más ingresos con una marca consistente" },
];

function Counter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 2.2, ease });
    return () => controls.stop();
  }, [inView, count, value]);

  return (
    <span ref={ref}>
      {/* Screen readers get the final figure, not the ticking one. */}
      <span className="sr-only">{`${prefix}${value}${suffix}`}</span>
      <span aria-hidden>
        {prefix && <span className="text-gold">{prefix}</span>}
        <motion.span>{rounded}</motion.span>
        <span className="text-gold">{suffix}</span>
      </span>
    </span>
  );
}

export function Impact() {
  return (
    <section className="px-6 pb-40 sm:px-12 md:pb-56">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.4, ease }}
          className="mb-24 max-w-3xl"
        >
          <p className="mb-8 text-[10px] tracking-[0.5em] text-gold">— IMPACTO</p>
          <h2 className="font-serif text-5xl font-light leading-tight md:text-6xl">
            El valor de una presencia <span className="italic text-gold">bien construida</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-16 lg:grid-cols-4 lg:gap-x-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.2, delay: i * 0.1, ease }}
              className="border-t border-foreground/15 pt-8"
            >
              <p className="font-serif text-5xl font-light leading-none tabular-nums sm:text-6xl lg:text-7xl xl:text-8xl">
                <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="mt-6 max-w-[16rem] text-[10px] leading-relaxed tracking-[0.25em] text-zinc-400 sm:text-xs">
                {stat.label.toUpperCase()}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
