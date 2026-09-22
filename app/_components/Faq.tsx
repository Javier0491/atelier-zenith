"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

// TODO: confirm these answers with the studio's actual terms.
const faqs = [
  {
    q: "¿Cuánto dura un proyecto?",
    a: "Un sitio web a medida suele tomar entre 4 y 8 semanas, según su alcance. Una identidad de marca completa, entre 3 y 6 semanas. Al inicio definimos un calendario con hitos claros.",
  },
  {
    q: "¿Ofrecen mantenimiento?",
    a: "Sí. Ofrecemos planes mensuales que incluyen actualizaciones, monitoreo de rendimiento, copias de seguridad y pequeños ajustes de contenido.",
  },
  {
    q: "¿Qué necesito para empezar?",
    a: "Solo una conversación. Nos cuentas tus objetivos y referencias, y nosotros preparamos una propuesta con alcance, tiempos e inversión.",
  },
  {
    q: "¿Trabajan con clientes de otros países?",
    a: "Sí. Colaboramos de forma remota con marcas de distintos países, con reuniones por videollamada y seguimiento continuo.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-gold/15 px-6 py-32 sm:px-12 md:py-44">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_1.6fr] lg:gap-32">
        <div>
          <p className="mb-8 text-[10px] tracking-[0.5em] text-gold">— PREGUNTAS FRECUENTES</p>
          <h2 className="font-serif text-4xl font-light leading-tight md:text-5xl">
            Lo que suelen <span className="italic text-gold">preguntarnos</span>
          </h2>
        </div>

        <ul className="border-t border-foreground/15">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-foreground/15">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  className="group flex w-full items-center justify-between gap-6 py-7 text-left"
                >
                  <span
                    className={`font-serif text-2xl font-light transition-colors duration-500 md:text-3xl ${isOpen ? "text-gold" : "group-hover:text-gold"}`}
                  >
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="shrink-0 text-gold"
                  >
                    <Plus strokeWidth={1} className="size-6" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-8 text-sm font-light leading-relaxed text-zinc-400">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
