import { BEHANCE_URL, INSTAGRAM, LINKEDIN_URL } from "../_lib/contact-info";
import { BehanceIcon, InstagramIcon, LinkedInIcon } from "./SocialIcons";

const socials = [
  { label: "Instagram", href: INSTAGRAM.href, Icon: InstagramIcon },
  { label: "LinkedIn", href: LINKEDIN_URL, Icon: LinkedInIcon },
  { label: "Behance", href: BEHANCE_URL, Icon: BehanceIcon },
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
