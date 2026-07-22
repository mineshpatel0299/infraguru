"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

const CATEGORIES = [
  {
    id: 'buy',
    number: '01',
    label: 'Buy',
    title: 'Property to Buy',
    description:
      'Buying property means purchasing a physical piece of real estate — like land, a house, flat, or commercial space — and becoming its legal owner in exchange for money.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    mark: (
      <rect x="4.5" y="4.5" width="15" height="15" rx="1" />
    ),
  },
  {
    id: 'sell',
    number: '02',
    label: 'Sell',
    title: 'Property to Sell',
    description:
      'Property to sell means a property — house, flat, shop, or land — that the owner wishes to list and transfer permanently to a new buyer.',
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    mark: (
      <rect x="5" y="5" width="14" height="14" rx="1" transform="rotate(45 12 12)" />
    ),
  },
  {
    id: 'rent',
    number: '03',
    label: 'Rent',
    title: 'Property to Rent',
    description:
      'Property to rent means a property given to someone to use for a short period, in exchange for a monthly rental payment.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    mark: (
      <circle cx="12" cy="12" r="7.5" />
    ),
  },
  {
    id: 'lease',
    number: '04',
    label: 'Lease',
    title: 'Property to Lease',
    description:
      'Property to lease means a land or building given for long-term use to a tenant under a lease agreement, without transferring ownership.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    mark: (
      <path d="M12 4.5 18.5 8.25 18.5 15.75 12 19.5 5.5 15.75 5.5 8.25Z" />
    ),
  },
  // {
  //   id: 'invest',
  //   number: '05',
  //   label: 'Invest',
  //   title: 'Property to Invest',
  //   description:
  //     'Property to invest means assets specially selected for long-term returns, steady rental income and sustained capital growth.',
  //   image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  //   mark: (
  //     <path d="M4.5 16.5l5.5-5.5 3.5 3.5 6-6.5M14 7.5h5.5V13" />
  //   ),
  // },
  // {
  //   id: 'joint-development',
  //   number: '06',
  //   label: 'Joint Dev.',
  //   title: 'Property for Joint Development',
  //   description:
  //     'Joint development is when a land owner and developer partner together to build a project and share in the benefits.',
  //   image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  //   mark: (
  //     <>
  //       <circle cx="9" cy="12" r="6" />
  //       <circle cx="15" cy="12" r="6" />
  //     </>
  //   ),
  // },
];

export default function PropertyTypes() {
  const [active, setActive] = useState(0);

  const goPrev = () => setActive((prev) => (prev - 1 + CATEGORIES.length) % CATEGORIES.length);
  const goNext = () => setActive((prev) => (prev + 1) % CATEGORIES.length);

  return (
    <section id="services" className="bg-white py-40 lg:py-56">
      <div className="container mx-auto max-w-7xl px-8">
        <motion.div
          className="mb-16 flex flex-col items-center justify-between gap-12 lg:gap-16 lg:flex-row lg:items-end"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
        >
          <div className="max-w-160 text-center lg:text-left">
            <motion.span className="eyebrow justify-center lg:justify-start" variants={fadeUp}>
              Our Services
            </motion.span>
            <motion.h2 className="mb-5 text-[clamp(2.4rem,4vw,3.4rem)] text-primary-dark font-light tracking-tight" variants={fadeUp}>
              A Property Path For <span className="text-gradient">Every Ambition</span>
            </motion.h2>
            <motion.p className="text-[1.1rem] leading-[1.7] text-muted" variants={fadeUp}>
              Whichever stage you&apos;re at, Infraguru shapes the journey — from first
              acquisition to long-term portfolio growth.
            </motion.p>
          </div>

          <motion.div className="flex shrink-0 items-center gap-3" variants={fadeUp}>
            <button
              onClick={goPrev}
              aria-label="Previous service"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/15 text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
            >
              &#10094;
            </button>
            <button
              onClick={goNext}
              aria-label="Next service"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/15 text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white"
            >
              &#10095;
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex h-[840px] flex-col gap-3 overflow-hidden sm:h-[760px] lg:h-155 lg:flex-row"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {CATEGORIES.map((cat, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={cat.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                animate={{ flexGrow: isActive ? 3.4 : 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group relative min-h-20 min-w-0 shrink grow basis-0 cursor-pointer overflow-hidden rounded-[28px]"
              >
                {/* Background image */}
                <motion.img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  animate={{ scale: isActive ? 1.06 : 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Scrim */}
                <div
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    background: isActive
                      ? 'linear-gradient(0deg, rgba(2,12,56,0.88) 0%, rgba(2,12,56,0.35) 45%, rgba(2,12,56,0.1) 100%)'
                      : 'linear-gradient(0deg, rgba(2,12,56,0.75) 0%, rgba(2,12,56,0.35) 55%, rgba(2,12,56,0.15) 100%)',
                  }}
                />

                {/* Mark + number */}
                <div className="absolute top-6 left-6 z-10 flex items-center gap-3 lg:top-7 lg:left-7">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-secondary"
                  >
                    {cat.mark}
                  </svg>
                  <span className="font-heading text-sm text-white/70">{cat.number}</span>
                </div>

                {/* Collapsed label — mobile: inline row / desktop: vertical edge label */}
                <div
                  className={`absolute inset-0 z-10 flex items-center gap-4 px-6 transition-opacity duration-500 lg:flex-col lg:items-start lg:justify-end lg:gap-0 lg:p-7 ${
                    isActive ? 'opacity-0' : 'opacity-100 delay-150'
                  }`}
                >
                  <span className="font-heading text-xl text-white lg:[writing-mode:vertical-rl] lg:text-2xl">
                    {cat.label}
                  </span>
                </div>

                {/* Expanded content */}
                <div
                  className={`absolute inset-x-0 bottom-0 z-10 p-7 transition-all duration-500 sm:p-9 ${
                    isActive ? 'translate-y-0 opacity-100 delay-150' : 'pointer-events-none translate-y-3 opacity-0'
                  }`}
                >
                  <h3 className="mb-3 font-heading text-2xl text-white sm:text-3xl">{cat.title}</h3>
                  <p className="mb-5 max-w-105 text-[0.95rem] leading-[1.7] text-white/80">
                    {cat.description}
                  </p>
                  <a
                    href="#footer"
                    className="inline-flex items-center gap-2 text-[0.82rem] font-semibold tracking-[2px] text-secondary uppercase transition-all duration-200 hover:gap-3.5 hover:text-secondary-light"
                  >
                    Get Started <span>&rarr;</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
