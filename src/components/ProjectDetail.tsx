"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/motion';
import type { Project } from '@/lib/projects';
import SealLink from './SealLink';
import Footer from './Footer';

function DetailHeader() {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-8 z-100 sm:top-10"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <nav className="flex items-center justify-between rounded-full border border-primary/10 bg-white/90 px-5 py-2.5 shadow-[0_8px_30px_rgba(3,46,151,0.12)] backdrop-blur-xl sm:px-7 sm:py-3">
          <SealLink href="/" className="inline-flex shrink-0 items-center">
            <Image
              src="/logo.png"
              alt="Infraguru"
              width={200}
              height={64}
              className="h-10 w-auto object-contain sm:h-11"
              priority
            />
          </SealLink>

          <SealLink
            href="/#projects"
            className="hidden items-center gap-2 text-[0.78rem] font-semibold tracking-[0.12em] text-ink uppercase transition-colors hover:text-primary sm:flex"
          >
            <span aria-hidden>&larr;</span> Back to Portfolio
          </SealLink>

          <a
            href="#enquire"
            className="rounded-full bg-secondary px-6 py-2.5 text-[0.75rem] font-bold tracking-[0.12em] text-primary-dark uppercase shadow-[0_8px_24px_rgba(212,175,55,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary-hover sm:px-7"
          >
            Enquire Now
          </a>
        </nav>
      </div>
    </motion.div>
  );
}

function SealBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: -8 }}
      transition={{ duration: 0.8, delay: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      className="relative h-32 w-32 text-secondary-light"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        <defs>
          <path id="badgeCircle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <circle cx="50" cy="50" r="48" fill="var(--color-secondary)" opacity="0.12" />
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.8" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <text fill="currentColor" fontSize="6.4" fontWeight="700" letterSpacing="2">
          <textPath href="#badgeCircle" startOffset="0%">
            DEED AUTHENTICATED &#8226; INFRAGURU &#8226;
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <img src="/g.png" alt="" aria-hidden className="h-9 w-9 object-contain" />
      </div>
    </motion.div>
  );
}

