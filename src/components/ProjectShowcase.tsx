"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence, animate as animateScroll } from "framer-motion";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";

export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // Mirrors activeIndex for use inside the scroll-snap effect below, whose
  // listeners are set up once and shouldn't be torn down/rebuilt on every
  // index change just to read the latest value.
  const activeIndexRef = useRef(0);

  // We allocate 100vh of vertical scroll per project (400vh total for 4 projects)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const n = PROJECTS.length;
  // Even snap targets, one per project (0, 1/3, 2/3, 1 for 4 projects) — where
  // scrolling should come to rest once the user stops, so each gesture lands
  // on a fully-settled project instead of interrupting an in-flight crossfade.
  const snapPoints = useMemo(() => Array.from({ length: n }, (_, i) => i / (n - 1)), [n]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map scroll progress (0 to 1) to an integer index (0 to PROJECTS.length - 1)
    const index = Math.min(n - 1, Math.floor(Math.max(0, latest) * n));
    if (index !== activeIndex) {
      setActiveIndex(index);
      activeIndexRef.current = index;
    }
  });

  // Once the user stops scrolling inside the pinned section, ease the rest of
  // the way to the nearest project so the right-side content (image, title,
  // description) always finishes its transition instead of getting cut off
  // mid-crossfade by the next threshold.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let settleTimer: ReturnType<typeof setTimeout> | null = null;
    let activeAnimation: ReturnType<typeof animateScroll> | null = null;
    let isAutoScrolling = false;

    function cancelSnap() {
      activeAnimation?.stop();
      activeAnimation = null;
      isAutoScrolling = false;
    }

    function handleUserInput() {
      cancelSnap();
    }

    function handleScroll() {
      if (isAutoScrolling) return;
      if (settleTimer) clearTimeout(settleTimer);

      settleTimer = setTimeout(() => {
        const current = scrollYProgress.get();
        if (current <= 0 || current >= 1) return;

        const nearest = snapPoints.reduce((best, sp) =>
          Math.abs(sp - current) < Math.abs(best - current) ? sp : best
        );
        const nearestIndex = snapPoints.indexOf(nearest);
        if (Math.abs(nearest - current) < 0.001 || !section) return;

        const travel = section.offsetHeight - window.innerHeight;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const targetY = sectionTop + nearest * travel;

        isAutoScrolling = true;
        activeAnimation = animateScroll(window.scrollY, targetY, {
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (v) => window.scrollTo(0, v),
          onComplete: () => {
            isAutoScrolling = false;
            // Force the active index to match where we just settled — sub-pixel
            // scroll rounding can otherwise leave the scroll-driven index one
            // step behind a snap destination that sits exactly on a threshold.
            if (nearestIndex >= 0 && nearestIndex !== activeIndexRef.current) {
              setActiveIndex(nearestIndex);
              activeIndexRef.current = nearestIndex;
            }
          },
        });
      }, 220);
    }

    window.addEventListener('wheel', handleUserInput, { passive: true });
    window.addEventListener('touchmove', handleUserInput, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleUserInput);
      window.removeEventListener('touchmove', handleUserInput);
      window.removeEventListener('scroll', handleScroll);
      if (settleTimer) clearTimeout(settleTimer);
      cancelSnap();
    };
  }, [scrollYProgress, snapPoints]);

  const currentProject = PROJECTS[activeIndex] || PROJECTS[0];

  return (
    <section id="project-showcase" className="bg-white p-3 sm:p-4 lg:p-5">
      {/* Tall scrolling track for smooth scroll-driven transitions */}
      <div ref={sectionRef} className="relative h-[400vh] w-full">
        {/* Sticky viewport container */}
        <div className="sticky top-3 sm:top-4 lg:top-5 h-[calc(100svh-1.5rem)] sm:h-[calc(100svh-2rem)] lg:h-[calc(100svh-2.5rem)] w-full overflow-hidden rounded-[20px] sm:rounded-[24px] lg:rounded-[32px] bg-[#050505] text-white shadow-2xl flex flex-col lg:flex-row">
          
          {/* ── LEFT HALF: Image Stack & Ambient Backdrop ── */}
          <div className="relative w-full lg:w-[55%] h-[45%] lg:h-full overflow-hidden flex items-center justify-center bg-neutral-950 p-6 sm:p-10 md:p-14 lg:p-16">
            {/* Clear architectural background image layer that slides up in sync with scroll */}
            <AnimatePresence mode="popLayout">
              <motion.img
                key={`bg-${currentProject.id}`}
                src={currentProject.image}
                alt=""
                initial={{ y: "108%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-108%", opacity: 0 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 h-full w-full object-cover object-center scale-110 brightness-[0.7] blur-[3px] pointer-events-none"
              />
            </AnimatePresence>

            {/* Elevated floating foreground complete card container */}
            <div className="relative z-10 w-[88%] sm:w-[82%] max-w-[620px] aspect-[16/10] sm:aspect-[4/3]">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`card-${currentProject.id}`}
                  initial={{ y: "108%", opacity: 0, scale: 0.96 }}
                  animate={{ y: "0%", opacity: 1, scale: 1 }}
                  exit={{ y: "-108%", opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.85)] border border-white/10 bg-neutral-900"
                >
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── RIGHT HALF: Editorial Text & Project Details ── */}
          <div className="relative w-full lg:w-[45%] flex-1 bg-[#050505] p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/[0.06] z-10">
            
            {/* Top Bar: Vertical List of Projects & Big Index Number */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1.5 sm:gap-2">
                {PROJECTS.map((proj, idx) => {
                  const isCurrent = idx === activeIndex;
                  return (
                    <div
                      key={proj.id}
                      className="flex items-center gap-3 sm:gap-4 text-left transition-colors select-none"
                    >
                      <span
                        className={`font-body text-label transition-colors duration-300 ${
                          isCurrent ? "text-white font-semibold" : "text-neutral-600"
                        }`}
                      >
                        [ N.0{idx + 1} ]
                      </span>
                      <span
                        className={`font-body text-label uppercase transition-colors duration-300 ${
                          isCurrent ? "text-white font-bold" : "text-neutral-500"
                        }`}
                      >
                        {proj.title}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Big active index number (01, 02, 03, 04) */}
              <div className="overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeIndex}
                    initial={{ y: "40%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-40%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block font-body text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-white"
                  >
                    0{activeIndex + 1}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Middle Area: Synchronized Title (Flip Word Animation), Location, and Descriptions */}
            <div className="my-6 sm:my-8 lg:my-12 flex-1 flex flex-col justify-center max-w-lg">
              {/* ── Project Name: 3D Flip Word Animation ── */}
              <div className="min-h-[3.5rem] sm:min-h-[4.5rem] flex items-center mb-1 sm:mb-2">
                <h3
                  style={{ perspective: "1000px" }}
                  className="font-body text-h3 font-bold tracking-tight uppercase text-[#e5d19e] flex flex-wrap gap-x-2 sm:gap-x-3 gap-y-1"
                >
                  <AnimatePresence mode="popLayout">
                    {currentProject.title.split(" ").map((word, idx) => (
                      <motion.span
                        key={`${activeIndex}-${idx}-${word}`}
                        initial={{ opacity: 0, y: 40, rotateX: -90, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -30, rotateX: 90, filter: "blur(4px)" }}
                        transition={{
                          duration: 0.7,
                          delay: idx * 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="inline-block transform-gpu origin-bottom"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </h3>
              </div>

              {/* ── Location, Tagline, and Description ── */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-caption text-white/90 font-medium mb-6 sm:mb-8 lg:mb-10">
                    {currentProject.location}
                  </p>

                  <p className="text-h4 text-white font-medium tracking-tight mb-3 sm:mb-4">
                    {currentProject.tagline}
                  </p>

                  <p className="text-body text-neutral-400 font-normal">
                    {currentProject.description[0]}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Bar: More Details Link & Editorial Hairline Divider */}
            <div className="pt-4 sm:pt-6 border-t border-white/[0.08]">
              <Link
                href={`/projects/${currentProject.id}`}
                className="group flex items-center gap-4 sm:gap-6 w-full"
              >
                <span className="text-label font-semibold text-white/90 group-hover:text-white transition-colors uppercase">
                  More Details
                </span>
                <div className="h-px flex-1 bg-neutral-800 group-hover:bg-neutral-400 transition-colors duration-500" />
                <span className="text-neutral-500 group-hover:text-white transition-colors text-label font-body">
                  ↗
                </span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
