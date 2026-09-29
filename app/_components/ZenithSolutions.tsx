"use client";

import { useState } from "react";
import { ArrowUpRight, Database, Infinity as InfinityIcon, MonitorSmartphone, type LucideIcon } from "lucide-react";

type Solution = {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  // Clases completas y literales para que Tailwind las detecte al compilar.
  accent: string;
  cardHover: string;
  cardGlow: string;
  sectionGlow: string;
};

// Tres matices de la familia del dorado del logo: champán, oro y cobre.
const solutions: Solution[] = [
  {
    title: "Presencia Digital",
    subtitle: "Sitios Web de Autor",
    description:
      "Diseños ultra rápidos y optimizados para conversión. Ideal para marcas y agencias que necesitan proyectar autoridad desde el primer segundo.",
    icon: MonitorSmartphone,
    accent: "text-[#e3cb96]",
    cardHover: "hover:border-[#e3cb96]/50 hover:shadow-[0_0_60px_-20px_rgba(227,203,150,0.3)]",
    cardGlow: "from-[#e3cb96]/10",
    sectionGlow: "from-[#e3cb96]/10",
  },
  {
    title: "Motor Operativo",
    subtitle: "SaaS & CRM a la medida",
    description:
      "Software privado para escalar tu operación. Bases de datos en la nube, automatización de tareas y dashboards para dejar atrás el Excel.",
    icon: Database,
    accent: "text-gold",
    cardHover: "hover:border-gold/60 hover:shadow-[0_0_60px_-20px_rgba(197,160,89,0.35)]",
    cardGlow: "from-gold/10",
    sectionGlow: "from-gold/10",
  },
  {
    title: "Ecosistema Completo",
    subtitle: "Web + CRM Conectado",
    description:
      "La solución definitiva. Un sitio espectacular para captar clientes, conectado en tiempo real a un panel administrativo donde gestionas todo.",
    icon: InfinityIcon,
    accent: "text-[#c07f4f]",
    cardHover: "hover:border-[#c07f4f]/60 hover:shadow-[0_0_60px_-20px_rgba(192,127,79,0.35)]",
    cardGlow: "from-[#c07f4f]/10",
    sectionGlow: "from-[#c07f4f]/10",
  },
];

export function ZenithSolutions() {
  // Índice de la tarjeta con hover activo (null = ninguna).
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    // Sin fondo propio: hereda el del body, igual que Hero y Services.
    <section id="soluciones" className="relative overflow-hidden px-6 py-40 sm:px-12 md:py-56">
      {/* Los gradientes no se pueden animar entre sí, así que cada color es una capa que aparece por opacidad. */}
      {solutions.map(({ title, sectionGlow }, i) => (
        <div
          key={title}
          aria-hidden
          className={`pointer-events-none absolute inset-0 bg-radial-[at_50%_0%] ${sectionGlow} via-transparent to-transparent transition-opacity duration-1000 ease-luxe ${
            hoveredCard === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-24 max-w-2xl">
          <p className="mb-8 text-[10px] tracking-[0.5em] text-gold">— SOLUCIONES</p>
          <h2 className="font-serif text-5xl font-light md:text-6xl">
            Elige tu <span className="italic text-gold">punto de partida</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {solutions.map(({ title, subtitle, description, icon: Icon, accent, cardHover, cardGlow }, i) => (
            <article
              key={title}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative flex flex-col overflow-hidden border border-gold/15 bg-surface/50 p-10 backdrop-blur-xl transition-all duration-700 ease-luxe hover:-translate-y-2 md:p-12 ${cardHover}`}
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${cardGlow} via-transparent to-transparent opacity-0 transition-opacity duration-700 ease-luxe group-hover:opacity-100`}
              />

              <div className="relative flex flex-1 flex-col">
                <Icon
                  strokeWidth={1}
                  className={`size-8 transition-transform duration-700 ease-luxe group-hover:scale-110 ${accent}`}
                />
                <span className="mt-12 text-[9px] tracking-[0.4em] text-foreground/40 uppercase">{subtitle}</span>
                <h3 className="mt-4 font-serif text-3xl font-light leading-tight">{title}</h3>
                <div className="mt-8 h-px w-10 bg-gold/50 transition-all duration-700 ease-luxe group-hover:w-20 group-hover:bg-gold" />
                <p className="mt-8 flex-1 text-sm font-light leading-relaxed text-zinc-400">{description}</p>

                <a
                  href="#contacto"
                  className={`mt-10 inline-flex translate-y-2 items-center gap-2 self-start text-[10px] tracking-[0.4em] uppercase opacity-0 transition-all duration-700 ease-luxe group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 ${accent}`}
                >
                  Saber más
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