function Hero({ project }: { project: Project }) {
  return (
    <section className="relative h-[100svh] min-h-140 w-full overflow-hidden">
      <motion.img
        src={project.image}
        alt={project.title}
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/55 to-primary-dark/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

      <div className="absolute top-28 right-8 z-10 hidden sm:block lg:right-16">
        <SealBadge />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer(0.12, 0.3)}>
            <motion.div
              variants={fadeUp}
              className="mb-6 flex flex-wrap items-center gap-3 font-mono text-[0.72rem] tracking-[0.15em] text-white/60 uppercase"
            >
              <SealLink href="/#projects" className="transition-colors hover:text-secondary-light">
                Portfolio
              </SealLink>
              <span>/</span>
              <span>{project.category}</span>
              <span>/</span>
              <span>{project.code}</span>
            </motion.div>

            <motion.span
              variants={fadeUp}
              className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[0.72rem] font-bold tracking-[0.2em] text-secondary-light uppercase backdrop-blur-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" /> {project.location}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="max-w-4xl font-heading text-[clamp(2.6rem,6vw,5rem)] leading-[1.05] text-white"
            >
              {project.title}
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-5 max-w-xl text-[1.1rem] leading-[1.7] text-white/70">
              {project.tagline}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-end gap-8 border-t border-white/15 pt-8"
            >
              <div>
                <span className="block text-[0.65rem] font-bold tracking-[0.2em] text-white/40 uppercase">
                  Certified Value
                </span>
                <span className="font-mono text-2xl font-semibold text-white">{project.price}</span>
              </div>
              <div className="h-10 w-px bg-white/15" />
              <div>
                <span className="block text-[0.65rem] font-bold tracking-[0.2em] text-white/40 uppercase">
                  Specification
                </span>
                <span className="font-mono text-[0.95rem] text-white/80">{project.specs}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatBar({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 mx-auto -mt-14 w-full max-w-6xl px-6 sm:px-10"
    >
      <div className="grid grid-cols-2 divide-x divide-y divide-hairline overflow-hidden rounded-[1.75rem] border border-hairline bg-white shadow-strong sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
        {project.highlights.map((h) => (
          <div key={h.label} className="px-5 py-6 text-center sm:px-6">
            <span className="block text-[0.62rem] font-bold tracking-[0.18em] text-muted/70 uppercase">
              {h.label}
            </span>
            <span className="mt-2 block font-heading text-[1.05rem] text-primary-dark">{h.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function VisionAndEnquire({ project }: { project: Project }) {
  const facts = [
    { label: 'Architect', value: project.architect },
    { label: 'Developer', value: project.developer },
    { label: 'Possession', value: project.possession },
    { label: 'RERA No.', value: project.rera },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-28 sm:px-10">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.5fr_1fr]">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer(0.12)}>
          <motion.span variants={fadeUp} className="eyebrow">
            The Vision
          </motion.span>
          <motion.h2 variants={fadeUp} className="mb-8 max-w-xl text-[clamp(2rem,3.2vw,2.8rem)] text-primary-dark">
            Built To Outlast The Blueprint
          </motion.h2>
          {project.description.map((para, i) => (
            <motion.p key={i} variants={fadeUp} className="mb-6 max-w-2xl text-[1.05rem] leading-[1.85] text-muted">
              {para}
            </motion.p>
          ))}

          <motion.div
            variants={fadeUp}
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-hairline pt-8 sm:grid-cols-3"
          >
            {facts.map((item) => (
              <div key={item.label}>
                <span className="block text-[0.65rem] font-bold tracking-[0.2em] text-muted/60 uppercase">
                  {item.label}
                </span>
                <span className="mt-1.5 block text-[0.92rem] font-semibold text-ink">{item.value}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          id="enquire"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-fit self-start scroll-mt-32 rounded-[1.75rem] border border-hairline bg-[linear-gradient(160deg,var(--color-bg-soft)_0%,#ffffff_55%)] p-8 shadow-strong lg:sticky lg:top-32"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[1.75rem] opacity-[0.05]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, var(--color-primary) 0px, var(--color-primary) 1px, transparent 1px, transparent 10px)',
            }}
          />

          <div className="relative mb-6 flex items-center gap-4 border-b border-hairline pb-6">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.25)]"
              style={{
                background:
                  'radial-gradient(circle at 32% 28%, var(--color-secondary-light) 0%, var(--color-secondary) 45%, var(--color-secondary-hover) 100%)',
              }}
            >
              <img src="/g.png" alt="" aria-hidden className="h-8 w-8 object-contain" />
            </div>
            <div>
              <span className="block text-[0.65rem] font-bold tracking-[0.2em] text-muted/70 uppercase">
                Request A Private Viewing
              </span>
              <span className="mt-1 block font-heading text-lg text-primary-dark">{project.title}</span>
            </div>
          </div>

          <form className="relative flex flex-col gap-3.5" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Full name"
              className="rounded-xl border border-hairline bg-white px-4 py-3 text-[0.9rem] text-ink placeholder-muted/60 focus:border-primary/40 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email address"
              className="rounded-xl border border-hairline bg-white px-4 py-3 text-[0.9rem] text-ink placeholder-muted/60 focus:border-primary/40 focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Phone number"
              className="rounded-xl border border-hairline bg-white px-4 py-3 text-[0.9rem] text-ink placeholder-muted/60 focus:border-primary/40 focus:outline-none"
            />
            <textarea
              placeholder="Tell us about your requirements"
              rows={3}
              className="resize-none rounded-xl border border-hairline bg-white px-4 py-3 text-[0.9rem] text-ink placeholder-muted/60 focus:border-primary/40 focus:outline-none"
            />
            <button type="submit" className="btn-gold mt-2 justify-center rounded-full">
              Request Consultation
            </button>
          </form>

          <p className="relative mt-5 text-center text-[0.72rem] text-muted/70">
            Certified value {project.price} &middot; Possession {project.possession}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Amenities({ project }: { project: Project }) {
  return (
    <section className="bg-bg-soft py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="mx-auto mb-14 max-w-160 text-center"
        >
          <motion.span variants={fadeUp} className="eyebrow justify-center">
            Signature Amenities
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-[clamp(2rem,3.2vw,2.8rem)] text-primary-dark">
            Appointed Without Compromise
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.06)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {project.amenities.map((a) => (
            <motion.div
              key={a}
              variants={fadeUp}
              className="flex items-start gap-3 rounded-2xl border border-hairline bg-white px-5 py-4 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-medium"
            >
              <span className="mt-1 shrink-0 text-xs text-secondary-hover">&#9670;</span>
              <span className="text-[0.94rem] leading-snug text-ink">{a}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Gallery({ project }: { project: Project }) {
  const [a, b, c, d] = project.gallery;
  return (
    <section className="mx-auto max-w-6xl px-6 py-28 sm:px-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer(0.1)}
        className="mb-14 max-w-160"
      >
        <motion.span variants={fadeUp} className="eyebrow">
          Gallery
        </motion.span>
        <motion.h2 variants={fadeUp} className="text-[clamp(2rem,3.2vw,2.8rem)] text-primary-dark">
          Every Angle, Considered
        </motion.h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer(0.08)}
        className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:grid-rows-2"
      >
        <motion.div variants={scaleIn} className="group relative col-span-2 row-span-2 overflow-hidden rounded-[1.5rem]">
          <img
            src={a}
            alt={`${project.title} — view 1`}
            className="h-full min-h-70 w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
        {[b, c, d].map((src, i) => (
          <motion.div key={i} variants={scaleIn} className="group relative overflow-hidden rounded-[1.5rem]">
            <img
              src={src}
              alt={`${project.title} — view ${i + 2}`}
              className="h-full min-h-32 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function Blueprint() {
  const rooms = [
    { x: 60, y: 70, label: 'Living Pavilion' },
    { x: 60, y: 178, label: 'Primary Suite' },
    { x: 175, y: 178, label: 'Study' },
    { x: 300, y: 65, label: 'Kitchen & Dining' },
    { x: 300, y: 198, label: 'Terrace' },
  ];

  return (
    <section className="bg-primary-dark py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="mb-12 max-w-160"
        >
          <motion.span
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2.5 text-[0.8rem] font-semibold tracking-[3px] text-secondary-light uppercase before:inline-block before:h-0.5 before:w-7 before:bg-secondary before:content-['']"
          >
            Indicative Floor Plate
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-[clamp(2rem,3.2vw,2.8rem)] text-white">
            Drawn To Precision
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-primary/20 p-6 sm:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          <svg viewBox="0 0 400 240" className="relative w-full text-white/70">
            <rect x="10" y="10" width="380" height="220" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line x1="10" y1="120" x2="220" y2="120" stroke="currentColor" strokeWidth="1" />
            <line x1="220" y1="10" x2="220" y2="230" stroke="currentColor" strokeWidth="1" />
            <line x1="220" y1="160" x2="390" y2="160" stroke="currentColor" strokeWidth="1" />
            <line x1="130" y1="120" x2="130" y2="230" stroke="currentColor" strokeWidth="1" />
            {rooms.map((r) => (
              <text key={r.label} x={r.x} y={r.y} fontSize="10" letterSpacing="1" textAnchor="middle" fill="currentColor">
                {r.label.toUpperCase()}
              </text>
            ))}
          </svg>
        </motion.div>
        <p className="mt-5 text-center text-[0.8rem] text-white/40">
          Layout is indicative and subject to final architectural drawings. Detailed floor plans available on request.
        </p>
      </div>
    </section>
  );
}

function Location({ project }: { project: Project }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28 sm:px-10">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={staggerContainer(0.1)}>
          <motion.span variants={fadeUp} className="eyebrow">
            Address &amp; Access
          </motion.span>
          <motion.h2 variants={fadeUp} className="mb-6 text-[clamp(2rem,3.2vw,2.8rem)] text-primary-dark">
            {project.location}
          </motion.h2>
          <motion.p variants={fadeUp} className="mb-8 max-w-lg text-[1.02rem] leading-[1.8] text-muted">
            Positioned for both privacy and proximity — every essential destination sits within an easy,
            considered reach.
          </motion.p>
          <motion.ul variants={staggerContainer(0.06)} className="flex flex-col divide-y divide-hairline border-t border-hairline">
            {project.landmarks.map((l) => (
              <motion.li key={l.label} variants={fadeUp} className="flex items-center justify-between py-4">
                <span className="text-[0.95rem] text-ink">{l.label}</span>
                <span className="font-mono text-[0.85rem] font-semibold text-primary">{l.distance}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-square overflow-hidden rounded-[1.75rem] border border-hairline bg-bg-soft"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)',
              backgroundSize: '34px 34px',
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="absolute inset-0 -m-6 animate-ping rounded-full bg-secondary/30" />
            <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-secondary shadow-[0_0_0_6px_rgba(212,175,55,0.2)]">
              <span className="h-2 w-2 rounded-full bg-primary-dark" />
            </span>
          </div>
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-1.5 text-[0.7rem] font-semibold tracking-wide text-primary-dark shadow-soft backdrop-blur-sm">
            {project.location}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function Quote({ project }: { project: Project }) {
  return (
    <section className="bg-bg-soft py-28">
      <div className="mx-auto max-w-3xl px-6 text-center sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="mb-2 block font-heading text-7xl leading-none text-bg-soft-2" aria-hidden>
            &ldquo;
          </span>
          <p className="mb-8 font-heading text-[1.5rem] leading-[1.55] text-primary-dark italic sm:text-[1.8rem]">
            {project.testimonial.quote}
          </p>
          <div className="mx-auto w-fit border-t border-hairline pt-5">
            <div className="font-heading text-lg text-primary italic">{project.testimonial.author}</div>
            <div className="mt-1 text-[0.82rem] text-muted">{project.testimonial.role}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function RelatedCard({ project }: { project: Project }) {
  const sealRef = useRef<HTMLDivElement>(null);
  return (
    <motion.div variants={fadeUp}>
      <SealLink
        href={`/projects/${project.id}`}
        originRef={sealRef}
        className="group block overflow-hidden rounded-[1.5rem] border border-hairline bg-white shadow-soft transition-shadow duration-300 hover:shadow-strong"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            ref={sealRef}
            className="absolute right-3 bottom-3 flex h-9 w-9 items-center justify-center rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
            style={{
              background:
                'radial-gradient(circle at 32% 28%, var(--color-secondary-light) 0%, var(--color-secondary) 45%, var(--color-secondary-hover) 100%)',
            }}
          >
            <img src="/g.png" alt="" aria-hidden className="h-5 w-5 object-contain" />
          </div>
        </div>
        <div className="p-5">
          <span className="text-[0.68rem] font-semibold tracking-[1.5px] text-muted uppercase">
            {project.location}
          </span>
          <h3 className="mt-1 font-heading text-lg text-primary-dark">{project.title}</h3>
          <span className="mt-2 block font-mono text-[0.85rem] font-semibold text-primary">{project.price}</span>
        </div>
      </SealLink>
    </motion.div>
  );
}

function RelatedProjects({ related }: { related: Project[] }) {
  if (related.length === 0) return null;
  return (
    <section className="mx-auto max-w-6xl px-6 py-28 sm:px-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer(0.1)}
        className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div>
          <motion.span variants={fadeUp} className="eyebrow">
            Continue The Portfolio
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-[clamp(2rem,3.2vw,2.8rem)] text-primary-dark">
            Other Deeds Worth Sealing
          </motion.h2>
        </div>
        <motion.div variants={fadeUp}>
          <SealLink
            href="/#projects"
            className="text-[0.85rem] font-semibold tracking-wide text-primary uppercase transition-colors hover:text-primary-light"
          >
            View Full Portfolio &rarr;
          </SealLink>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer(0.12)}
        className="grid grid-cols-1 gap-8 sm:grid-cols-3"
      >
        {related.map((p) => (
          <RelatedCard key={p.id} project={p} />
        ))}
      </motion.div>
    </section>
  );
}

export default function ProjectDetail({ project, related }: { project: Project; related: Project[] }) {
  return (
    <main className="overflow-hidden">
      <DetailHeader />
      <Hero project={project} />
      <StatBar project={project} />
      <VisionAndEnquire project={project} />
      <Amenities project={project} />
      <Gallery project={project} />
      <Blueprint />
      <Location project={project} />
      <Quote project={project} />
      <RelatedProjects related={related} />
      <Footer />
    </main>
  );
}
