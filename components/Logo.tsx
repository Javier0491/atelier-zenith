import Image from "next/image";

export function Logo() {
  return (
    <a href="#" aria-label="Atelier Zenith — inicio" className="flex items-center gap-4">
      {/*
        logo-az.jpg is the AZ monogram on dark texture; cover-fit trims the side
        margins and the mask feathers the texture into the navbar.
      */}
      <span className="logo-mark relative block h-12 w-16 shrink-0 overflow-hidden">
        <Image
          src="/logo-az.jpg"
          alt=""
          fill
          priority
          sizes="256px"
          className="object-cover object-[48%_50%]"
        />
      </span>
      <span className="hidden font-serif text-lg font-light tracking-[0.3em] text-gold sm:block">
        ATELIER ZENITH
      </span>
    </a>
  );
}
