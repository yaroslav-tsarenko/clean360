import { Footer, FloatingCall } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { AdditionalServices } from "@/components/sections/AdditionalServices";
import { Benefits } from "@/components/sections/Benefits";
import { Hero } from "@/components/sections/Hero";
import { Kiehl } from "@/components/sections/Kiehl";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Services />
        <AdditionalServices />
        <Kiehl />
        <Team />
        <Reviews />
      </main>
      <Footer />
      <FloatingCall />
    </>
  );
}
