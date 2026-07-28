"use client";

import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence, type Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export const SERVICES_ITEMS = [
  {
    step: "01 —— 06",
    title: "Property to Buy",
    bgImage: "/Projects/M3M%20Antalya/544304004_m3m-antalya-hills-gallery-3.webp",
    description: "Property to buy means a land or building that is available for sale and can be legally purchased by a buyer.",
    link: "#contact",
  },
  {
    step: "02 —— 06",
    title: "Property to Sell",
    bgImage: "/Projects/SIgnature/WhatsApp-Image-2026-02-26-at-124237-PM-Picsart-AiImageEnhancer.webp",
    description: "Property to sell means a land or building that the owner is offering for sale and can be legally sold to a buyer.",
    link: "#contact",
  },
  {
    step: "03 —— 06",
    title: "Property to Rent",
    bgImage: "/Projects/SignatureDeluxe/image-Picsart-AiImageEnhancer-1-scaled.webp",
    description: "Property to rent means a land or building that is given to someone for temporary use in exchange for rent, without transferring ownership.",
    link: "#contact",
  },
  {
    step: "04 —— 06",
    title: "Property to Lease",
    bgImage: "/Projects/M3M/Artboard_4_1_-_8jpuMAmC4FGE.webp",
    description: "Property to lease means a land or building given for long-term use to a tenant under a lease agreement, without transferring ownership.",
    link: "#contact",
  },
  {
    step: "05 —— 06",
    title: "Property to Invest",
    bgImage: "/Projects/M3M%20Antalya/about_2_-_LKRZFgeqKGJ4_-_CfWwyPz3TLPk.webp",
    description: "Property to invest means properties specially selected for long-term returns, rental income and capital growth.",
    link: "#contact",
  },
  {
    step: "06 —— 06",
    title: "Property for Joint Development",
    bgImage: "/Projects/SIgnature/WhatsApp-Image-2026-02-26-at-124128-PM-Picsart-AiImageEnhancer.webp",
    description: "Property for joint development is when a land owner and developer partner together to develop a project, sharing the resulting benefits without either party bearing the full cost alone.",
    link: "#contact",
  },
];

