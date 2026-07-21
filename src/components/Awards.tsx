"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

// Replace these placeholders with actual paths to your award images
const AWARDS = [
  {
    id: 1,
    title: 'Excellence in Real Estate 2023',
    src: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    id: 2,
    title: 'Best Premium Infrastructure Project',
    src: 'https://images.unsplash.com/photo-1541888047970-d8569c735d48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 3,
    title: 'Top Brokerage Firm 2022',
    src: 'https://images.unsplash.com/photo-1561489413-985b06da5bee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'aspect-[1/1]',
  },
  {
    id: 4,
    title: 'Sustainable Architecture Award',
    src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'aspect-[3/5]',
  },
  {
    id: 5,
    title: 'Client Satisfaction Gold Standard',
    src: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 6,
    title: 'Commercial Project of the Year',
    src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'aspect-[1/1]',
  },
];

export default function Awards() {
  return (
    <section id="awards" className="relative bg-bg-soft py-24 lg:py-36 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-16 lg:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
        >
          <motion.span variants={fadeUp} className="eyebrow mx-auto justify-center">
            Recognized Excellence
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-4 text-[clamp(2.4rem,4vw,3.4rem)] text-primary-dark">
            Awards & <span className="text-gradient italic font-light">Honors</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 text-[1.1rem] leading-[1.7] text-muted max-w-2xl mx-auto">
            Our commitment to quality, transparency, and architectural brilliance has earned us industry-wide recognition over the years.
          </motion.p>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div 
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
        >
          {AWARDS.map((award) => (
            <motion.div 
              key={award.id}
              variants={fadeUp}
              className="group relative break-inside-avoid overflow-hidden rounded-2xl shadow-soft cursor-pointer bg-white"
            >
              {/* Image */}
              <div className={`relative w-full ${award.aspectRatio} overflow-hidden`}>
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10" />
                <img
                  src={award.src}
                  alt={award.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
              </div>

              {/* Hover Content Overlay */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 bg-gradient-to-t from-primary-dark/90 via-primary-dark/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                  <div className="w-8 h-px bg-secondary mb-3" />
                  <h3 className="font-heading text-xl text-white font-medium leading-snug">
                    {award.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
