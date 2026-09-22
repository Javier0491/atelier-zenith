"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { label: "Estudio", href: "#estudio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Contacto", href: "#contacto" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Slide away while scrolling down, come back on any scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - (scrollY.getPrevious() ?? 0);
    if (y < 120 || delta < -4) setHidden(false);
    else if (delta > 4) setHidden(true);
  });

  return (
    <motion.header
      animate={{ y: hidden && !open ? "-100%" : "0%" }}
      transition={{ duration: 0.5, ease }}
      className="sticky top-0 z-50 border-b border-gold/20 bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-12">
        <Logo />

        <ul className="hidden items-center gap-12 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-[10px] tracking-[0.35em] text-foreground/60 transition-colors duration-500 hover:text-foreground"
              >
                {link.label.toUpperCase()}
                <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-luxe group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          className="text-foreground md:hidden"
        >
          {open ? <X strokeWidth={1} className="size-6" /> : <Menu strokeWidth={1} className="size-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            className="overflow-hidden border-t border-gold/10 md:hidden"
          >
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-5 text-[11px] tracking-[0.35em] text-foreground/70 transition-colors hover:text-gold"
                >
                  {link.label.toUpperCase()}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
