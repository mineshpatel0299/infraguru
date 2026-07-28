"use client";

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

const CATEGORIES = [
  {
    id: 'buy',
    number: '01',
    label: 'Buy',
    description:
      'Buying property means purchasing a physical piece of real estate — like land, a house, flat, or commercial space — and becoming its legal owner in exchange for money.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sell',
    number: '02',
    label: 'Sell',
    description:
      'Property to sell means a property — house, flat, shop, or land — that the owner wishes to list and transfer permanently to a new buyer.',
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'rent',
    number: '03',
    label: 'Rent',
    description:
      'Property to rent means a property given to someone to use for a short period, in exchange for a monthly rental payment.',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'lease',
    number: '04',
    label: 'Lease',
    description:
      'Property to lease means a land or building given for long-term use to a tenant under a lease agreement, without transferring ownership.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  },
];

const WIPE_STEPS = [
  'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
  'polygon(0% 0%, 100% 0%, 70% 100%, 0% 100%)',
  'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
];

/** A single character on its own "flap" — drops into place, departure-board style. */
function FlipChar({ char, delay }: { char: string; delay: number }) {
  return (
    <span className="inline-block" style={{ perspective: 400 }}>
      <motion.span
        className="inline-block"
        style={{ transformOrigin: '50% 100%' }}
        initial={{ rotateX: 90, opacity: 0 }}
        whileInView={{ rotateX: 0, opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {char === ' ' ? ' ' : char}
      </motion.span>
    </span>
  );
}

function FlipWord({ text, baseDelay, className }: { text: string; baseDelay: number; className: string }) {
  return (
    <span className={className}>
      {text.split('').map((ch, i) => (
        <FlipChar key={i} char={ch} delay={baseDelay + i * 0.035} />
      ))}
    </span>
  );
}

export default function Services() {
  const [current, setCurrent] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function select(i: number) {
    if (i === current || i === incoming) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIncoming(i);
    timeoutRef.current = setTimeout(() => {
      setCurrent(i);
      setIncoming(null);
    }, 760);
  }

  const activeIndex = incoming ?? current;

  return (
    <section id="services" className="bg-aurum-paper py-28 lg:py-40">
      <div className="mx-auto max-w-350 px-6 sm:px-10 lg:px-14">
        <motion.div
          className="mb-16 max-w-xl lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
        >
          <motion.span className="aurum-eyebrow mb-5" variants={fadeUp}>
            <span className="h-px w-8 bg-aurum-gold-dark" />
            Our Services
          </motion.span>
          <motion.h2 className="text-[clamp(2.4rem,4.5vw,3.8rem)] text-aurum-ink" variants={fadeUp}>
            A Property Path For <span className="italic text-aurum-gold-dark">Every Ambition</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ── Board list ── */}
          <div className="lg:col-span-5">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.id}
                onMouseEnter={() => select(i)}
                onFocus={() => select(i)}
                onClick={() => select(i)}
                className={`group flex w-full items-baseline gap-6 border-b border-aurum-hairline py-6 text-left transition-opacity duration-300 first:border-t sm:py-8 ${
                  activeIndex === i ? 'opacity-100' : 'opacity-55 hover:opacity-90'
                }`}
              >
                <FlipWord text={cat.number} baseDelay={i * 0.15} className="aurum-num text-sm text-aurum-gold-dark" />
                <span
                  className={`font-heading text-[2rem] transition-all duration-300 sm:text-[2.6rem] ${
                    activeIndex === i ? 'italic text-aurum-ink' : 'text-aurum-ink-soft'
                  }`}
                >
                  <FlipWord text={cat.label} baseDelay={i * 0.15 + 0.15} className="inline-block" />
                </span>
                <span
                  className={`ml-auto hidden text-aurum-gold-dark transition-transform duration-300 sm:inline ${
                    activeIndex === i ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                  }`}
                >
                  &rarr;
                </span>
              </button>
            ))}
          </div>

          {/* ── Display panel ── */}
          <div className="relative aspect-[4/5] overflow-hidden lg:col-span-7 lg:aspect-auto">
            <img
              src={CATEGORIES[current].image}
              alt={CATEGORIES[current].label}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {incoming !== null && (
              <motion.img
                key={incoming}
                src={CATEGORIES[incoming].image}
                alt={CATEGORIES[incoming].label}
                initial={{ clipPath: WIPE_STEPS[0] }}
                animate={{ clipPath: WIPE_STEPS }}
                transition={{ duration: 0.75, times: [0, 0.6, 1], ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {/* faint board-panel banding, ties the image to the flap motif */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(to bottom, rgba(27,26,22,0.9) 0px, rgba(27,26,22,0.9) 1px, transparent 1px, transparent 64px)',
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-aurum-ink/85 via-aurum-ink/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
              <span className="aurum-num mb-2 block text-sm text-aurum-gold-light">
                {CATEGORIES[current].number} &mdash; {CATEGORIES[current].label}
              </span>
              <p className="max-w-md text-[0.95rem] leading-[1.75] text-aurum-cream/85">
                {CATEGORIES[current].description}
              </p>
              <a
                href="#footer"
                className="mt-5 inline-flex items-center gap-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-aurum-gold-light transition-all hover:gap-4"
              >
                Get Started <span>&rarr;</span>
              </a>
            </div>

            <div className="pointer-events-none absolute inset-4 border border-aurum-cream/25 sm:inset-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
