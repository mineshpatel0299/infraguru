"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, fadeDown, viewportMirror } from "@/lib/motion";
import type { Project } from "@/lib/projects";
import SealLink from "./SealLink";

/* ── Lightbox Component ─────────────────────────────────────────────────── */
function ExpandBadge() {
 return (
 <span className="absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center bg-black/40 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 rounded-full border border-white/20">
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
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
 className="fixed inset-0 z-[999] flex items-center justify-center bg-[#132731]/95 backdrop-blur-2xl"
 onClick={onClose}
 >
 <button
 type="button"
 onClick={onClose}
 aria-label="Close"
 className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center border border-white/20 bg-white/5 text-white rounded-full backdrop-blur-xl transition-all hover:bg-white/20"
 >
 &#10005;
 </button>

 <span className="absolute top-8 left-8 font-mono text-[0.8rem] text-white/70 uppercase">
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
 className="absolute top-1/2 left-4 flex h-14 w-14 -translate-y-1/2 items-center justify-center border border-white/20 bg-white/5 text-white rounded-full backdrop-blur-xl transition-all hover:bg-white/20 hover:scale-105 sm:left-8"
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
 className="absolute top-1/2 right-4 flex h-14 w-14 -translate-y-1/2 items-center justify-center border border-white/20 bg-white/5 text-white rounded-full backdrop-blur-xl transition-all hover:bg-white/20 hover:scale-105 sm:right-8"
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
 className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl rounded-sm"
 />
 </div>,
 document.body
 );
}

/* ── Section UI Helpers ─────────────────────────────────────────────────── */
function Eyebrow({ mark, light = false, children }: { mark: string; light?: boolean; children: React.ReactNode }) {
 return (
 <span
 className={`mb-6 flex items-center gap-4 text-[0.68rem] font-bold uppercase ${
 light ? "text-white" : "text-[#132731]"
 }`}
 >
 <span className={`font-mono text-[0.6rem] ${light ? "text-white/50" : "text-[#132731]/50"}`}>
 {mark}
 </span>
 <span className={`h-px w-12 ${light ? "bg-white/40" : "bg-[#132731]/40"}`} />
 {children}
 </span>
 );
}

