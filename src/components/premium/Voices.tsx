"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { viewportOnce } from '@/lib/motion';

const TESTIMONIALS = [
  {
    name: 'Rajesh Kumar',
    role: 'Homebuyer',
    quote:
      'Very happy with the service. They helped us find the perfect home within our budget. The whole process was smooth and stress-free.',
    outcome: 'Residential Purchase',
    meta: 'Sector 56, Gurugram',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Priya Sharma',
    role: 'Business Owner',
    quote:
      'Great experience finding an office space for our new branch. The team was very professional, polite, and helpful from start to finish.',
    outcome: 'Commercial Lease',
    meta: 'Cyber City',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Amit Patel',
    role: 'Property Investor',
    quote:
      "Good investment advice and smooth paperwork. They showed us great properties with good returns. Highly recommend them.",
    outcome: 'Investment Property',
    meta: 'Sohna Road',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
  },
];

export default function Voices() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((prev) => (prev + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(timer);
  }, []);

  const current = TESTIMONIALS[active];

  return (
    <section id="voices" className="relative overflow-hidden bg-aurum-cream-2 py-28 lg:py-40">
      <div className="mx-auto max-w-350 px-6 sm:px-10 lg:px-14">
        <motion.div
          className="mb-16 text-center lg:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
        >
          <span className="aurum-eyebrow mx-auto justify-center">
            <span className="h-px w-8 bg-aurum-gold-dark" />
            Case Files
          </span>
          <h2 className="mt-5 text-[clamp(2.4rem,4.5vw,3.8rem)] text-aurum-ink">
            Every Deal, A Story Of <span className="italic text-aurum-gold-dark">Trust</span>
          </h2>
        </motion.div>

        <div className="relative mx-auto max-w-3xl text-center">
          <span aria-hidden className="pointer-events-none block font-heading text-[6rem] leading-none text-aurum-gold/25 sm:text-[7.5rem]">
            &ldquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="-mt-8"
            >
              <p className="mx-auto max-w-2xl font-heading text-[1.5rem] leading-[1.55] text-aurum-ink italic sm:text-[1.9rem]">
                {current.quote}
              </p>

              <div className="mt-10 flex flex-col items-center gap-4">
                <img
                  src={current.image}
                  alt={current.name}
                  className="h-16 w-16 rounded-full border-2 border-aurum-gold object-cover"
                />
                <div>
                  <div className="font-heading text-lg text-aurum-ink">{current.name}</div>
                  <div className="mt-1 text-[0.78rem] tracking-[0.1em] text-aurum-muted uppercase">
                    {current.role} &middot; {current.outcome} &middot; {current.meta}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-14 flex justify-center gap-3">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setActive(i)}
              aria-label={`Show testimonial ${i + 1}`}
              className="group py-2"
            >
              <span
                className={`block h-px transition-all duration-500 ${
                  i === active ? 'w-10 bg-aurum-gold-dark' : 'w-5 bg-aurum-hairline group-hover:bg-aurum-muted'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
