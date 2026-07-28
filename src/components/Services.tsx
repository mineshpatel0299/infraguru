"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export const SERVICES_ITEMS = [
  {
    step: "01",
    title: "Property to Buy",
    bgImage: "/Projects/M3M%20Antalya/544304004_m3m-antalya-hills-gallery-3.webp",
    description: "Property to buy means a land or building that is available for sale and can be legally purchased by a buyer.",
    link: "#contact",
  },
  {
    step: "02",
    title: "Property to Sell",
    bgImage: "/Projects/SIgnature/WhatsApp-Image-2026-02-26-at-124237-PM-Picsart-AiImageEnhancer.webp",
    description: "Property to sell means a land or building that the owner is offering for sale and can be legally sold to a buyer.",
    link: "#contact",
  },
  {
    step: "03",
    title: "Property to Rent",
    bgImage: "/Projects/SignatureDeluxe/image-Picsart-AiImageEnhancer-1-scaled.webp",
    description: "Property to rent means a land or building that is given to someone for temporary use in exchange for rent, without transferring ownership.",
    link: "#contact",
  },
  {
    step: "04",
    title: "Property to Lease",
    bgImage: "/Projects/M3M/Artboard_4_1_-_8jpuMAmC4FGE.webp",
    description: "Property to lease means a land or building given for long-term use to a tenant under a lease agreement, without transferring ownership.",
    link: "#contact",
  },
  {
    step: "05",
    title: "Property to Invest",
    bgImage: "/Projects/M3M%20Antalya/about_2_-_LKRZFgeqKGJ4_-_CfWwyPz3TLPk.webp",
    description: "Property to invest means properties specially selected for long-term returns, rental income and capital growth.",
    link: "#contact",
  },
  {
    step: "06",
    title: "Property for Joint Development",
    bgImage: "/Projects/SIgnature/WhatsApp-Image-2026-02-26-at-124128-PM-Picsart-AiImageEnhancer.webp",
    description: "Property for joint development is when a land owner and developer partner together to develop a project, sharing the resulting benefits without either party bearing the full cost alone.",
    link: "#contact",
  },
];

export default function Services() {
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
      <div className="w-full max-w-[1600px] 2xl:max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
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
            <span className="inline-block font-body text-label font-semibold uppercase text-gold-gradient tracking-widest">
              WHAT WE DO
            </span>
            <div className="h-[2px] w-8 bg-gold-gradient" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-h2 font-light tracking-tight text-neutral-900 leading-tight"
          >
            COMPREHENSIVE <span className="font-bold text-gold-gradient">SERVICES</span>
          </motion.h2>
        </div>

        {/* Accordion Container */}
        <div className="flex flex-col lg:flex-row w-full h-[900px] lg:h-[600px] gap-3 sm:gap-4">
          {SERVICES_ITEMS.map((item, idx) => {
            const isActive = hoveredIndex === idx;
            
            return (
              <motion.div
                key={item.step}
                onMouseEnter={() => !isMobile && setHoveredIndex(idx)}
                onClick={() => isMobile && setHoveredIndex(idx)}
                initial={false}
                animate={{ 
                  flex: isActive ? (isMobile ? 5 : 6) : 1 
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-3xl cursor-pointer group bg-primary-dark"
              >
                {/* Background Image */}
                <motion.div 
                  className="absolute inset-0 z-0"
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={item.bgImage}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={`object-cover transition-opacity duration-700 ${isActive ? 'opacity-70' : 'opacity-20'}`}
                  />
                </motion.div>

                {/* Dark Blue Overlay */}
                <div className={`absolute inset-0 z-10 transition-colors duration-700 ${isActive ? 'bg-gradient-to-t from-primary-dark via-primary-dark/60 to-transparent' : 'bg-primary-dark/80'}`} />

                {/* Ghost Number */}
                <div className="absolute top-4 right-4 lg:top-6 lg:right-6 z-20 font-body text-4xl lg:text-7xl font-bold text-white/10 leading-none">
                  {item.step}
                </div>

                {/* Content Container */}
                <div className="absolute inset-0 z-30 flex flex-col justify-end p-6 lg:p-10">
                  
                  {/* Inactive Vertical Title (Desktop only) */}
                  {!isActive && !isMobile && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span 
                        className="font-body text-xl font-medium text-white/40 tracking-[0.2em] uppercase whitespace-nowrap"
                        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                      >
                        {item.title}
                      </span>
                    </div>
                  )}

                  {/* Inactive Horizontal Title (Mobile only) */}
                  {!isActive && isMobile && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="font-body text-base font-medium text-white/50 tracking-widest uppercase">
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
                        <h3 className="font-body text-3xl sm:text-4xl font-semibold text-gold-gradient mb-3 sm:mb-4">
                          {item.title}
                        </h3>
                        <p className="text-white/80 text-sm sm:text-lg leading-relaxed max-w-lg mb-6 sm:mb-8 line-clamp-2 sm:line-clamp-3">
                          {item.description}
                        </p>
                        
                        <div>
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
        </div>
        
      </div>
    </section>
  );
}
