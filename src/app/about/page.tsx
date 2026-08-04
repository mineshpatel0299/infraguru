"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutStats from "@/components/about/AboutStats";
import AboutPillars from "@/components/about/AboutPillars";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutFounder from "@/components/about/AboutFounder";
import AboutCTA from "@/components/about/AboutCTA";

export default function AboutPage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white"
    >
      <Navbar />
      <AboutHero />
      <AboutStory />
      <AboutStats />
      <AboutPillars />
      <AboutTimeline />
      <AboutFounder />
      <AboutCTA />
      <Footer />
    </motion.main>
  );
}
