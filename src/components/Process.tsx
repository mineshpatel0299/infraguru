"use client";

import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion';

type Step = { number: string; title: string; text: string };

const STEPS: Step[] = [
  { number: '01', title: 'Consultation', text: 'We understand your needs, budget and goals through a personalised discussion.' },
  { number: '02', title: 'Property Search', text: 'Curated shortlisting across residential, commercial, farmland and investment listings.' },
  { number: '03', title: 'Site Visits', text: 'Guided visits and due diligence, backed by trusted, verified A-Grade partners.' },
  { number: '04', title: 'Negotiation & Documentation', text: 'Expert negotiation, financing guidance and complete legal documentation.' },
  { number: '05', title: 'Handover & Support', text: 'A seamless closing, with continued support long after your transaction.' },
];

const PRIMARY = '#032E97';
const SECONDARY = '#d4af37';

function StepCard({ step, isActive }: { step: Step; isActive: boolean }) {
  return (
    <div className="flex w-75 shrink-0 flex-col sm:w-90">
      <motion.div
        className="relative z-2 mb-6 flex items-center justify-center rounded-full border-2 bg-white font-heading shadow-[0_8px_20px_rgba(3,46,151,0.15)]"
        animate={{
          width: isActive ? 56 : 40,
          height: isActive ? 56 : 40,
          fontSize: isActive ? '1.1rem' : '0.85rem',
          borderColor: isActive ? SECONDARY : PRIMARY,
          color: isActive ? SECONDARY : PRIMARY,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <span>{step.number}</span>
      </motion.div>
      <motion.h3
        animate={{ opacity: isActive ? 1 : 0.35 }}
        transition={{ duration: 0.5 }}
        className="mb-2 text-[1.3rem] text-primary-dark"
      >
        {step.title}
      </motion.h3>
      <motion.p
        animate={{ opacity: isActive ? 1 : 0.35 }}
        transition={{ duration: 0.5 }}
        className="max-w-70 text-[0.95rem] leading-[1.6] text-muted"
      >
        {step.text}
      </motion.p>
    </div>
  );
}

function TrackLine({ progress }: { progress: MotionValue<number> }) {
  const lineWidth = useTransform(progress, [0, 1], ['0%', '100%']);
  const lineOpacity = useTransform(progress, [0, 0.04], [0, 1]);

  return (
    <div className="absolute top-5 right-0 left-0 h-0.5">
      <div className="absolute inset-0 bg-hairline" />
      <motion.div
        className="absolute inset-y-0 left-0 bg-[linear-gradient(90deg,var(--color-secondary),var(--color-primary))]"
        style={{ width: lineWidth, opacity: lineOpacity }}
      />
    </div>
  );
}

export default function Process() {
  const targetRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [xRange, setXRange] = useState(['0px', '-1300px']);

  useEffect(() => {
    const updateRange = () => {
      if (containerRef.current) {
        const containerW = containerRef.current.scrollWidth;
        const viewportW = window.innerWidth;
        const shift = Math.max(0, containerW - viewportW + 80);
        setXRange(['0px', `-${shift}px`]);
      }
    };
    updateRange();
    window.addEventListener('resize', updateRange);
    return () => window.removeEventListener('resize', updateRange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 20,
    restDelta: 0.001,
  });

  const stopAt = 0.78;

  useMotionValueEvent(progress, 'change', (val) => {
    const idx = Math.round(Math.min(val / stopAt, 1) * (STEPS.length - 1));
    setActiveIndex(Math.max(0, Math.min(STEPS.length - 1, idx)));
  });

  const x = useTransform(progress, [0, stopAt], xRange);

  return (
    <section id="process" ref={targetRef} className="relative bg-white" style={{ height: '300vh' }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container mx-auto mb-16 max-w-7xl px-8 text-center">
          <span className="eyebrow justify-center">How We Work</span>
          <h2 className="text-[clamp(2.4rem,4vw,3.4rem)] text-primary-dark">
            A Process Built On <span className="text-gradient">Trust</span>
          </h2>
        </div>

        <div className="w-full overflow-hidden pl-8 lg:pl-20">
          <motion.div ref={containerRef} style={{ x }} className="w-max">
            <div className="relative flex gap-14 sm:gap-16">
              <TrackLine progress={progress} />
              {STEPS.map((step, i) => (
                <StepCard key={step.number} step={step} isActive={activeIndex === i} />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-10 flex justify-center gap-2.5" aria-hidden>
          {STEPS.map((step, i) => (
            <span
              key={step.number}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === activeIndex ? 'w-6 bg-secondary' : 'w-1.5 bg-hairline'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
