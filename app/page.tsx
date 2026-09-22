import { Contact } from "./_components/contact";
import { Faq } from "./_components/Faq";
import { Footer } from "./_components/Footer";
import { Hero } from "./_components/hero";
import { Impact } from "./_components/Impact";
import { Manifesto } from "./_components/manifesto";
import { Marquee } from "./_components/Marquee";
import { PillMarquee } from "./_components/PillMarquee";
import { Portfolio } from "./_components/portfolio";
import { Services } from "./_components/services";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <Services />
        <Impact />
        <PillMarquee />
        <Portfolio />
        <Manifesto />
        <Marquee />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
