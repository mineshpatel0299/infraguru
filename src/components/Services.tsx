"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { SERVICES_DEFAULT_CONTENT, type ServicesContent } from '@/lib/pageSections';
import { useSectionEdit } from './pagebuilder/SectionEditBoundary';
import EditableText from './pagebuilder/EditableText';
import EditableImage from './pagebuilder/EditableImage';
import RemoveItemButton from './pagebuilder/RemoveItemButton';
import AddItemButton from './pagebuilder/AddItemButton';

export default function Services({ content = SERVICES_DEFAULT_CONTENT }: { content?: ServicesContent }) {
  const ctx = useSectionEdit();
  const live = (ctx?.content as ServicesContent | undefined) ?? content;
  const SERVICES_ITEMS = live.items.map((item, i) => ({
    step: String(i + 1).padStart(2, "0"),
    title: item.title,
    bgImage: item.bgImage,
    description: item.description,
    link: item.link,
  }));
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize(); // initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="services" className="bg-white relative overflow-hidden py-24 sm:py-32">
      <div className="w-full max-w-[1760px] 2xl:max-w-[2100px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Premium Header */}
        <div className="text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 flex items-center justify-center gap-3"
          >
            <div className="h-[2px] w-8 bg-gold-gradient" />
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
            className="font-heading text-[clamp(1.5rem,2.3vw,2.75rem)] font-light tracking-normal text-neutral-900 leading-tight"
          >
            <EditableText as="span" path="headingPlain" fallback={live.headingPlain} />{" "}
            <EditableText as="span" path="headingHighlight" fallback={live.headingHighlight} className="font-bold text-gold-gradient" />
          </motion.h2>
        </div>

        {/* Accordion Container */}
        <div className="flex flex-col lg:flex-row w-full h-[900px] lg:h-[600px] gap-3 sm:gap-4">
          {SERVICES_ITEMS.map((item, idx) => {
            const isActive = hoveredIndex === idx;
            
            return (
              <motion.div
                key={idx}
                onMouseEnter={() => !isMobile && setHoveredIndex(idx)}
                onClick={() => isMobile && setHoveredIndex(idx)}
                initial={false}
                animate={{
                  flex: isActive ? (isMobile ? 5 : 6) : 1
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-3xl cursor-pointer group bg-primary-dark"
              >
                <RemoveItemButton arrayPath="items" index={idx} className="absolute right-2 top-2 z-40 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white opacity-0 shadow transition-opacity group-hover:opacity-100" />

                {/* Background Image */}
                <motion.div
                  className="absolute inset-0 z-0"
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <EditableImage path={`items[${idx}].bgImage`} fallback={item.bgImage} wrapperClassName="relative h-full w-full">
                    {(src) => (
                      <Image
                        src={src}
                        alt={item.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className={`object-cover transition-opacity duration-700 ${isActive ? 'opacity-70' : 'opacity-20'}`}
                      />
                    )}
                  </EditableImage>
                </motion.div>

                {/* Dark Blue Overlay */}
                <div className={`pointer-events-none absolute inset-0 z-10 transition-colors duration-700 ${isActive ? 'bg-black/20' : 'bg-primary-dark/80'}`} />

                {/* Ghost Number */}
                <div className="absolute top-4 right-4 lg:top-6 lg:right-6 z-20 font-body text-3xl lg:text-6xl font-semibold text-white/10 leading-none">
                  {item.step}
                </div>

                {/* Content Container */}
                <div className="pointer-events-none absolute inset-0 z-30 flex flex-col justify-end p-6 lg:p-10">

                  {/* Inactive Vertical Title (Desktop only) */}
                  {!isActive && !isMobile && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span 
                        className="font-body text-lg font-medium text-white/40 tracking-[0.1em] uppercase whitespace-nowrap"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        {item.title}
                      </span>
                    </div>
                  )}

                  {/* Inactive Horizontal Title (Mobile only) */}
                  {!isActive && isMobile && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="font-body text-base font-medium text-white/50 tracking-wide uppercase">
                        {item.title}
                      </span>
                    </div>
                  )}

                  {/* Active Content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="flex flex-col h-full justify-end"
                      >
                        <EditableText
                          as="h3"
                          path={`items[${idx}].title`}
                          fallback={item.title}
                          className="pointer-events-auto font-body text-2xl sm:text-3xl font-medium text-gold-gradient mb-3 sm:mb-4 block"
                        />
                        <EditableText
                          as="p"
                          path={`items[${idx}].description`}
                          fallback={item.description}
                          multiline
                          className="pointer-events-auto text-white/80 text-sm sm:text-lg leading-relaxed max-w-lg mb-6 sm:mb-8"
                        />

                        <div className="pointer-events-auto">
                          <Link
                            href={item.link}
                            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-label font-semibold uppercase text-white transition-all duration-300 hover:border-transparent hover:bg-gold-gradient hover:text-[#12223a] hover:shadow-[0_8px_20px_rgba(212,175,55,0.3)]"
                          >
                            Explore Service
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

              </motion.div>
            );
          })}
          {ctx && (
            <AddItemButton
              arrayPath="items"
              newItem={{ title: "New Service", description: "Describe this service…", bgImage: "/about-1.jpg", link: "/contact" }}
              className="flex flex-1 items-center justify-center rounded-3xl border-2 border-dashed border-white/15 text-xs font-bold uppercase tracking-wide text-white/40 transition-colors hover:border-white/30 hover:text-white/70"
            />
          )}
        </div>

      </div>
    </section>
  );
}
