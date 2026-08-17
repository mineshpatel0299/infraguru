"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportMirror } from "@/lib/motion";
import { CareerApplyModal } from "./CareerApplyModal";

export default function CareersCTA() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="careers-cta" className="relative w-full overflow-hidden bg-primary-dark py-24 sm:py-32">
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
            Don&apos;t See Your Role?
          </span>
          <div className="h-[2px] w-8 bg-gold-gradient" />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="font-heading text-[clamp(1.75rem,2.7vw,3.25rem)] font-light leading-tight tracking-tight text-white"
        >
          We&apos;re always looking for people who{" "}
          <span className="font-semibold text-gold-gradient">raise the bar.</span>
        </motion.h2>

        <motion.p variants={fadeUp} className="max-w-lg text-body font-light text-white/70">
          If you believe you belong on this team but don&apos;t see an open role that fits,
          send us your resume — we review every application personally.
        </motion.p>

        <motion.div variants={fadeUp}>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="group inline-flex items-center gap-3 rounded-xl bg-white px-9 py-4 text-sm font-bold uppercase tracking-[0.05em] text-black shadow-[0_12px_30px_rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-100 hover:shadow-[0_16px_36px_rgba(255,255,255,0.18)]"
          >
            Send Your Resume
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </motion.div>
      </motion.div>

      <CareerApplyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
