"use client";

import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  useMotionTemplate,
} from 'framer-motion';
import { viewportOnce } from '@/lib/motion';

/* ── Pillar data ──────────────────────────────────────────────────────────── */
const PILLARS = [
  {
    n: '01',
    title: 'Vision',
    body: 'We spot value before the skyline catches up.',
  },
  {
    n: '02',
    title: 'Trust',
    body: 'RERA-backed, transparent, built on fifteen years of relationships.',
  },
  {
    n: '03',
    title: 'Craft',
    body: 'Every deal handled like a signature piece — deliberate, built to last.',
  },
] as const;

/* ── Cursor-tracked gold foil headline ───────────────────────────────────── */
function FoilHeadline() {
  const ref = useRef<HTMLHeadingElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const smx = useSpring(mx, { stiffness: 120, damping: 22, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 120, damping: 22, mass: 0.6 });
  const maskImage = useMotionTemplate`radial-gradient(circle 180px at ${smx}% ${smy}%, black 0%, transparent 100%)`;

  const handleMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const text = (
    <>
      Where Vision <span className="italic font-light">Meets Value.</span>
    </>
  );

  return (
    <h2
      ref={ref}
      onMouseMove={handleMove}
      className="relative select-none text-[clamp(2.4rem,4vw,3.4rem)] text-primary-dark font-light tracking-tight"
    >
      {text}
      <motion.span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-secondary-light via-secondary to-secondary-hover bg-clip-text text-transparent pointer-events-none"
        style={{ WebkitMaskImage: maskImage as unknown as string, maskImage: maskImage as unknown as string }}
      >
        {text}
      </motion.span>
    </h2>
  );
}

/* ── Single scrollytelling pillar row ────────────────────────────────────── */
function PillarRow({
  pillar,
  isActive,
  onActivate,
  index,
}: {
  pillar: (typeof PILLARS)[number];
  isActive: boolean;
  onActivate: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className="group relative flex items-center gap-5 py-6 border-b border-hairline"
    >
      {/* invisible tracker: fires when this row crosses the vertical center */}
      <motion.span
        aria-hidden
        onViewportEnter={onActivate}
        viewport={{ margin: '-45% 0px -45% 0px' }}
        className="absolute inset-0 pointer-events-none"
      />
      <span
        className={`font-heading text-lg leading-none tabular-nums transition-colors duration-500 ${
          isActive ? 'text-secondary' : 'text-primary/25'
        }`}
      >
        {pillar.n}
      </span>
      <div className="flex-1">
        <h3
          className={`text-[1.3rem] transition-colors duration-500 ${
            isActive ? 'text-primary-dark' : 'text-primary-dark/50'
          }`}
        >
          {pillar.title}
        </h3>
        <p
          className={`text-[0.95rem] leading-[1.6] transition-colors duration-500 ${
            isActive ? 'text-muted' : 'text-muted/40'
          }`}
        >
          {pillar.body}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Main Component ──────────────────────────────────────────────────────── */
export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isImageInView = useInView(imageRef, { once: true, margin: '-15%' });
  const [activePillar, setActivePillar] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const parallaxY = useSpring(rawY, { stiffness: 60, damping: 20 });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-white overflow-hidden"
    >
      {/* Soft radial glow for depth */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,var(--color-bg-soft)_0%,transparent_70%)] opacity-80" />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-8 py-28 lg:py-40 lg:py-56">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-160 text-center"
        >
          <span className="eyebrow justify-center">Why Infraguru</span>
          <FoilHeadline />
          <p className="mt-5 text-[1.1rem] leading-[1.7] text-muted">
            Fifteen years of turning capital into enduring wealth through a
            curated portfolio built for long-term value.
          </p>
        </motion.div>

        {/* ── Image + pillar ledger ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">

          {/* ── Left: visual ── */}
          <div ref={imageRef} className="relative">
            <motion.div
              className="relative aspect-[4/5] rounded-3xl overflow-hidden"
              animate={isImageInView ? { clipPath: 'inset(0% 0% 0% 0% round 1.5rem)' } : {}}
              initial={{ clipPath: 'inset(0% 100% 0% 0% round 1.5rem)' }}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            >
              <motion.div className="absolute inset-0 w-full h-full" style={{ y: parallaxY }}>
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90"
                  alt="Infraguru premium real estate"
                  className="w-full h-[115%] -mt-[7.5%] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-primary-dark/5 to-transparent" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-8 left-8 flex flex-col items-start"
              >
                <div className="font-heading text-[0.7rem] text-white/70 tracking-[0.2em] uppercase mb-1">Est.</div>
                <div className="font-heading text-5xl text-white leading-none font-medium">2011</div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
              className="absolute -right-5 top-12 bottom-12 w-[2px] bg-secondary origin-top hidden lg:block"
            />
          </div>

          {/* ── Right: pillar ledger + CTA ── */}
          <div className="flex flex-col">
            {PILLARS.map((pillar, i) => (
              <PillarRow
                key={pillar.n}
                pillar={pillar}
                index={i}
                isActive={activePillar === i}
                onActivate={() => setActivePillar(i)}
              />
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-10 flex flex-wrap items-center gap-12 lg:gap-16 lg:gap-12"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-3 px-10 py-4 bg-primary text-white text-[0.8rem] font-semibold tracking-[0.15em] uppercase rounded-full transition-all duration-300 hover:scale-105 hover:bg-primary-dark hover:shadow-[0_16px_40px_rgba(3,46,151,0.3)]"
              >
                Explore Portfolio
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[0.8rem] font-semibold tracking-[0.15em] uppercase text-muted hover:text-primary-dark transition-colors duration-300"
              >
                Book a Consultation
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