const bgSlatVariants: Variants = {
  enter: ({ dir }: { dir: number; idx: number }) => ({
    y: dir > 0 ? "101%" : "-101%",
    opacity: 0,
  }),
  center: ({ idx }: { dir: number; idx: number }) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.65,
      delay: (idx % 2 === 0 ? idx * 0.025 : idx * 0.035),
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
  exit: ({ dir, idx }: { dir: number; idx: number }) => ({
    y: dir > 0 ? "-101%" : "101%",
    opacity: 0,
    transition: {
      duration: 0.5,
      delay: (15 - idx) * 0.015,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const textVariants: Variants = {
  enter: (dir: number) => ({
    y: dir > 0 ? 25 : -25,
    opacity: 0,
    filter: "blur(3px)",
  }),
  center: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
  },
  exit: (dir: number) => ({
    y: dir > 0 ? -25 : 25,
    opacity: 0,
    filter: "blur(3px)",
  }),
};

export default function StickyServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const n = SERVICES_ITEMS.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let target = Math.floor(latest * n);
    if (target >= n) target = n - 1;
    if (target < 0) target = 0;

    if (target !== activeIndex) {
      setPrevIndex(activeIndex);
      setDirection(target > activeIndex ? 1 : -1);
      setActiveIndex(target);
    }
  });

  return (
    <section id="services" className="bg-white">
      {/* Premium Header similar to WhyChooseUs */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-10 sm:pt-28 sm:pb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3 sm:mb-4 flex items-center justify-center gap-3"
        >
          <div className="h-[2px] w-8 bg-gold-gradient" />
          <span className="inline-block font-body text-label font-semibold uppercase text-gold-gradient tracking-widest">
            OUR EXPERTISE
          </span>
          <div className="h-[2px] w-8 bg-gold-gradient" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-h2 font-light tracking-tight text-neutral-900 leading-tight"
        >
          COMPREHENSIVE <span className="font-bold text-gold-gradient">SERVICES</span>
        </motion.h2>
      </div>

      <div ref={sectionRef} className="relative h-[600vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-neutral-900 flex items-center justify-center shadow-2xl">

          {/* ── Base Background ── */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src={SERVICES_ITEMS[prevIndex].bgImage}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* ── Background Shimmer Up via 16 Horizontal Slats ── */}
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={activeIndex}
              className="absolute inset-0 z-10 flex flex-col w-full h-full pointer-events-none"
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <motion.div
                  key={i}
                  custom={{ dir: direction, idx: i }}
                  variants={bgSlatVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{ willChange: 'transform, opacity' }}
                  className="flex-1 w-full overflow-hidden relative"
                >
                  <img
                    src={SERVICES_ITEMS[activeIndex].bgImage}
                    alt=""
                    style={{
                      position: 'absolute',
                      top: `${-100 * i}%`,
                      left: 0,
                      width: '100%',
                      height: '1600%',
                      objectFit: 'cover',
                    }}
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── Side Badges ── */}
          <div className="absolute left-6 sm:left-10 lg:left-16 top-1/2 -translate-y-1/2 z-20 hidden md:block">
            <span className="font-body text-label font-medium text-white/90 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              [ Our Projects ]
            </span>
          </div>
          <div className="absolute right-6 sm:right-10 lg:right-16 top-1/2 -translate-y-1/2 z-20 hidden md:block">
            <span className="font-body text-label font-medium text-white/90 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              [ Keep Scrolling ]
            </span>
          </div>

          {/* ── Center Card ── */}
          <div className="relative z-20 w-[88%] sm:w-[420px] md:w-[460px] lg:w-[500px] rounded-2xl sm:rounded-3xl bg-[#e3d8c4] p-6 sm:p-8 md:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.45)] border border-white/40 overflow-hidden text-neutral-900 flex flex-col items-center text-center">

            {/* Step Counter */}
            <span className="mb-3 font-body text-label font-semibold text-neutral-700 uppercase">
              {SERVICES_ITEMS[activeIndex].step}
            </span>

            {/* Title (Crossfading on step change) */}
            <div className="h-[62px] sm:h-[100px] flex items-center justify-center mb-5 w-full">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.h3
                  key={`title-${activeIndex}`}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
                  className="font-body text-h3 font-semibold tracking-tight text-neutral-950"
                >
                  {SERVICES_ITEMS[activeIndex].title}
                </motion.h3>
              </AnimatePresence>
            </div>

            {/* Image Inside Card (Animated Elevator Stack) */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] mb-6 rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.15)] bg-neutral-900">
              <motion.div
                animate={{ y: `-${(activeIndex / SERVICES_ITEMS.length) * 100}%` }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: `${SERVICES_ITEMS.length * 100}%`, willChange: 'transform' }}
                className="absolute inset-x-0 top-0 w-full"
              >
                {SERVICES_ITEMS.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative w-full overflow-hidden"
                    style={{ height: `${100 / SERVICES_ITEMS.length}%` }}
                  >
                    <Image
                      src={item.bgImage}
                      alt={item.title}
                      fill
                      sizes="500px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Description (Crossfading on step change) */}
            <div className="h-[115px] flex items-center justify-center mb-6 w-full">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.p
                  key={`desc-${activeIndex}`}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
                  className="text-body text-neutral-700 max-w-sm line-clamp-3"
                >
                  {SERVICES_ITEMS[activeIndex].description}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <Link
              href={SERVICES_ITEMS[activeIndex].link}
              scroll={false}
              className="inline-flex items-center justify-center rounded-full border border-neutral-900/40 bg-transparent px-7 py-2.5 text-label font-semibold uppercase text-neutral-900 transition-all duration-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white hover:shadow-lg hover:-translate-y-0.5"
            >
              Discover More
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}
