"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, scaleIn, fadeDown, viewportMirror } from "@/lib/motion";
import type { Project } from "@/lib/projects";
import SealLink from "./SealLink";

type Mode = "page" | "modal";

/* ── Lightbox Component ─────────────────────────────────────────────────── */
function ExpandBadge() {
  return (
    <span className="absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 shadow-sm">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path d="M9 3H3v6M15 3h6v6M15 21h6v-6M9 21H3v-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function GalleryLightbox({
  images,
  title,
  initialIndex,
  onClose,
}: {
  images: string[];
  title: string;
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => (i + delta + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, go]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-xl transition-colors hover:bg-white/15"
      >
        &#10005;
      </button>

      <span className="absolute top-8 left-8 font-mono text-[0.8rem] tracking-[0.15em] text-white/60 uppercase">
        {title} &mdash; {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </span>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Previous image"
            className="absolute top-1/2 left-4 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-xl transition-all hover:bg-white/15 hover:scale-105 sm:left-8"
          >
            &#8249;
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Next image"
            className="absolute top-1/2 right-4 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-xl transition-all hover:bg-white/15 hover:scale-105 sm:right-8"
          >
            &#8250;
          </button>
        </>
      )}

      <motion.img
        key={index}
        src={images[index]}
        alt={`${title} view ${index + 1}`}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
      />
    </div>,
    document.body
  );
}

/* ── Section UI Helpers ─────────────────────────────────────────────────── */
function Eyebrow({ mark, light = false, children }: { mark: string; light?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={`mb-4 inline-flex items-center gap-3 text-sm font-semibold tracking-[3px] uppercase ${
        light ? "text-neutral-300" : "text-[#c26d43]"
      }`}
    >
      <span className={`font-mono text-xs tracking-normal ${light ? "text-neutral-400" : "text-neutral-500"}`}>
        {mark}
      </span>
      <span className={`h-px w-6 ${light ? "bg-neutral-500" : "bg-[#c26d43]"}`} />
      {children}
    </span>
  );
}

