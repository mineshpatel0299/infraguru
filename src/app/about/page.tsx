import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutStats from "@/components/about/AboutStats";
import AboutPillars from "@/components/about/AboutPillars";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutFounder from "@/components/about/AboutFounder";
import AboutCTA from "@/components/about/AboutCTA";
import AboutPageMotion from "./AboutPageMotion";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Infraguru is a private real estate advisory built on a tradition of trust, curating ultra-premium residences and commercial addresses.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Infraguru",
    description:
      "Infraguru is a private real estate advisory built on a tradition of trust, curating ultra-premium residences and commercial addresses.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <AboutPageMotion>
      <Navbar />
      <AboutHero />
      <AboutStory />
      <AboutStats />
      <AboutPillars />
      <AboutTimeline />
      <AboutFounder />
      <AboutCTA />
      <Footer />
    </AboutPageMotion>
  );
}
