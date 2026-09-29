"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
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

// Project strips: full cards on phones; from `sm` up, thin strips that open on hover.
// The open width matches the screenshots' ~1.93:1 ratio at 78vh tall (78 × 1.93 ≈ 150.5).
const stripHeight = "h-[70vh] sm:h-[78vh]";
const stripClosed = "w-[80vw] sm:w-[clamp(96px,9vw,150px)]";
const stripOpen = "w-[80vw] sm:w-[min(150.5vh,78vw)]";
/** Content inside a strip is laid out at the open width so it never reflows mid-animation. */
const stripContent = "w-full sm:w-[min(150.5vh,78vw)]";

const OPEN_DURATION_MS = 700;

type StripControls = {
  open: boolean;
  /** `pointerX` keeps the strip under the cursor if the track has to slide to fit it. */
  onOpen: (id: string, el: HTMLElement, pointerX?: number) => void;
  onClose: (id: string) => void;
};

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // How far the track must travel so its last card ends at the right edge.
  const distance = useMotionValue(0);
  // Extra slide so an opening strip near the right edge stays fully on screen.
  const shift = useSpring(0, { stiffness: 120, damping: 24 });

  const [openId, setOpenId] = useState<string | null>(null);
  // While a strip is open (or closing) the track is wider than usual; measuring then would
  // make the whole gallery jump, so the distance stays frozen until it settles.
  const frozen = useRef(false);
  const settleTimer = useRef<number | undefined>(undefined);

  const measure = useCallback(() => {
    if (frozen.current || !trackRef.current || !viewportRef.current) return;
    distance.set(Math.max(0, trackRef.current.scrollWidth - viewportRef.current.clientWidth));
  }, [distance]);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    if (viewportRef.current) observer.observe(viewportRef.current);
    return () => {
      observer.disconnect();
      window.clearTimeout(settleTimer.current);
    };
  }, [measure]);

  const onOpen = useCallback(
    (id: string, el: HTMLElement, pointerX?: number) => {
      if (window.innerWidth < 640) return;
      window.clearTimeout(settleTimer.current);
      frozen.current = true;
      setOpenId(id);

      const openWidth = Math.min(1.505 * window.innerHeight, 0.78 * window.innerWidth);
      // Stop short of the edge, but never so far left that the strip slides out from under the cursor.
      const rightLimit = Math.min(
        window.innerWidth,
        Math.max(window.innerWidth * 0.92, (pointerX ?? 0) + 48),
      );
      const overflow = el.getBoundingClientRect().left + openWidth - rightLimit;
      shift.set(overflow > 0 ? -overflow : 0);
    },
    [shift],
  );

  const onClose = useCallback(
    (id: string) => {
      setOpenId((current) => {
        if (current !== id) return current;
        shift.set(0);
        window.clearTimeout(settleTimer.current);
        settleTimer.current = window.setTimeout(() => {
          frozen.current = false;
          measure();
        }, OPEN_DURATION_MS + 100);
        return null;
      });
    },
    [measure, shift],
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform([scrollYProgress, distance, shift], ([p, d, s]: number[]) => -p * d + s);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const controls = (id: string): StripControls => ({ open: openId === id, onOpen, onClose });

  return (
    <section id="portafolio" ref={sectionRef} className="relative h-[300vh]">
      <div
        ref={viewportRef}
        className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20"
      >
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center gap-[4vw] px-6 sm:gap-[1.5vw] sm:px-[8vw]">
          <header className="flex w-[80vw] shrink-0 flex-col sm:mr-[2.5vw] sm:w-[34vw]">
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
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              {...controls(`featured-${project.title}`)}
              id={`featured-${project.title}`}
            />
          ))}

          <header className="ml-[4vw] flex w-[70vw] shrink-0 flex-col sm:mx-[2.5vw] sm:w-[26vw]">
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
            <UpcomingCard
              key={project.title}
              project={project}
              {...controls(`upcoming-${project.title}`)}
              id={`upcoming-${project.title}`}
            />
          ))}

          <div className="shrink-0 sm:ml-[2.5vw]">
            <CtaCard />
          </div>
        </motion.div>

        {/* Scroll progress through the gallery. */}
        <div className="absolute inset-x-6 bottom-8 h-px bg-foreground/10 sm:inset-x-[8vw]">
          <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-gold" />
        </div>
      </div>
    </section>
  );
}

/**
 * A strip that widens on hover, focus or tap. Closed, it shows a slice of the screenshot;
 * open, the whole screenshot fades in, uncropped, over a blurred copy that fills the frame.
 */
