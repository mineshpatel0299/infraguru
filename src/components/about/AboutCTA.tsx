"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportMirror } from "@/lib/motion";

export default function AboutCTA() {
  return (
    <section id="about-cta" className="relative w-full overflow-hidden bg-primary-dark py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/5 blur-[160px]" />
      </div>

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportMirror}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 text-center lg:px-8"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <div className="h-[2px] w-8 bg-gold-gradient" />
          <span className="font-body text-label font-semibold uppercase tracking-wide text-gold-gradient">
            Let&apos;s Talk
          </span>
          <div className="h-[2px] w-8 bg-gold-gradient" />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="font-body text-[clamp(1.75rem,3.4vw,3.25rem)] font-light leading-tight tracking-tight text-white sm:whitespace-nowrap"
        >
          Ready to write the next chapter of your{" "}
          <span className="font-semibold text-gold-gradient">portfolio?</span>
        </motion.h2>

        <motion.p variants={fadeUp} className="max-w-lg text-body font-light text-white/70">
          Book a private consultation with our advisory team and discover what a truly considered
          real estate partnership feels like.
        </motion.p>

        <motion.div variants={fadeUp}>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 rounded-xl bg-white px-9 py-4 text-sm font-bold uppercase tracking-[0.05em] text-black shadow-[0_12px_30px_rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-100 hover:shadow-[0_16px_36px_rgba(255,255,255,0.18)]"
          >
            Book A Consultation
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
