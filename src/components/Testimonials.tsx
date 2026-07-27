"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeDown, scaleIn, slideRight, viewportMirror } from "@/lib/motion";

const TESTIMONIALS = [
  {
    id: 1,
    badge: "01 Testimonials",
    name: "Michael Carter",
    role: "Real Estate Developer",
    quote:
      "An exceptional experience from start to finish! Their attention to detail and ability to bring ideas to life is truly unmatched. Highly recommended for anyone looking for top-tier renderings and visuals.",
    bgColor: "bg-[#f4efe8]",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    badge: "02 Testimonials",
    name: "Sophia Roberts",
    role: "Interior Designer",
    quote:
      "Working with them was a game-changer for my projects. The virtual tours they created were so immersive and engaging that my clients couldn't stop raving about them!",
    bgColor: "bg-[#edf2ee]",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    badge: "03 Testimonials",
    name: "David Vance",
    role: "Luxury Homebuyer",
    quote:
      "The most transparent and seamless real estate acquisition we have ever experienced. Infraguru found us our dream waterfront villa before it even hit the open market.",
    bgColor: "bg-[#f4efe8]",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    badge: "04 Testimonials",
    name: "Elena Rostova",
    role: "Commercial Investor",
    quote:
      "Their strategic market insights and asset curation delivered returns that exceeded our portfolio projections by over 30%. A world-class real estate advisory team.",
    bgColor: "bg-[#edf2ee]",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // On desktop/tablet we show 2 cards at once, on mobile we show 1 card
  const card1 = TESTIMONIALS[currentIndex];
  const card2 = TESTIMONIALS[(currentIndex + 1) % TESTIMONIALS.length];

  return (
    <section id="testimonials" className="bg-white p-3 sm:p-4 lg:p-5">
      <div className="min-h-[calc(100svh-1.5rem)] sm:min-h-[calc(100svh-2rem)] lg:h-[calc(100svh-2.5rem)] w-full rounded-[20px] sm:rounded-[24px] lg:rounded-[32px] bg-[#faf8f5] p-6 sm:p-10 md:p-14 lg:p-16 overflow-hidden flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-stretch h-full w-full max-h-[840px]">
          
          {/* ── LEFT COLUMN: Header & Carousel Navigation Controls ── */}
          <div className="lg:col-span-4 flex flex-col justify-between py-2 sm:py-4">
            <div>
              {/* Luxury Pool/Villa Icon Photo */}
              <motion.div
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={viewportMirror}
                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden shadow-sm border border-white/60 mb-6 sm:mb-8"
              >
                <img
                  src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&auto=format&fit=crop&q=80"
                  alt="Villa view"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Massive Editorial Heading */}
              <motion.h2
                variants={fadeDown}
                initial="hidden"
                whileInView="visible"
                viewport={viewportMirror}
                className="font-body text-h2 font-bold tracking-tight text-neutral-900 mb-8 sm:mb-10 lg:mb-12"
              >
                Voices of <br />
                Trust, Stories <br />
                of Success.
              </motion.h2>
            </div>

            {/* Circular Navigation Buttons */}
            <motion.div
              variants={fadeDown}
              initial="hidden"
              whileInView="visible"
              viewport={viewportMirror}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-3.5 mt-4 sm:mt-6"
            >
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-neutral-200/80 hover:bg-neutral-300 text-neutral-800 flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center transition-all duration-300 shadow-md active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: Testimonial Cards Carousel Grid ── */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportMirror}
            className="lg:col-span-8 overflow-hidden flex items-stretch"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full h-full">
              
              {/* Card 1 (Always visible) */}
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={`card-1-${card1.id}`}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`${card1.bgColor} rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between h-full min-h-[400px] sm:min-h-[460px] shadow-sm border border-black/[0.03]`}
                >
                  {/* Top Row: Pill Badge + Avatar */}
                  <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
                    <span className="border border-neutral-400/50 rounded-full px-3.5 py-1 text-label font-medium text-neutral-700 font-body bg-white/40">
                      {card1.badge}
                    </span>
                    <img
                      src={card1.avatar}
                      alt={card1.name}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover shadow-sm border-2 border-white"
                    />
                  </div>

                  {/* Middle Row: Quote Number & Text */}
                  <div className="flex-1 flex flex-col justify-center my-4 sm:my-6">
                    <span className="font-heading text-3xl sm:text-4xl text-[#b87d6e] font-light mb-3 sm:mb-4 block">
                      66
                    </span>
                    <p className="text-body text-neutral-800 font-normal">
                      {card1.quote}
                    </p>
                  </div>

                  {/* Bottom Row: Author Details */}
                  <div className="pt-6 sm:pt-8 border-t border-black/[0.06] mt-auto">
                    <h4 className="font-body font-bold text-body text-neutral-900">
                      {card1.name}
                    </h4>
                    <p className="text-caption text-neutral-500 font-medium mt-0.5">
                      {card1.role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Card 2 (Visible on sm/tablet and desktop, hidden on extra small mobile screens for clean single-card view) */}
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  key={`card-2-${card2.id}`}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                  transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`hidden sm:flex ${card2.bgColor} rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 lg:p-10 flex-col justify-between h-full min-h-[400px] sm:min-h-[460px] shadow-sm border border-black/[0.03]`}
                >
                  {/* Top Row: Pill Badge + Avatar */}
                  <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
                    <span className="border border-neutral-400/50 rounded-full px-3.5 py-1 text-label font-medium text-neutral-700 font-body bg-white/40">
                      {card2.badge}
                    </span>
                    <img
                      src={card2.avatar}
                      alt={card2.name}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover shadow-sm border-2 border-white"
                    />
                  </div>

                  {/* Middle Row: Quote Number & Text */}
                  <div className="flex-1 flex flex-col justify-center my-4 sm:my-6">
                    <span className="font-heading text-3xl sm:text-4xl text-[#b87d6e] font-light mb-3 sm:mb-4 block">
                      66
                    </span>
                    <p className="text-body text-neutral-800 font-normal">
                      {card2.quote}
                    </p>
                  </div>

                  {/* Bottom Row: Author Details */}
                  <div className="pt-6 sm:pt-8 border-t border-black/[0.06] mt-auto">
                    <h4 className="font-body font-bold text-body text-neutral-900">
                      {card2.name}
                    </h4>
                    <p className="text-caption text-neutral-500 font-medium mt-0.5">
                      {card2.role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
