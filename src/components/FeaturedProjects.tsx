"use client";

import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence, type Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from "@/lib/db/types";

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

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  
  const activeIndexRef = useRef(0);
  const targetIndexRef = useRef(0);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAdvancingRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const n = projects.length;

  React.useEffect(() => {
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let target = Math.floor(latest * n);
    if (target >= n) target = n - 1;
    if (target < 0) target = 0;

    targetIndexRef.current = target;

    if (isAdvancingRef.current || target === activeIndexRef.current) return;
    isAdvancingRef.current = true;

    const step = () => {
      const current = activeIndexRef.current;
      const nextTarget = targetIndexRef.current;
      
      if (current === nextTarget) {
        isAdvancingRef.current = false;
        advanceTimerRef.current = null;
        return;
      }
      
      const next = current + (nextTarget > current ? 1 : -1);
      
      setPrevIndex(current);
      setDirection(nextTarget > current ? 1 : -1);
      activeIndexRef.current = next;
      setActiveIndex(next);
      
      advanceTimerRef.current = setTimeout(step, 450); 
    };
    
    step();
  });

  return (
    <section id="projects" className="bg-white">
      {/* Premium Header similar to WhyChooseUs */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-4 pb-10 sm:pt-6 sm:pb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3 sm:mb-4 flex items-center justify-center gap-3"
        >
          <div className="h-[2px] w-8 bg-gold-gradient" />
          <span className="inline-block font-body text-label font-semibold uppercase text-gold-gradient tracking-wide">
            FEATURED PROJECTS
          </span>
          <div className="h-[2px] w-8 bg-gold-gradient" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-[clamp(1.5rem,2.3vw,2.75rem)] font-light tracking-normal text-neutral-900 leading-tight"
        >
          OUR <span className="font-bold text-gold-gradient">PORTFOLIO</span>
        </motion.h2>
      </div>

      <div ref={sectionRef} style={{ height: `${n * 100}vh` }} className="relative w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-neutral-900 flex items-center justify-center shadow-2xl">

          {/* ── Base Background ── */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src={projects[prevIndex].image}
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
                  style={{ willChange: 'transform, opacity', scaleY: 1.06 }}
                  className="flex-1 w-full overflow-hidden relative"
                >
                  <img
                    src={projects[activeIndex].image}
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
          <div className="relative z-20 w-[88%] sm:w-[420px] md:w-[460px] lg:w-[500px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#253d67] to-[#12223a] p-6 sm:p-8 md:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.45)] border border-white/10 overflow-hidden text-white flex flex-col items-center text-center">

            {/* Step Counter */}
            <span className="mb-3 font-body text-label font-semibold text-white/50 uppercase">
              {`0${activeIndex + 1} —— 0${projects.length}`}
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
                  className="font-heading text-[clamp(1.25rem,1.6vw,1.9rem)] font-medium tracking-normal text-gold-gradient"
                >
                  {projects[activeIndex].title === "Signature Global De-luxe DXP" ? (
                    <>
                      Signature Global <br /> De-luxe DXP
                    </>
                  ) : (
                    projects[activeIndex].title
                  )}
                </motion.h3>
              </AnimatePresence>
            </div>

            {/* Image Inside Card (Animated Elevator Stack) */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] mb-6 rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.15)] bg-neutral-900">
              <motion.div
                animate={{ y: `-${(activeIndex / projects.length) * 100}%` }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: `${projects.length * 100}%`, willChange: 'transform' }}
                className="absolute inset-x-0 top-0 w-full"
              >
                {projects.map((item, idx) => (
                  <div
                    key={idx}
                    className="relative w-full overflow-hidden"
                    style={{ height: `${100 / projects.length}%` }}
                  >
                    <Image
                      src={item.image}
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
                  className="text-body text-white/70 max-w-sm line-clamp-3"
                >
                  {projects[activeIndex].description[0]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <Link
              href={`/projects/${projects[activeIndex].id}`}
              scroll={false}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-7 py-2.5 text-label font-semibold uppercase text-white transition-all duration-300 hover:border-transparent hover:bg-gold-gradient hover:text-[#12223a] hover:shadow-[0_8px_20px_rgba(212,175,55,0.3)] hover:-translate-y-0.5"
            >
              Discover More
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}
