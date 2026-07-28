"use client";

import React from 'react';
import { motion } from 'framer-motion';

const PARTNER_LOGOS = [
  { name: 'Partner 1', src: '/marquee/Untitled-design-5.webp' },
  { name: 'Partner 2', src: '/marquee/Untitled-design-6.webp' },
  { name: 'Partner 3', src: '/marquee/Untitled-design-7.webp' },
  { name: 'Partner 4', src: '/marquee/Untitled-design-8.webp' },
  { name: 'Partner 5', src: '/marquee/Untitled-design-9.webp' },
  { name: 'Partner 6', src: '/marquee/Untitled-design-11.webp' },
  { name: 'Partner 7', src: '/marquee/Untitled-design-12.webp' },
];

export default function Partners() {
  return (
    <section className="relative border-y border-aurum-hairline bg-aurum-paper py-10 overflow-hidden">
      <div className="mx-auto mb-8 flex max-w-350 items-center gap-6 px-6 sm:px-10 lg:px-14">
        <span className="aurum-eyebrow whitespace-nowrap">
          <span className="h-px w-8 bg-aurum-gold-dark" />
          In Distinguished Company
        </span>
        <span className="aurum-rule" />
      </div>

      <div className="relative flex max-w-[100vw] overflow-hidden">
        <div className="absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r from-aurum-paper to-transparent sm:w-32" />
        <div className="absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l from-aurum-paper to-transparent sm:w-32" />

        <motion.div
          className="flex w-max items-center gap-14 px-8 sm:gap-20 sm:px-12"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
        >
          {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 transition-all duration-300"
            >
              <img src={logo.src} alt={logo.name} className="h-12 w-auto object-contain sm:h-16" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
