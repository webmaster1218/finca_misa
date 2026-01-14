import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Rooms } from "@/components/Rooms";
import { ExperienceGrid } from "@/components/ExperienceGrid";
import { ServiceHighlight } from "@/components/ServiceHighlight";
import { Location } from "@/components/Location";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { WhatsAppFloating } from "@/components/WhatsAppFloating";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF8F2]">
      <Navbar />
      <Hero />
      <Intro />
      <ServiceHighlight />
      <ExperienceGrid />
      <Rooms />
      <Gallery />
      <Testimonials />
      <Location />
      <Footer />
      <WhatsAppFloating />
    </main>
  );
}
