"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Replace these placeholders with the actual paths to your logo files
// e.g., '/logos/company-1.svg'
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
    <section className="bg-white py-20 lg:py-28 border-b border-hairline overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted">
          Trusted by Industry Leaders
        </span>
      </div>
      
      {/* Marquee Container */}
      <div className="relative flex max-w-[100vw] overflow-hidden group">
        {/* Left/Right fading edges for a clean look */}
        <div className="absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />
        
        <motion.div
          className="flex w-max items-center gap-16 md:gap-24 px-8 md:px-12"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {/* We duplicate the array to create a seamless infinite loop */}
          {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-16 md:h-20 lg:h-24 w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
