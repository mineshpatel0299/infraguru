"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareersHero from "@/components/careers/CareersHero";
import CareersIntro from "@/components/careers/CareersIntro";
import CareersValues from "@/components/careers/CareersValues";
import CareersBenefits from "@/components/careers/CareersBenefits";
import CareersOpenings from "@/components/careers/CareersOpenings";
import CareersCTA from "@/components/careers/CareersCTA";

export default function CareersPage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white"
    >
      <Navbar />
      <CareersHero />
      <CareersIntro />
      <CareersValues />
      <CareersBenefits />
      <CareersOpenings />
      <CareersCTA />
      <Footer />
    </motion.main>
  );
}
