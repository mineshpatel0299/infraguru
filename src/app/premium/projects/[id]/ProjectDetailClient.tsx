"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import type { Project } from '@/lib/projects';

export default function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <main className="theme-aurum relative min-h-screen bg-aurum-cream selection:bg-aurum-gold selection:text-aurum-ink">
      {/* Navbar/Header Bar (Simplified) */}
      <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between p-6 sm:px-10 lg:px-14">
        <Link href="/premium#portfolio" className="group inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-aurum-cream/70 transition-colors hover:text-aurum-cream">
          <span className="transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
          Back to Portfolio
        </Link>
        <span className="text-[0.6rem] tracking-[0.3em] text-aurum-gold-light uppercase">
          {project.code}
        </span>
      </header>

      {/* Cinematic Hero */}
      <section className="relative flex h-[85svh] min-h-[600px] w-full items-end justify-start bg-aurum-ink p-6 sm:p-10 lg:p-14">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src={project.image} 
            alt={project.title} 
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aurum-ink via-aurum-ink/20 to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="h-px w-10 bg-aurum-gold" />
            <span className="text-[0.65rem] font-bold tracking-[0.25em] text-aurum-gold uppercase">
              {project.category} &mdash; {project.location}
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-heading text-[clamp(3rem,6vw,5.5rem)] leading-[1.05] tracking-tight text-aurum-cream"
          >
            {project.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-6 max-w-xl text-[1.1rem] leading-[1.6] text-aurum-cream/70 italic"
          >
            {project.tagline}
          </motion.p>
        </div>
      </section>

      {/* Editorial Spread (Intro & Specs) */}
      <section className="mx-auto max-w-350 px-6 py-24 sm:px-10 lg:px-14 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
          
          {/* Left Column: Description & Gallery */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.2)}
            className="lg:col-span-7 xl:col-span-8"
          >
            <motion.h2 variants={fadeUp} className="mb-10 font-heading text-[clamp(2rem,4vw,3rem)] leading-tight text-aurum-ink">
              Vision &amp; <span className="italic text-aurum-gold-dark">Architecture</span>
            </motion.h2>
            <div className="space-y-8 text-[1.05rem] leading-[1.8] text-aurum-ink-soft">
              {project.description.map((paragraph, idx) => (
                <motion.p key={idx} variants={fadeUp}>{paragraph}</motion.p>
              ))}
            </div>
            
            {/* Gallery Grid */}
            <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {project.gallery.map((img, idx) => (
                <motion.div key={idx} variants={fadeUp} className={`relative overflow-hidden bg-aurum-paper ${idx % 3 === 2 ? 'sm:col-span-2 aspect-[21/9]' : 'aspect-[4/3]'}`}>
                  <img src={img} alt={`Gallery ${idx + 1}`} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Specs */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 xl:col-span-4"
          >
            <div className="sticky top-10 border border-aurum-hairline bg-aurum-paper p-8 sm:p-10">
              <h3 className="mb-8 text-[0.7rem] font-bold tracking-[0.2em] text-aurum-gold-dark uppercase">
                Property Overview
              </h3>
              
              <dl className="flex flex-col gap-6">
                {[
                  { label: 'Price', value: project.price },
                  { label: 'Configuration', value: project.specs.split('·')[0] },
                  { label: 'Possession', value: project.possession },
                  { label: 'Architect', value: project.architect },
                  { label: 'Developer', value: project.developer },
                  { label: 'RERA', value: project.rera },
                ].map((spec) => (
                  <div key={spec.label} className="border-b border-aurum-hairline pb-4 last:border-0 last:pb-0">
                    <dt className="mb-1 text-[0.65rem] tracking-[0.15em] text-aurum-muted uppercase">{spec.label}</dt>
                    <dd className="font-heading text-lg text-aurum-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10">
                <a href="#contact" className="aurum-btn-solid w-full justify-center text-center">
                  Request Private Viewing
                </a>
              </div>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* Ultra-Premium Details: Highlights & Amenities */}
      <section className="bg-aurum-ink border-t border-aurum-cream/5 px-6 py-24 sm:px-10 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-350">
          
          {/* Highlights */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={viewportOnce} 
            variants={staggerContainer(0.15)}
            className="mb-24 lg:mb-32"
          >
            <div className="mb-12 flex items-center gap-6">
              <span className="h-px w-16 bg-aurum-gold-dark" />
              <h3 className="font-heading text-3xl text-aurum-cream italic">Key Specifications</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-16 md:grid-cols-3 lg:grid-cols-4">
              {project.highlights.map((item, idx) => (
                <motion.div key={idx} variants={fadeUp} className="flex flex-col border-l border-aurum-gold-dark/30 pl-6">
                  <span className="mb-4 text-[0.65rem] font-bold tracking-[0.25em] text-aurum-gold-light uppercase">{item.label}</span>
                  <span className="font-heading text-2xl leading-tight text-aurum-cream sm:text-3xl">{item.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Amenities */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={viewportOnce} 
            variants={staggerContainer(0.1)}
          >
            <div className="mb-12 flex items-center gap-6">
              <span className="h-px w-16 bg-aurum-gold-dark" />
              <h3 className="font-heading text-3xl text-aurum-cream italic">Curated Amenities</h3>
            </div>
            <div className="grid grid-cols-1 gap-x-16 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {project.amenities.map((item, idx) => (
                <motion.div key={idx} variants={fadeUp} className="group flex items-start gap-5 border-t border-aurum-cream/10 pt-6 transition-colors hover:border-aurum-gold-light/50">
                  <span className="font-mono text-[0.65rem] text-aurum-gold-light/60 transition-colors group-hover:text-aurum-gold-light">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-[1.05rem] leading-snug text-aurum-cream/80 transition-colors group-hover:text-aurum-cream">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-aurum-ink border-t border-aurum-cream/5 px-6 py-24 sm:px-10 lg:px-14 lg:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="mx-auto mb-10 block h-12 w-px bg-aurum-gold-light" />
          <blockquote className="font-heading text-[clamp(2rem,4vw,3.5rem)] leading-[1.2] text-aurum-cream italic">
            "{project.testimonial.quote}"
          </blockquote>
          <div className="mt-12 flex flex-col items-center gap-2">
            <span className="text-[0.75rem] font-bold tracking-[0.2em] text-aurum-gold-light uppercase">{project.testimonial.author}</span>
            <span className="text-[0.7rem] tracking-[0.1em] text-aurum-cream/40 uppercase">{project.testimonial.role}</span>
          </div>
        </motion.div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-aurum-ink border-t border-aurum-cream/10 py-12 text-center">
         <Link href="/premium#portfolio" className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-aurum-cream/50 transition-colors hover:text-aurum-gold-light">
           &larr; Return to Ultra Premium Portfolio
         </Link>
      </footer>
    </main>
  );
}
