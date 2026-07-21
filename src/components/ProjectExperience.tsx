"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";
import type { Project } from "@/lib/projects";
import SealLink from "./SealLink";

type Mode = "page" | "modal";

const SECTIONS = [
  { key: "hero", mark: "00", label: "Overview" },
  { key: "vision", mark: "01", label: "The Vision" },
  { key: "amenities", mark: "02", label: "Amenities" },
  { key: "gallery", mark: "03", label: "Gallery" },
  { key: "blueprint", mark: "04", label: "Floor Plate" },
  { key: "location", mark: "05", label: "Location" },
  { key: "enquire", mark: "06", label: "Enquire" },
] as const;

type SectionKey = (typeof SECTIONS)[number]["key"];

const N = SECTIONS.length;

/* ── Shared helpers ──────────────────────────────────────────────────── */

function useIsDesktop() {
  const [state, setState] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const update = () => setState(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return state;
}

function formatFeet(v: number) {
  const total = Math.max(0, v) * (N - 1) * 12;
  const feet = Math.floor(total / 12);
  const inches = Math.round(total % 12);
  return `${feet}'-${inches}"`;
}

function SealBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: -8 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className="relative h-28 w-28 text-secondary-light"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        <defs>
          <path id="badgeCircleExp" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <circle cx="50" cy="50" r="48" fill="var(--color-secondary)" opacity="0.12" />
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" opacity="0.8" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <text fill="currentColor" fontSize="6.4" fontWeight="700" letterSpacing="2">
          <textPath href="#badgeCircleExp" startOffset="0%">
            DEED AUTHENTICATED &#8226; INFRAGURU &#8226;
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <img src="/g.png" alt="" aria-hidden className="h-7 w-7 object-contain" />
      </div>
    </motion.div>
  );
}

function Eyebrow({ mark, light = false, children }: { mark: string; light?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={`mb-4 inline-flex items-center gap-3 text-[0.72rem] font-semibold tracking-[3px] uppercase ${
        light ? "text-secondary-light" : "text-primary"
      }`}
    >
      <span className={`font-mono text-[0.65rem] tracking-normal ${light ? "text-secondary-light/60" : "text-secondary-hover"}`}>
        {mark}
      </span>
      <span className="h-px w-6 bg-secondary" />
      {children}
    </span>
  );
}

/* ── Panel frame: gives every section its depth/tilt as it enters/leaves ── */

function Panel({
  index,
  smoothIndex,
  children,
}: {
  index: number;
  smoothIndex: MotionValue<number>;
  children: React.ReactNode;
}) {
  const signedDist = useTransform(smoothIndex, (v) => v - index);
  const dist = useTransform(signedDist, (d) => Math.abs(d));
  const opacity = useTransform(dist, [0, 0.6, 1.1], [1, 0.85, 0.3]);
  const scale = useTransform(dist, [0, 1], [1, 0.94]);
  const innerY = useTransform(dist, [0, 1], [0, 26]);
  const rotateY = useTransform(signedDist, [-1, 0, 1], [6, 0, -6]);

  return (
    <div style={{ width: `${100 / N}%` }} className="relative h-full shrink-0 overflow-hidden">
      <motion.div
        style={{ opacity, scale, y: innerY, rotateY, transformPerspective: 1400 }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
      {index < N - 1 && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-px bg-gradient-to-b from-transparent via-secondary/50 to-transparent"
        />
      )}
    </div>
  );
}

/* ── The Architect's Ruler: persistent scrub bar + progress readout ──────── */

