import type { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import Testimonials from "@/components/Testimonials";
import { DVSNetworkCTA } from "@/components/DVSNetworkCTA";
import Footer from "@/components/Footer";
import { listPublishedProjects } from "@/lib/db/projects";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default async function Home() {
  const projects = await listPublishedProjects();

  return (
    <main>
      <Hero />
      <About />
      <Stats />
      <WhyChooseUs />
      <FeaturedProjects projects={projects.slice(0, 5)} />
      <Services />
      <Testimonials />
      <DVSNetworkCTA />
      <Footer />
    </main>

  );
}
