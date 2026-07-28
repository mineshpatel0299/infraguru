"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

const AWARDS = [
  { id: 1, year: '2023', title: 'Excellence in Real Estate' },
  { id: 2, year: '2023', title: 'Best Premium Infrastructure Project' },
  { id: 3, year: '2022', title: 'Top Brokerage Firm' },
  { id: 4, year: '2022', title: 'Sustainable Architecture Award' },
  { id: 5, year: '2021', title: 'Client Satisfaction Gold Standard' },
  { id: 6, year: '2021', title: 'Commercial Project of the Year' },
];

function LaurelMark() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="text-aurum-gold-dark">
      <circle cx="17" cy="17" r="12.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="17" cy="17" r="8.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path
        d="M17 12.5 18.3 15.6 21.7 15.9 19.1 18.1 19.9 21.5 17 19.6 14.1 21.5 14.9 18.1 12.3 15.9 15.7 15.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Recognition() {
  return (
    <section id="awards" className="relative bg-aurum-ink py-28 lg:py-40">
      <div className="mx-auto max-w-350 px-6 sm:px-10 lg:px-14">
        <motion.div
          className="mb-16 text-center lg:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
        >
          <motion.span variants={fadeUp} className="aurum-eyebrow mx-auto justify-center text-aurum-gold-light">
            <span className="h-px w-8 bg-aurum-gold-light" />
            Recognized Excellence
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-5 text-[clamp(2.4rem,4.5vw,3.8rem)] text-aurum-cream">
            Awards &amp; <span className="italic text-aurum-gold-light">Honors</span>
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-px bg-aurum-cream/12 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.08)}
        >
          {AWARDS.map((award) => (
            <motion.div
              key={award.id}
              variants={fadeUp}
              className="group flex flex-col items-start gap-6 bg-aurum-ink p-8 transition-colors duration-500 hover:bg-aurum-ink-soft/40 sm:p-10"
            >
              <LaurelMark />
              <div className="mt-auto">
                <span className="text-[0.68rem] font-semibold tracking-[0.25em] text-aurum-gold-dark">{award.year}</span>
                <h3 className="mt-2 font-heading text-[1.3rem] leading-snug text-aurum-cream">{award.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