function Ruler({
  smoothIndex,
  activeIndex,
  trackRef,
  onPointerDownTrack,
  onJump,
}: {
  smoothIndex: MotionValue<number>;
  activeIndex: number;
  trackRef: React.RefObject<HTMLDivElement | null>;
  onPointerDownTrack: (clientX: number) => void;
  onJump: (index: number) => void;
}) {
  const handleLeft = useTransform(smoothIndex, (v) => `${(v / (N - 1)) * 100}%`);
  const readout = useTransform(smoothIndex, (v) => formatFeet(v));

  return (
    <div className="z-20 flex shrink-0 justify-center border-t border-white/10 bg-primary-dark px-4 pt-4 pb-8 select-none sm:px-8">
      <div className="w-full max-w-4xl">
        <div className="text-left font-mono text-[0.68rem] tracking-[0.15em] text-secondary-light uppercase">
          {SECTIONS[activeIndex].label}
        </div>
        <div className="mt-3 flex items-center gap-4">
          <motion.span className="hidden shrink-0 font-mono text-[0.7rem] tracking-wide text-white/70 sm:block">
            {readout}
          </motion.span>

        <div
          ref={trackRef}
          onPointerDown={(e) => onPointerDownTrack(e.clientX)}
          style={{ touchAction: "none" }}
          className="relative h-11 flex-1 cursor-pointer"
        >
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/25" />
          <div className="absolute inset-0 flex items-center justify-between">
            {Array.from({ length: (N - 1) * 4 + 1 }).map((_, i) => {
              const isMajor = i % 4 === 0;
              return (
                <span
                  key={i}
                  className={`block w-px shrink-0 ${
                    isMajor ? "h-3.5 bg-secondary-light/70" : "h-1.5 bg-white/30"
                  }`}
                />
              );
            })}
          </div>

          <div className="absolute inset-x-0 -bottom-1 flex items-center justify-between">
            {SECTIONS.map((s, i) => (
              <button
                key={s.key}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onJump(i);
                }}
                className={`translate-y-full whitespace-nowrap px-1 pt-1.5 font-mono text-[0.62rem] tracking-[0.1em] uppercase transition-colors ${
                  activeIndex === i ? "text-secondary-light" : "text-white/40 hover:text-white/70"
                }`}
              >
                {s.mark}
              </button>
            ))}
          </div>

          <motion.div
            style={{ left: handleLeft }}
            className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <span className="block h-6 w-6 rounded-full border-2 border-secondary-light bg-secondary shadow-[0_4px_14px_rgba(212,175,55,0.55)]" />
          </motion.div>
        </div>

          <span className="hidden shrink-0 font-mono text-[0.7rem] tracking-wide text-white/70 sm:block">
            {String(activeIndex + 1).padStart(2, "0")}/{String(N).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Top bar: brand/back on the left, enquire + close on the right ───────── */

function TopBar({
  project,
  mode,
  onClose,
  onEnquire,
}: {
  project: Project;
  mode: Mode;
  onClose?: () => void;
  onEnquire: () => void;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 p-5 sm:p-8">
      <div className="pointer-events-auto flex items-center gap-4">
        {mode === "page" ? (
          <SealLink
            href="/#projects"
            className="flex items-center gap-2 rounded-full border border-primary/10 bg-white/90 px-4 py-2 text-[0.72rem] font-semibold tracking-[0.1em] text-ink uppercase shadow-soft backdrop-blur-xl transition-colors hover:text-primary"
          >
            <span aria-hidden>&larr;</span> Portfolio
          </SealLink>
        ) : (
          <span className="rounded-full border border-white/30 bg-black/30 px-4 py-2 font-mono text-[0.68rem] tracking-[0.15em] text-white/80 uppercase backdrop-blur-xl">
            {project.category} / {project.code}
          </span>
        )}
      </div>
      <div className="pointer-events-auto flex items-center gap-3">
        <button
          type="button"
          onClick={onEnquire}
          className="rounded-full bg-secondary px-5 py-2 text-[0.7rem] font-bold tracking-[0.12em] text-primary-dark uppercase shadow-[0_8px_20px_rgba(212,175,55,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary-hover"
        >
          Enquire
        </button>
        {mode === "modal" && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-secondary-light/50 bg-primary-dark/60 text-secondary-light shadow-[inset_0_0_0_3px_rgba(2,31,107,0.45)] backdrop-blur-xl transition-all duration-300 hover:border-secondary-light hover:bg-primary-dark hover:text-white hover:shadow-[0_6px_20px_rgba(212,175,55,0.35)]"
          >
            &#10005;
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Gallery card: a fanned print that drifts as its panel comes into focus ── */

function GalleryCard({
  src,
  index,
  cfg,
  dist,
}: {
  src: string;
  index: number;
  cfg: { rotate: number; x: number; y: number; z: number };
  dist: MotionValue<number>;
}) {
  const cardX = useTransform(dist, (d) => `calc(-50% + ${cfg.x}px + ${d * (24 + index * 10)}px)`);
  const cardY = useTransform(dist, (d) => `calc(-50% + ${cfg.y}px + ${d * 12}px)`);

  return (
    <motion.div
      style={{ left: "50%", top: "50%", x: cardX, y: cardY, rotate: cfg.rotate, zIndex: cfg.z }}
      className="absolute h-[70%] w-[46%] overflow-hidden rounded-2xl border-4 border-white shadow-strong"
    >
      <img src={src} alt="" className="h-full w-full object-cover" />
      <span className="absolute bottom-2 left-2 rounded-full bg-black/40 px-2 py-0.5 font-mono text-[0.6rem] text-white/90 backdrop-blur-sm">
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.div>
  );
}

/* ── Desktop panel content ────────────────────────────────────────────── */

function HeroPanel({ project }: { project: Project }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/50 to-primary-dark/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

      <div className="absolute top-24 right-8 hidden lg:block">
        <SealBadge />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-28 sm:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-5 flex flex-wrap items-center gap-3 font-mono text-[0.7rem] tracking-[0.15em] text-white/60 uppercase">
            <span>{project.category}</span>
            <span>/</span>
            <span>{project.code}</span>
          </div>
          <span className="mb-4 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[0.7rem] font-bold tracking-[0.2em] text-secondary-light uppercase backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" /> {project.location}
          </span>
          <h1 className="max-w-3xl font-heading text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[1.05] text-white">
            {project.title}
          </h1>
          <p className="mt-4 max-w-xl text-[1rem] leading-[1.7] text-white/70">{project.tagline}</p>
          <div className="mt-8 flex flex-wrap items-end gap-8 border-t border-white/15 pt-6">
            <div>
              <span className="block text-[0.62rem] font-bold tracking-[0.2em] text-white/40 uppercase">
                Certified Value
              </span>
              <span className="font-mono text-xl font-semibold text-white">{project.price}</span>
            </div>
            <div className="h-9 w-px bg-white/15" />
            <div>
              <span className="block text-[0.62rem] font-bold tracking-[0.2em] text-white/40 uppercase">
                Specification
              </span>
              <span className="font-mono text-[0.88rem] text-white/80">{project.specs}</span>
            </div>
          </div>
          <div className="mt-6 hidden items-center gap-2 text-[0.72rem] font-semibold tracking-[0.15em] text-secondary-light/80 uppercase sm:flex">
            Scroll or drag the ruler to explore <span aria-hidden>&darr;</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisionPanel({ project }: { project: Project }) {
  const facts = [
    { label: "Architect", value: project.architect },
    { label: "Developer", value: project.developer },
    { label: "RERA No.", value: project.rera },
  ];
  return (
    <div className="flex h-full items-center bg-white px-6 pt-24 pb-24 sm:px-12 lg:px-16">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div className="no-scrollbar max-h-full overflow-y-auto pr-2">
          <Eyebrow mark="01">The Vision</Eyebrow>
          <h2 className="mb-5 max-w-lg text-[clamp(1.6rem,2.6vw,2.4rem)] text-primary-dark">
            Built To Outlast The Blueprint
          </h2>
          <p className="mb-5 max-w-xl text-[0.98rem] leading-[1.75] text-muted">{project.description[0]}</p>
          {project.description[1] && (
            <p className="mb-5 max-w-xl text-[0.98rem] leading-[1.75] text-muted">{project.description[1]}</p>
          )}
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 border-t border-hairline pt-6 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label}>
                <span className="block text-[0.62rem] font-bold tracking-[0.2em] text-muted/60 uppercase">
                  {f.label}
                </span>
                <span className="mt-1 block text-[0.88rem] font-semibold text-ink">{f.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[1.75rem] border border-hairline bg-[linear-gradient(160deg,var(--color-bg-soft)_0%,#ffffff_55%)] p-6 shadow-medium">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, var(--color-primary) 0px, var(--color-primary) 1px, transparent 1px, transparent 10px)",
            }}
          />
          <span className="relative mb-4 block text-[0.65rem] font-bold tracking-[0.2em] text-muted/70 uppercase">
            Specification Sheet
          </span>
          <div className="relative grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline">
            {project.highlights.map((h) => (
              <div key={h.label} className="bg-white px-4 py-4 text-center">
                <span className="block text-[0.58rem] font-bold tracking-[0.15em] text-muted/70 uppercase">
                  {h.label}
                </span>
                <span className="mt-1.5 block font-heading text-[0.95rem] text-primary-dark">{h.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AmenitiesPanel({ project }: { project: Project }) {
  return (
    <div className="flex h-full items-center bg-bg-soft px-6 pt-24 pb-24 sm:px-12 lg:px-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-10 text-center">
          <Eyebrow mark="02">Signature Amenities</Eyebrow>
          <h2 className="text-[clamp(1.6rem,2.6vw,2.4rem)] text-primary-dark">Appointed Without Compromise</h2>
        </div>
        <div className="no-scrollbar mx-auto grid max-h-[46vh] max-w-4xl grid-cols-1 gap-x-14 overflow-y-auto sm:grid-cols-2">
          {project.amenities.map((a) => (
            <div key={a} className="flex items-center gap-3.5 border-b border-hairline py-3.5">
              <span className="shrink-0 text-[0.68rem] text-secondary-hover">&#9670;</span>
              <span className="text-[0.9rem] leading-snug text-ink">{a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GalleryPanel({
  project,
  smoothIndex,
  index,
}: {
  project: Project;
  smoothIndex: MotionValue<number>;
  index: number;
}) {
  const dist = useTransform(smoothIndex, (v) => v - index);
  const imgs = project.gallery.slice(0, 4);
  const configs = [
    { rotate: -6, x: -140, y: 10, z: 10 },
    { rotate: -2, x: -46, y: -18, z: 20 },
    { rotate: 3, x: 52, y: 6, z: 20 },
    { rotate: 7, x: 148, y: -12, z: 10 },
  ];

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-white px-6 pt-24 pb-28 sm:px-12">
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 text-center">
        <Eyebrow mark="03">Gallery</Eyebrow>
        <h2 className="text-[clamp(1.6rem,2.6vw,2.4rem)] text-primary-dark">Every Angle, Considered</h2>
      </div>

      <div className="relative mt-16 h-[54vh] w-full max-w-3xl">
        {imgs.map((src, i) => (
          <GalleryCard key={i} src={src} index={i} cfg={configs[i % configs.length]} dist={dist} />
        ))}
      </div>
    </div>
  );
}

function BlueprintPanel() {
  const rooms = [
    { x: 60, y: 70, label: "Living Pavilion" },
    { x: 60, y: 178, label: "Primary Suite" },
    { x: 175, y: 178, label: "Study" },
    { x: 300, y: 65, label: "Kitchen & Dining" },
    { x: 300, y: 198, label: "Terrace" },
  ];
  return (
    <div className="flex h-full items-center bg-primary-dark px-6 pt-24 pb-24 sm:px-12 lg:px-16">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8 max-w-lg">
          <Eyebrow mark="04" light>
            Indicative Floor Plate
          </Eyebrow>
          <h2 className="text-[clamp(1.6rem,2.6vw,2.4rem)] text-white">Drawn To Precision</h2>
        </div>
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-primary/20 p-6 sm:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
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
        </div>
        <p className="mt-4 text-center text-[0.75rem] text-white/40">
          Layout is indicative and subject to final architectural drawings.
        </p>
      </div>
    </div>
  );
}

function LocationPanel({ project }: { project: Project }) {
  return (
    <div className="flex h-full items-center bg-white px-6 pt-24 pb-24 sm:px-12 lg:px-16">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div className="no-scrollbar max-h-full overflow-y-auto pr-2">
          <Eyebrow mark="05">Address &amp; Access</Eyebrow>
          <h2 className="mb-4 text-[clamp(1.6rem,2.6vw,2.4rem)] text-primary-dark">{project.location}</h2>
          <ul className="flex flex-col divide-y divide-hairline border-t border-hairline">
            {project.landmarks.map((l) => (
              <li key={l.label} className="flex items-center justify-between py-3">
                <span className="text-[0.9rem] text-ink">{l.label}</span>
                <span className="font-mono text-[0.82rem] font-semibold text-primary">{l.distance}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-hairline bg-bg-soft">
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="absolute inset-0 -m-5 rounded-full bg-secondary/15" />
            <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-secondary shadow-[0_0_0_6px_rgba(212,175,55,0.2)]">
              <span className="h-2 w-2 rounded-full bg-primary-dark" />
            </span>
          </div>
          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-4 py-1.5 text-[0.68rem] font-semibold tracking-wide text-primary-dark shadow-soft backdrop-blur-sm">
            {project.location}
          </span>
        </div>
      </div>
    </div>
  );
}

function EnquirePanel({ project, related }: { project: Project; related: Project[] }) {
  return (
    <div className="flex h-full items-center bg-[linear-gradient(160deg,var(--color-bg-soft)_0%,#ffffff_60%)] px-6 pt-24 pb-24 sm:px-12 lg:px-16">
      <div className="no-scrollbar mx-auto grid w-full max-w-6xl max-h-full grid-cols-1 gap-10 overflow-y-auto lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <Eyebrow mark="06">Seal The Deal</Eyebrow>
          <h2 className="mb-5 max-w-md text-[clamp(1.5rem,2.4vw,2.2rem)] text-primary-dark">
            Request A Private Viewing
          </h2>
          <p className="mb-6 font-heading text-[1.05rem] leading-[1.5] text-primary-dark italic">
            &ldquo;{project.testimonial.quote}&rdquo;
          </p>
          <div className="mb-8 text-[0.82rem] text-muted">
            <span className="font-heading text-primary italic">{project.testimonial.author}</span> &mdash;{" "}
            {project.testimonial.role}
          </div>

          {related.length > 0 && (
            <div className="border-t border-hairline pt-6">
              <span className="mb-3 block text-[0.62rem] font-bold tracking-[0.2em] text-muted/60 uppercase">
                Continue The Portfolio
              </span>
              <div className="flex gap-3">
                {related.slice(0, 3).map((r) => (
                  <SealLink
                    key={r.id}
                    href={`/projects/${r.id}`}
                    centered
                    className="group relative h-16 w-16 shrink-0 overflow-hidden rounded-xl"
                  >
                    <img
                      src={r.image}
                      alt={r.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-primary-dark/20 transition-colors group-hover:bg-primary-dark/0" />
                  </SealLink>
                ))}
              </div>
            </div>
          )}
        </div>

        <form className="relative rounded-[1.75rem] border border-hairline bg-white p-7 shadow-medium" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-5 flex items-center gap-4 border-b border-hairline pb-5">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.25)]"
              style={{
                background:
                  "radial-gradient(circle at 32% 28%, var(--color-secondary-light) 0%, var(--color-secondary) 45%, var(--color-secondary-hover) 100%)",
              }}
            >
              <img src="/g.png" alt="" aria-hidden className="h-7 w-7 object-contain" />
            </div>
            <div>
              <span className="block text-[0.62rem] font-bold tracking-[0.2em] text-muted/70 uppercase">
                Private Viewing
              </span>
              <span className="block font-heading text-base text-primary-dark">{project.title}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Full name"
              className="rounded-xl border border-hairline bg-white px-4 py-2.5 text-[0.88rem] text-ink placeholder-muted/60 focus:border-primary/40 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email address"
              className="rounded-xl border border-hairline bg-white px-4 py-2.5 text-[0.88rem] text-ink placeholder-muted/60 focus:border-primary/40 focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Phone number"
              className="rounded-xl border border-hairline bg-white px-4 py-2.5 text-[0.88rem] text-ink placeholder-muted/60 focus:border-primary/40 focus:outline-none"
            />
            <button type="submit" className="btn-gold mt-1 justify-center rounded-full">
              Request Consultation
            </button>
          </div>
          <p className="mt-4 text-center text-[0.7rem] text-muted/70">
            Certified value {project.price} &middot; Possession {project.possession}
          </p>
        </form>
      </div>
    </div>
  );
}

function PanelBody({
  sectionKey,
  project,
  related,
  smoothIndex,
  index,
}: {
  sectionKey: SectionKey;
  project: Project;
  related: Project[];
  smoothIndex: MotionValue<number>;
  index: number;
}) {
  switch (sectionKey) {
    case "hero":
      return <HeroPanel project={project} />;
    case "vision":
      return <VisionPanel project={project} />;
    case "amenities":
      return <AmenitiesPanel project={project} />;
    case "gallery":
      return <GalleryPanel project={project} smoothIndex={smoothIndex} index={index} />;
    case "blueprint":
      return <BlueprintPanel />;
    case "location":
      return <LocationPanel project={project} />;
    case "enquire":
      return <EnquirePanel project={project} related={related} />;
    default:
      return null;
  }
}

/* ── Desktop experience: the scroll-jacked horizontal deck ────────────── */

function DesktopExperience({
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
  const scrollElRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const rulerTrackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const { scrollYProgress } = useScroll({
    container: mode === "modal" ? scrollElRef : undefined,
    target: spacerRef,
  });

  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, N - 1]);
  const smoothIndex = useSpring(rawIndex, { stiffness: 260, damping: 34, mass: 0.5 });
  const xPercent = useTransform(smoothIndex, (v) => `-${(v / N) * 100}%`);

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(smoothIndex, "change", (v) => {
    const idx = Math.min(N - 1, Math.max(0, Math.round(v)));
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  const scrollToRatio = useCallback(
    (ratio: number, smooth = true) => {
      const spacer = spacerRef.current;
      if (!spacer) return;
      const clamped = Math.min(1, Math.max(0, ratio));
      if (mode === "modal") {
        const el = scrollElRef.current;
        if (!el) return;
        const max = spacer.offsetHeight - el.clientHeight;
        el.scrollTo({ top: clamped * max, behavior: smooth ? "smooth" : "auto" });
      } else {
        const rect = spacer.getBoundingClientRect();
        const spacerTop = rect.top + window.scrollY;
        const max = spacer.offsetHeight - window.innerHeight;
        window.scrollTo({ top: spacerTop + clamped * max, behavior: smooth ? "smooth" : "auto" });
      }
    },
    [mode]
  );

  const handleRulerPoint = useCallback(
    (clientX: number, smooth: boolean) => {
      const track = rulerTrackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const ratio = (clientX - rect.left) / rect.width;
      scrollToRatio(ratio, smooth);
    },
    [scrollToRatio]
  );

  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (!draggingRef.current) return;
      handleRulerPoint(e.clientX, false);
    }
    function onUp() {
      draggingRef.current = false;
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [handleRulerPoint]);

  useEffect(() => {
    if (mode !== "modal") return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, onClose]);

  const containerClass =
    mode === "modal"
      ? "no-scrollbar relative h-full w-full overflow-x-hidden overflow-y-auto overscroll-contain bg-white"
      : "relative w-full bg-white";

  // The modal's own box is smaller than the browser viewport, so its scroll-jack track
  // must be sized off the container's own height (via container query units), not `dvh`
  // (which is always relative to the real viewport and would overflow the modal frame).
  const heightUnit = mode === "modal" ? "cqh" : "dvh";

  return (
    <div
      ref={mode === "modal" ? scrollElRef : undefined}
      className={containerClass}
      style={mode === "modal" ? { containerType: "size" } : undefined}
    >
      <div ref={spacerRef} style={{ height: `${N * 100}${heightUnit}` }} className="relative">
        <div className="sticky top-0 flex w-full flex-col overflow-hidden" style={{ height: `100${heightUnit}` }}>
          <div className="relative flex-1 overflow-hidden">
            <TopBar project={project} mode={mode} onClose={onClose} onEnquire={() => scrollToRatio(1)} />

            <motion.div style={{ width: `${N * 100}%`, x: xPercent }} className="flex h-full">
              {SECTIONS.map((s, i) => (
                <Panel key={s.key} index={i} smoothIndex={smoothIndex}>
                  <PanelBody sectionKey={s.key} project={project} related={related} smoothIndex={smoothIndex} index={i} />
                </Panel>
              ))}
            </motion.div>
          </div>

          <Ruler
            smoothIndex={smoothIndex}
            activeIndex={activeIndex}
            trackRef={rulerTrackRef}
            onPointerDownTrack={(clientX) => {
              draggingRef.current = true;
              handleRulerPoint(clientX, false);
            }}
            onJump={(i) => scrollToRatio(i / (N - 1))}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Mobile / narrow-viewport fallback: a normal, still-premium vertical stack ── */

const revealGroup = staggerContainer(0.08);

function MobileSection({ children, tint }: { children: React.ReactNode; tint?: "soft" | "dark" }) {
  const bg = tint === "dark" ? "bg-primary-dark" : tint === "soft" ? "bg-bg-soft" : "bg-white";
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={revealGroup}
      className={`px-5 py-12 ${bg}`}
    >
      {children}
    </motion.section>
  );
}

function MobileExperience({
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

  return (
    <div className={mode === "modal" ? "no-scrollbar h-full w-full overflow-y-auto overscroll-contain bg-white" : "w-full bg-white"}>
      <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-hairline bg-white/90 px-4 py-3 backdrop-blur-xl">
        {mode === "page" ? (
          <SealLink
            href="/#projects"
            className="flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.1em] text-ink uppercase"
          >
            <span aria-hidden>&larr;</span> Portfolio
          </SealLink>
        ) : (
          <span className="font-mono text-[0.65rem] tracking-[0.1em] text-muted uppercase">
            {project.category} / {project.code}
          </span>
        )}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => enquireRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="rounded-full bg-secondary px-4 py-1.5 text-[0.66rem] font-bold tracking-[0.1em] text-primary-dark uppercase"
          >
            Enquire
          </button>
          {mode === "modal" && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-ink"
            >
              &#10005;
            </button>
          )}
        </div>
      </div>

      <section className="relative h-[70vh] w-full overflow-hidden">
        <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/50 to-transparent" />
        <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-8">
          <span className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.65rem] font-bold tracking-[0.15em] text-secondary-light uppercase backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" /> {project.location}
          </span>
          <h1 className="font-heading text-[clamp(1.8rem,8vw,2.6rem)] leading-[1.05] text-white">{project.title}</h1>
          <p className="mt-3 text-[0.95rem] leading-[1.6] text-white/70">{project.tagline}</p>
        </div>
      </section>

      <div className="grid grid-cols-2 divide-x divide-y divide-hairline border-b border-hairline">
        {project.highlights.map((h) => (
          <div key={h.label} className="px-4 py-5 text-center">
            <span className="block text-[0.58rem] font-bold tracking-[0.15em] text-muted/70 uppercase">{h.label}</span>
            <span className="mt-1.5 block font-heading text-[0.95rem] text-primary-dark">{h.value}</span>
          </div>
        ))}
      </div>

      <MobileSection>
        <motion.div variants={fadeUp}>
          <Eyebrow mark="01">The Vision</Eyebrow>
        </motion.div>
        <motion.h2 variants={fadeUp} className="mb-4 text-[clamp(1.5rem,5vw,2rem)] text-primary-dark">
          Built To Outlast The Blueprint
        </motion.h2>
        {project.description.map((para, i) => (
          <motion.p key={i} variants={fadeUp} className="mb-4 text-[0.96rem] leading-[1.75] text-muted">
            {para}
          </motion.p>
        ))}
        <motion.div variants={fadeUp} className="mt-6 grid grid-cols-1 gap-4 border-t border-hairline pt-6">
          {[
            { label: "Architect", value: project.architect },
            { label: "Developer", value: project.developer },
            { label: "RERA No.", value: project.rera },
          ].map((f) => (
            <div key={f.label} className="flex items-center justify-between">
              <span className="text-[0.65rem] font-bold tracking-[0.15em] text-muted/60 uppercase">{f.label}</span>
              <span className="text-[0.85rem] font-semibold text-ink">{f.value}</span>
            </div>
          ))}
        </motion.div>
      </MobileSection>

      <MobileSection tint="soft">
        <motion.div variants={fadeUp}>
          <Eyebrow mark="02">Signature Amenities</Eyebrow>
        </motion.div>
        <motion.h2 variants={fadeUp} className="mb-6 text-[clamp(1.5rem,5vw,2rem)] text-primary-dark">
          Appointed Without Compromise
        </motion.h2>
        <div className="divide-y divide-hairline border-t border-hairline">
          {project.amenities.map((a) => (
            <motion.div key={a} variants={fadeUp} className="flex items-center gap-3 py-3.5">
              <span className="shrink-0 text-[0.68rem] text-secondary-hover">&#9670;</span>
              <span className="text-[0.9rem] leading-snug text-ink">{a}</span>
            </motion.div>
          ))}
        </div>
      </MobileSection>

      <MobileSection>
        <motion.div variants={fadeUp}>
          <Eyebrow mark="03">Gallery</Eyebrow>
        </motion.div>
        <motion.h2 variants={fadeUp} className="mb-6 text-[clamp(1.5rem,5vw,2rem)] text-primary-dark">
          Every Angle, Considered
        </motion.h2>
        <div className="flex flex-col gap-4">
          {project.gallery.map((src, i) => (
            <motion.div key={i} variants={fadeUp} className="relative h-56 overflow-hidden rounded-2xl">
              <img src={src} alt={`${project.title} view ${i + 1}`} className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </div>
      </MobileSection>

      <MobileSection tint="dark">
        <motion.div variants={fadeUp}>
          <Eyebrow mark="04" light>
            Indicative Floor Plate
          </Eyebrow>
        </motion.div>
        <motion.h2 variants={fadeUp} className="mb-6 text-[clamp(1.5rem,5vw,2rem)] text-white">
          Drawn To Precision
        </motion.h2>
        <motion.div variants={fadeUp} className="relative overflow-hidden rounded-2xl border border-white/10 bg-primary/20 p-5">
          <svg viewBox="0 0 400 240" className="relative w-full text-white/70">
            <rect x="10" y="10" width="380" height="220" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line x1="10" y1="120" x2="220" y2="120" stroke="currentColor" strokeWidth="1" />
            <line x1="220" y1="10" x2="220" y2="230" stroke="currentColor" strokeWidth="1" />
            <line x1="220" y1="160" x2="390" y2="160" stroke="currentColor" strokeWidth="1" />
            <line x1="130" y1="120" x2="130" y2="230" stroke="currentColor" strokeWidth="1" />
          </svg>
        </motion.div>
        <motion.p variants={fadeUp} className="mt-4 text-center text-[0.75rem] text-white/40">
          Layout is indicative and subject to final architectural drawings.
        </motion.p>
      </MobileSection>

      <MobileSection>
        <motion.div variants={fadeUp}>
          <Eyebrow mark="05">Address &amp; Access</Eyebrow>
        </motion.div>
        <motion.h2 variants={fadeUp} className="mb-5 text-[clamp(1.5rem,5vw,2rem)] text-primary-dark">
          {project.location}
        </motion.h2>
        <motion.ul variants={fadeUp} className="flex flex-col divide-y divide-hairline border-t border-hairline">
          {project.landmarks.map((l) => (
            <li key={l.label} className="flex items-center justify-between py-3.5">
              <span className="text-[0.9rem] text-ink">{l.label}</span>
              <span className="font-mono text-[0.82rem] font-semibold text-primary">{l.distance}</span>
            </li>
          ))}
        </motion.ul>
      </MobileSection>

      <div ref={enquireRef}>
        <MobileSection tint="soft">
          <motion.div variants={fadeUp}>
            <Eyebrow mark="06">Seal The Deal</Eyebrow>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mb-6 text-[clamp(1.5rem,5vw,2rem)] text-primary-dark">
            Request A Private Viewing
          </motion.h2>
          <motion.p variants={fadeUp} className="mb-6 font-heading text-[1.05rem] leading-[1.5] text-primary-dark italic">
            &ldquo;{project.testimonial.quote}&rdquo;
          </motion.p>
          <motion.form
            variants={fadeUp}
            className="rounded-2xl border border-hairline bg-white p-6 shadow-medium"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Full name"
                className="rounded-xl border border-hairline px-4 py-3 text-[0.9rem] focus:border-primary/40 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email address"
                className="rounded-xl border border-hairline px-4 py-3 text-[0.9rem] focus:border-primary/40 focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="rounded-xl border border-hairline px-4 py-3 text-[0.9rem] focus:border-primary/40 focus:outline-none"
              />
              <button type="submit" className="btn-gold mt-1 justify-center rounded-full">
                Request Consultation
              </button>
            </div>
          </motion.form>

          {related.length > 0 && (
            <motion.div variants={fadeUp} className="mt-10 border-t border-hairline pt-8">
              <span className="mb-4 block text-[0.65rem] font-bold tracking-[0.2em] text-muted/60 uppercase">
                Continue The Portfolio
              </span>
              <div className="flex flex-col gap-4">
                {related.slice(0, 3).map((r) => (
                  <SealLink key={r.id} href={`/projects/${r.id}`} centered className="group flex items-center gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                      <img src={r.image} alt={r.title} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <div className="font-heading text-base text-primary-dark">{r.title}</div>
                      <div className="font-mono text-[0.8rem] text-primary">{r.price}</div>
                    </div>
                  </SealLink>
                ))}
              </div>
            </motion.div>
          )}
        </MobileSection>
      </div>
    </div>
  );
}

/* ── Public entry point ───────────────────────────────────────────────── */

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
  const isDesktop = useIsDesktop();

  if (isDesktop === null) {
    return <div className={mode === "modal" ? "h-full w-full bg-white" : "min-h-svh w-full bg-white"} />;
  }

  return isDesktop ? (
    <DesktopExperience project={project} related={related} mode={mode} onClose={onClose} />
  ) : (
    <MobileExperience project={project} related={related} mode={mode} onClose={onClose} />
  );
}
