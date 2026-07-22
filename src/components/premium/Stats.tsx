"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import Counter from '../Counter';

const STATS = [
  { value: 77, suffix: '+', label: 'Properties Listed' },
  { value: 350, suffix: '+', label: 'Properties Sold' },
  { value: 500, suffix: '+', label: 'Satisfied Clients' },
  { value: 25, suffix: '', label: 'Realtor Awards' },
];

export default function Stats() {
  return (
    <section id="stats" className="relative bg-aurum-ink py-24 lg:py-28">
      <div className="mx-auto max-w-350 px-6 sm:px-10 lg:px-14">
        <motion.div
          className="grid grid-cols-2 gap-y-10 border-aurum-cream/15 lg:grid-cols-4 lg:gap-y-0 lg:divide-x lg:divide-aurum-cream/15"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center gap-3 px-4 text-center lg:px-8"
              variants={fadeUp}
            >
              <span className="font-heading text-[clamp(2.6rem,4vw,3.6rem)] leading-none text-aurum-gold-light">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-[0.72rem] tracking-[0.25em] text-aurum-cream/55 uppercase">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
