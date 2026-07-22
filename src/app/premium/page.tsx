import type { Metadata } from "next";
import Hero from "@/components/premium/Hero";
import Partners from "@/components/premium/Partners";
import About from "@/components/premium/About";
import Stats from "@/components/premium/Stats";
import Services from "@/components/premium/Services";
import Portfolio from "@/components/premium/Portfolio";
import Journey from "@/components/premium/Journey";
import Recognition from "@/components/premium/Recognition";
import Voices from "@/components/premium/Voices";
import Footer from "@/components/premium/Footer";

export const metadata: Metadata = {
  title: "Infra Guru — A Tradition of Trust",
  description:
    "An editorial take on Infra Guru's ultra-premium real estate portfolio — residences, towers and estates built for legacy.",
};

export default function PremiumHome() {
  return (
    <main className="theme-aurum">
      <Hero />
      <Partners />
      <About />
      <Stats />
      <Services />
      <Portfolio />
      <Journey />
      <Recognition />
      <Voices />
      <Footer />
    </main>
  );
}
