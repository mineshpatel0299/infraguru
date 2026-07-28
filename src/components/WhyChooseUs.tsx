"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

type CardItem = {
  number: string;
  title: string;
  description: string;
};

const CARDS: CardItem[] = [
  {
    number: "01",
    title: "SMOOTH & STRESS-FREE PROCESS",
    description:
      "Infra Guru is a professional real estate consulting company that helps clients find the right home and property investment with a seamless and stress-free process.",
  },
  {
    number: "02",
    title: "TRUSTED GUIDANCE & SUPPORT",
    description:
      "We focus on delivering trusted guidance and complete transaction support throughout your entire real estate journey.",
  },
  {
    number: "03",
    title: "10+ YEARS OF EXPERIENCE",
    description:
      "With more than a decade in the real estate industry, Infra Guru has been operating as a trusted brand in Gurgaon, Haryana since 2021.",
  },
  {
    number: "04",
    title: "WIDE RANGE OF PROPERTIES",
    description:
      "We handle a comprehensive variety of property categories, specializing in residential properties, commercial properties, and farmland.",
  },
  {
    number: "05",
    title: "RENTALS & LAND DEVELOPMENT",
    description:
      "Our expertise extends across the market, covering commercial rental properties, residential rentals, as well as land and development projects.",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Track vertical scroll progress of the 350vh section container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // When scrollYProgress reaches ~0, the sticky container pins into position.
  // We trigger the smooth entrance animation exactly at this moment so it is never missed!
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= -0.03 && !isActive) {
      setIsActive(true);
    } else if (latest < -0.15 && isActive) {
      setIsActive(false);
    }
  });

  // Calculate exact scrollable width using ResizeObserver to ensure Card 05 is completely visible
  useEffect(() => {
    const updateMaxScroll = () => {
      if (trackRef.current && viewportRef.current) {
        const scrollW = trackRef.current.scrollWidth;
        const clientW = viewportRef.current.clientWidth;
        // Adding generous extra clearance (+350px) guarantees Card 05 is completely visible inside the viewport with ample right breathing room
        setMaxScroll(Math.max(0, scrollW - clientW + 350));
      }
    };

    updateMaxScroll();
    const observer = new ResizeObserver(updateMaxScroll);
    if (trackRef.current) observer.observe(trackRef.current);
    if (viewportRef.current) observer.observe(viewportRef.current);
    window.addEventListener("resize", updateMaxScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateMaxScroll);
    };
  }, []);

  // Map vertical scroll (0.02 to 0.98 progress) to horizontal translation
  const x = useTransform(scrollYProgress, [0.02, 0.98], [0, -maxScroll]);
  const smoothX = useSpring(x, { stiffness: 120, damping: 24, mass: 0.5 });

  return (
    <section id="why-choose-us" className="bg-white">
      {/* ── Tall container to provide vertical scrolling distance for smooth horizontal motion ── */}
      <div ref={sectionRef} className="relative h-[350vh] w-full">
        {/* ── Sticky Viewport Container ── */}
        <div
          ref={viewportRef}
          className="sticky top-0 h-screen w-full overflow-hidden bg-white flex flex-col justify-center py-10 sm:py-14 md:py-16 lg:py-20 px-6 sm:px-10 md:px-14 lg:px-20"
        >
          {/* ── Top Header Section (Smooth Entrance Animation Rising From Below) ── */}
          <div className="relative z-10 w-full text-center max-w-4xl mx-auto mb-8 sm:mb-10 lg:mb-14">
            <motion.div
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 sm:mb-4 flex items-center justify-center gap-3"
            >
              <div className="h-[2px] w-8 bg-gold-gradient" />
              <span className="inline-block font-body text-label font-semibold uppercase text-gold-gradient tracking-widest">
                WHY CHOOSE US
              </span>
              <div className="h-[2px] w-8 bg-gold-gradient" />
            </motion.div>

            <motion.h2
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 45 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="font-body text-h2 font-light tracking-tight text-neutral-900 leading-tight"
            >
              WHERE <span className="font-bold text-gold-gradient">EXCELLENCE</span><br />
              IS STANDARD.
            </motion.h2>
          </div>

          {/* ── Horizontally Scrolling Cards Track (Staggered Rising From Below) ── */}
          <div className="relative z-10 w-full overflow-hidden flex items-center">
            <motion.div
              ref={trackRef}
              style={{ x: smoothX }}
              className="flex items-stretch gap-6 sm:gap-8 lg:gap-10 w-max py-4"
            >
              {CARDS.map((card, idx) => (
                <motion.div
                  key={card.number}
                  animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.25 + idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative w-[85vw] sm:w-[380px] md:w-[420px] lg:w-[460px] shrink-0 rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] bg-gradient-to-br from-[#253d67] to-[#12223a] p-6 sm:p-8 lg:p-10 border border-white/10 flex flex-col justify-between min-h-[320px] sm:min-h-[360px] lg:min-h-[400px] transition-all duration-500 hover:-translate-y-2 hover:border-amber-200/30 cursor-pointer overflow-hidden"
                >
                  {/* Premium internal glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 transition-all duration-500 rounded-[inherit]" />

                  {/* Top Left Card Number */}
                  <div className="flex items-start justify-between relative z-10">
                    <span className="font-body text-5xl sm:text-6xl lg:text-7xl font-bold text-white/10 tracking-tighter transition-all duration-500 group-hover:text-gold-gradient">
                      {card.number}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-white/20 transition-all duration-500 group-hover:bg-gold-gradient group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                  </div>

                  {/* Middle / Bottom Content Block */}
                  <div className="mt-10 sm:mt-12 lg:mt-16 relative z-10">
                    <h3 className="font-body text-h4 font-medium tracking-tight text-white uppercase mb-3 sm:mb-4 leading-snug transition-all duration-500 group-hover:text-gold-gradient">
                      {card.title}
                    </h3>
                    <p className="text-body text-white/70 font-light leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
