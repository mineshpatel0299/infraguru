"use client";

import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';

type Project = {
  id: number;
  code: string;
  title: string;
  location: string;
  category: string;
  price: string;
  specs: string;
  image: string;
};

const PROJECTS: Project[] = [
  {
    id: 1,
    code: 'DWG-014-A',
    title: 'The Azure Residences',
    location: 'Coastal Bay',
    category: 'Residential',
    price: 'From ₹4.2 Cr',
    specs: '4 Bed · 5 Bath · 6,200 Sqft',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    code: 'DWG-027-B',
    title: 'Summit Business Tower',
    location: 'Downtown Core',
    category: 'Commercial',
    price: 'From ₹8.5 Cr',
    specs: '32 Floors · 210,000 Sqft',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 3,
    code: 'DWG-041-C',
    title: 'Verdant Estate',
    location: 'Whispering Pines',
    category: 'Villas',
    price: 'From ₹15 Cr',
    specs: '6 Bed · 8 Bath · 11,400 Sqft',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
];

const CORNERS = ['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(240);
  const my = useMotionValue(240);
  const radius = useMotionValue(0);

  const springX = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.4 });
  const springY = useSpring(my, { stiffness: 180, damping: 22, mass: 0.4 });
  const springR = useSpring(radius, { stiffness: 110, damping: 20 });

  const maskImage = useMotionTemplate`radial-gradient(circle ${springR}px at ${springX}px ${springY}px, black 45%, transparent 100%)`;
  const reticleTransform = useMotionTemplate`translate(${springX}px, ${springY}px) translate(-50%, -50%)`;
  const reticleOpacity = useTransform(springR, [0, 30, 340], [0, 1, 1]);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      onPointerMove={handleMove}
      onPointerEnter={() => radius.set(340)}
      onPointerLeave={() => radius.set(0)}
      className="group relative isolate h-125 cursor-crosshair overflow-hidden rounded-2xl bg-primary-dark shadow-soft"
    >
      {/* Blueprint base layer */}
      <div className="absolute inset-0">
        <img
          src={project.image}
          alt=""
          aria-hidden
          className="h-full w-full object-cover grayscale contrast-125 brightness-75"
        />
        <div className="absolute inset-0 bg-primary/55 mix-blend-color" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-size-[24px_24px] opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,12,56,0.85)_0%,transparent_50%)]" />
      </div>

      {/* Full-colour photograph, revealed through the lens mask */}
      <motion.div
        className="absolute inset-0"
        style={{ WebkitMaskImage: maskImage, maskImage }}
      >
        <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,12,56,0.8)_0%,transparent_55%)]" />
      </motion.div>

      {/* Cursor reticle */}
      <motion.div
        className="pointer-events-none absolute top-0 left-0 z-20 h-16 w-16 rounded-full border border-secondary/80"
        style={{ transform: reticleTransform, opacity: reticleOpacity }}
      >
        <motion.span
          className="absolute inset-0 rounded-full border border-dashed border-secondary/40"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
        <span className="absolute top-1/2 left-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-secondary" />
        <span className="absolute top-1/2 left-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-secondary" />
      </motion.div>

      {/* Drafting corner ticks */}
      {CORNERS.map((pos) => (
        <span key={pos} className={`pointer-events-none absolute z-10 h-3 w-3 ${pos}`} aria-hidden>
          <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-white/30" />
          <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-white/30" />
        </span>
      ))}

      {/* Drawing reference + category */}
      <div className="absolute top-6 left-6 z-10 font-mono text-[0.68rem] tracking-[0.15em] text-white/60">
        {String(index + 1).padStart(2, '0')} / {project.code}
      </div>
      <span className="absolute top-6 right-6 z-10 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[0.7rem] font-bold tracking-wide text-white uppercase backdrop-blur-sm">
        {project.category}
      </span>

      {/* Dimension callout */}
      <div className="absolute right-6 bottom-30 z-10 hidden items-center gap-2 sm:flex">
        <span className="h-px w-8 border-t border-dashed border-white/40" />
        <span className="font-mono text-[0.68rem] tracking-wide text-white/70">{project.specs}</span>
      </div>

      {/* Info panel */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-7">
        <span className="mb-2 block text-[0.78rem] font-semibold tracking-[2px] text-secondary uppercase">
          {project.location}
        </span>
        <h3 className="mb-5 font-heading text-2xl text-white">{project.title}</h3>
        <div className="flex items-center justify-between border-t border-white/15 pt-5">
          <span className="font-mono text-[1.05rem] font-semibold text-white">{project.price}</span>
          <button className="flex items-center gap-1.5 text-[0.88rem] font-semibold tracking-wide text-secondary uppercase transition-all duration-200 group-hover:gap-3.5">
            Explore <span>&rarr;</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="bg-bg-soft py-36">
      <div className="container mx-auto max-w-7xl px-8">
        <motion.div
          className="mx-auto mb-8 max-w-160 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
        >
          <motion.span className="eyebrow justify-center" variants={fadeUp}>
            Our Portfolio
          </motion.span>
          <motion.h2 className="mb-5 text-[clamp(2.4rem,4vw,3.4rem)] text-primary-dark" variants={fadeUp}>
            Destinations in the Making
          </motion.h2>
          <motion.p className="text-[1.1rem] leading-[1.7] text-muted" variants={fadeUp}>
            A hand-picked portfolio of extraordinary developments, engineered for permanence
            and designed for legacy.
          </motion.p>
        </motion.div>

        <motion.div
          className="mx-auto mb-12 flex w-fit items-center gap-2.5 rounded-full border border-primary/10 bg-white px-5 py-2 text-[0.75rem] font-semibold tracking-[1.5px] text-primary/70 uppercase shadow-soft"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.span
            className="h-2 w-2 rounded-full bg-secondary"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          Move your cursor over a blueprint to reveal it
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
