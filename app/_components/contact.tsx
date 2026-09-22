"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "./Magnetic";

const ease = [0.22, 1, 0.36, 1] as const;

const fieldClass =
  "peer w-full border-0 border-b border-foreground/35 bg-transparent px-0 pb-3 pt-2 text-base font-light text-foreground outline-none transition-colors duration-500 placeholder:text-transparent focus:border-gold";

const labelClass =
  "mb-2 block text-[10px] tracking-[0.4em] text-foreground/50 transition-colors duration-500 group-focus-within:text-gold";

export function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: send to an email service or a Server Action — nothing is delivered yet.
    setSent(true);
  }

  return (
    <section id="contacto" className="border-t border-gold/15 px-6 py-40 sm:px-12 md:py-56">
      <div className="mx-auto grid max-w-7xl gap-20 lg:grid-cols-[1fr_1.2fr] lg:gap-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.4, ease }}
        >
          <p className="mb-8 text-[10px] tracking-[0.5em] text-gold">— CONTACTO</p>
          <h2 className="font-serif text-5xl font-light leading-tight md:text-6xl">
            Iniciemos tu <span className="italic text-gold">Proyecto</span>
          </h2>
          <p className="mt-10 max-w-sm text-sm font-light leading-relaxed text-foreground/55">
            Cada colaboración comienza con una conversación. Compártenos tu visión y te
            responderemos personalmente.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease }}
              className="flex flex-col justify-center"
            >
              <p className="font-serif text-4xl font-light italic text-gold">Gracias.</p>
              <p className="mt-6 text-sm font-light text-foreground/60">
                Hemos recibido tu mensaje. Te contactaremos muy pronto.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1.2, ease }}
              className="flex flex-col gap-12"
            >
              <div className="grid gap-12 sm:grid-cols-2">
                <label className="group block">
                  <span className={labelClass}>NOMBRE</span>
                  <input name="nombre" type="text" required autoComplete="name" placeholder="Nombre" className={fieldClass} />
                </label>
                <label className="group block">
                  <span className={labelClass}>EMAIL</span>
                  <input name="email" type="email" required autoComplete="email" placeholder="Email" className={fieldClass} />
                </label>
              </div>

              <label className="group block">
                <span className={labelClass}>CUÉNTANOS SOBRE TU VISIÓN</span>
                <textarea
                  name="mensaje"
                  rows={4}
                  required
                  placeholder="Cuéntanos sobre tu visión"
                  className={`${fieldClass} resize-none`}
                />
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
      </div>
    </section>
  );
}
