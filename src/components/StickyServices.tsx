"use client";

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform, AnimatePresence, animate as animateScroll, type Variants } from 'framer-motion';

const SHOWCASE_ITEMS = [
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
  // Mirrors activeIndex for use inside the scroll-snap effect below, whose
  // listeners are set up once and shouldn't be torn down/rebuilt on every
  // index change just to read the latest value.
  const activeIndexRef = useRef(activeIndex);

  // 1. Track scroll progress (0 -> 1) of the section relative to the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // 2. Scroll-progress points at which each item becomes active — shared by the
  // continuous card "elevator" transform and the discrete background-slat
  // trigger below, so the card always finishes its move exactly when the
  // background finishes wiping to the matching image (same math, one source).
  const stackRange = useMemo(() => {
    const START = 0.12;
    const END = 0.88;
    const n = SHOWCASE_ITEMS.length;
    // Evenly spaced settle points across [START, END] — every item gets an
    // equal share of scroll distance.
    const settlePoints = Array.from({ length: n }, (_, i) => START + (i / (n - 1)) * (END - START));
    const thresholds = settlePoints.slice(1);
    const positions = SHOWCASE_ITEMS.map((_, i) => `-${(i / n) * 100}%`);
    const avgGap = (END - START) / (n - 1);
    return {
      thresholds,
      input: settlePoints,
      output: positions,
      // Snap targets are the pin's content start/end (START/END), not the
      // outer 0/1 edges of the full scroll track — snapping all the way to 1
      // after the last card is already fully visible is what produced the
      // "extra scroll" once you finish the sequence.
      snapPoints: settlePoints,
      // How close (in scroll-progress) the user must already be to a settle
      // point before a pause is allowed to trigger a snap. Keeps the snap
      // from magnet-pulling someone mid-journey between items during an
      // ordinary pause between scroll flicks.
      snapGate: avgGap * 0.35,
    };
  }, []);

  const stackY = useTransform(scrollYProgress, stackRange.input, stackRange.output);

  // 4. Once the user stops scrolling inside the pinned section, ease the rest
  // of the way to the nearest snap point so each scroll gesture lands cleanly
  // on a settled image instead of stopping mid-crossfade.
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

        const nearest = stackRange.snapPoints.reduce((best, sp) =>
          Math.abs(sp - current) < Math.abs(best - current) ? sp : best
        );
        const nearestIndex = stackRange.snapPoints.indexOf(nearest);
        const distance = Math.abs(nearest - current);
        // Only snap when already close to a settle point. Without this gate,
        // a natural pause between scroll flicks — anywhere, including mid-
        // journey between items — would get magnet-pulled toward whichever
        // point is nearest, which reads as the page fighting the user's
        // scroll (it can even pull them backward mid-flick-sequence).
        if (distance < 0.001 || distance > stackRange.snapGate || !section) return;

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
              setPrevIndex(activeIndexRef.current);
              setDirection(nearestIndex > activeIndexRef.current ? 1 : -1);
              setActiveIndex(nearestIndex);
              activeIndexRef.current = nearestIndex;
            }
          },
        });
      }, 320);
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
  }, [scrollYProgress, stackRange]);

  // 3. Derive active step from the same thresholds to trigger background slats & text crossfades
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    let nextActive = 0;
    for (let i = 0; i < stackRange.thresholds.length; i++) {
      if (p >= stackRange.thresholds[i]) nextActive = i + 1;
    }

    if (nextActive !== activeIndex) {
      setPrevIndex(activeIndex);
      setDirection(nextActive > activeIndex ? 1 : -1);
      setActiveIndex(nextActive);
      activeIndexRef.current = nextActive;
    }
  });

  return (
    <section id="services" className="bg-white p-3 sm:p-4 lg:p-5">
      {/* ── Section Title Header ── */}
      <div className="py-10 sm:py-14 lg:py-16 text-center">
        <h2 className="font-body text-h2 font-semibold tracking-wide uppercase text-neutral-900">
          OUR SERVICES
        </h2>
      </div>

      {/* ── Scrolling Trigger Height (600vh for 6 items at a comfortable pace) ── */}
      <div ref={sectionRef} className="relative h-[600vh] w-full">
        {/* ── Sticky Viewport Container ── */}
        <div className="sticky top-3 sm:top-4 lg:top-5 h-[calc(100svh-1.5rem)] sm:h-[calc(100svh-2rem)] lg:h-[calc(100svh-2.5rem)] w-full overflow-hidden rounded-[20px] sm:rounded-[24px] lg:rounded-[32px] bg-neutral-900 flex items-center justify-center shadow-2xl">

          {/* ── Base Background (Previous Image Underneath) ── */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src={SHOWCASE_ITEMS[prevIndex].bgImage}
              alt=""
              className="h-full w-full object-cover"
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
                    src={SHOWCASE_ITEMS[activeIndex].bgImage}
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

          {/* ── Side Badges (Visible on Medium+ screens) ── */}
          <div className="absolute left-6 sm:left-10 lg:left-16 top-1/2 -translate-y-1/2 z-20 hidden md:block">
            <span className="font-body text-label font-medium text-white/90 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              [ Our Services ]
            </span>
          </div>
          <div className="absolute right-6 sm:right-10 lg:right-16 top-1/2 -translate-y-1/2 z-20 hidden md:block">
            <span className="font-body text-label font-medium text-white/90 uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              [ Keep Scrolling ]
            </span>
          </div>

          {/* ── Center Card (Beige/Cream Luxury Palette with Elevator Image Stack) ── */}
          <div className="relative z-20 w-[88%] sm:w-[420px] md:w-[460px] lg:w-[500px] rounded-2xl sm:rounded-3xl bg-[#e3d8c4] p-6 sm:p-8 md:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.45)] border border-white/40 overflow-hidden text-neutral-900 flex flex-col items-center text-center">

            {/* Step Counter */}
            <span className="mb-3 font-body text-label font-semibold text-neutral-700 uppercase">
              {SHOWCASE_ITEMS[activeIndex].step}
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
                  {SHOWCASE_ITEMS[activeIndex].title}
                </motion.h3>
              </AnimatePresence>
            </div>

            {/* Image Inside Card (Continuous Elevator Stack via stackY) */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] mb-6 rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.15)] bg-neutral-900">
              <motion.div
                style={{ y: stackY, height: `${SHOWCASE_ITEMS.length * 100}%`, willChange: 'transform' }}
                className="absolute inset-x-0 top-0 w-full"
              >
                {SHOWCASE_ITEMS.map((item) => (
                  <div
                    key={item.step}
                    className="relative w-full overflow-hidden"
                    style={{ height: `${100 / SHOWCASE_ITEMS.length}%` }}
                  >
                    <img
                      src={item.bgImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
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
                  className="text-body text-neutral-700 max-w-sm"
                >
                  {SHOWCASE_ITEMS[activeIndex].description}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <a
              href={SHOWCASE_ITEMS[activeIndex].link}
              className="inline-flex items-center justify-center rounded-full border border-neutral-900/40 bg-transparent px-7 py-2.5 text-label font-semibold uppercase text-neutral-900 transition-all duration-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white hover:shadow-lg hover:-translate-y-0.5"
            >
              Discover More
            </a>

          </div>

        </div>
      </div>
    </section>
  );
}
