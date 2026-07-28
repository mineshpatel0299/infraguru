"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence, animate as animateScroll } from "framer-motion";
import Link from "next/link";
import { PROJECTS } from "@/lib/projects";

export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  // Where the raw scroll position currently says we should be. activeIndex
  // advances toward this one step at a time (see the effect below) instead
  // of jumping straight there — so a single fast scroll never skips past an
  // intermediate project; every project gets its own reveal, however fast
  // or slow you scroll.
  const targetIndexRef = useRef(0);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // We allocate 100vh of vertical scroll per project (400vh total for 4 projects)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const n = PROJECTS.length;

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map scroll progress (0 to 1) to an integer index (0 to PROJECTS.length - 1)
    const target = Math.min(n - 1, Math.floor(Math.max(0, latest) * n));
    targetIndexRef.current = target;

    if (target !== activeIndexRef.current && !advanceTimerRef.current) {
      const step = () => {
        setActiveIndex((current) => {
          const nextTarget = targetIndexRef.current;
          if (current === nextTarget) {
            advanceTimerRef.current = null;
            return current;
          }
          const next = current + (nextTarget > current ? 1 : -1);
          activeIndexRef.current = next;
          advanceTimerRef.current = setTimeout(step, 280);
          return next;
        });
      };
      step();
    }
  });

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
                <AnimatePresence mode="popLayout">
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
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeIndex}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
                    },
                    exit: {
                      opacity: 0,
                      transition: { staggerChildren: 0.05, staggerDirection: -1 }
                    }
                  }}
                  className="flex flex-col"
                >
                  <motion.p 
                    variants={{
                      hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
                      visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                      exit: { y: -20, opacity: 0, filter: "blur(4px)", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="text-caption text-white/90 font-medium mb-6 sm:mb-8 lg:mb-10"
                  >
                    {currentProject.location}
                  </motion.p>

                  <motion.p 
                    variants={{
                      hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
                      visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                      exit: { y: -20, opacity: 0, filter: "blur(4px)", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="text-h4 text-white font-medium tracking-tight mb-3 sm:mb-4"
                  >
                    {currentProject.tagline}
                  </motion.p>

                  <motion.p 
                    variants={{
                      hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
                      visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                      exit: { y: -20, opacity: 0, filter: "blur(4px)", transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="text-body text-neutral-400 font-normal"
                  >
                    {currentProject.description[0]}
                  </motion.p>
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
