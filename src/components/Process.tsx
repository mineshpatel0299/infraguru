"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

const STEPS = [
  { number: '01', title: 'Discovery', text: 'We listen, study the site and shape a vision aligned to your ambition.' },
  { number: '02', title: 'Design', text: 'Architects and engineers craft precise plans balancing form and function.' },
  { number: '03', title: 'Construction', text: 'Master builders execute with rigorous quality control at every stage.' },
  { number: '04', title: 'Quality Assurance', text: 'Independent audits ensure every detail meets our uncompromising standard.' },
  { number: '05', title: 'Handover', text: 'A seamless transition, backed by dedicated post-delivery support.' },
];

export default function Process() {
  return (
    <section id="process" className="bg-white py-36">
      <div className="container mx-auto max-w-7xl px-8">
        <motion.div
          className="mx-auto mb-22 max-w-160 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
        >
          <motion.span className="eyebrow justify-center" variants={fadeUp}>
            How We Work
          </motion.span>
          <motion.h2 className="text-[clamp(2.4rem,4vw,3.4rem)] text-primary-dark" variants={fadeUp}>
            A Process Built On <span className="text-gradient">Precision</span>
          </motion.h2>
        </motion.div>

        <div className="relative">
          <div className="absolute top-6.5 left-0 h-0.5 w-full bg-hairline max-lg:top-0 max-lg:left-6.75 max-lg:h-full max-lg:w-0.5" aria-hidden />
          <motion.div
            className="absolute top-6.5 left-0 h-0.5 w-full origin-left bg-[linear-gradient(90deg,var(--color-secondary),var(--color-primary))] max-lg:top-0 max-lg:left-6.75 max-lg:h-full max-lg:w-0.5"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
          />

          <motion.div
            className="relative grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-8"
            variants={staggerContainer(0.18)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {STEPS.map((step) => (
              <motion.div key={step.number} className="flex flex-col items-start pr-4 max-lg:pl-8" variants={fadeUp}>
                <div className="relative z-2 mb-6 flex h-13.5 w-13.5 items-center justify-center rounded-full border-2 border-primary bg-white font-heading text-[1.1rem] text-primary shadow-[0_8px_20px_rgba(3,46,151,0.15)] max-lg:-ml-8">
                  <span>{step.number}</span>
                </div>
                <h3 className="mb-1.5 text-[1.2rem] text-primary-dark">{step.title}</h3>
                <p className="text-[0.92rem] leading-[1.6] text-muted">{step.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
