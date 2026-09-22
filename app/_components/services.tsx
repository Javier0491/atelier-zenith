"use client";

import { motion } from "framer-motion";
import { Compass, Gauge, Gem, type LucideIcon } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const services: { icon: LucideIcon; title: string; focus: string; description: string }[] = [
  {
    icon: Compass,
    title: "Diseño Web Estratégico",
    focus: "UI / UX",
    description:
      "Interfaces concebidas desde la intención. Cada recorrido del usuario se diseña con claridad, ritmo y un propósito medible.",
  },
  {
    icon: Gauge,
    title: "Desarrollo de Alto Rendimiento",
    focus: "Next.js",
    description:
      "Arquitecturas modernas, veloces y escalables. Código preciso que sostiene la experiencia sin sacrificar la elegancia.",
  },
  {
    icon: Gem,
    title: "Identidad de Marca",
    focus: "Editorial & Corporativo",
    description:
      "Sistemas visuales con carácter propio. Del logotipo a la pieza editorial, una voz coherente y atemporal.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="px-6 py-40 sm:px-12 md:py-56">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.4, ease }}
          className="mb-24 max-w-2xl"
        >
          <p className="mb-8 text-[10px] tracking-[0.5em] text-gold">— SERVICIOS</p>
          <h2 className="font-serif text-5xl font-light md:text-6xl">
            Nuestra <span className="italic text-gold">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {services.map(({ icon: Icon, title, focus, description }, i) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 40 }}
              // Entrance keeps its stagger; hover uses the undelayed default below.
              whileInView={{ opacity: 1, y: 0, transition: { duration: 1.4, delay: i * 0.12, ease } }}
              viewport={{ once: true, margin: "-10%" }}
              whileHover={{ y: -8, borderColor: "rgba(197, 160, 89, 0.9)" }}
              transition={{ duration: 0.6, ease }}
              style={{ borderColor: "rgba(197, 160, 89, 0.3)" }}
              className="group flex flex-col border bg-surface p-10 md:p-12"
            >
              <Icon
                strokeWidth={1}
                className="size-8 text-gold transition-transform duration-700 ease-luxe group-hover:scale-110"
              />
              <span className="mt-12 text-[9px] tracking-[0.4em] text-foreground/40">
                {focus.toUpperCase()}
              </span>
              <h3 className="mt-4 font-serif text-3xl font-light leading-tight">{title}</h3>
              <div className="mt-8 h-px w-10 bg-gold/50 transition-all duration-700 ease-luxe group-hover:w-20 group-hover:bg-gold" />
              <p className="mt-8 text-sm font-light leading-relaxed text-foreground/60">{description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
