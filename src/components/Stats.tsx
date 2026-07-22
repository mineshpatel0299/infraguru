"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import Counter from './Counter';

const STATS = [
  { value: 77, suffix: '+', label: 'Properties Listed' },
  { value: 350, suffix: '+', label: 'Properties Sold' },
  { value: 500, suffix: '+', label: 'Satisfied Clients' },
  { value: 25, suffix: '', label: 'Realtor Awards' },
];

export default function Stats() {
  return (
    <section id="stats" className="relative overflow-hidden bg-[linear-gradient(120deg,var(--color-primary-dark)_0%,var(--color-primary)_55%,#1a4fd6_100%)] py-32 lg:py-48">
      <div className="pointer-events-none absolute inset-0 opacity-50" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1.5px,transparent_1.5px)] bg-size-[26px_26px]" />
        <div className="absolute -top-40 -right-30 h-95 w-95 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.35),transparent_70%)]" />
      </div>

      <div className="container relative z-1 mx-auto max-w-7xl px-8">
        <motion.div
          className="grid grid-cols-2 gap-y-12 lg:grid-cols-4 lg:gap-y-0"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {STATS.map((stat, i) => (
            <motion.div key={stat.label} className="relative flex flex-col items-center px-6 py-4 text-center" variants={fadeUp}>
              <span className="mb-3 font-heading text-[clamp(2.4rem,3.5vw,3.4rem)] leading-none text-white">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-[0.8rem] tracking-[1.5px] text-white/70 uppercase">{stat.label}</span>
              {i < STATS.length - 1 && (
                <span className="absolute top-1/2 right-0 hidden h-3/5 w-px -translate-y-1/2 bg-white/15 lg:block" aria-hidden />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
