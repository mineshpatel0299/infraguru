"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { WHY_CHOOSE_US_DEFAULT_CONTENT, type WhyChooseUsContent } from '@/lib/pageSections';
import { useSectionEdit } from './pagebuilder/SectionEditBoundary';
import EditableText from './pagebuilder/EditableText';
import RemoveItemButton from './pagebuilder/RemoveItemButton';
import AddItemButton from './pagebuilder/AddItemButton';
import { icons } from 'lucide-react';

const LucideIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (icons as any)[name] || icons.Star;
  return <IconComponent className={className} />;
};

export default function WhyChooseUs({
  content = WHY_CHOOSE_US_DEFAULT_CONTENT,
}: {
  content?: WhyChooseUsContent;
}) {
  const ctx = useSectionEdit();
  const live = (ctx?.content as WhyChooseUsContent | undefined) ?? content;
  const FALLBACK_ICONS = ["HeartHandshake", "ShieldCheck", "Clock", "Building", "Map"];
  const FALLBACK_IMAGES = [
    "/why-choose-us-1.jpg",
    "/why-choose-us-2.jpg",
    "/why-choose-us-3.jpg",
    "/why-choose-us-4.jpg",
    "/why-choose-us-5.jpg",
  ];
  const CARDS = live.cards.map((card, i) => ({
    number: String(i + 1).padStart(2, "0"),
    title: card.title,
    description: card.description,
    icon: card.icon || FALLBACK_ICONS[i % FALLBACK_ICONS.length],
    image: card.image || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
  }));

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
              <div className="h-[2px] w-8 bg-primary" />
              <EditableText
                as="span"
                path="eyebrow"
                fallback={live.eyebrow}
                className="inline-block font-body text-sm font-semibold uppercase text-primary tracking-wide"
              />
              <div className="h-[2px] w-8 bg-primary" />
            </motion.div>

            <motion.h2
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 45 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-[clamp(1.5rem,2.3vw,2.75rem)] font-light tracking-normal text-neutral-900 leading-tight"
            >
              <EditableText as="span" path="headingPlain" fallback={live.headingPlain} />{" "}
              <EditableText as="span" path="headingHighlight" fallback={live.headingHighlight} className="font-bold text-gold-gradient" /><br />
              <EditableText as="span" path="headingSuffix" fallback={live.headingSuffix} />
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
                  key={idx}
                  animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.25 + idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative w-[calc(100vw-3rem)] sm:w-[380px] md:w-[420px] lg:w-[460px] shrink-0 rounded-[24px] sm:rounded-[28px] lg:rounded-[32px] border border-white/10 flex flex-col justify-between min-h-[320px] sm:min-h-[360px] lg:min-h-[400px] transition-all duration-500 hover:-translate-y-2 hover:border-amber-200/30 cursor-pointer overflow-hidden"
                >
                  {/* Full card background image */}
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 768px) 380px, (max-width: 1024px) 420px, 460px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#12223a]/70 via-[#12223a]/75 to-[#12223a]/90 transition-all duration-500 group-hover:from-[#12223a]/60 group-hover:via-[#12223a]/65 group-hover:to-[#12223a]/85" />
                  {/* Gold shimmer overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-amber-600/0 group-hover:from-amber-400/10 group-hover:to-amber-600/5 transition-all duration-500" />

                  <RemoveItemButton arrayPath="cards" index={idx} />

                  {/* Top Left Card Number & Icon */}
                  <div className="flex items-start justify-between relative z-10 p-6 sm:p-8 lg:p-10">
                    <span className="font-body text-4xl sm:text-5xl lg:text-6xl font-semibold text-white/15 tracking-tight transition-all duration-500 group-hover:text-gold-gradient">
                      {card.number}
                    </span>
                    <div className="flex items-center gap-4">
                      <LucideIcon name={card.icon} className="w-8 h-8 sm:w-10 sm:h-10 text-white/40 transition-all duration-500 group-hover:text-gold-gradient group-hover:scale-110" />
                      <span className="h-2 w-2 rounded-full bg-white/25 transition-all duration-500 group-hover:bg-gold-gradient group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                    </div>
                  </div>

                  {/* Middle / Bottom Content Block */}
                  <div className="mt-auto relative z-10 p-6 sm:p-8 lg:p-10 pt-0">
                    <EditableText
                      as="h3"
                      path={`cards[${idx}].title`}
                      fallback={card.title}
                      className="font-body text-h4 font-medium tracking-tight text-white uppercase mb-3 sm:mb-4 leading-snug transition-all duration-500 group-hover:text-gold-gradient block"
                    />
                    <EditableText
                      as="p"
                      path={`cards[${idx}].description`}
                      fallback={card.description}
                      multiline
                      className="text-body text-white/80 font-light leading-relaxed"
                    />
                  </div>
                </motion.div>
              ))}
              {ctx && (
                <div className="flex w-[240px] shrink-0 items-center justify-center">
                  <AddItemButton arrayPath="cards" newItem={{ title: "NEW CARD", description: "Describe this card…", icon: "Star" }} />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
