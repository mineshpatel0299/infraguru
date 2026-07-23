"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import SampleNavbar from "@/components/sample/SampleNavbar";
import SampleFooter from "@/components/sample/SampleFooter";

// Stat cards fan in from the sides: first card from the left, last from the
// right, with the middle card rising up from below.
const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    x: i === 0 ? -70 : i === 2 ? 70 : 0,
    y: i === 1 ? 40 : 0,
  }),
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const PORTFOLIO_ITEMS = [
  { id: "buy", title: "Buy", image: "/hero-poster.jpg" },
  { id: "sell", title: "Sell", image: "/premium-hero-monolith.png" },
  { id: "rent", title: "Rent", image: "https://picsum.photos/seed/infraguru-rent/480/640" },
  { id: "lease", title: "Lease", image: "https://picsum.photos/seed/infraguru-lease/480/640" },
  { id: "residential", title: "Residential", image: "https://picsum.photos/seed/infraguru-residential/480/640" },
  { id: "commercial", title: "Commercial", image: "https://picsum.photos/seed/infraguru-commercial/480/640" },
  { id: "consulting", title: "Consulting", image: "https://picsum.photos/seed/infraguru-consulting/480/640" },
  { id: "infrastructure", title: "Infrastructure", image: "https://picsum.photos/seed/infraguru-infra/480/640" },
];

const PROJECTS = [
  {
    id: "azure-residences",
    slug: "the-azure-residences",
    title: "The Azure Residences",
    tag: "Residential · Coastal Bay",
    description: "11 signature homes fronting 340m of private shoreline.",
    image: "/hero-poster.jpg",
  },
  {
    id: "summit-business-tower",
    slug: "summit-business-tower",
    title: "Summit Business Tower",
    tag: "Commercial · Downtown Core",
    description: "32 storeys of column-free floor plates, LEED Platinum certified.",
    image: "https://picsum.photos/seed/infraguru-summit/480/640",
  },
  {
    id: "verdant-estate",
    slug: "verdant-estate",
    title: "Verdant Estate",
    tag: "Residential · Whispering Pines",
    description: "Six-bedroom villas built for long-term, generational legacy.",
    image: "/premium-hero-monolith.png",
  },
];

const ABOUT_WORDS =
  "RERA-backed and transparent, Infraguru handles every deal like a signature piece — deliberate, considered, and built to outlast trends, turning fifteen years of expertise into a legacy every client can stand on."
    .split(" ");

const PROCESS_STEPS = [
  {
    id: "discover",
    num: "01",
    title: "Discover",
    description: "We map your goals, budget and timeline to shortlist opportunities worth your time.",
  },
  {
    id: "curate",
    num: "02",
    title: "Curate",
    description: "A hand-picked selection of properties, verified, RERA-checked and site-visited.",
  },
  {
    id: "negotiate",
    num: "03",
    title: "Negotiate",
    description: "Our advisors handle terms, paperwork and pricing so you close with confidence.",
  },
  {
    id: "handover",
    num: "04",
    title: "Handover",
    description: "From registration to keys-in-hand, we stay with you through the final mile.",
  },
];

function ArrowUpRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// A single word that sharpens into focus as `progress` sweeps through `range` —
// used to scrub a paragraph into legibility as the About section scrolls past.
function AboutRevealWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const blurPx = useTransform(progress, range, [5, 0]);
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`);

  return (
    <motion.span style={{ opacity, filter }} className="mr-[0.32em] inline-block">
      {word}
    </motion.span>
  );
}

// Counts up from 0 once it scrolls into view, rather than showing a static number.
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  React.useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// A process step that "checks itself off" as scroll progress passes its slot —
// the number swaps from an outlined/pending ring to a filled/done disc, and
// the card itself settles into place, all driven by one shared scroll value
// rather than each card watching the viewport independently.
function ProcessStepCard({
  step,
  index,
  total,
  progress,
}: {
  step: { id: string; num: string; title: string; description: string };
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = start + 0.06;
  const activeAmount = useTransform(progress, [start, end], [0, 1]);
  const cardY = useTransform(activeAmount, [0, 1], [26, 0]);
  const cardOpacity = useTransform(activeAmount, [0, 1], [0.4, 1]);
  const circleScale = useTransform(activeAmount, [0, 1], [0.75, 1]);
  const pendingOpacity = useTransform(activeAmount, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{ y: cardY, opacity: cardOpacity }}
      className="relative rounded-2xl bg-aurum-cream px-6 py-8"
    >
      <span className="aurum-num relative z-10 inline-flex h-12 w-12">
        <motion.span
          style={{ opacity: pendingOpacity, scale: circleScale }}
          className="absolute inset-0 flex items-center justify-center rounded-full border border-aurum-hairline text-sm font-light text-aurum-muted"
        >
          {step.num}
        </motion.span>
        <motion.span
          style={{ opacity: activeAmount, scale: circleScale }}
          className="absolute inset-0 flex items-center justify-center rounded-full bg-aurum-ink text-sm font-light text-aurum-gold-light"
        >
          {step.num}
        </motion.span>
      </span>
      <h3 className="mt-6 font-aurum-heading font-light text-xl text-aurum-ink">{step.title}</h3>
      <p className="mt-2 text-[0.8rem] leading-relaxed text-aurum-muted">{step.description}</p>
    </motion.div>
  );
}

export default function SamplePage() {
  const aboutRef = useRef<HTMLElement>(null);

  // About: scroll-scrubbed reveal, tracked across the full pinned duration
  // of its wrapper (not the sticky section itself, which is viewport-height
  // and would make the progress jump from 0 to 1 almost instantly).
  const aboutWrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutWrapperRef,
    offset: ["start start", "end end"],
  });
  const aboutWatermarkY = useTransform(aboutProgress, [0, 1], ["0%", "-25%"]);
  const aboutChipY = useTransform(aboutProgress, [0, 1], [0, -50]);
  const aboutImageScale = useTransform(aboutProgress, [0, 1], [1.2, 1]);

  // About: single image tilts toward the cursor instead of sitting flat.
  const aboutMx = useMotionValue(0.5);
  const aboutMy = useMotionValue(0.5);
  const aboutRotateY = useSpring(useTransform(aboutMx, [0, 1], [-12, 12]), {
    stiffness: 150,
    damping: 20,
  });
  const aboutRotateX = useSpring(useTransform(aboutMy, [0, 1], [10, -10]), {
    stiffness: 150,
    damping: 20,
  });

  function handleAboutMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    aboutMx.set((e.clientX - rect.left) / rect.width);
    aboutMy.set((e.clientY - rect.top) / rect.height);
  }
  function handleAboutMouseLeave() {
    animate(aboutMx, 0.5, { duration: 0.6, ease: [0.16, 1, 0.3, 1] });
    animate(aboutMy, 0.5, { duration: 0.6, ease: [0.16, 1, 0.3, 1] });
  }

  // Process: one scroll value drives every step's "checked off" state plus a
  // marker that glides along the connecting line — a single continuous
  // scrub instead of each card fading in on its own independent viewport check.
  const processTrackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: processProgress } = useScroll({
    target: processTrackRef,
    offset: ["start 0.85", "end 0.35"],
  });
  const processMarkerLeft = useTransform(processProgress, [0, 1], ["0%", "100%"]);
  const processPercentLabel = useTransform(processProgress, (v) => `${Math.round(v * 100)}%`);

  // Horizontal cursor-following preview section
  const previewRef = useRef<HTMLElement>(null);
  const [previewNode, setPreviewNode] = useState<HTMLElement | null>(null);
  const setPreviewRef = (node: HTMLElement | null) => {
    previewRef.current = node;
    setPreviewNode(node);
  };
  // A state-backed ref (rather than a bare useRef) so useScroll only ever
  // receives a target once the DOM node is guaranteed to be mounted —
  // avoids a hydration race where the scroll listener silently never attaches.
  const previewTarget = useMemo(() => ({ current: previewNode }), [previewNode]);

  const [activeItem, setActiveItem] = useState<number | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 120, damping: 22, mass: 0.6 });
  const py = useSpring(my, { stiffness: 120, damping: 22, mass: 0.6 });

  function handlePreviewMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = previewRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  // As the section rises from below and overlaps the pinned About block, its
  // top corners start rounded (sheet-like) and flatten once it fully settles.
  const { scrollYProgress: settleProgress } = useScroll({
    target: previewTarget,
    offset: ["start end", "start start"],
  });
  // 50vw on each side means the two corner arcs meet dead-center, forming
  // one continuous dome across the full width rather than two small corners.
  const rawTopRadius = useTransform(settleProgress, [0, 1], [50, 0]);
  const topRadius = useSpring(rawTopRadius, { stiffness: 70, damping: 24, mass: 0.6 });
  const topRadiusPx = useTransform(topRadius, (v) => `${v}vw`);

  return (
    <main className="theme-aurum theme-aurum-blue min-h-screen bg-white p-3 sm:p-4 lg:p-5">
      <SampleNavbar />

      {/* Hero */}
      <div className="relative mt-2 h-[calc(100svh-6rem)] min-h-130 w-full overflow-hidden rounded-[28px] bg-aurum-ink sm:rounded-[36px] lg:rounded-[44px]">
        <motion.img
          src="/hero-poster.jpg"
          alt="Aerial view of the city skyline"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Floating badge, top-left */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-6 left-6 z-10 inline-flex items-center gap-2 rounded-full bg-aurum-cream/90 px-4 py-2 text-[0.65rem] font-light tracking-widest text-aurum-ink uppercase backdrop-blur-md sm:top-8 sm:left-10"
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-aurum-gold"
          />
          RERA Certified &middot; Est. 2011
        </motion.div>

        {/* Bottom content: glass panel floating over the clean image */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-6 px-6 pb-6 sm:px-10 sm:pb-10 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-[0.7rem] font-light tracking-[0.3em] text-aurum-gold-light uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
            >
              Infraguru
            </motion.span>

            <h1 className="mt-3 text-[clamp(1.6rem,4.2vw,3rem)] font-light text-aurum-cream drop-shadow-[0_4px_20px_rgba(0,0,0,0.55)]">
              Your Trusted Partner In
              <br />
              Real Estate &amp; Investment
            </h1>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="hidden flex-col items-center gap-2 pb-2 text-aurum-cream/70 sm:flex"
          >
            <span className="text-[0.6rem] tracking-[0.3em] uppercase [writing-mode:vertical-rl]">
              Scroll
            </span>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-aurum-cream/30"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3.5 w-3.5">
                <path d="M12 4v16M6 14l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* Stat strip */}
      <div className="mx-auto mt-3 grid max-w-7xl grid-cols-1 gap-3 sm:mt-4 sm:grid-cols-3">
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          whileHover={{ y: -6 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative overflow-hidden rounded-2xl bg-aurum-paper px-8 py-10"
        >
          <span className="aurum-eyebrow absolute top-6 right-6 rounded-full border border-aurum-hairline px-3 py-1 text-[0.6rem] text-aurum-muted">
            Trusted
          </span>
          <div className="aurum-num font-light text-5xl text-aurum-ink sm:text-6xl">
            <AnimatedCounter value={500} suffix="+" />
          </div>
          <p className="mt-2 text-[0.75rem] tracking-wide text-aurum-muted uppercase">Satisfied clients &amp; investors</p>
        </motion.div>

        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          whileHover={{ y: -6 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="rounded-2xl bg-aurum-paper px-8 py-10"
        >
          <div className="aurum-num font-light text-5xl text-aurum-ink sm:text-6xl">
            <AnimatedCounter value={350} suffix="+" />
          </div>
          <p className="mt-2 text-[0.75rem] tracking-wide text-aurum-muted uppercase">Properties sold to date</p>
        </motion.div>

        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          whileHover={{ y: -6 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="rounded-2xl bg-linear-to-br from-aurum-ink via-aurum-ink-soft to-aurum-ink px-8 py-10"
        >
          <div className="aurum-num font-light text-5xl text-aurum-gold sm:text-6xl">
            <AnimatedCounter value={15} suffix="+" />
          </div>
          <p className="mt-2 text-[0.75rem] tracking-wide text-aurum-cream/50 uppercase">Years building legacies</p>
        </motion.div>
      </div>

      {/* About: pinned while the page scrolls past, its content scrubbing into
          focus as you move through — a single tilting image instead of a grid
          of photos, wrapped in a continuously orbiting seal. */}
      <div ref={aboutWrapperRef} className="relative mt-3 h-[150vh] sm:mt-4 sm:h-[220vh]">
        <section
          id="about"
          ref={aboutRef}
          className="sticky top-0 mx-auto max-w-7xl rounded-[28px] bg-aurum-cream px-6 py-14 sm:rounded-[36px] sm:px-10 sm:py-20 lg:px-14"
        >
          {/* Giant drifting numeral watermark, clipped to its own layer so it
              never spills past the section's rounded corners */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px] sm:rounded-[36px]">
            <motion.span
              style={{ y: aboutWatermarkY }}
              className="aurum-num absolute -top-10 right-0 text-[42vw] leading-none font-light text-aurum-ink/5 select-none sm:-top-16 sm:text-[24vw]"
            >
              15
            </motion.span>
          </div>

          <div className="relative grid grid-cols-1 gap-14 md:grid-cols-2 md:items-center md:gap-16">
            {/* Left: single tilting image + orbiting seal + floating stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={handleAboutMouseMove}
              onMouseLeave={handleAboutMouseLeave}
              style={{ perspective: 1200 }}
              className="relative mx-auto w-full max-w-md"
            >
              <motion.div
                style={{ rotateX: aboutRotateX, rotateY: aboutRotateY }}
                className="relative aspect-4/5 overflow-hidden rounded-4xl shadow-2xl"
              >
                <motion.img
                  src="/premium-hero-monolith.png"
                  alt="Signature interior with skyline view"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ scale: aboutImageScale }}
                />
              </motion.div>

              {/* Floating stat chip, drifts upward as the section pins */}
              <motion.div
                style={{ y: aboutChipY }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -right-4 -bottom-6 rounded-2xl bg-aurum-ink px-5 py-4 shadow-xl sm:-right-8"
              >
                <div className="aurum-num text-2xl font-light text-aurum-gold">
                  <AnimatedCounter value={15} suffix="+" />
                </div>
                <div className="text-[0.6rem] tracking-widest text-aurum-cream/60 uppercase">Years of legacy</div>
              </motion.div>
            </motion.div>

            {/* Right: eyebrow + scroll-scrubbed paragraph + shimmering heading */}
            <div>
              <span className="aurum-eyebrow">About Infraguru</span>

              <p className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-aurum-muted">
                {ABOUT_WORDS.map((word, i) => (
                  <AboutRevealWord
                    key={`${word}-${i}`}
                    word={word}
                    progress={aboutProgress}
                    range={[
                      (i / ABOUT_WORDS.length) * 0.6,
                      Math.min(1, ((i + 2) / ABOUT_WORDS.length) * 0.6),
                    ]}
                  />
                ))}
              </p>

              <motion.h2
                animate={{ backgroundPositionX: ["0%", "200%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="mt-8 max-w-xl bg-[linear-gradient(90deg,var(--color-aurum-ink)_0%,var(--color-aurum-gold)_50%,var(--color-aurum-ink)_100%)] bg-size-[200%_100%] bg-clip-text text-[clamp(1.6rem,3.2vw,2.5rem)] font-light text-transparent"
              >
                Where Vision Meets Value.
              </motion.h2>

              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 inline-flex items-center gap-2 text-[0.75rem] font-light tracking-[0.15em] text-aurum-gold-dark uppercase"
              >
                Discover Our Story <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </motion.a>
            </div>
          </div>
        </section>
      </div>

      {/* Portfolio: horizontal hover-preview list, sliding up to overlap the still-pinned About section */}
      <motion.section
        id="services"
        ref={setPreviewRef}
        onMouseMove={handlePreviewMouseMove}
        style={{ borderTopLeftRadius: topRadiusPx, borderTopRightRadius: topRadiusPx }}
        className="relative z-10 flex min-h-screen flex-col justify-center overflow-hidden rounded-b-[36px] bg-aurum-ink px-6 py-10 mt-[-45vh] sm:mt-[-90vh] sm:px-10 sm:py-14 lg:px-14"
      >
        <span className="text-[0.7rem] font-light tracking-[0.3em] text-aurum-cream/70 uppercase">
          What We Do
        </span>

        <div
          onMouseLeave={() => setActiveItem(null)}
          className="mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-2 sm:mt-14 sm:gap-x-4"
        >
          {PORTFOLIO_ITEMS.map((item, i) => (
            <React.Fragment key={item.id}>
              <motion.span
                onMouseEnter={() => setActiveItem(i)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.1, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`cursor-pointer font-aurum-heading font-light text-2xl uppercase transition-colors duration-500 sm:text-3xl lg:text-4xl ${
                  activeItem === i ? "text-aurum-cream" : "text-aurum-cream/40"
                }`}
              >
                {item.title}
                <sup className="ml-1 text-[0.65rem] tracking-wide sm:text-xs">
                  0{i + 1}
                </sup>
              </motion.span>
              {i < PORTFOLIO_ITEMS.length - 1 && (
                <span className="font-aurum-heading font-light text-2xl text-aurum-cream/20 sm:text-3xl lg:text-4xl">/</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-10 flex justify-end sm:mt-14">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[0.75rem] font-light tracking-[0.15em] text-aurum-gold-light uppercase transition-colors hover:text-aurum-gold"
          >
            Book a Consultation <span>&#8599;</span>
          </a>
        </div>

        {/* Cursor-following preview */}
        <motion.div
          style={{ x: px, y: py }}
          className="pointer-events-none absolute top-0 left-0 z-20 hidden sm:block"
        >
          <div className="absolute aspect-3/4 w-[19vw] max-w-70 -translate-x-1/2 translate-y-[-110%]">
            <AnimatePresence>
              {activeItem !== null && (
                <motion.div
                  key={PORTFOLIO_ITEMS[activeItem].id}
                  initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 overflow-hidden rounded-lg shadow-2xl"
                >
                  <img
                    src={PORTFOLIO_ITEMS[activeItem].image}
                    alt={PORTFOLIO_ITEMS[activeItem].title}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.section>

      {/* Projects: a physical, swipeable deck instead of a hover/crossfade —
          drag the front card off to either side (or tap a title) to cycle it
          to the back and bring the next one forward. */}
      <section id="portfolio" className="relative z-10 mt-3 overflow-hidden rounded-[28px] bg-aurum-ink px-6 py-16 sm:mt-4 sm:rounded-[36px] sm:px-10 sm:py-24 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-lg sm:mb-20">
            <span className="aurum-eyebrow text-aurum-gold-light">Our Portfolio</span>
            <h2 className="mt-4 text-[clamp(1.6rem,3.5vw,2.6rem)] font-light text-aurum-cream">
              Three Addresses, One Standard
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/sample/projects/${project.slug}`} className="block">
                  <motion.div
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    className="group relative flex h-105 flex-col gap-0 overflow-hidden rounded-3xl bg-aurum-paper p-3 sm:h-120"
                  >
                    {/* Image — physically shrinks on hover instead of hiding under an overlay */}
                    <motion.div
                      variants={{ rest: { height: "76%" }, hover: { height: "40%" } }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full shrink-0 overflow-hidden rounded-2xl"
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                      <span className="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-aurum-cream/90 font-aurum-heading text-[0.7rem] text-aurum-ink">
                        0{i + 1}
                      </span>
                      <motion.span
                        variants={{ rest: { opacity: 0, scale: 0.7 }, hover: { opacity: 1, scale: 1 } }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-aurum-gold text-aurum-ink"
                      >
                        <ArrowUpRightIcon className="h-3.5 w-3.5" />
                      </motion.span>
                    </motion.div>

                    {/* Details — the space the image just vacated */}
                    <div className="flex flex-1 flex-col justify-center overflow-hidden px-2 pt-4 pb-1">
                      <h3 className="font-aurum-heading text-xl font-light text-aurum-ink sm:text-2xl">
                        {project.title}
                      </h3>

                      <motion.div
                        variants={{
                          rest: { opacity: 0, y: 12, height: 0 },
                          hover: { opacity: 1, y: 0, height: "auto" },
                        }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className="mt-2 block text-[0.65rem] tracking-widest text-aurum-gold-dark uppercase">
                          {project.tag}
                        </span>
                        <p className="mt-2 max-w-70 text-[0.8rem] leading-relaxed text-aurum-muted">
                          {project.description}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process: how we work, staggered reveal */}
      <section id="process" className="relative z-10 mt-3 rounded-[28px] bg-aurum-paper px-6 py-16 sm:mt-4 sm:rounded-[36px] sm:px-10 sm:py-24 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 flex max-w-lg flex-col gap-3 sm:mb-16 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <span className="aurum-eyebrow">How We Work</span>
              <h2 className="mt-4 text-[clamp(1.6rem,3.5vw,2.6rem)] font-light text-aurum-ink">
                A Process Built On Trust
              </h2>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-aurum-muted">
                From first conversation to final handover, every step is designed to keep you informed and in control.
              </p>
            </div>
          </motion.div>

          {/* Scroll-scrubbed track: fills and its marker glides along as you
              scroll past the steps below, instead of animating once on view. */}
          <div ref={processTrackRef} className="relative">
            <div className="relative mb-12 hidden lg:block">
              <div className="h-px w-full bg-aurum-hairline" />
              <motion.div
                style={{ scaleX: processProgress, transformOrigin: "left" }}
                className="absolute inset-0 h-px w-full bg-aurum-gold"
              />
              <motion.div
                style={{ left: processMarkerLeft }}
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurum-gold shadow-[0_0_0_5px_rgba(236,156,0,0.18)]"
              />
              <motion.span
                style={{ left: processMarkerLeft }}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-[calc(100%+14px)] text-[0.6rem] font-light tracking-widest text-aurum-gold-dark uppercase"
              >
                {processPercentLabel}
              </motion.span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS_STEPS.map((step, i) => (
                <ProcessStepCard
                  key={step.id}
                  step={step}
                  index={i}
                  total={PROCESS_STEPS.length}
                  progress={processProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      {/* CTA: single closing statement instead of a full contact form —
          the footer already carries email/phone/address/social. */}
      <section id="contact" className="mt-3 sm:mt-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-aurum-ink px-6 py-12 sm:rounded-[36px] sm:px-12 sm:py-16"
        >
          {/* Ambient glow, breathing gently behind the headline */}
          <motion.div
            animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute top-1/2 left-1/4 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurum-gold/20 blur-3xl"
          />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            {/* Left: text */}
            <div className="max-w-xl">
              <span className="aurum-eyebrow text-aurum-gold-light">Get Started</span>

              <motion.h2
                animate={{ backgroundPositionX: ["0%", "200%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                className="mt-5 bg-[linear-gradient(90deg,var(--color-aurum-cream)_0%,var(--color-aurum-gold)_50%,var(--color-aurum-cream)_100%)] bg-size-[200%_100%] bg-clip-text text-[clamp(2rem,4.5vw,3.2rem)] font-light text-transparent"
              >
                Ready To Build Your Legacy?
              </motion.h2>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-aurum-cream/60">
                Connect with our private advisors to schedule an exclusive consultation on your next property.
              </p>
            </div>

            {/* Right: actions */}
            <div className="flex shrink-0 flex-col items-stretch gap-4 sm:flex-row lg:flex-col lg:items-end">
              <a
                href="mailto:info@infraguru.in"
                className="aurum-btn-gold justify-center rounded-full px-8 py-3.5 text-[0.75rem]"
              >
                Book a Consultation
              </a>
              <a
                href="tel:+919090656575"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-aurum-cream/25 px-8 py-3.5 text-[0.75rem] font-light tracking-wide text-aurum-cream uppercase transition-colors hover:border-aurum-cream/50"
              >
                +91 90 90 65 65 75
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <SampleFooter />
    </main>
  );
}
