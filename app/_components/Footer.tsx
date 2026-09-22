import type { SVGProps } from "react";

// lucide-react v1 no longer ships brand icons, so these are drawn in its
// thin-stroke style (24px grid, round caps) to sit alongside the rest.
function IconBase(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    />
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <path d="M17.5 6.5h.01" />
    </IconBase>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </IconBase>
  );
}

function BehanceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <IconBase {...props}>
      <path d="M2.5 6H7a3 3 0 0 1 0 6H2.5Z" />
      <path d="M2.5 12H8a3 3 0 0 1 0 6H2.5Z" />
      <path d="M14.5 15h7a3.5 3.5 0 1 0-1 2.5" />
      <path d="M15 8.5h5" />
    </IconBase>
  );
}

// TODO: replace with the studio's real profile URLs.
const socials = [
  { label: "Instagram", href: "https://www.instagram.com/", Icon: InstagramIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: LinkedInIcon },
  { label: "Behance", href: "https://www.behance.net/", Icon: BehanceIcon },
];

export function Footer() {
  return (
    <footer className="bg-black px-6 py-10 sm:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-[10px] tracking-[0.3em] text-zinc-500">
          © {new Date().getFullYear()} ATELIER ZENITH. TODOS LOS DERECHOS RESERVADOS.
        </p>

        <ul className="flex items-center gap-7">
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="block text-zinc-500 transition-colors duration-500 hover:text-gold"
              >
                <Icon className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
