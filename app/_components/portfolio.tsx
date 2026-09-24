"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Magnetic } from "./Magnetic";
import {
  featuredProjects,
  upcomingProjects,
  type FeaturedProject,
  type UpcomingProject,
} from "../_lib/featured-projects";

// Shared by every card in the track so they line up.
const cardSize = "h-[70vh] w-[80vw] shrink-0 sm:h-[78vh] sm:w-[min(62vh,70vw)]";

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
    <section id="portafolio" ref={sectionRef} className="relative h-[420vh]">
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

          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}

          <header className="ml-[4vw] flex w-[70vw] shrink-0 flex-col sm:w-[26vw]">
            <p className="mb-8 text-[10px] tracking-[0.5em] text-gold">— PRÓXIMOS PROYECTOS</p>
            <h2 className="font-serif text-5xl font-light leading-[1.05] md:text-6xl">
              En el
              <br />
              <span className="italic text-gold">taller</span>
            </h2>
            <p className="mt-10 max-w-xs text-sm font-light leading-relaxed text-foreground/55">
              Obras que hoy toman forma entre bocetos, código y pruebas de color.
            </p>
          </header>

          {upcomingProjects.map((project) => (
            <UpcomingCard key={project.title} project={project} />
          ))}

          <CtaCard />
        </motion.div>

        {/* Scroll progress through the gallery. */}
        <div className="absolute inset-x-6 bottom-8 h-px bg-foreground/10 sm:inset-x-[8vw]">
          <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-gold" />
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: FeaturedProject; index: number }) {
  // Until the photo exists (or if it fails), the gradient art stands in for it.
  const [imageFailed, setImageFailed] = useState(false);

  // Pointer position within the card, -0.5 … 0.5 on each axis.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const smooth = { stiffness: 150, damping: 20, mass: 0.5 };
  // The image drifts against the pointer for a sense of depth.
  const imageX = useSpring(useTransform(px, (v) => v * -36), smooth);
  const imageY = useSpring(useTransform(py, (v) => v * -36), smooth);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative block ${cardSize} overflow-hidden border border-foreground/10 transition-[border-color,box-shadow] duration-700 ease-luxe hover:border-gold/60 hover:shadow-[0_0_50px_-12px_rgba(197,160,89,0.35)]`}
    >
      {/* Oversized so the parallax drift never exposes an edge. */}
      <motion.div
        style={{ x: imageX, y: imageY, backgroundImage: project.art }}
        className="absolute -inset-10 bg-surface transition-[scale] duration-[1400ms] ease-luxe group-hover:scale-105"
      >
        {!imageFailed && (
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(min-width: 640px) 70vw, 90vw"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        )}
      </motion.div>

      {/* Dark overlay so the type stays legible over any photograph. */}
      {!imageFailed && <div className="absolute inset-0 bg-black/30" />}
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />

      <span className="absolute left-7 top-7 text-[10px] tracking-[0.4em] text-foreground/40">
        {String(index + 1).padStart(2, "0")} / {String(featuredProjects.length).padStart(2, "0")}
      </span>

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 md:p-9">
        <div>
          <h3 className="font-serif text-4xl font-light text-gold md:text-5xl">{project.title}</h3>
          <p className="mt-4 text-[10px] tracking-[0.25em] text-foreground/50">{project.tags}</p>
        </div>
        <div className="flex shrink-0 items-center gap-5 text-[10px] tracking-[0.3em] text-foreground/40">
          {project.year}
          {project.isLive ? (
            <Magnetic strength={0.5}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver ${project.title} (se abre en una pestaña nueva)`}
                className="flex size-16 flex-col items-center md:size-20 justify-center gap-1 rounded-full border border-gold/50 text-[9px] tracking-[0.3em] text-foreground transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black"
              >
                <span className="pl-[0.3em]">VER</span>
                <ArrowUpRight strokeWidth={1.25} className="size-3.5" />
              </a>
            </Magnetic>
          ) : (
            <span
              aria-disabled="true"
              className="flex size-16 cursor-not-allowed flex-col items-center md:size-20 justify-center gap-1 rounded-full border border-dashed border-gold/40 text-[9px] tracking-[0.3em] text-foreground opacity-50"
            >
              <span className="pl-[0.3em]">PRONTO</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function UpcomingCard({ project }: { project: UpcomingProject }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className={`relative ${cardSize} overflow-hidden border border-dashed border-foreground/15`}>
      {/* Softened screenshot: a glimpse, not a reveal. */}
      <div
        style={{ backgroundImage: project.art }}
        className="absolute -inset-10 bg-surface opacity-70 blur-2xl"
      />
      {!imageFailed && (
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 640px) 70vw, 90vw"
          className="object-cover opacity-60 blur-[3px] grayscale-[40%]"
          onError={() => setImageFailed(true)}
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />

      <span className="absolute left-7 top-7 flex items-center gap-3 text-[10px] tracking-[0.4em] text-gold">
        <span className="relative flex size-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-gold/60" />
          <span className="relative size-2 rounded-full bg-gold" />
        </span>
        {project.status.toUpperCase()}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
        <h3 className="font-serif text-4xl font-light text-foreground/80 md:text-5xl">{project.title}</h3>
        <p className="mt-4 text-[10px] tracking-[0.25em] text-foreground/45">
          {project.sector.toUpperCase()} • {project.eta}
        </p>
      </div>
    </div>
  );
}

function CtaCard() {
  return (
    <a
      href="#contacto"
      className={`group relative flex ${cardSize} flex-col justify-between overflow-hidden border border-gold/40 p-8 transition-[border-color,box-shadow] duration-700 ease-luxe hover:border-gold hover:shadow-[0_0_60px_-12px_rgba(197,160,89,0.45)] md:p-10`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(197,160,89,0.18),transparent_70%)] opacity-70 transition-opacity duration-700 group-hover:opacity-100" />

      <span className="relative text-[10px] tracking-[0.4em] text-gold">— TU PROYECTO</span>

      <div className="relative">
        <h3 className="font-serif text-5xl font-light leading-[1.05] md:text-6xl">
          El próximo capítulo lleva <span className="italic text-gold">tu nombre.</span>
        </h3>
        <p className="mt-8 max-w-xs text-sm font-light leading-relaxed text-zinc-400">
          Cuéntanos tu visión y construyamos juntos una obra que perdure.
        </p>
      </div>

      <div className="relative">
        <Magnetic strength={0.5}>
          <span className="flex size-24 flex-col items-center justify-center gap-1 rounded-full bg-gold text-[9px] font-medium tracking-[0.3em] text-background transition-[filter] duration-500 group-hover:brightness-110">
            <span className="pl-[0.3em]">HABLEMOS</span>
            <ArrowRight strokeWidth={1.25} className="size-3.5" />
          </span>
        </Magnetic>
      </div>
    </a>
  );
}
