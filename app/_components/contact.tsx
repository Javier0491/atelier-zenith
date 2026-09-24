"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Magnetic } from "./Magnetic";

const ease = [0.22, 1, 0.36, 1] as const;

const STARTING_PRICE = "$7,000";

// Form submissions open a WhatsApp chat with this number (México, +52).
const WHATSAPP_NUMBER = "525574812146";

const paths = [
  {
    id: "web",
    title: "Página Web",
    description:
      "Sitios a medida, rápidos y memorables. Estrategia, diseño UI/UX y desarrollo con Next.js, pensados para convertir visitas en clientes.",
  },
  {
    id: "marca",
    title: "Marca & Identidad",
    description:
      "Un sistema visual con carácter propio: logotipo, paleta, tipografía y guía de marca para comunicar con coherencia en cada punto de contacto.",
  },
  {
    id: "marketing",
    title: "Marketing",
    description:
      "Marketing orgánico: posicionamiento SEO, estrategia de contenido y embudos de captación de leads para que tu presencia digital trabaje a diario a favor de tu negocio. No incluye gestión de pauta publicitaria (anuncios pagados).",
  },
];

type Path = (typeof paths)[number];

const fieldClass =
  "w-full border-0 border-b border-foreground/35 bg-transparent px-0 pb-3 pt-2 text-base font-light text-foreground outline-none transition-colors duration-500 focus:border-gold";

const labelClass =
  "mb-2 block text-[10px] tracking-[0.4em] text-foreground/50 transition-colors duration-500 group-focus-within:text-gold";

export function Contact() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [chosen, setChosen] = useState<Path | null>(null);

  return (
    <section id="contacto" className="border-t border-gold/15 px-6 py-32 sm:px-12 md:py-44">
      <div className="mx-auto grid max-w-7xl gap-20 lg:grid-cols-[1fr_1.2fr] lg:gap-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.4, ease }}
        >
          <p className="mb-8 text-[10px] tracking-[0.5em] text-gold">— CONTACTO</p>
          <h2 className="font-serif text-5xl font-light leading-tight md:text-7xl">
            Inicia tu <span className="italic text-gold">proyecto</span>
          </h2>
          <div className="mt-12 border-t border-foreground/15 pt-8">
            <p className="text-[10px] tracking-[0.4em] text-zinc-400">PÁGINA WEB DESDE</p>
            <p className="mt-3 font-serif text-5xl font-light text-gold md:text-6xl">{STARTING_PRICE}</p>
            <p className="mt-4 max-w-sm text-xs font-light leading-relaxed text-zinc-400">
              La inversión final puede aumentar según el alcance y las necesidades de cada proyecto.
            </p>
          </div>
          <p className="mt-10 max-w-sm text-sm font-light leading-relaxed text-zinc-400">
            Cada colaboración comienza con una conversación. Elige un punto de partida y cuéntanos tu
            visión.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {chosen ? (
            <ContactForm key="form" path={chosen} onBack={() => setChosen(null)} />
          ) : (
            <motion.div
              key="paths"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease }}
            >
              <p className="mb-10 font-serif text-3xl font-light md:text-4xl">¿Por dónde quieres empezar?</p>
              <ul className="border-t border-foreground/15">
                {paths.map((path, i) => {
                  const isOpen = expanded === path.id;
                  return (
                    <li key={path.id} className="border-b border-foreground/15">
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : path.id)}
                        aria-expanded={isOpen}
                        aria-controls={`path-${path.id}`}
                        className="group flex w-full items-baseline gap-6 py-7 text-left"
                      >
                        <span className="text-[10px] tracking-[0.3em] text-gold">
                          {String(i + 1).padStart(2, "0")}.
                        </span>
                        <span
                          className={`font-serif text-2xl font-light transition-colors duration-500 md:text-3xl ${isOpen ? "text-gold" : "group-hover:text-gold"}`}
                        >
                          {path.title}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`path-${path.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.6, ease }}
                            className="overflow-hidden"
                          >
                            <div className="pb-10 pl-10">
                              <p className="max-w-md text-sm font-light leading-relaxed text-zinc-400">
                                {path.description}
                              </p>
                              <Magnetic className="mt-8">
                                <button
                                  type="button"
                                  onClick={() => setChosen(path)}
                                  className="group/cta inline-flex items-center gap-4 bg-gold px-8 py-4 text-[10px] font-medium tracking-[0.35em] text-background transition-[filter] duration-500 hover:brightness-110"
                                >
                                  COMENZAR ESTE CAMINO
                                  <ArrowRight
                                    strokeWidth={1.25}
                                    className="size-4 transition-transform duration-500 ease-luxe group-hover/cta:translate-x-1"
                                  />
                                </button>
                              </Magnetic>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ContactForm({ path, onBack }: { path: Path; onBack: () => void }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = [
      `Hola, me interesa: ${path.title}`,
      `Nombre: ${data.get("nombre")}`,
      `Email: ${data.get("email")}`,
      "",
      String(data.get("mensaje")),
    ].join("\n");
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.8, ease }}
    >
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
          >
            <p className="font-serif text-4xl font-light italic text-gold">Gracias.</p>
            <p className="mt-6 text-sm font-light text-zinc-400">
              Abrimos WhatsApp con tu mensaje sobre {path.title}. Solo presiona enviar y te
              contactaremos muy pronto.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-col gap-12"
          >
            <div className="flex items-center justify-between gap-6">
              <span className="rounded-full border border-gold/40 px-5 py-2 text-[10px] tracking-[0.3em] text-gold">
                {path.title.toUpperCase()}
              </span>
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] text-foreground/50 transition-colors hover:text-gold"
              >
                <ArrowLeft strokeWidth={1.25} className="size-3.5" />
                CAMBIAR
              </button>
            </div>
            <input type="hidden" name="camino" value={path.id} />

            <div className="grid gap-12 sm:grid-cols-2">
              <label className="group block">
                <span className={labelClass}>NOMBRE</span>
                <input name="nombre" type="text" required autoComplete="name" className={fieldClass} />
              </label>
              <label className="group block">
                <span className={labelClass}>EMAIL</span>
                <input name="email" type="email" required autoComplete="email" className={fieldClass} />
              </label>
            </div>

            <label className="group block">
              <span className={labelClass}>CUÉNTANOS SOBRE TU VISIÓN</span>
              <textarea name="mensaje" rows={4} required className={`${fieldClass} resize-none`} />
            </label>

            <Magnetic className="self-start">
              <button
                type="submit"
                className="group inline-flex items-center gap-4 bg-gold px-10 py-4 text-[10px] font-medium tracking-[0.4em] text-background transition-[filter] duration-500 hover:brightness-110"
              >
                ENVIAR
                <ArrowRight
                  strokeWidth={1.25}
                  className="size-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1"
                />
              </button>
            </Magnetic>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
