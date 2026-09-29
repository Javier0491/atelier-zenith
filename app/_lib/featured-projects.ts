export type FeaturedProject = {
  title: string;
  tags: string;
  /** Technical level of the solution, shown as a badge on the card. */
  tag: string;
  year: string;
  /** Background photo, served from /public. */
  image: string;
  url: string;
  /** Live projects link out; local ones show as "PRONTO". */
  isLive: boolean;
  /** Dark, abstract gradient shown behind the photo and in its place if it fails to load. */
  art: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    title: "Padilla’s Films",
    tag: "E-COMMERCE & GALERÍA DIGITAL",
    tags: "HTML · CSS · JavaScript · Mercado Pago",
    year: "2026",
    image: "/proyecto1.png",
    url: "https://equifotography.netlify.app/",
    isLive: true,
    art: "radial-gradient(ellipse 70% 55% at 70% 30%, rgba(197,160,89,0.28), transparent 70%), radial-gradient(ellipse 60% 50% at 20% 90%, rgba(255,255,255,0.05), transparent 70%), linear-gradient(160deg, #1d1b18, #0b0b0b)",
  },
  {
    title: "HEROA Real Estate",
    tag: "WEB + CRM OPERATIVO",
    tags: "Next.js · Tailwind · Framer Motion",
    year: "2026",
    image: "/proyecto2.png",
    url: "https://heroa-real-estate-bxfn5jce0-atelier-zenith.vercel.app/",
    isLive: true,
    art: "linear-gradient(115deg, transparent 45%, rgba(197,160,89,0.18) 50%, transparent 56%), radial-gradient(circle at 30% 25%, rgba(229,229,229,0.08), transparent 55%), linear-gradient(200deg, #171717, #0a0a0a)",
  },
];

export type UpcomingProject = {
  title: string;
  sector: string;
  status: string;
  /** Technical level of the solution, shown as a badge on the card. */
  tag: string;
  eta: string;
  /** Screenshot, served from /public; shown softened as a preview. */
  image: string;
  art: string;
};

export const upcomingProjects: UpcomingProject[] = [
  {
    title: "CRM Aseguradora",
    tag: "CRM MULTI-AGENTE ESCALABLE",
    sector: "Seguros & Brokers",
    status: "En desarrollo",
    eta: "2026",
    image: "/proyecto5.png",
    art: "radial-gradient(ellipse 65% 50% at 30% 35%, rgba(197,160,89,0.3), transparent 70%), radial-gradient(circle at 80% 80%, rgba(229,229,229,0.06), transparent 50%), linear-gradient(170deg, #181714, #090909)",
  },
  {
    title: "Fashion Tour NYC",
    tag: "PLATAFORMA INTERACTIVA",
    sector: "Moda & Experiencias",
    status: "En desarrollo",
    eta: "2026",
    image: "/proyecto3.png",
    art: "radial-gradient(ellipse 60% 50% at 35% 40%, rgba(197,160,89,0.35), transparent 70%), linear-gradient(150deg, #1a1916, #0a0a0a)",
  },
  {
    title: "Carlos Sotomayor",
    tag: "SITIO WEB EDITORIAL",
    sector: "Moda Nupcial",
    status: "En desarrollo",
    eta: "2026",
    image: "/proyecto4.png",
    art: "radial-gradient(circle at 65% 60%, rgba(197,160,89,0.3), transparent 45%), radial-gradient(circle at 25% 25%, rgba(229,229,229,0.07), transparent 50%), linear-gradient(200deg, #151515, #090909)",
  },
];
