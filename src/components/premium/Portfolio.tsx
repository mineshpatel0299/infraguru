"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import { PROJECTS, type Project } from '@/lib/projects';

function CatalogCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div variants={fadeUp}>
      <Link href={`/premium/projects/${project.id}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden bg-aurum-ink">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover opacity-90 transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aurum-ink/90 via-aurum-ink/10 to-transparent" />
          <div className="pointer-events-none absolute inset-3 border border-aurum-cream/0 transition-colors duration-500 group-hover:border-aurum-gold-light/60" />

          <div className="absolute top-5 left-5 flex items-center gap-2 text-[0.68rem] tracking-[0.2em] text-aurum-cream/70">
            <span className="aurum-num text-aurum-gold-light">{String(index + 1).padStart(2, '0')}</span>
            <span>/ {project.code}</span>
          </div>
          <span className="absolute top-5 right-5 border border-aurum-cream/25 px-3 py-1 text-[0.62rem] font-semibold tracking-[0.15em] text-aurum-cream/85 uppercase">
            {project.category}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-6">
            <span className="mb-2 block text-[0.7rem] font-semibold tracking-[0.22em] text-aurum-gold-light uppercase">
              {project.location}
            </span>
            <h3 className="font-heading text-[1.6rem] leading-tight text-aurum-cream italic">
              {project.title}
            </h3>
            <div className="mt-4 flex items-center justify-between border-t border-aurum-cream/20 pt-4">
              <span className="text-[0.85rem] font-semibold text-aurum-cream/90">{project.price}</span>
              <span className="flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-aurum-cream/0 transition-all duration-300 group-hover:text-aurum-gold-light">
                View Estate <span>&rarr;</span>
              </span>
            </div>
          </div>
        </div>
        <p className="mt-3 font-mono text-[0.72rem] tracking-[0.08em] text-aurum-muted uppercase">{project.specs}</p>
      </Link>
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-aurum-cream-2 py-28 lg:py-40">
      <div className="mx-auto max-w-350 px-6 sm:px-10 lg:px-14">
        <motion.div
          className="mb-16 flex flex-col items-start justify-between gap-6 lg:mb-20 lg:flex-row lg:items-end"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
        >
          <div>
            <motion.span className="aurum-eyebrow mb-5" variants={fadeUp}>
              <span className="h-px w-8 bg-aurum-gold-dark" />
              Our Portfolio
            </motion.span>
            <motion.h2 className="max-w-lg text-[clamp(2.4rem,4.5vw,3.8rem)] text-aurum-ink" variants={fadeUp}>
              Destinations in the Making
            </motion.h2>
          </div>
          <motion.p className="max-w-sm text-[0.98rem] leading-[1.8] text-aurum-muted" variants={fadeUp}>
            A hand-picked portfolio of extraordinary developments, engineered
            for permanence and designed for legacy.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {PROJECTS.map((project, i) => (
            <CatalogCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
