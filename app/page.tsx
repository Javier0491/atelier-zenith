import { Contact } from "./_components/contact";
import { Footer } from "./_components/Footer";
import { Hero } from "./_components/hero";
import { Manifesto } from "./_components/manifesto";
import { Marquee } from "./_components/Marquee";
import { Portfolio } from "./_components/portfolio";
import { Services } from "./_components/services";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <Services />
        <Portfolio />
        <Manifesto />
        <Marquee />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
