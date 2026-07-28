import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import Testimonials from "@/components/Testimonials";
import { DVSNetworkCTA } from "@/components/DVSNetworkCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Stats />
      <WhyChooseUs />
      <FeaturedProjects />
      <Services />
      <Testimonials />
      <DVSNetworkCTA />
      <Footer />
    </main>

  );
}
