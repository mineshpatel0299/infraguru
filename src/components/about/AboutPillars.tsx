"use client";

import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, viewportMirror } from "@/lib/motion";

const PILLARS = [
  {
    number: "01",
    title: "Integrity First",
    description:
      "Every recommendation is made with full transparency — no hidden margins, no conflicted interests, only what genuinely serves you.",
  },
  {
    number: "02",
    title: "Precision Curation",
    description:
      "We evaluate every asset against location, legal clarity, and long-term value before it ever reaches your shortlist.",
  },
  {
    number: "03",
    title: "Absolute Discretion",
    description:
      "High-value transactions demand privacy. Our process is built to move quietly, efficiently, and entirely on your terms.",
  },
  {
    number: "04",
    title: "Lifetime Partnership",
    description:
      "Our relationship doesn't end at the signature — from documentation to resale, we remain your standing advisory.",
  },
];

export default function AboutPillars() {
  return (
    <section id="about-pillars" className="relative w-full overflow-hidden bg-primary-dark py-24 sm:py-32">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[20%] right-[8%] h-[45vw] w-[45vw] rounded-full bg-secondary/5 blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[5%] h-[35vw] w-[35vw] rounded-full bg-white/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportMirror}
          className="mx-auto mb-16 max-w-2xl text-center sm:mb-20"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-[2px] w-8 bg-gold-gradient" />
            <span className="font-body text-label font-semibold uppercase tracking-wide text-gold-gradient">
              What Guides Us
            </span>
            <div className="h-[2px] w-8 bg-gold-gradient" />
          </div>
          <h2 className="font-body text-[clamp(1.5rem,3.2vw,2.75rem)] font-light leading-tight tracking-normal text-white">
            The <span className="font-bold text-gold-gradient">Principles</span> Behind Every Deal
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportMirror}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {PILLARS.map((pillar) => (
            <motion.div
              key={pillar.number}
              variants={fadeUp}
              className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#253d67] to-[#12223a] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-amber-200/30 sm:min-h-[320px] sm:p-8"
            >
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/0 to-white/0 transition-all duration-500 group-hover:from-white/5" />

              <div className="relative z-10 flex items-start justify-between">
                <span className="font-body text-4xl font-semibold text-white/10 transition-all duration-500 group-hover:text-gold-gradient sm:text-5xl">
                  {pillar.number}
                </span>
                <span className="h-2 w-2 rounded-full bg-white/20 transition-all duration-500 group-hover:scale-150 group-hover:bg-gold-gradient group-hover:shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
              </div>

              <div className="relative z-10 mt-10">
                <h3 className="mb-3 font-body text-h4 font-medium uppercase tracking-tight text-white transition-all duration-500 group-hover:text-gold-gradient">
                  {pillar.title}
                </h3>
                <p className="text-body font-light leading-relaxed text-white/70">{pillar.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
