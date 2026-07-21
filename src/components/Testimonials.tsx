"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/motion';

const TESTIMONIALS = [
  {
    name: 'Rajesh Kumar',
    role: 'Homebuyer',
    quote:
      'Very happy with the service. They helped us find the perfect home within our budget. The whole process was smooth and stress-free.',
    outcome: 'Residential Purchase',
    meta: 'Sector 56, Gurugram',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Priya Sharma',
    role: 'Business Owner',
    quote:
      'Great experience finding an office space for our new branch. The team was very professional, polite, and helpful from start to finish.',
    outcome: 'Commercial Lease',
    meta: 'Cyber City',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Amit Patel',
    role: 'Property Investor',
    quote:
      "Good investment advice and smooth paperwork. They showed us great properties with good returns. Highly recommend them.",
    outcome: 'Investment Property',
    meta: 'Sohna Road',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

function VerifiedStamp({ badgeKey }: { badgeKey: number }) {
  return (
    <motion.div
      key={badgeKey}
      initial={{ opacity: 0, scale: 1.6, rotate: -26 }}
      animate={{ opacity: 1, scale: 1, rotate: -12 }}
      transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none absolute top-6 right-6 h-24 w-24 text-secondary sm:top-8 sm:right-8 sm:h-28 sm:w-28"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <path id="stampCircle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3.2" opacity="0.7" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <text fill="currentColor" fontSize="6.6" fontWeight="700" letterSpacing="2.2">
          <textPath href="#stampCircle" startOffset="0%">
            VERIFIED CLIENT &#8226; TRUSTED DEAL &#8226;
          </textPath>
        </text>
        <path
          d="M35 51l9 9 21-22"
          fill="none"
          stroke="currentColor"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const current = TESTIMONIALS[active];

  return (
    <section id="testimonials" className="relative overflow-hidden bg-bg-soft py-36">
      <div className="container mx-auto max-w-7xl px-8">
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <span className="eyebrow justify-center">Case Files</span>
          <h2 className="text-[clamp(2.4rem,4vw,3.4rem)] text-primary-dark">
            Every Deal, A Story Of <span className="text-gradient">Trust</span>
          </h2>
        </motion.div>

        <motion.div
          className="relative mx-auto max-w-220"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Stacked case-file backdrops */}
          <div className="absolute inset-0 translate-y-3 rotate-[-2.5deg] rounded-[28px] border border-hairline bg-white" aria-hidden />
          <div className="absolute inset-0 translate-y-1.5 rotate-[1.5deg] rounded-[28px] border border-hairline bg-white" aria-hidden />

          <div className="relative overflow-hidden rounded-[28px] bg-white shadow-strong">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]"
              >
                {/* Clipped property photo */}
                <div className="relative bg-bg-soft p-8 pt-12 lg:p-10 lg:pt-12">
                  <svg
                    viewBox="0 0 24 24"
                    className="absolute top-3 left-1/2 z-10 h-9 w-9 -translate-x-1/2 -rotate-12 text-muted/50 lg:left-12 lg:translate-x-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    aria-hidden
                  >
                    <path d="M8 11.5V6a4 4 0 1 1 8 0v10.5a2.5 2.5 0 1 1-5 0V8a1 1 0 1 1 2 0v8" />
                  </svg>
                  <div className="relative -rotate-2 overflow-hidden rounded-xl shadow-medium">
                    <img src={current.image} alt={current.outcome} className="h-52 w-full object-cover sm:h-64 lg:h-80" />
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-[0.72rem] font-semibold tracking-[1.5px] text-primary uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    {current.outcome}
                    <span className="text-muted normal-case">— {current.meta}</span>
                  </div>
                </div>

                {/* Quote + signature */}
                <div className="relative flex flex-col justify-center p-8 pt-4 sm:p-10 lg:p-14">
                  <VerifiedStamp badgeKey={active} />

                  <span className="mb-4 block font-heading text-6xl leading-none text-bg-soft-2" aria-hidden>
                    &ldquo;
                  </span>
                  <p className="mb-8 max-w-105 font-heading text-[1.35rem] leading-[1.55] text-primary-dark italic sm:text-[1.5rem]">
                    {current.quote}
                  </p>

                  <div className="border-t border-hairline pt-5">
                    <div className="font-heading text-xl text-primary italic">{current.name}</div>
                    <div className="mt-1 text-[0.82rem] text-muted">{current.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Case-file tab selector */}
        <div className="relative mt-10 flex justify-center gap-3">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setActive(i)}
              className={`rounded-lg border px-5 py-2.5 text-[0.72rem] font-bold tracking-[1.5px] uppercase transition-all duration-300 ${
                i === active
                  ? 'border-primary/15 bg-white text-primary shadow-soft'
                  : 'border-transparent text-muted hover:text-primary'
              }`}
            >
              Case {String(i + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
