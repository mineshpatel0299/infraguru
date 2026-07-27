import Hero from "@/components/Hero";
import About from "@/components/About";
import StickyServices from "@/components/StickyServices";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProjectShowcase from "@/components/ProjectShowcase";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <StickyServices />
      <WhyChooseUs />
      <ProjectShowcase />
      <Testimonials />
      <Footer />
    </main>
  );
}
