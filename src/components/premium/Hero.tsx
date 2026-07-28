"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

export default function Hero() {
  return (
    <section id="hero" className="relative flex h-[100svh] min-h-[750px] w-full flex-col overflow-hidden bg-aurum-ink">
      <Navbar />

      <div className="mx-auto flex h-full w-full max-w-350 flex-col justify-center px-6 pt-28 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:pt-0">
        
        {/* Left Column: Huge Typography */}
        <div className="relative z-20 mt-10 flex flex-col items-start lg:mt-0 lg:w-1/2 lg:pr-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-aurum-gold-light" />
            <span className="text-[0.68rem] font-semibold tracking-[0.4em] text-aurum-gold-light uppercase">
              Est. 2011
            </span>
          </motion.div>

          <h1 className="flex flex-col text-aurum-cream">
            <motion.span
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="block font-heading text-[clamp(3.5rem,8.5vw,7.5rem)] leading-[0.95] tracking-tight"
            >
              Curating
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="block font-heading text-[clamp(3.5rem,8.5vw,7.5rem)] leading-[0.95] tracking-tight text-aurum-gold"
            >
              Masterpieces.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-8 max-w-sm text-[0.98rem] leading-[1.8] text-aurum-cream/70"
          >
            Infra Guru presents a gallery of legacy-defining residences and architectural marvels built for the discerning few.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-12 flex items-center gap-6"
          >
            <a href="#portfolio" className="aurum-btn-gold">
              View Collection <span>&rarr;</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Editorial Monolith Image (Hidden on small mobile, visible on tablet/desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mt-12 hidden h-[65vh] w-[45%] max-w-[550px] overflow-hidden lg:block xl:h-[75vh]"
        >
          {/* Subtle parallax/float animation on the image itself */}
          <motion.img
            animate={{ y: ['-2%', '2%', '-2%'] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            src="/premium-hero-monolith.png"
            alt="Ultra Luxury Penthouse"
            className="absolute inset-0 h-[105%] w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 border border-aurum-gold/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-aurum-ink/60 via-transparent to-transparent" />
        </motion.div>

        {/* Background Image for Mobile (Fall back when monolith is hidden) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0 lg:hidden"
        >
            <img src="/premium-hero-monolith.png" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-aurum-ink/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-aurum-ink via-aurum-ink/60 to-aurum-ink" />
        </motion.div>
      </div>

      {/* Background ambient light */}
      <div className="pointer-events-none absolute right-0 top-0 z-0 h-[80vh] w-[60vw] rounded-full bg-aurum-gold/[0.04] blur-[150px]" />


    </section>
  );
}