function Strip({
  id,
  open,
  onOpen,
  onClose,
  image,
  art,
  soft = false,
  className,
  children,
}: StripControls & {
  id: string;
  image: string;
  art: string;
  /** Keeps the screenshot hazy, for work that is not ready to be shown. */
  soft?: boolean;
  className: string;
  children: ReactNode;
}) {
  // Until the photo exists (or if it fails), the gradient art stands in for it.
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      data-open={open}
      onPointerEnter={(e) => e.pointerType === "mouse" && onOpen(id, e.currentTarget, e.clientX)}
      onPointerLeave={(e) => e.pointerType === "mouse" && onClose(id)}
      onClick={(e) => !open && onOpen(id, e.currentTarget)}
      onFocus={(e) => onOpen(id, e.currentTarget)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && onClose(id)}
      className={`group relative ${stripHeight} shrink-0 overflow-hidden transition-[width,border-color,box-shadow] duration-700 ease-luxe ${open ? stripOpen : stripClosed} ${className}`}
    >
      <div style={{ backgroundImage: art }} className="absolute inset-0 bg-surface">
        {!imageFailed && (
          <>
            <Image
              src={image}
              alt=""
              fill
              sizes="80vw"
              className={`object-cover transition-[scale,filter,opacity] duration-700 ease-luxe ${
                soft ? "opacity-60 blur-[3px] grayscale-[40%]" : ""
              } ${open ? "sm:scale-110 sm:opacity-35 sm:blur-xl" : ""}`}
              onError={() => setImageFailed(true)}
            />
            <Image
              src={image}
              alt=""
              fill
              sizes="80vw"
              className={`hidden object-contain transition-opacity duration-500 ease-luxe sm:block ${
                soft ? "blur-[2px] grayscale-[40%]" : ""
              } ${open ? `${soft ? "opacity-70" : "opacity-100"} delay-300` : "opacity-0"}`}
            />
          </>
        )}
      </div>
      {children}
    </div>
  );
}

/** Title that runs bottom-to-top while the strip is closed (desktop only). */
function StripLabel({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute bottom-8 left-1/2 hidden -translate-x-1/2 rotate-180 whitespace-nowrap font-serif text-3xl font-light text-gold transition-opacity duration-500 [text-orientation:sideways] [writing-mode:vertical-rl] sm:block ${
        open ? "opacity-0" : "opacity-100 delay-300"
      }`}
    >
      {children}
    </span>
  );
}

/** Wraps what only makes sense at full width: always shown on phones, faded in once open. */
function openOnly(open: boolean) {
  return `transition-opacity duration-500 ${open ? "sm:opacity-100 sm:delay-300" : "sm:pointer-events-none sm:opacity-0"}`;
}

/**
 * Glass pill naming the solution's technical level. It sits in a layer laid out at the open
 * width (like the caption) so it does not slide while the strip widens. On phones it drops
 * below the counter, since a long tag would collide with it on a narrow card.
 */
function ProjectTag({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div className={`pointer-events-none absolute left-0 top-0 ${stripContent} ${openOnly(open)}`}>
      <span className="absolute left-7 top-16 whitespace-nowrap rounded-full border border-white/10 bg-zinc-950/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-zinc-300 backdrop-blur-md transition-colors duration-700 ease-luxe group-hover:border-zinc-500/50 sm:left-auto sm:right-7 sm:top-6 sm:text-xs">
        {children}
      </span>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  ...strip
}: StripControls & { id: string; project: FeaturedProject; index: number }) {
  const { open } = strip;

  return (
    <Strip
      {...strip}
      image={project.image}
      art={project.art}
      className={`border ${
        open
          ? "border-gold/60 shadow-[0_0_50px_-12px_rgba(197,160,89,0.35)]"
          : "border-foreground/10 hover:border-gold/40"
      }`}
    >
      {/* Dark overlay so the type stays legible over any photograph. */}
      <div className="absolute inset-0 bg-black/30 transition-opacity duration-700 sm:group-data-[open=true]:opacity-0" />
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />

      <span className="absolute left-7 top-7 whitespace-nowrap text-[10px] tracking-[0.4em] text-foreground/40">
        {String(index + 1).padStart(2, "0")}
        <span className={openOnly(open)}> / {String(featuredProjects.length).padStart(2, "0")}</span>
      </span>

      <StripLabel open={open}>{project.title}</StripLabel>

      <ProjectTag open={open}>{project.tag}</ProjectTag>

      <div
        className={`absolute bottom-0 left-0 flex ${stripContent} items-end justify-between gap-6 p-7 md:p-9 ${openOnly(open)}`}
      >
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
                className="flex size-16 flex-col items-center md:size-20 justify-center gap-1 rounded-full border border-gold/50 text-[9px] tracking-[0.3em] text-foreground transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-black"
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
    </Strip>
  );
}

function UpcomingCard({
  project,
  ...strip
}: StripControls & { id: string; project: UpcomingProject }) {
  const { open } = strip;

  return (
    <Strip
      {...strip}
      image={project.image}
      art={project.art}
      soft
      className={`border border-dashed ${open ? "border-gold/40" : "border-foreground/15"}`}
    >
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />

      <span className="absolute left-7 top-7 flex items-center gap-3 whitespace-nowrap text-[10px] tracking-[0.4em] text-gold">
        <span className="relative flex size-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-gold/60" />
          <span className="relative size-2 rounded-full bg-gold" />
        </span>
        <span className={openOnly(open)}>{project.status.toUpperCase()}</span>
      </span>

      <StripLabel open={open}>{project.title}</StripLabel>

      <ProjectTag open={open}>{project.tag}</ProjectTag>

      <div className={`absolute bottom-0 left-0 ${stripContent} p-7 md:p-9 ${openOnly(open)}`}>
        <h3 className="font-serif text-4xl font-light text-foreground/80 md:text-5xl">{project.title}</h3>
        <p className="mt-4 text-[10px] tracking-[0.25em] text-foreground/45">
          {project.sector.toUpperCase()} • {project.eta}
        </p>
      </div>
    </Strip>
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
