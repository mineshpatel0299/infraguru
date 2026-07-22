"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { viewportOnce } from '@/lib/motion';

const PILLARS = ['Vision', 'Trust', 'Craft'];

export default function About() {
  return (
    <section id="about" className="relative bg-aurum-cream py-28 lg:py-40">
      <div className="mx-auto max-w-350 px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-20">
          {/* ── Image ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-6"
          >
            <div className="relative aspect-[4/5] overflow-hidden lg:aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90"
                alt="Infraguru premium real estate"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aurum-ink/50 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-4 border border-aurum-cream/20" />
            </div>
            <div className="absolute -bottom-5 left-6 border border-aurum-hairline bg-aurum-cream px-5 py-3 sm:left-10">
              <span className="text-[0.6rem] tracking-[0.3em] text-aurum-muted uppercase">Est.</span>
              <span className="ml-2 font-heading text-lg text-aurum-gold-dark">2011</span>
            </div>
          </motion.div>

          {/* ── Text ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-6"
          >
            <span className="aurum-eyebrow mb-6">
              <span className="h-px w-8 bg-aurum-gold-dark" />
              Why Infraguru
            </span>

            <h2 className="max-w-md text-[clamp(2.4rem,4.6vw,3.8rem)] text-aurum-ink">
              Where Vision <span className="italic text-aurum-gold-dark">Meets Value.</span>
            </h2>

            <p className="mt-7 max-w-md text-[1.05rem] leading-[1.8] text-aurum-muted">
              Real estate, done properly, is the most durable form of wealth a
              family can hold — a conviction we&apos;ve built on for fifteen years.
            </p>

            <div className="mt-9 flex items-center gap-5 text-[0.72rem] font-semibold tracking-[0.22em] text-aurum-ink-soft uppercase">
              {PILLARS.map((pillar, i) => (
                <React.Fragment key={pillar}>
                  {i > 0 && <span className="text-aurum-gold-dark">&middot;</span>}
                  <span>{pillar}</span>
                </React.Fragment>
              ))}
            </div>

            <a href="#portfolio" className="aurum-btn-solid mt-10 inline-flex">
              Explore Portfolio <span>&rarr;</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
