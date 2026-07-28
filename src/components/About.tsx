"use client";

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  type Variants,
} from 'framer-motion';
import { viewportMirror } from '@/lib/motion';

const textContainerVariant: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.15,
    },
  },
};

const wordAnimationVariant: Variants = {
  hidden: { y: "105%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function StaggeredText({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <motion.span
      variants={textContainerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={viewportMirror}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-flex overflow-hidden pb-1 -mb-1 mr-[0.25em]">
          <motion.span variants={wordAnimationVariant} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const parallaxY = useSpring(rawY, { stiffness: 60, damping: 20 });

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
    <section id="about" className="bg-white p-3 sm:p-4 lg:p-5">
      <div
        ref={sectionRef}
        onPointerMove={handlePointerMove}
        className="relative bg-[#faf8f5] py-12 sm:py-16 lg:py-20 overflow-hidden text-neutral-900 rounded-[20px] sm:rounded-[24px] lg:rounded-[32px]"
      >
        {/* ── Soft subtle ambient background glow ── */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.8)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 container mx-auto max-w-7xl px-6 sm:px-10">
          {/* ── Top Center Stacked Images with Framer Motion Parallax & Side-by-Side Reveal ── */}
          <div className="flex justify-center">
            <div className="relative w-[180px] sm:w-[210px] md:w-[240px] aspect-[1/1.1]">
              {/* Back Card (Card 2) - Slides right to sit side by side in same line after 1 second */}
              <motion.div
                className="absolute inset-0 z-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.1)] bg-neutral-200"
                initial={{ opacity: 0, scale: 0.9, x: "0%", y: 0, rotate: 0 }}
                whileInView={{ opacity: 1, scale: 1, x: "53%", y: 0, rotate: 0 }}
                viewport={viewportMirror}
                transition={{
                  opacity: { duration: 0.6, delay: 0.5 },
                  scale: { duration: 1.0, delay: 1.0, ease: [0.16, 1, 0.3, 1] as const },
                  x: { duration: 1.0, delay: 1.0, ease: [0.16, 1, 0.3, 1] as const },
                }}
              >
                <motion.div className="absolute inset-0 w-full h-full scale-[1.06]" style={{ x: springX, y: springY }}>
                  <motion.div className="absolute inset-0 w-full h-full" style={{ y: parallaxY }}>
                    <img
                      src="/about-1.jpg"
                      alt="Infra Guru Property Experience"
                      className="w-full h-[120%] -mt-[10%] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Front Card (Card 1) - Slides left to sit side by side in same line after 1 second */}
              <motion.div
                className="relative z-10 w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.15)] bg-neutral-200"
                initial={{ opacity: 0, y: 30, scale: 0.92, x: "0%" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, x: "-53%" }}
                viewport={viewportMirror}
                transition={{
                  opacity: { duration: 0.8 },
                  y: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
                  scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
                  x: { duration: 1.0, delay: 1.0, ease: [0.16, 1, 0.3, 1] as const },
                }}
              >
                <motion.div className="absolute inset-0 w-full h-full scale-[1.06]" style={{ x: springX, y: springY }}>
                  <motion.div className="absolute inset-0 w-full h-full" style={{ y: parallaxY }}>
                    <img
                      src="/about-2.jpg"
                      alt="Infra Guru Luxury Real Estate"
                      className="w-full h-[120%] -mt-[10%] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* ── Two-Column Layout ── */}
          <div className="mx-auto mt-8 max-w-6xl sm:mt-12 lg:mt-14">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16 items-start">
              
              {/* ── Left Column ── */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportMirror}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col"
              >
                <div className="mb-6 font-body text-label text-neutral-500 sm:mb-8">
                  <span className="block mb-0.5">(01)</span>
                  <span className="block font-body font-medium text-neutral-600">About Us</span>
                </div>

                <h3 className="mb-3 text-h4 font-semibold tracking-tight text-neutral-900 sm:mb-4">
                  <StaggeredText text="A Seamless Real Estate Experience in Gurgaon" />
                </h3>
                <p className="max-w-sm text-body text-neutral-500 leading-relaxed">
                  At <span className="font-semibold text-[#c26d43]">Infra Guru</span>, we believe finding your perfect home or investment property should be effortless. Established in Gurgaon, Haryana in 2021 with over 10+ years of industry expertise, our commitment to excellence and client satisfaction sets us apart.
                </p>
              </motion.div>

              {/* ── Right Column ── */}
              <motion.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportMirror}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col"
              >
                {/* Long-form lead copy, not a section headline — intentionally exempt
                    from the shared H2 scale (see typography audit). */}
                <h2 className="mb-6 text-xl font-normal leading-[1.28] tracking-tight text-neutral-900 sm:mb-8 sm:text-2xl sm:leading-[1.3] lg:text-3xl lg:leading-[1.3]">
                  <StaggeredText text="We handle comprehensive real estate transactions—including residential, commercial, farmland, leasing, financing, documentation, and joint ventures with well-known construction businesses." />
                </h2>

                <p className="mb-8 text-body text-neutral-500 leading-relaxed max-w-2xl">
                  We take every step to eliminate property-buying anxiety. Connected with trustworthy A-Grade platforms and experienced industry specialists, we save you valuable time and money by providing expert recommendations before you invest.
                </p>

                <div className="flex items-center">
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-4 rounded-full border border-neutral-300/80 bg-white/70 py-2 pl-6 pr-2 text-label font-semibold text-neutral-900 shadow-[0_4px_20px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-400 hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                  >
                    <span>Learn More</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c26d43] text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </a>
                </div>
              </motion.div>

            </div>
          </div>

          {/* ── Stats Grid (As seen in screenshot) ── */}
          <div className="mx-auto mt-16 max-w-6xl sm:mt-20 lg:mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportMirror}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-white to-[#faf7f2] p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-neutral-100"
              >
                <div className="mb-12 sm:mb-16 lg:mb-20 font-body text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900">
                  100%
                </div>
                <div>
                  <h4 className="mb-2 text-h4 font-semibold text-neutral-900">
                    Client Satisfaction
                  </h4>
                  <p className="text-body text-neutral-500">
                    Dedicated to relieving property-buying anxiety with transparent advice and trusted expertise.
                  </p>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportMirror}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-white to-[#faf7f2] p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-neutral-100"
              >
                <div className="mb-12 sm:mb-16 lg:mb-20 font-body text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900">
                  10+
                </div>
                <div>
                  <h4 className="mb-2 text-h4 font-semibold text-neutral-900">
                    Years of Expertise
                  </h4>
                  <p className="text-body text-neutral-500">
                    With over a decade in the industry, we bring invaluable market insights to every transaction in Gurgaon and beyond.
                  </p>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportMirror}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                className="flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white via-white to-[#faf7f2] p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-neutral-100"
              >
                <div className="mb-12 sm:mb-16 lg:mb-20 font-body text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900">
                  500+
                </div>
                <div>
                  <h4 className="mb-2 text-h4 font-semibold text-neutral-900">
                    Properties Handled
                  </h4>
                  <p className="text-body text-neutral-500">
                    Successfully facilitating residential, commercial, farmland, and rental deals across Haryana.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
