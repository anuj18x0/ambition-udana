  import { Hero } from "@/components/hero";
import NavbarDemo from "@/components/resizable-navbar-demo";
import { Solutions } from "@/components/solutions";
import { Benefits } from "@/components/benefits";
import { Showcase } from "@/components/showcase";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import { ScrollProgressBar } from "@/components/scroll-progress";

export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <NavbarDemo />
      <main className="flex-1">
        <Hero />
        <Solutions />
        <Benefits />
        <Showcase />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
