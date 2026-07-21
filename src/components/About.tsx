"use client";

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion';
import { viewportOnce } from '@/lib/motion';

/* ── Animated counter ────────────────────────────────────────────────────── */
function StatBadge({
  value,
  suffix,
  label,
  delay = 0,
}: {
  value: string;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      className="flex flex-col gap-1 p-8 border border-hairline rounded-2xl bg-bg-soft hover:bg-bg-soft-2 hover:border-primary/20 transition-all duration-500"
    >
      <div className="font-heading text-5xl lg:text-6xl text-primary-dark font-medium leading-none">
        {value}
        {suffix && <span className="text-secondary ml-1">{suffix}</span>}
      </div>
      <div className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-muted mt-2">
        {label}
      </div>
    </motion.div>
  );
}

/* ── Main Component ──────────────────────────────────────────────────────── */
export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isImageInView = useInView(imageRef, { once: true, margin: '-15%' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const parallaxY = useSpring(rawY, { stiffness: 60, damping: 20 });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-white overflow-hidden"
    >
      {/* Soft radial glow for depth */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,var(--color-bg-soft)_0%,transparent_70%)] opacity-80" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
      </div>

      {/* Giant watermark */}
      <div className="absolute top-0 right-0 font-heading text-[clamp(18rem,30vw,36rem)] text-primary/[0.03] leading-none pointer-events-none select-none translate-x-[10%] -translate-y-[10%] z-0">
        IG
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-[1400px] pt-28 lg:pt-40">
        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="w-10 h-px bg-secondary" />
          <span className="text-[0.7rem] font-bold tracking-[0.3em] uppercase text-primary">
            Why Infraguru
          </span>
        </motion.div>

        {/* ── Cinematic split headline ── */}
        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-[clamp(3.5rem,8vw,9rem)] text-primary-dark leading-[1] tracking-tight font-medium"
          >
            Where Vision
          </motion.h2>
        </div>
        <div className="overflow-hidden mb-4">
          <motion.h2
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="font-heading text-[clamp(3.5rem,8vw,9rem)] leading-[1] tracking-tight font-light italic"
            style={{
              WebkitTextStroke: '1px rgba(3,46,151,0.2)',
              color: 'transparent',
            }}
          >
            Meets Value.
          </motion.h2>
        </div>

        {/* ── Main content: image + text grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start pb-28 lg:pb-40">
          
          {/* ── Left: Reveal image with clip-path animation ── */}
          <div ref={imageRef} className="relative">
            {/* Clip-path reveal frame */}
            <motion.div
              className="relative aspect-[4/5] rounded-3xl overflow-hidden"
              animate={isImageInView ? { clipPath: 'inset(0% 0% 0% 0% round 1.5rem)' } : {}}
              initial={{ clipPath: 'inset(0% 100% 0% 0% round 1.5rem)' }}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 w-full h-full"
                style={{ y: parallaxY }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90"
                  alt="Infraguru premium real estate"
                  className="w-full h-[115%] -mt-[7.5%] object-cover"
                />
                {/* Dark gradient over image for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary-dark/10 to-transparent" />
              </motion.div>

              {/* Floating year badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-8 left-8 flex flex-col items-start"
              >
                <div className="font-heading text-[0.7rem] text-white/70 tracking-[0.2em] uppercase mb-1">Est.</div>
                <div className="font-heading text-7xl text-white leading-none font-medium">
                  2011
                </div>
              </motion.div>
            </motion.div>

            {/* Gold accent line beside image */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.6 }}
              className="absolute -right-5 top-12 bottom-12 w-[2px] bg-secondary origin-top hidden lg:block"
            />
          </div>

          {/* ── Right: Body + Stats ── */}
          <div className="flex flex-col justify-between h-full">
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="text-[1.2rem] lg:text-[1.35rem] leading-[1.8] text-muted max-w-xl font-light"
            >
              At Infraguru, we&apos;ve built a track record of transforming capital into enduring wealth. Our curated real estate portfolio spans premium residential, commercial and strategic investment-grade assets — each selected for its long-term value potential.
            </motion.p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mt-14">
              <StatBadge value="77" suffix="+" label="Properties Listed" delay={0.2} />
              <StatBadge value="350" suffix="+" label="Properties Sold" delay={0.35} />
              <StatBadge value="500" suffix="+" label="Satisfied Clients" delay={0.5} />
              <StatBadge value="25" suffix="" label="Realtor Awards" delay={0.65} />
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-14 flex flex-wrap items-center gap-6"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-3 px-10 py-4 bg-primary text-white text-[0.8rem] font-bold tracking-[0.15em] uppercase rounded-full transition-all duration-300 hover:scale-105 hover:bg-primary-dark hover:shadow-[0_16px_40px_rgba(3,46,151,0.3)]"
              >
                Explore Portfolio
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[0.8rem] font-semibold tracking-[0.15em] uppercase text-muted hover:text-primary-dark transition-colors duration-300"
              >
                Book a Consultation
              </a>
            </motion.div>

          </div>
        </div>
      </div>


    </section>
  );
}
