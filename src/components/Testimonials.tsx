"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/motion';

const TESTIMONIALS = [
  {
    name: 'Arjun Mehta',
    role: 'CEO, Meridian Capital',
    quote:
      'Infraguru delivered beyond every benchmark we set. The precision, transparency and craftsmanship redefined what we thought was possible.',
  },
  {
    name: 'Sophia Laurent',
    role: 'Founder, Laurent Estates',
    quote:
      'From the first consultation to final handover, their team treated our vision as their own. A true tradition of trust.',
  },
  {
    name: 'David Okafor',
    role: 'Director, Okafor Group',
    quote:
      "The quality of construction and attention to design detail is unmatched. Infraguru is now our permanent infrastructure partner.",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
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
          <span className="eyebrow justify-center">Client Voices</span>
          <h2 className="text-[clamp(2.4rem,4vw,3.4rem)] text-primary-dark">Trusted By Visionaries</h2>
        </motion.div>

        <div className="relative mx-auto max-w-190 overflow-hidden rounded-[28px] border-t-4 border-secondary bg-white px-8 pt-16 pb-12 text-center shadow-medium sm:px-14">
          <span className="pointer-events-none absolute -top-6 left-10 z-0 select-none font-heading text-[9rem] leading-none text-bg-soft-2" aria-hidden>
            &ldquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-1"
            >
              <div className="mb-6 text-[1.1rem] tracking-[3px] text-secondary" aria-hidden>
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
              <p className="mb-9 min-h-22.5 font-heading text-[1.4rem] leading-[1.6] text-primary-dark">{current.quote}</p>
              <div className="flex items-center justify-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-heading text-[1.2rem] text-white">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <div className="text-[0.98rem] font-bold text-primary-dark">{current.name}</div>
                  <div className="text-[0.82rem] text-muted">{current.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex justify-center gap-2.5">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                className={`h-2.25 rounded-full bg-hairline transition-all duration-200 ${
                  i === active ? 'w-6.5 bg-secondary' : 'w-2.25'
                }`}
                onClick={() => setActive(i)}
                aria-label={`Show testimonial from ${t.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
