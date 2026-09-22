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
      <span className="hidden font-serif text-lg font-light tracking-[0.3em] text-gold sm:block">
        ATELIER ZENITH
      </span>
    </a>
  );
}
