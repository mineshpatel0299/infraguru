"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useScroll, useTransform, type Variants } from 'framer-motion';
import Navbar from './Navbar';

const HEADLINE_LINE_1 = "LIVE THE ART";
const HEADLINE_LINE_2 = "OF LUXURY.";


const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: delay },
  }),
};

const wordVariant: Variants = {
  hidden: { y: "115%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

function SlideUpWordReveal({
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
      className={`inline-flex flex-wrap justify-center ${className}`}
      custom={delay}
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      {text.split(' ').map((word, i) => (
        <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.1em] -mb-[0.1em]">
          <motion.span className="inline-block" variants={wordVariant}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effects
  const bgParallax = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const textParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

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
        className="relative flex h-[calc(100svh-1.5rem)] flex-col items-center justify-center overflow-hidden rounded-[20px] bg-primary-dark sm:h-[calc(100svh-2rem)] sm:rounded-[24px] lg:h-[calc(100svh-2.5rem)] lg:rounded-[32px]"
      >
        {/* Cinematic background */}
        <motion.div 
          className="absolute z-0 pointer-events-none"
          style={{ top: '-20%', bottom: '-20%', left: 0, right: 0, y: bgParallax }}
        >
          <motion.div
            className="absolute inset-0 z-0 scale-[1.06]"
            style={{ x: springX, y: springY }}
          >
            <img
              src="/heroi.jpg"
              alt="Luxury Villa Background"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Shadow overlay for text readability (neutral, not blue) */}
        <div className="absolute inset-0 z-1 bg-gradient-to-b from-black/45 via-black/60 to-black/40 pointer-events-none" />

        {/* Film grain */}
        <div
          className="pointer-events-none absolute inset-0 z-2 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Curtain reveal */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 border-t-2 border-secondary bg-white"
          initial={{ y: 0 }}
          animate={{ y: '100%' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.85, 0, 0.15, 1] }}
        />

        <motion.div 
          className="container relative z-10 mx-auto flex max-w-6xl flex-col items-center px-5 text-center sm:px-8 mt-16 sm:mt-24 lg:mt-32"
          style={{ y: textParallax }}
        >
          <h1 className="mb-4 max-w-none text-center text-h1 font-extrabold uppercase tracking-tight text-white sm:mb-6 sm:tracking-[-1px]">
            <SlideUpWordReveal text={HEADLINE_LINE_1} delay={1.2} className="block justify-center pb-1 flex-nowrap whitespace-nowrap" />
            <SlideUpWordReveal
              text={HEADLINE_LINE_2}
              delay={1.45}
              className="block justify-center flex-nowrap whitespace-nowrap text-white drop-shadow-none"
            />
          </h1>

          <motion.p
            className="mb-6 max-w-lg text-body text-white/80 sm:mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.75, ease: [0.16, 1, 0.3, 1] }}
          >
            We bring you the best and take the necessary steps to relieve your property-buying anxiety.
          </motion.p>

          <motion.div
            className="flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-white py-2 pr-2 pl-7 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(0,0,0,0.3)] sm:pl-8"
            >
              <span className="text-label font-bold text-black uppercase">
                Contact Us
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#c26d43] text-white transition-transform duration-300 group-hover:translate-x-1 sm:h-11 sm:w-11">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
