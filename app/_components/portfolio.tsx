"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "./Magnetic";

type Project = {
  name: string;
  tech: string[];
  year: string;
  /** Dark, abstract placeholder "image" until real photography is added. */
  art: string;
};

const projects: Project[] = [
  {
    name: "Maison Lumière",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    year: "2026",
    art: "radial-gradient(ellipse 70% 55% at 70% 30%, rgba(197,160,89,0.28), transparent 70%), radial-gradient(ellipse 60% 50% at 20% 90%, rgba(255,255,255,0.05), transparent 70%), linear-gradient(160deg, #1d1b18, #0b0b0b)",
  },
  {
    name: "Villa Serena",
    tech: ["Next.js", "Sanity", "Vercel"],
    year: "2025",
    art: "linear-gradient(115deg, transparent 45%, rgba(197,160,89,0.18) 50%, transparent 56%), radial-gradient(circle at 30% 25%, rgba(229,229,229,0.08), transparent 55%), linear-gradient(200deg, #171717, #0a0a0a)",
  },
  {
    name: "Éclat Parfums",
    tech: ["Shopify", "React", "Tailwind"],
    year: "2025",
    art: "radial-gradient(circle at 50% 55%, rgba(197,160,89,0.32), transparent 38%), radial-gradient(circle at 50% 55%, transparent 42%, rgba(197,160,89,0.12) 43%, transparent 45%), linear-gradient(180deg, #151412, #090909)",
  },
  {
    name: "Galerie Noir",
    tech: ["Next.js", "TypeScript", "Three.js"],
    year: "2024",
    art: "repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 64px), radial-gradient(ellipse 80% 60% at 15% 20%, rgba(197,160,89,0.2), transparent 65%), linear-gradient(140deg, #161616, #080808)",
  },
];

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // How far the track must travel so its last card ends at the right edge.
  const distance = useMotionValue(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current || !viewportRef.current) return;
      distance.set(Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    if (viewportRef.current) observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, [distance]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform([scrollYProgress, distance], ([p, d]: number[]) => -p * d);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="portafolio" ref={sectionRef} className="relative h-[300vh]">
      <div
        ref={viewportRef}
        className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20"
      >
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center gap-[4vw] px-6 sm:px-[8vw]">
          <header className="flex w-[80vw] shrink-0 flex-col sm:w-[34vw]">
            <p className="mb-8 text-[10px] tracking-[0.5em] text-gold">— PORTAFOLIO</p>
            <h2 className="font-serif text-5xl font-light leading-[1.05] md:text-7xl">
              Proyectos
              <br />
              <span className="italic text-gold">Destacados</span>
            </h2>
            <p className="mt-10 max-w-xs text-sm font-light leading-relaxed text-foreground/55">
              Una selección de obras donde la estrategia, el código y la estética avanzan al unísono.
            </p>
            <span className="mt-12 flex items-center gap-4 text-[10px] tracking-[0.4em] text-foreground/40">
              DESLIZA
              <span className="h-px w-12 bg-gold/60" />
            </span>
          </header>

          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </motion.div>

        {/* Scroll progress through the gallery. */}
        <div className="absolute inset-x-6 bottom-8 h-px bg-foreground/10 sm:inset-x-[8vw]">
          <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-gold" />
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  // Pointer position within the card, -0.5 … 0.5 on each axis.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const smooth = { stiffness: 150, damping: 20, mass: 0.5 };
  // The image drifts against the pointer for a sense of depth.
  const imageX = useSpring(useTransform(px, (v) => v * -36), smooth);
  const imageY = useSpring(useTransform(py, (v) => v * -36), smooth);

  function handleMove(e: MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <a
      href="#"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative block h-[70vh] w-[80vw] shrink-0 overflow-hidden border border-foreground/10 transition-[border-color,box-shadow] duration-700 ease-luxe hover:border-gold/60 hover:shadow-[0_0_50px_-12px_rgba(197,160,89,0.35)] sm:h-[78vh] sm:w-[min(62vh,70vw)]"
    >
      {/* Oversized so the parallax drift never exposes an edge. */}
      <motion.div
        style={{ x: imageX, y: imageY, backgroundImage: project.art }}
        className="absolute -inset-10 bg-surface transition-[scale] duration-[1400ms] ease-luxe group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />

      <span className="absolute left-7 top-7 text-[10px] tracking-[0.4em] text-foreground/40">
        {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
      </span>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 md:p-9">
        <div>
          <h3 className="font-serif text-4xl font-light text-gold md:text-5xl">{project.name}</h3>
          <p className="mt-4 text-[10px] tracking-[0.25em] text-foreground/50">
            {project.tech.join(" • ")}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-5 text-[10px] tracking-[0.3em] text-foreground/40">
          {project.year}
          {/* Visual only: the whole card is the link. */}
          <Magnetic strength={0.5}>
            <span className="flex size-16 flex-col items-center md:size-20 justify-center gap-1 rounded-full border border-gold/50 text-[9px] tracking-[0.3em] text-foreground transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
              <span className="pl-[0.3em]">VER</span>
              <ArrowUpRight strokeWidth={1.25} className="size-3.5" />
            </span>
          </Magnetic>
        </div>
      </div>
    </a>
  );
}
