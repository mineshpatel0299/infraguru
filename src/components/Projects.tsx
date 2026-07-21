"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import { PROJECTS, type Project } from '@/lib/projects';
import SealLink from './SealLink';

/* ── The Deed Card ────────────────────────────────────────────────────────
   A property card styled as a sealed title deed: a photograph "folded"
   into a certificate panel, joined by a stitched seam and closed with a
   wax seal bearing the Infraguru monogram. Hovering breaks the seal and
   unfurls a gold ribbon carrying the call to action; clicking breaks the
   seal for real and carries the visitor through to the full deed.
------------------------------------------------------------------------- */
function DeedCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 200, damping: 22, mass: 0.5 });
  const rotateY = useSpring(ry, { stiffness: 200, damping: 22, mass: 0.5 });
  const liftY = useTransform(rotateX, [-6, 6], [4, -4]);

  function handleMove(e: React.PointerEvent<HTMLAnchorElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 12);
  }

  function reset() {
    rx.set(0);
    ry.set(0);
    setHovered(false);
  }

  return (
    <SealLink
      ref={cardRef}
      href={`/projects/${project.id}`}
      centered
      onPointerMove={handleMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={reset}
      className="group block cursor-pointer [perspective:1500px]"
      aria-label={`View the deed for ${project.title}`}
    >
      <motion.div
        variants={fadeUp}
        style={{ rotateX, rotateY, y: liftY, transformPerspective: 1200 }}
        className="relative rounded-[1.75rem] overflow-hidden bg-white shadow-soft transition-shadow duration-500 group-hover:shadow-strong"
      >
        {/* ── Photograph panel ── */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-primary-dark/5 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/25 via-transparent to-transparent" />

          <div className="absolute top-5 left-5 font-mono text-[0.68rem] tracking-[0.15em] text-white/70">
            {String(index + 1).padStart(2, '0')} / {project.code}
          </div>
          <span className="absolute top-5 right-5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[0.68rem] font-bold tracking-wide text-white uppercase backdrop-blur-sm">
            {project.category}
          </span>

          <span className="absolute bottom-5 left-5 text-[0.78rem] font-semibold tracking-[2px] text-secondary-light uppercase">
            {project.location}
          </span>
        </div>

        {/* ── Stitched seam ── */}
        <div className="relative h-0 border-t-2 border-dashed border-primary/15">
          <span className="absolute -top-[5px] left-6 h-[9px] w-[9px] rounded-full border-2 border-primary/15 bg-white" />
          <span className="absolute -top-[5px] right-6 h-[9px] w-[9px] rounded-full border-2 border-primary/15 bg-white" />
        </div>

        {/* ── Certificate panel ── */}
        <div className="relative px-7 pt-8 pb-7 bg-[linear-gradient(160deg,var(--color-bg-soft)_0%,#ffffff_55%)]">
          {/* faint guilloché security texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, var(--color-primary) 0px, var(--color-primary) 1px, transparent 1px, transparent 10px)',
            }}
          />

          <h3 className="relative mb-1 font-heading text-2xl text-primary-dark">{project.title}</h3>
          <p className="relative mb-6 font-mono text-[0.72rem] tracking-[0.1em] text-muted uppercase">
            {project.specs}
          </p>

          <div className="relative flex items-center justify-between border-t border-hairline pt-5">
            <div>
              <span className="block text-[0.65rem] font-bold tracking-[0.2em] text-muted/70 uppercase">
                Certified Value
              </span>
              <span className="font-mono text-[1.1rem] font-semibold text-primary-dark">
                {project.price}
              </span>
            </div>

            {/* ribbon CTA, unfurls from behind the seal */}
            <motion.span
              initial={false}
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[0.75rem] font-semibold tracking-wide text-white uppercase shadow-[0_8px_20px_rgba(3,46,151,0.25)]"
            >
              View Deed <span>&rarr;</span>
            </motion.span>
          </div>
        </div>

        {/* ── Wax seal, centred on the seam ── */}
        <motion.div
          className="absolute left-1/2 top-64 z-10 -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: hovered ? 28 : 0, scale: hovered ? 0.88 : 1 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.35)]"
            style={{
              background: 'radial-gradient(circle at 32% 28%, var(--color-secondary-light) 0%, var(--color-secondary) 45%, var(--color-secondary-hover) 100%)',
            }}
          >
            <img src="/g.png" alt="" aria-hidden className="h-8 w-8 object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]" />
          </div>
        </motion.div>
      </motion.div>
    </SealLink>
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
          Click a deed to break the seal
        </motion.div>

        <motion.div
          className="mx-auto grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2 lg:max-w-5xl [perspective:1500px]"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {PROJECTS.map((project, i) => (
            <DeedCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
