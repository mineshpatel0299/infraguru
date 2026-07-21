"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, type Variants } from 'framer-motion';
import Navbar from './Navbar';

const HEADLINE_LINE_1 = "Shaping Skylines,";
const HEADLINE_LINE_2 = "Engineering Trust";

const MARQUEE_ITEMS = ['Residential', 'Commercial', 'Infrastructure', 'Hospitality', 'Urban Planning'];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.5 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: -50 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function AnimatedLine({ text, className = '' }: { text: string; className?: string }) {
  return (
    <motion.span
      className={`block overflow-hidden [perspective:1000px] ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {text.split(' ').map((w, i) => (
        <motion.span key={i} className="inline-block [transform-origin:bottom]" variants={word}>
          {w}&nbsp;
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springX = useSpring(px, { stiffness: 40, damping: 20 });
  const springY = useSpring(py, { stiffness: 40, damping: 20 });

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set(((e.clientX - rect.left) / rect.width - 0.5) * 24);
    py.set(((e.clientY - rect.top) / rect.height - 0.5) * 24);
  }

  return (
    <section id="hero" className="bg-white p-3 sm:p-4 lg:p-5">
      <Navbar />

      <div
        ref={sectionRef}
        onPointerMove={handlePointerMove}
        className="relative flex h-[calc(100svh-1.5rem)] flex-col justify-end overflow-hidden rounded-[32px] bg-primary-dark sm:h-[calc(100svh-2rem)] sm:rounded-[40px] lg:h-[calc(100svh-2.5rem)] lg:rounded-[56px]"
      >
        {/* Cinematic background */}
        <motion.div
          className="absolute inset-0 z-0 scale-106"
          style={{ x: springX, y: springY }}
        >
          <img
            src="/hero-poster.jpg"
            alt="Aerial view of the city skyline"
            className="h-full w-full object-cover sm:hidden"
          />
          <video
            className="hidden h-full w-full object-cover sm:block"
            src="/hero.mp4"
            poster="/hero-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </motion.div>

        {/* Scrim */}
        <div className="absolute inset-0 z-1 bg-[linear-gradient(180deg,rgba(2,16,64,0.05)_0%,rgba(2,16,64,0.1)_55%,rgba(2,12,56,0.75)_100%)]" />

        {/* Film grain */}
        <div
          className="pointer-events-none absolute inset-0 z-2 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Edge vertical tag */}
        <div className="pointer-events-none absolute top-24 left-4 z-10 hidden lg:block">
          <span className="block [writing-mode:vertical-rl] text-[0.7rem] tracking-[4px] text-white/40 uppercase">
            Est. 2011 — A Tradition of Trust
          </span>
        </div>

        {/* Floating dashed ring */}
        <motion.div
          className="pointer-events-none absolute top-28 right-10 z-10 hidden h-28 w-28 rounded-full border border-dashed border-secondary/50 sm:block lg:top-36 lg:right-24"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          aria-hidden
        />

        {/* Floating years badge */}
        <motion.div
          className="pointer-events-none absolute top-40 right-16 z-10 hidden flex-col items-center justify-center sm:flex lg:top-48 lg:right-32"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="font-heading text-3xl text-white">15+</span>
          <span className="text-[0.6rem] tracking-[2px] text-white/60 uppercase">Years</span>
        </motion.div>

        <div className="container relative z-10 mx-auto max-w-7xl px-8 pb-20 lg:pb-24">
          <motion.span
            className="mb-6 inline-flex items-center gap-2.5 text-[0.8rem] font-semibold tracking-[3px] text-secondary-light uppercase before:inline-block before:h-0.5 before:w-7 before:bg-secondary"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Infraguru — A Tradition of Trust
          </motion.span>

          <h1 className="mb-8 max-w-4xl text-[clamp(2.8rem,3.2vw+2rem,5.6rem)] font-medium tracking-[-1.5px] text-white">
            <AnimatedLine text={HEADLINE_LINE_1} />
            <AnimatedLine
              text={HEADLINE_LINE_2}
              className="bg-[linear-gradient(120deg,#ffffff_0%,var(--color-secondary-light)_50%,var(--color-secondary)_100%)] bg-clip-text text-transparent"
            />
          </h1>

          <motion.div
            className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
          >
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-secondary px-8 py-3.5 text-sm font-bold tracking-wider whitespace-nowrap text-primary-dark uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_5px_rgba(212,175,55,0.45)]"
            >
              Explore Projects
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border-[1.5px] border-white/40 px-8 py-3.5 text-sm font-semibold tracking-wider whitespace-nowrap text-white uppercase backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10"
            >
              Our Story
            </a>
          </motion.div>
        </div>

        {/* Marquee strip */}
        <div className="relative z-10 overflow-hidden border-t border-white/10 bg-black/20 py-3.5 backdrop-blur-sm">
          <motion.div
            className="flex w-max items-center gap-10 whitespace-nowrap"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          >
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="flex items-center gap-10 text-[0.78rem] font-medium tracking-[3px] text-white/50 uppercase">
                {item}
                <span className="text-secondary/60">&#9670;</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
