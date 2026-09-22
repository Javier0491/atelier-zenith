import Image from "next/image";

export function Logo() {
  return (
    <a href="#" aria-label="Atelier Zenith — inicio" className="flex items-center gap-4">
      {/*
        logo.jpg is a wide mockup with the mark centred on dark texture.
        Crop to the AZ monogram and feather the edges into the navbar.
      */}
      <span className="logo-mark relative block h-12 w-16 shrink-0 overflow-hidden">
        <Image
          src="/logo.jpg"
          alt=""
          fill
          priority
          sizes="256px"
          className="origin-[50%_41%] scale-200 object-cover object-[50%_41%]"
        />
      </span>
      <span className="hidden flex-col sm:flex">
        <span className="font-serif text-lg font-light leading-none tracking-[0.3em] text-gold">
          ATELIER ZENITH
        </span>
        <span className="mt-1.5 text-[8px] tracking-[0.3em] text-foreground/60">
          ESTUDIO DE DISEÑO &amp; DESARROLLO WEB
        </span>
      </span>
    </a>
  );
}
