import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import PropertyTypes from "@/components/PropertyTypes";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Stats />
      <PropertyTypes />
      <Projects />
      <Process />
      <Testimonials />
      <Footer />
    </main>
  );
}
