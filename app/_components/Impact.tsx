"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { Store } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

// TODO: add the study these figures come from; the footnote renders once set.
const SOURCE = "";

const featured = {
  value: 97,
  label: "de los consumidores lee reseñas de negocios locales.",
  meaning: "La presencia digital ya forma parte de la investigación antes de elegir un negocio.",
};

const rings = [
  {
    value: 93,
    label: "Compró después de consultar reseñas",
    meaning: "Lo digital influye directamente en la compra.",
  },
  {
    value: 85,
    label: "Elige antes un negocio con reseñas positivas",
    meaning: "La reputación pesa en la decisión.",
  },
  {
    value: 74,
    label: "Usa 2 o más sitios para investigar",
    meaning: "Los clientes contrastan en varios canales.",
  },
  {
    value: 66,
    label: "Investiga más tras una reseña positiva",
    meaning: "Aparecer en Google o redes no basta.",
  },
  {
    value: 54,
    label: "Visita la web tras ver reseñas positivas",
    meaning: "Tu web es el paso que valida la decisión.",
  },
];

const withWebsite = 4; // ≈40% of local businesses, shown as 4 in 10

function useCountUp(value: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 2.2, ease });
    return () => controls.stop();
  }, [inView, count, value]);

  return { ref, inView, rounded };
}

/** Animated progress ring with the figure counting up in its centre. */
function Ring({ value, className, numberClass }: { value: number; className: string; numberClass: string }) {
  const { ref, inView, rounded } = useCountUp(value);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
        <circle cx="50" cy="50" r="46" fill="none" strokeWidth="1" className="stroke-foreground/10" />
        <motion.circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="stroke-gold"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? value / 100 : 0 }}
          transition={{ duration: 2.2, ease }}
        />
      </svg>
      <p className={`absolute inset-0 flex items-center justify-center font-serif font-light tabular-nums ${numberClass}`}>
        <span className="sr-only">{value}%</span>
        <span aria-hidden>
          <motion.span>{rounded}</motion.span>
          <span className="text-gold">%</span>
        </span>
      </p>
    </div>
  );
}

function FadeUp({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.2, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Impact() {
  return (
    <section className="px-6 pb-40 sm:px-12 md:pb-56">
      <div className="mx-auto max-w-7xl">
        <FadeUp className="mb-20 max-w-3xl">
          <p className="mb-8 text-[10px] tracking-[0.5em] text-gold">— IMPACTO</p>
          <h2 className="font-serif text-5xl font-light leading-tight md:text-6xl">
            El valor de una presencia <span className="italic text-gold">bien construida</span>
          </h2>
        </FadeUp>

        {/* Featured figure */}
        <FadeUp className="grid items-center gap-10 border-t border-foreground/15 pt-16 md:grid-cols-[auto_1fr] md:gap-20">
          <Ring
            value={featured.value}
            className="mx-auto size-56 md:mx-0 md:size-72"
            numberClass="text-7xl md:text-8xl"
          />
          <div>
            <p className="font-serif text-3xl font-light leading-snug md:text-5xl">{featured.label}</p>
            <p className="mt-6 max-w-lg text-sm font-light leading-relaxed text-zinc-400">{featured.meaning}</p>
          </div>
        </FadeUp>

        {/* Supporting figures */}
        <div className="mt-24 grid grid-cols-2 gap-x-6 gap-y-16 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-10">
          {rings.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.1} className="flex flex-col items-center text-center">
              <Ring value={stat.value} className="size-32 md:size-36" numberClass="text-4xl" />
              <p className="mt-6 text-[10px] leading-relaxed tracking-[0.2em] text-foreground/85">
                {stat.label.toUpperCase()}
              </p>
              <p className="mt-3 text-xs font-light leading-relaxed text-zinc-500">{stat.meaning}</p>
            </FadeUp>
          ))}
        </div>

        {/* The opportunity: most local businesses still have no website */}
        <FadeUp className="mt-28 border border-gold/30 bg-surface/60 p-8 md:p-14">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <p className="text-[10px] tracking-[0.4em] text-gold">LA OPORTUNIDAD</p>
              <p className="mt-6 font-serif text-4xl font-light leading-tight md:text-5xl">
                Solo <span className="text-gold">≈4 de cada 10</span> negocios locales tienen sitio web propio.
              </p>
              <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-zinc-400">
                Todavía existe una brecha importante de presencia web. Quien la cierre primero, destaca.
              </p>
            </div>

            <div>
              <ul role="img" className="grid grid-cols-5 gap-3 sm:gap-5" aria-label="4 de cada 10 negocios locales tienen sitio web">
                {Array.from({ length: 10 }, (_, i) => {
                  const hasSite = i < withWebsite;
                  return (
                    <motion.li
                      key={i}
                      aria-hidden
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease }}
                      className={`flex aspect-square items-center justify-center border ${
                        hasSite ? "border-gold/60 bg-gold/10 text-gold" : "border-foreground/10 text-foreground/20"
                      }`}
                    >
                      <Store strokeWidth={1} className="size-1/2" />
                    </motion.li>
                  );
                })}
              </ul>
              <div className="mt-6 flex justify-between text-[10px] tracking-[0.3em]">
                <span className="text-gold">CON WEB PROPIA</span>
                <span className="text-foreground/40">SIN WEB PROPIA</span>
              </div>
            </div>
          </div>
        </FadeUp>

        {SOURCE && <p className="mt-10 text-[10px] tracking-[0.2em] text-zinc-600">FUENTE: {SOURCE}</p>}
      </div>
    </section>
  );
}
