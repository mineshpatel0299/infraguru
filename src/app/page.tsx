import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import About from "@/components/About";
import Stats from "@/components/Stats";
import PropertyTypes from "@/components/PropertyTypes";
import Projects from "@/components/Projects";
import Process from "@/components/Process";
import Awards from "@/components/Awards";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Partners />
      <About />
      <Stats />
      <PropertyTypes />
      <Projects />
      <Process />
      <Awards />
      <Testimonials />
      <Footer />
    </main>
  );
}
