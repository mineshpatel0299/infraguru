"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeDown, scaleIn, slideRight, viewportMirror } from "@/lib/motion";
import { TESTIMONIALS_DEFAULT_CONTENT, type TestimonialsContent } from "@/lib/pageSections";
import { useSectionEdit } from "./pagebuilder/SectionEditBoundary";
import EditableText from "./pagebuilder/EditableText";
import EditableImage from "./pagebuilder/EditableImage";
import RemoveItemButton from "./pagebuilder/RemoveItemButton";
import AddItemButton from "./pagebuilder/AddItemButton";

export default function Testimonials({
  content = TESTIMONIALS_DEFAULT_CONTENT,
}: {
  content?: TestimonialsContent;
}) {
  const ctx = useSectionEdit();
  const live = (ctx?.content as TestimonialsContent | undefined) ?? content;
  const TESTIMONIALS = live.items.map((item, i) => ({
    id: i + 1,
    badge: `${String(i + 1).padStart(2, "0")} Testimonials`,
    name: item.name,
    role: item.role,
    quote: item.quote,
    bgColor: i % 2 === 0 ? "bg-[#f4efe8]" : "bg-[#edf2ee]",
    avatar: item.avatar,
  }));
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

  if (TESTIMONIALS.length === 0) return null;

  // On desktop/tablet we show 2 cards at once, on mobile we show 1 card
  const card1Index = currentIndex % TESTIMONIALS.length;
  const card2Index = (currentIndex + 1) % TESTIMONIALS.length;
  const card1 = TESTIMONIALS[card1Index];
  const card2 = TESTIMONIALS[card2Index];

  return (
    <section id="testimonials" className="bg-white">
      <div className="min-h-[100svh] lg:min-h-[100svh] w-full bg-primary-dark px-6 sm:px-10 md:px-14 lg:px-16 py-20 lg:py-24 overflow-hidden flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-stretch h-full w-full max-h-[840px]">
          
          {/* ── LEFT COLUMN: Header & Carousel Navigation Controls ── */}
          <div className="lg:col-span-4 flex flex-col justify-between py-2 sm:py-4">
            <div>
              {/* Premium Heading */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mb-3 sm:mb-4 flex items-center justify-start gap-3"
              >
                <EditableText
                  as="span"
                  path="eyebrow"
                  fallback={live.eyebrow}
                  className="inline-block font-body text-sm font-semibold uppercase text-gold-gradient tracking-wide"
                />
                <div className="h-[2px] w-8 bg-gold-gradient" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-[clamp(1.5rem,2.3vw,2.75rem)] font-light tracking-normal text-white leading-tight mb-8 sm:mb-10 lg:mb-12"
              >
                <EditableText as="span" path="headingPlain" fallback={live.headingPlain} /> <br /> <EditableText as="span" path="headingHighlight" fallback={live.headingHighlight} className="font-bold text-gold-gradient" />
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
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 shadow-sm active:scale-95 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gold-gradient text-neutral-950 flex items-center justify-center transition-all duration-300 shadow-md active:scale-95 hover:scale-105"
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
                  layout
                  key={`card-1-${card1.id}`}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 60 : -60, scale: 0.95, filter: "blur(5px)" }}
                  animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: direction > 0 ? -60 : 60, scale: 0.95, filter: "blur(5px)" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative ${card1.bgColor} rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between h-full min-h-[400px] sm:min-h-[460px] shadow-sm border border-black/[0.03]`}
                >
                  <RemoveItemButton arrayPath="items" index={card1Index} />
                  {/* Top Row: Pill Badge + Avatar */}
                  <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
                    <span className="border border-neutral-400/50 rounded-full px-3.5 py-1 text-label font-medium text-neutral-700 font-body bg-white/40">
                      {card1.badge}
                    </span>
                    <EditableImage path={`items[${card1Index}].avatar`} fallback={card1.avatar} wrapperClassName="relative h-11 w-11 sm:h-12 sm:w-12 shrink-0 rounded-full overflow-hidden">
                      {(src) => (
                        <Image
                          src={src}
                          alt={card1.name}
                          fill
                          className="object-cover shadow-sm border-2 border-white"
                        />
                      )}
                    </EditableImage>
                  </div>

                  {/* Middle Row: Quote Number & Text */}
                  <div className="flex-1 flex flex-col justify-center my-4 sm:my-6">
                    <span className="font-heading text-2xl sm:text-3xl text-[#b87d6e] font-light mb-3 sm:mb-4 block">
                      66
                    </span>
                    <EditableText as="p" path={`items[${card1Index}].quote`} fallback={card1.quote} multiline className="text-body text-neutral-800 font-normal" />
                  </div>

                  {/* Bottom Row: Author Details */}
                  <div className="pt-6 sm:pt-8 border-t border-black/[0.06] mt-auto">
                    <EditableText as="h4" path={`items[${card1Index}].name`} fallback={card1.name} className="font-body font-semibold text-body text-neutral-900 block" />
                    <EditableText as="p" path={`items[${card1Index}].role`} fallback={card1.role} className="text-caption text-neutral-500 font-medium mt-0.5" />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Card 2 (Visible on sm/tablet and desktop, hidden on extra small mobile screens for clean single-card view) */}
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  layout
                  key={`card-2-${card2.id}`}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 60 : -60, scale: 0.95, filter: "blur(5px)" }}
                  animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: direction > 0 ? -60 : 60, scale: 0.95, filter: "blur(5px)" }}
                  transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`hidden sm:flex group relative ${card2.bgColor} rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 lg:p-10 flex-col justify-between h-full min-h-[400px] sm:min-h-[460px] shadow-sm border border-black/[0.03]`}
                >
                  <RemoveItemButton arrayPath="items" index={card2Index} />
                  {/* Top Row: Pill Badge + Avatar */}
                  <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8">
                    <span className="border border-neutral-400/50 rounded-full px-3.5 py-1 text-label font-medium text-neutral-700 font-body bg-white/40">
                      {card2.badge}
                    </span>
                    <EditableImage path={`items[${card2Index}].avatar`} fallback={card2.avatar} wrapperClassName="relative h-11 w-11 sm:h-12 sm:w-12 shrink-0 rounded-full overflow-hidden">
                      {(src) => (
                        <Image
                          src={src}
                          alt={card2.name}
                          fill
                          className="object-cover shadow-sm border-2 border-white"
                        />
                      )}
                    </EditableImage>
                  </div>

                  {/* Middle Row: Quote Number & Text */}
                  <div className="flex-1 flex flex-col justify-center my-4 sm:my-6">
                    <span className="font-heading text-2xl sm:text-3xl text-[#b87d6e] font-light mb-3 sm:mb-4 block">
                      66
                    </span>
                    <EditableText as="p" path={`items[${card2Index}].quote`} fallback={card2.quote} multiline className="text-body text-neutral-800 font-normal" />
                  </div>

                  {/* Bottom Row: Author Details */}
                  <div className="pt-6 sm:pt-8 border-t border-black/[0.06] mt-auto">
                    <EditableText as="h4" path={`items[${card2Index}].name`} fallback={card2.name} className="font-body font-semibold text-body text-neutral-900 block" />
                    <EditableText as="p" path={`items[${card2Index}].role`} fallback={card2.role} className="text-caption text-neutral-500 font-medium mt-0.5" />
                  </div>
                </motion.div>
              </AnimatePresence>

              {ctx && (
                <AddItemButton
                  arrayPath="items"
                  newItem={{ name: "New Person", role: "Role / Title", quote: "Add a testimonial quote…", avatar: "/about-1.jpg" }}
                  className="hidden sm:flex min-h-[400px] sm:min-h-[460px] items-center justify-center rounded-[24px] sm:rounded-[32px] border-2 border-dashed border-[#032E97]/20 text-xs font-bold uppercase tracking-wide text-white/40 transition-colors hover:border-white/40 hover:text-white/70"
                />
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
