"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { viewportOnce } from '@/lib/motion';

const STEPS = [
  { number: '01', title: 'Consultation', text: 'We understand your needs, budget and goals through a personalised discussion.' },
  { number: '02', title: 'Property Search', text: 'Curated shortlisting across residential, commercial, farmland and investment listings.' },
  { number: '03', title: 'Site Visits', text: 'Guided visits and due diligence, backed by trusted, verified A-Grade partners.' },
  { number: '04', title: 'Negotiation & Documentation', text: 'Expert negotiation, financing guidance and complete legal documentation.' },
  { number: '05', title: 'Handover & Support', text: 'A seamless closing, with continued support long after your transaction.' },
];

function StepRow({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className="relative flex gap-6 py-9 sm:gap-10 sm:py-11"
    >
      <div className="flex w-8 shrink-0 justify-center pt-1.5">
        <span className="relative z-10 h-3 w-3 rounded-full border-2 border-aurum-gold bg-aurum-cream" />
      </div>

      <div>
        <span className="aurum-num mb-2 block text-[0.8rem] text-aurum-muted">{step.number}</span>
        <h3 className="text-[1.4rem] text-aurum-ink sm:text-[1.7rem]">{step.title}</h3>
        <p className="mt-2 max-w-lg text-[0.95rem] leading-[1.7] text-aurum-muted">{step.text}</p>
      </div>
    </motion.div>
  );
}

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.4'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="journey" className="relative bg-aurum-cream py-28 lg:py-40">
      <div className="mx-auto max-w-350 px-6 sm:px-10 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-xl lg:mb-24"
        >
          <span className="aurum-eyebrow mb-5">
            <span className="h-px w-8 bg-aurum-gold-dark" />
            How We Work
          </span>
          <h2 className="text-[clamp(2.4rem,4.5vw,3.8rem)] text-aurum-ink">
            A Process Built On <span className="italic text-aurum-gold-dark">Trust</span>
          </h2>
        </motion.div>

        <div ref={ref} className="relative mx-auto max-w-2xl">
          <div className="absolute top-0 bottom-0 left-[15px] w-px bg-aurum-hairline">
            <motion.div className="w-full bg-aurum-gold" style={{ height: lineHeight }} />
          </div>

          <div className="divide-y divide-aurum-hairline">
            {STEPS.map((step, i) => (
              <StepRow key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