/* ── Main Unified Component ─────────────────────────────────────────────── */
export default function ProjectExperience({
  project,
  related,
  mode,
  onClose,
}: {
  project: Project;
  related: Project[];
  mode: Mode;
  onClose?: () => void;
}) {
  const enquireRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const containerClasses = mode === "modal" 
    ? "h-full w-full overflow-y-auto overflow-x-hidden bg-[#faf8f5]"
    : "w-full bg-[#faf8f5] overflow-x-hidden";

  return (
    <div className={containerClasses}>
      {/* ── STICKY TOP NAV ── */}
      <div className="sticky top-0 z-50 flex items-center justify-between gap-3 border-b border-black/[0.04] bg-[#faf8f5]/80 px-6 py-4 backdrop-blur-2xl">
        {mode === "page" ? (
          <SealLink
            href="/#project-showcase"
            className="flex items-center gap-2 text-sm font-semibold tracking-[0.1em] text-neutral-900 uppercase hover:text-[#c26d43] transition-colors"
          >
            <span aria-hidden>&larr;</span> Portfolio
          </SealLink>
        ) : (
          <span className="font-mono text-xs tracking-[0.1em] text-neutral-500 uppercase">
            {project.category} / {project.code}
          </span>
        )}
        
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => enquireRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="rounded-full bg-[#c26d43] px-6 py-2.5 text-xs font-bold tracking-[0.1em] text-white uppercase shadow-sm hover:bg-[#b87d6e] transition-all hover:scale-105 active:scale-95"
          >
            Enquire
          </button>
          {mode === "modal" && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-neutral-900 hover:bg-neutral-100 transition-colors"
            >
              &#10005;
            </button>
          )}
        </div>
      </div>

      {/* ── HERO SECTION ── */}
      <section className="relative h-[85vh] lg:h-[90vh] w-full overflow-hidden bg-black rounded-b-[2rem] lg:rounded-b-[3rem] shadow-sm">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          src={project.image} 
          alt={project.title} 
          className="absolute inset-0 h-full w-full object-cover opacity-90" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 sm:px-12 lg:px-24">
          <motion.div
            variants={fadeDown}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-[0.15em] text-white uppercase backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#c26d43]" /> {project.location}
            </span>
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] text-white tracking-tight">
              {project.title}
            </h1>
            <p className="mt-4 sm:mt-6 text-lg sm:text-xl leading-[1.6] text-white/80 max-w-2xl font-body">
              {project.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── HIGHLIGHTS GRID ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 -mt-8 relative z-20">
        <motion.div 
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportMirror}
          className="grid grid-cols-2 md:grid-cols-3 gap-px bg-black/[0.04] border border-black/[0.04] rounded-2xl overflow-hidden shadow-lg backdrop-blur-xl"
        >
          {project.highlights.map((h) => (
            <div key={h.label} className="bg-white px-6 py-8 text-center flex flex-col justify-center">
              <span className="block text-[0.65rem] font-bold tracking-[0.15em] text-neutral-500 uppercase mb-2">
                {h.label}
              </span>
              <span className="block font-heading text-xl sm:text-2xl text-neutral-900">
                {h.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── THE VISION ── */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <div className="lg:col-span-7">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportMirror}>
              <Eyebrow mark="01">The Vision</Eyebrow>
              <h2 className="mb-6 font-heading text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-none">
                Built To Outlast <br className="hidden sm:block" />The Blueprint
              </h2>
            </motion.div>
            
            <div className="space-y-6 mt-8 sm:mt-12">
              {project.description.map((para, i) => (
                <motion.p 
                  key={i} 
                  variants={fadeUp} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={viewportMirror} 
                  className="text-lg leading-[1.8] text-neutral-600 font-body"
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>
          
          <motion.div 
            variants={scaleIn} 
            initial="hidden" 
            whileInView="visible" 
            viewport={viewportMirror}
            className="lg:col-span-5 bg-white rounded-3xl p-8 sm:p-10 border border-black/[0.04] shadow-sm flex flex-col gap-8"
          >
            {[
              { label: "Architect", value: project.architect },
              { label: "Developer", value: project.developer },
              { label: "RERA No.", value: project.rera },
              { label: "Certified Value", value: project.price },
            ].map((f) => (
              <div key={f.label} className="flex flex-col gap-2 border-b border-black/[0.04] pb-6 last:border-0 last:pb-0">
                <span className="text-xs font-bold tracking-[0.15em] text-neutral-400 uppercase">{f.label}</span>
                <span className="text-lg font-medium text-neutral-900">{f.value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── AMENITIES & GALLERY ── */}
      <section className="bg-white py-24 sm:py-32 rounded-[2.5rem] sm:rounded-[3rem] shadow-sm border border-black/[0.03]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
          
          {/* Amenities Top Row */}
          <div className="mb-24 lg:mb-32">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportMirror} className="text-center max-w-3xl mx-auto mb-16">
              <Eyebrow mark="02">Signature Amenities</Eyebrow>
              <h2 className="font-heading text-4xl sm:text-5xl text-neutral-900 tracking-tight">
                Appointed Without Compromise
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
              {project.amenities.map((a, i) => (
                <motion.div 
                  key={a} 
                  variants={fadeUp} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={viewportMirror}
                  className="flex items-center gap-4 bg-[#faf8f5] p-6 rounded-2xl border border-black/[0.03]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#c26d43] shadow-sm text-lg">
                    &#9670;
                  </span>
                  <span className="text-base font-medium text-neutral-800">{a}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Gallery Bottom Row */}
          <div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportMirror} className="text-center max-w-3xl mx-auto mb-16">
              <Eyebrow mark="03">Gallery</Eyebrow>
              <h2 className="font-heading text-4xl sm:text-5xl text-neutral-900 tracking-tight">
                Every Angle, Considered
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6">
              {project.gallery.map((src, i) => (
                <motion.button
                  key={i}
                  type="button"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportMirror}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`View photo ${i + 1}`}
                  className={`group relative h-64 lg:h-96 overflow-hidden rounded-[2rem] border border-black/[0.03] ${
                    i === 0 ? "lg:col-span-8" : i === 1 ? "lg:col-span-4" : i === 2 ? "lg:col-span-5" : "lg:col-span-7"
                  }`}
                >
                  <Image
                    src={src}
                    alt="Gallery view"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
                  <ExpandBadge />
                </motion.button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── FLOOR PLAN & LOCATION ── */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Floor Plan */}
          <div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportMirror}>
              <Eyebrow mark="04">Indicative Floor Plate</Eyebrow>
              <h2 className="mb-10 font-heading text-4xl sm:text-5xl text-neutral-900 tracking-tight">
                Drawn To Precision
              </h2>
            </motion.div>
            
            <motion.div 
              variants={scaleIn} 
              initial="hidden" 
              whileInView="visible" 
              viewport={viewportMirror}
              className="relative overflow-hidden rounded-[2rem] border border-black/[0.04] bg-white p-8 sm:p-12 shadow-sm"
            >
              <svg viewBox="0 0 400 240" className="relative w-full text-neutral-300">
                <rect x="10" y="10" width="380" height="220" fill="none" stroke="currentColor" strokeWidth="2" rx="4" />
                <line x1="10" y1="120" x2="220" y2="120" stroke="currentColor" strokeWidth="1.5" />
                <line x1="220" y1="10" x2="220" y2="230" stroke="currentColor" strokeWidth="1.5" />
                <line x1="220" y1="160" x2="390" y2="160" stroke="currentColor" strokeWidth="1.5" />
                <line x1="130" y1="120" x2="130" y2="230" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <p className="mt-6 text-center text-xs text-neutral-400 font-medium">
                Layout is indicative and subject to final architectural drawings.
              </p>
            </motion.div>
          </div>

          {/* Location */}
          <div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportMirror}>
              <Eyebrow mark="05">Address & Access</Eyebrow>
              <h2 className="mb-10 font-heading text-4xl sm:text-5xl text-neutral-900 tracking-tight">
                {project.location}
              </h2>
            </motion.div>
            
            <motion.div 
              variants={fadeUp} 
              initial="hidden" 
              whileInView="visible" 
              viewport={viewportMirror}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-black/[0.04] shadow-sm"
            >
              <ul className="flex flex-col divide-y divide-black/[0.04]">
                {project.landmarks.map((l) => (
                  <li key={l.label} className="flex items-center justify-between py-5">
                    <span className="text-lg font-medium text-neutral-800">{l.label}</span>
                    <span className="font-mono text-sm font-semibold text-[#c26d43] bg-[#faf8f5] px-3 py-1 rounded-full">{l.distance}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ── ENQUIRE & FOOTER STRIP ── */}
      <section ref={enquireRef} className="bg-white py-24 sm:py-32 rounded-t-[3rem] sm:rounded-t-[4rem] border-t border-black/[0.04] shadow-sm">
        <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div>
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportMirror}>
                <Eyebrow mark="06">Seal The Deal</Eyebrow>
                <h2 className="mb-6 font-heading text-5xl sm:text-6xl text-neutral-900 tracking-tight">
                  Request A Private Viewing
                </h2>
                <p className="mb-8 font-heading text-2xl text-neutral-600 italic leading-relaxed">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </p>
              </motion.div>
              
              {related.length > 0 && (
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportMirror} className="mt-16 border-t border-black/[0.04] pt-10">
                  <span className="mb-6 block text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase">
                    Continue The Portfolio
                  </span>
                  <div className="flex flex-col gap-6">
                    {related.map((r) => (
                      <SealLink key={r.id} href={`/projects/${r.id}`} className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-[#faf8f5] transition-colors border border-transparent hover:border-black/[0.03]">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl shadow-sm">
                          <Image
                            src={r.image}
                            alt={r.title}
                            fill
                            sizes="80px"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div>
                          <div className="font-heading text-xl font-medium text-neutral-900 mb-1">{r.title}</div>
                          <div className="font-mono text-xs text-[#c26d43] uppercase tracking-wide">{r.location}</div>
                        </div>
                      </SealLink>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Form */}
            <motion.div 
              variants={scaleIn} 
              initial="hidden" 
              whileInView="visible" 
              viewport={viewportMirror}
              className="bg-[#faf8f5] rounded-[2.5rem] p-8 sm:p-12 border border-black/[0.03] shadow-md"
            >
              <div className="mb-8 flex items-center gap-5 border-b border-black/[0.04] pb-8">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm border border-black/[0.02]">
                  <span className="text-[#c26d43] font-heading text-2xl">IG</span>
                </div>
                <div>
                  <span className="block text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase mb-1">
                    Direct Inquiry
                  </span>
                  <span className="block font-heading text-2xl text-neutral-900">{project.title}</span>
                </div>
              </div>

              <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Full name"
                  className="rounded-xl border border-black/[0.06] bg-white px-5 py-4 text-base text-neutral-900 placeholder-neutral-400 focus:border-[#c26d43] focus:ring-1 focus:ring-[#c26d43] focus:outline-none transition-all shadow-sm"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="rounded-xl border border-black/[0.06] bg-white px-5 py-4 text-base text-neutral-900 placeholder-neutral-400 focus:border-[#c26d43] focus:ring-1 focus:ring-[#c26d43] focus:outline-none transition-all shadow-sm"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="rounded-xl border border-black/[0.06] bg-white px-5 py-4 text-base text-neutral-900 placeholder-neutral-400 focus:border-[#c26d43] focus:ring-1 focus:ring-[#c26d43] focus:outline-none transition-all shadow-sm"
                />
                <button type="submit" className="mt-4 flex items-center justify-center rounded-xl bg-neutral-900 px-8 py-4 text-sm font-bold tracking-[0.15em] text-white uppercase hover:bg-[#c26d43] transition-all hover:scale-[1.02] active:scale-95 shadow-md">
                  Request Consultation
                </button>
              </form>
              <p className="mt-8 text-center text-xs font-medium text-neutral-400 uppercase tracking-wide">
                Possession {project.possession}
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={project.gallery}
          title={project.title}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
