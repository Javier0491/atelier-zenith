"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const projects = [
  { name: "Maison Lumière", tech: ["Next.js", "Tailwind", "Framer Motion"], year: "2026" },
  { name: "Villa Serena", tech: ["Next.js", "Sanity", "Vercel"], year: "2025" },
  { name: "Éclat Parfums", tech: ["Shopify", "React", "Tailwind"], year: "2025" },
  { name: "Galerie Noir", tech: ["Next.js", "TypeScript", "Three.js"], year: "2024" },
];

export function Portfolio() {
  return (
    <section id="portafolio" className="px-6 pb-40 sm:px-12 md:pb-56">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.4, ease }}
          className="mb-20 flex items-end justify-between border-b border-gold/15 pb-8"
        >
          <div>
            <p className="mb-8 text-[10px] tracking-[0.5em] text-gold">— PORTAFOLIO</p>
            <h2 className="font-serif text-5xl font-light md:text-6xl">
              Proyectos <span className="italic text-gold">Destacados</span>
            </h2>
          </div>
          <span className="hidden text-[10px] tracking-[0.4em] text-foreground/40 sm:block">
            {String(projects.length).padStart(2, "0")} PROYECTOS
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {projects.map((project, i) => (
            <motion.a
              key={project.name}
              href="#"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.4, delay: (i % 2) * 0.15, ease }}
              className="group block border border-foreground/10 p-3 transition-[border-color,box-shadow] duration-700 ease-luxe hover:border-gold/60 hover:shadow-[0_0_40px_-12px_rgba(197,160,89,0.35)]"
            >
              <div className="relative aspect-16/10 overflow-hidden">
                {/* Placeholder until real project imagery is added. */}
                <div className="absolute inset-0 bg-surface transition-transform duration-[1400ms] ease-luxe group-hover:scale-105" />
                <span className="absolute left-5 top-5 text-[9px] tracking-[0.4em] text-foreground/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex items-start justify-between gap-6 px-3 pb-3 pt-7">
                <div>
                  <h3 className="font-serif text-3xl font-light text-gold">{project.name}</h3>
                  <p className="mt-3 text-[10px] tracking-[0.25em] text-foreground/45">
                    {project.tech.join(" • ")}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 pt-2 text-[10px] tracking-[0.3em] text-foreground/40">
                  {project.year}
                  <ArrowUpRight
                    strokeWidth={1}
                    className="size-4 transition-all duration-700 ease-luxe group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                  />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
