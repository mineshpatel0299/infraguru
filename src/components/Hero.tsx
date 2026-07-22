"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, type Variants } from 'framer-motion';
import Navbar from './Navbar';

const HEADLINE_LINE_1 = "Your Trusted Partner In";
const HEADLINE_LINE_2 = "Real Estate & Investment";


const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: delay },
  }),
};

const wordVariant: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)", scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

function BlurWordReveal({
  text,
  className = '',
  delay = 0.5,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      custom={delay}
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      {text.split(' ').map((word, i) => (
        <motion.span key={i} className="mr-[0.25em]" variants={wordVariant}>
          {word}
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

        {/* Shadow overlay for text readability (neutral, not blue) */}
        <div className="absolute inset-x-0 bottom-0 h-[80%] z-1 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

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
            Est. 2021 — Gurgaon, Haryana
          </span>
        </div>

        {/* Floating dashed ring */}
        

        {/* Floating years badge */}
    

        <div className="container relative z-10 mx-auto max-w-7xl px-5 pb-6 sm:px-8 sm:pb-12 lg:pb-16">
          <motion.span
            className="mb-3 inline-flex items-center gap-2 text-[0.65rem] font-semibold tracking-[2px] text-secondary-light uppercase before:inline-block before:h-0.5 before:w-5 before:bg-secondary sm:mb-6 sm:gap-2.5 sm:text-[0.8rem] sm:tracking-[3px] sm:before:w-7"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Infraguru — A Tradition of Trust
          </motion.span>

          <h1 className="mb-5 max-w-none text-[clamp(1.6rem,5vw,5.6rem)] font-light tracking-tight text-white leading-[1.15] sm:mb-8 sm:tracking-[-1.5px] sm:leading-[1.1]">
            <BlurWordReveal text={HEADLINE_LINE_1} delay={0.1} className="block pb-1 flex-nowrap whitespace-nowrap" />
            <BlurWordReveal
              text={HEADLINE_LINE_2}
              delay={0.4}
              className="flex-nowrap whitespace-nowrap bg-[linear-gradient(120deg,#ffffff_0%,var(--color-secondary-light)_50%,var(--color-secondary)_100%)] bg-clip-text text-transparent drop-shadow-none"
            />
          </h1>

          <motion.div
            className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
          >
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-secondary px-6 py-3 text-xs font-bold tracking-wider whitespace-nowrap text-primary-dark uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_5px_rgba(212,175,55,0.45)] sm:px-8 sm:py-3.5 sm:text-sm"
            >
              Explore Projects
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </a>
            <a
              href="#about"
              className="hidden items-center justify-center gap-2.5 rounded-full border-[1.5px] border-white/40 px-8 py-3.5 text-sm font-semibold tracking-wider whitespace-nowrap text-white uppercase backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10 sm:inline-flex"
            >
              Our Story
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