/* ── Main Component ─────────────────────────────────────────────────────── */
export default function ProjectExperience({
 project,
 related,
}: {
 project: Project;
 related: Project[];
}) {
 const enquireRef = useRef<HTMLDivElement>(null);
 const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

 return (
 <div className="w-full overflow-x-hidden bg-white selection:bg-[#132731] selection:text-white">
 {/* ── SLIM TOP BAR ── */}
 <div className="sticky top-0 z-50 flex items-center justify-between gap-3 border-b border-white/10 bg-[#132731]/90 px-6 py-4 backdrop-blur-2xl">
 <SealLink
 href="/projects"
 className="group flex items-center gap-3 text-[0.7rem] font-medium text-white/80 uppercase transition-colors hover:text-white"
 >
 <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1 opacity-70">&larr;</span> 
 <span>Portfolio</span>
 </SealLink>

 <span className="hidden font-mono text-[0.65rem] text-white/50 uppercase md:inline">
 {project.category} &mdash; {project.code}
 </span>

 <button
 type="button"
 onClick={() => enquireRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
 className="inline-flex items-center gap-2 border border-white/30 bg-white px-6 py-2.5 text-[0.65rem] font-bold text-[#132731] uppercase shadow-sm transition-all hover:bg-transparent hover:text-white active:scale-95"
 >
 Enquire
 </button>
 </div>

 {/* ── HERO SECTION ── */}
 <section className="relative h-[90vh] min-h-[640px] w-full overflow-hidden bg-[#132731]">
 <motion.img
 initial={{ scale: 1.05 }}
 animate={{ scale: 1 }}
 transition={{ duration: 1.5, ease: "easeOut" }}
 src={project.image}
 alt={project.title}
 className="absolute inset-0 h-full w-full object-cover opacity-100"
 />
 <div className="absolute inset-0 bg-black/40" />

 <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-12 lg:px-24">
 <motion.div variants={fadeDown} initial="hidden" animate="visible" className="max-w-4xl">
 <span className="mb-6 inline-flex items-center gap-3 border border-white/20 bg-white/5 px-4 py-1.5 text-[0.65rem] font-bold text-white/90 uppercase backdrop-blur-md rounded-full">
 <span className="h-1.5 w-1.5 bg-white rounded-full" /> {project.location}
 </span>
 <h1 className="font-heading text-5xl leading-[1.02] text-white sm:text-7xl lg:text-[6rem]">
 {project.title}
 </h1>
 <p className="mt-8 max-w-2xl font-body text-lg leading-[1.7] text-white/80 sm:text-xl font-light">
 {project.tagline}
 </p>
 <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/20 pt-8">
 <div className="flex flex-col gap-1">
 <span className="text-[0.6rem] font-bold text-white/50 uppercase">Starting at</span>
 <span className="text-2xl font-medium text-white">{project.price}</span>
 </div>
 <span className="h-10 w-px bg-white/20" />
 <div className="flex flex-col gap-1">
 <span className="text-[0.6rem] font-bold text-white/50 uppercase">Configuration</span>
 <span className="text-base font-medium text-white">{project.specs}</span>
 </div>
 </div>
 </motion.div>
 </div>
 </section>

 {/* ── HIGHLIGHTS GRID ── */}
 <div className="relative z-20 w-full bg-[#132731] border-b border-white/10">
 <motion.div
 variants={fadeUp}
 initial="hidden"
 whileInView="visible"
 viewport={viewportMirror}
 className="grid grid-cols-2 divide-x divide-y md:divide-y-0 divide-white/10 border-t border-white/10 md:grid-cols-3 lg:grid-cols-6"
 >
 {project.highlights.map((h) => (
 <div key={h.label} className="flex flex-col justify-center px-6 py-10 text-center hover:bg-white/5 transition-colors">
 <span className="mb-3 block text-[0.65rem] font-bold text-white/50 uppercase">
 {h.label}
 </span>
 <span className="block text-xl font-medium text-white">{h.value}</span>
 </div>
 ))}
 </motion.div>
 </div>

 {/* ── THE VISION ── */}
 <section className="w-full bg-[#132731] px-6 py-24 sm:px-12 sm:py-32 lg:px-24">
 <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-24 max-w-[1400px] mx-auto">
 <div className="lg:col-span-7">
 <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportMirror}>
 <Eyebrow mark="01" light>The Vision</Eyebrow>
 <h2 className="mb-10 font-heading text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl">
 Built To Outlast <br className="hidden sm:block" />
 <span className="text-white/60 ">The Blueprint</span>
 </h2>
 </motion.div>

 <div className="mt-8 space-y-8 sm:mt-12">
 {project.description.map((para, i) => (
 <motion.p
 key={i}
 variants={fadeUp}
 initial="hidden"
 whileInView="visible"
 viewport={viewportMirror}
 className="font-body text-lg leading-[1.8] text-white/70 font-light"
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
 className="flex flex-col gap-6 border border-white/15 bg-white/5 p-10 backdrop-blur-md lg:col-span-5 lg:sticky lg:top-32"
 >
 {[
 { label: "Architect", value: project.architect },
 { label: "Developer", value: project.developer },
 { label: "RERA No.", value: project.rera },
 { label: "Status", value: project.possession },
 ].map((f) => (
 <div key={f.label} className="flex flex-col gap-2 border-b border-white/10 pb-6 last:border-0 last:pb-0">
 <span className="text-[0.65rem] font-bold text-white/50 uppercase">{f.label}</span>
 <span className="text-xl font-medium text-white">{f.value}</span>
 </div>
 ))}
 </motion.div>
 </div>
 </section>

 {/* ── AMENITIES & GALLERY ── */}
 <section className="w-full bg-white py-24 sm:py-32">
 <div className="w-full px-6 sm:px-12 lg:px-24 max-w-[1400px] mx-auto">
 {/* Amenities */}
 <div className="mb-24 lg:mb-32">
 <motion.div
 variants={fadeUp}
 initial="hidden"
 whileInView="visible"
 viewport={viewportMirror}
 className="mb-16"
 >
 <Eyebrow mark="02">Signature Amenities</Eyebrow>
 <h2 className="font-heading text-4xl text-[#132731] sm:text-5xl lg:text-6xl">
 Appointed Without Compromise
 </h2>
 </motion.div>

 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
 {project.amenities.map((a) => (
 <motion.div
 key={a}
 variants={fadeUp}
 initial="hidden"
 whileInView="visible"
 viewport={viewportMirror}
 className="flex flex-col justify-between h-32 border border-[#132731]/10 bg-white p-6 shadow-sm hover:shadow-xl transition-shadow duration-300"
 >
 <span className="h-1.5 w-1.5 bg-[#132731] rounded-full" />
 <span className="text-lg font-medium text-[#132731] leading-tight">{a}</span>
 </motion.div>
 ))}
 </div>
 </div>

 {/* Gallery */}
 <div>
 <motion.div
 variants={fadeUp}
 initial="hidden"
 whileInView="visible"
 viewport={viewportMirror}
 className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
 >
 <div>
 <Eyebrow mark="03">Gallery</Eyebrow>
 <h2 className="font-heading text-4xl text-[#132731] sm:text-5xl lg:text-6xl">
 Every Angle, Considered
 </h2>
 </div>
 </motion.div>

 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
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
 className={`group relative h-72 sm:h-96 overflow-hidden bg-[#132731]/5 ${
 i === 0 ? "lg:col-span-8" : i === 1 ? "lg:col-span-4" : i === 2 ? "lg:col-span-5" : "lg:col-span-7"
 }`}
 >
 <Image
 src={src}
 alt="Gallery view"
 fill
 sizes="(min-width: 1024px) 50vw, 100vw"
 className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
 />
 <div className="absolute inset-0 bg-[#132731]/0 transition-colors duration-500 group-hover:bg-[#132731]/10" />
 <ExpandBadge />
 </motion.button>
 ))}
 </div>
 </div>
 </div>
 </section>

 {/* ── ADDRESS & ACCESS ── */}
 <section className="w-full bg-[#f9fafb] px-6 py-24 sm:px-12 lg:px-24 border-t border-[#132731]/10">
 <div className="max-w-[1400px] mx-auto">
 <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportMirror}>
 <Eyebrow mark="04">Location & Connectivity</Eyebrow>
 <h2 className="mb-12 font-heading text-4xl text-[#132731] sm:text-5xl">
 {project.location}
 </h2>
 </motion.div>

 <motion.div
 variants={fadeUp}
 initial="hidden"
 whileInView="visible"
 viewport={viewportMirror}
 className="grid grid-cols-1 border border-[#132731]/10 bg-white shadow-sm sm:grid-cols-2 lg:grid-cols-4"
 >
 {project.landmarks.map((l) => (
 <div
 key={l.label}
 className="flex flex-col gap-4 border-b border-[#132731]/10 p-8 sm:border-r sm:border-b-0 last:border-r-0 hover:bg-[#132731]/5 transition-colors"
 >
 <span className="text-lg font-medium text-[#132731]">{l.label}</span>
 <span className="w-fit bg-[#132731] px-3 py-1.5 font-mono text-[0.65rem] font-bold text-white uppercase ">
 {l.distance}
 </span>
 </div>
 ))}
 </motion.div>
 </div>
 </section>

 {/* ── ENQUIRE & RELATED ── */}
 <section
 ref={enquireRef}
 className="w-full bg-[#132731] py-24 sm:py-32"
 >
 <div className="w-full px-6 sm:px-12 lg:px-24 max-w-[1400px] mx-auto">
 <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-24">
 <div>
 <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportMirror}>
 <Eyebrow mark="05" light>Seal The Deal</Eyebrow>
 <h2 className="mb-8 font-heading text-4xl text-white sm:text-5xl lg:text-6xl">
 Request A Private Viewing
 </h2>
 {project.testimonial && (
                  <div className="border-l border-white/20 pl-6 mt-8">
                    <p className="text-xl leading-relaxed text-white/90 mb-4">
                      &ldquo;{project.testimonial.quote}&rdquo;
                    </p>
                    <span className="text-[0.65rem] font-bold text-white/50 uppercase">
                      {project.testimonial.author} &mdash; {project.testimonial.role}
                    </span>
                  </div>
                )}
 </motion.div>

 </div>

 {/* Form */}
 <motion.div
 variants={scaleIn}
 initial="hidden"
 whileInView="visible"
 viewport={viewportMirror}
 className="bg-white p-10 sm:p-14 shadow-2xl"
 >
 <div className="mb-10 text-center">
 <span className="mb-3 block text-[0.65rem] font-bold text-[#132731]/50 uppercase">
 Direct Inquiry
 </span>
 <span className="block font-heading text-3xl text-[#132731]">{project.title}</span>
 </div>

 <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
 <div>
 <label className="block text-[0.65rem] font-bold text-[#132731]/60 uppercase mb-2">Full Name</label>
 <input
 type="text"
 className="w-full border-b border-[#132731]/20 bg-transparent py-3 text-base text-[#132731] placeholder-[#132731]/30 transition-colors focus:border-[#132731] focus:outline-none"
 placeholder="Enter your full name"
 />
 </div>
 <div>
 <label className="block text-[0.65rem] font-bold text-[#132731]/60 uppercase mb-2">Email Address</label>
 <input
 type="email"
 className="w-full border-b border-[#132731]/20 bg-transparent py-3 text-base text-[#132731] placeholder-[#132731]/30 transition-colors focus:border-[#132731] focus:outline-none"
 placeholder="Enter your email address"
 />
 </div>
 <div>
 <label className="block text-[0.65rem] font-bold text-[#132731]/60 uppercase mb-2">Phone Number</label>
 <input
 type="tel"
 className="w-full border-b border-[#132731]/20 bg-transparent py-3 text-base text-[#132731] placeholder-[#132731]/30 transition-colors focus:border-[#132731] focus:outline-none"
 placeholder="Enter your phone number"
 />
 </div>
 <button
 type="submit"
 className="mt-8 w-full bg-[#132731] py-5 text-[0.7rem] font-bold text-white uppercase shadow-md transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
 >
 Request Consultation
 </button>
 </form>
 </motion.div>
 </div>

 {related.length > 0 && (
 <motion.div
 variants={fadeUp}
 initial="hidden"
 whileInView="visible"
 viewport={viewportMirror}
 className="mt-32 border-t border-white/10 pt-16"
 >
 <span className="mb-10 block text-[0.7rem] font-bold text-white/50 uppercase">
 Continue The Portfolio
 </span>
 <div className="flex flex-row gap-8 overflow-x-auto no-scrollbar pb-6">
 {related.map((r) => (
 <SealLink
 key={r.id}
 href={`/projects/${r.id}`}
 className="group flex flex-col gap-5 min-w-[280px] sm:min-w-[340px] transition-opacity hover:opacity-80"
 >
 <div className="relative h-56 w-full shrink-0 overflow-hidden bg-white/5">
 <Image
 src={r.image}
 alt={r.title}
 fill
 sizes="(max-width: 768px) 280px, 340px"
 className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
 />
 </div>
 <div>
 <div className="mb-2 text-2xl font-medium text-white">{r.title}</div>
 <div className="font-mono text-[0.7rem] text-white/50 uppercase">
 {r.location}
 </div>
 </div>
 </SealLink>
 ))}
 </div>
 </motion.div>
 )}
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
