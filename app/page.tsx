import { Contact } from "./_components/contact";
import { Hero } from "./_components/hero";
import { Manifesto } from "./_components/manifesto";
import { Portfolio } from "./_components/portfolio";
import { Services } from "./_components/services";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Services />
      <Portfolio />
      <Manifesto />
      <Contact />
    </main>
  );
}
