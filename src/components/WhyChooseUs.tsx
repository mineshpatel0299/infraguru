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
    title: "CURATED COLLECTION OF LUXURY VILLAS",
    description:
      "Handpicked, architecturally striking villas in the most desirable locations. Each property offers privacy, sophistication, and world-class amenities.",
  },
  {
    number: "02",
    title: "BESPOKE INTERIOR & EXTERIOR DESIGN",
    description:
      "Our design services are fully personalized—crafted to match your vision, lifestyle, and taste. Whether you seek timeless elegance or bold modernity, we bring your dream space to life, inside and out.",
  },
  {
    number: "03",
    title: "END-TO-END PROJECT MANAGEMENT",
    description:
      "From villa acquisition to full-scale design detail. Our seamless process ensures your peace of mind, with one dedicated team guiding you from concept to completion.",
  },
  {
    number: "04",
    title: "VERIFIED A-GRADE PARTNER NETWORK",
    description:
      "We collaborate exclusively with top-tier architects, contractors, and legal experts. Every partner undergoes rigorous vetting to guarantee unmatched craftsmanship, compliance, and reliability.",
  },
  {
    number: "05",
    title: "TRANSPARENT & TAILORED INVESTMENTS",
    description:
      "We provide comprehensive market analysis and clear financial modeling for every acquisition. Our bespoke investment strategies maximize long-term property value and rental yields with zero hidden surprises.",
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
    <section id="why-choose-us" className="bg-white p-3 sm:p-4 lg:p-5">
      {/* ── Tall container to provide vertical scrolling distance for smooth horizontal motion ── */}
      <div ref={sectionRef} className="relative h-[350vh] w-full">
        {/* ── Sticky Viewport Container ── */}
        <div
          ref={viewportRef}
          className="sticky top-3 sm:top-4 lg:top-5 h-[calc(100svh-1.5rem)] sm:h-[calc(100svh-2rem)] lg:h-[calc(100svh-2.5rem)] w-full overflow-hidden rounded-[20px] sm:rounded-[24px] lg:rounded-[32px] bg-[#e6ebe5] flex flex-col justify-center py-10 sm:py-14 md:py-16 lg:py-20 px-6 sm:px-10 md:px-14 lg:px-20"
        >
          {/* ── Top Header Section (Smooth Entrance Animation Rising From Below) ── */}
          <div className="relative z-10 w-full text-center max-w-4xl mx-auto mb-8 sm:mb-10 lg:mb-14">
            <motion.div
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 sm:mb-4"
            >
              <span className="inline-block font-body text-label font-semibold uppercase text-neutral-600">
                WHY CHOOSE US
              </span>
            </motion.div>

            <motion.h2
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 45 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="font-body text-h2 font-bold tracking-tight uppercase text-neutral-900"
            >
              WHERE EXCELLENCE<br />
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
                  className="group relative w-[85vw] sm:w-[380px] md:w-[420px] lg:w-[460px] shrink-0 rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] bg-[linear-gradient(145deg,#ffffff_0%,#f5f9f6_55%,#e6ece7_100%)] p-6 sm:p-8 lg:p-10 border border-white flex flex-col justify-between min-h-[320px] sm:min-h-[360px] lg:min-h-[400px] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer"
                >
                  {/* Top Left Card Number */}
                  <div className="flex items-start justify-between">
                    <span className="font-body text-4xl sm:text-5xl lg:text-6xl font-medium text-neutral-900 tracking-tight transition-colors duration-300 group-hover:text-primary">
                      {card.number}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-neutral-300 transition-colors duration-300 group-hover:bg-primary" />
                  </div>

                  {/* Middle / Bottom Content Block */}
                  <div className="mt-10 sm:mt-12 lg:mt-16">
                    <h3 className="font-body text-h4 font-bold tracking-tight text-neutral-900 uppercase mb-3 sm:mb-4 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-body text-neutral-600 font-normal">
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
