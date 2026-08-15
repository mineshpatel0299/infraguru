"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { STATS_DEFAULT_CONTENT, type StatsContent } from '@/lib/pageSections';
import { useSectionEdit } from './pagebuilder/SectionEditBoundary';
import EditableText from './pagebuilder/EditableText';
import RemoveItemButton from './pagebuilder/RemoveItemButton';
import AddItemButton from './pagebuilder/AddItemButton';

export default function Stats({ content = STATS_DEFAULT_CONTENT }: { content?: StatsContent }) {
  const ctx = useSectionEdit();
  const live = (ctx?.content as StatsContent | undefined) ?? content;
  const containerRef = useRef<HTMLElement>(null);
  
  // Track the scroll progress within the 250vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Translate the text container from the bottom and freeze it a bit above center
  const yTranslate = useTransform(scrollYProgress, [0, 0.85, 1], ["100vh", "-15vh", "-15vh"]);
  
  // Premium scale and fade effects (does not fade out)
  const scale = useTransform(scrollYProgress, [0, 0.85, 1], [0.85, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <section id="stats" ref={containerRef} className="relative h-[250vh] bg-[#132731] w-full">
      {/* Sticky container that stays pinned while we scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center perspective-[1000px]">
        
        {/* Sky Background Layer (z-0) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/sky.png"
            alt="Sky Background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark gradient overlay blending from top to bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#132731] via-[#132731]/50 to-transparent" />
        </div>

        {/* Background Text Layer (z-10) */}
        <motion.div 
          style={{ y: yTranslate, scale, opacity }}
          className="absolute z-10 w-full px-4 text-center flex flex-col gap-0 md:gap-1 items-center justify-center max-w-[95%] mx-auto"
        >
          <EditableText
            as="h2"
            path="headingLine1"
            fallback={live.headingLine1}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.75rem] font-light text-white leading-tight tracking-normal drop-shadow-md md:whitespace-nowrap"
          />
          <EditableText
            as="h2"
            path="headingLine2"
            fallback={live.headingLine2}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.75rem] font-light text-gold-gradient leading-tight tracking-normal drop-shadow-md mt-1 md:whitespace-nowrap"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mt-12 md:mt-16 w-full max-w-5xl pt-10 border-t border-white/20">
            {live.stats.map((stat, i) => (
              <div key={i} className="group relative flex flex-col items-center gap-1 sm:gap-2">
                <RemoveItemButton arrayPath="stats" index={i} />
                <EditableText as="span" path={`stats[${i}].value`} fallback={stat.value} className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-normal drop-shadow-md" />
                <EditableText
                  as="span"
                  path={`stats[${i}].label`}
                  fallback={stat.label}
                  className="text-xs sm:text-sm md:text-base font-medium text-white/80 uppercase tracking-wide text-center"
                />
              </div>
            ))}
            {ctx && (
              <AddItemButton
                arrayPath="stats"
                newItem={{ value: "0+", label: "New Stat" }}
                className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/25 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-white/50 transition-colors hover:border-white/50 hover:text-white/80"
              />
            )}
          </div>
        </motion.div>

        {/* Foreground Image Layer (z-20) */}
        <div className="absolute bottom-0 left-0 right-0 w-full z-20 pointer-events-none flex justify-center">
          <Image
            src="/ills/ills.png"
            alt="Illustration"
            width={2560}
            height={1440}
            className="w-full h-auto min-h-[40vh] object-cover object-bottom"
            priority
          />
        </div>
      </div>
    </section>
  );
}
