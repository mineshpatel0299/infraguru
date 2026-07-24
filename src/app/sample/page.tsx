"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import SampleNavbar from "@/components/sample/SampleNavbar";
import SampleFooter from "@/components/sample/SampleFooter";
import { PROJECTS } from "@/lib/projects";

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

// Hidden for now — bring back once it filters something real.
const SHOW_LOCATION_CHIP = false;

const HERO_HEADING_LINES = ["Your Trusted Partner In", "Real Estate & Investment"];

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

// The "portfolio" scroll accordion below is driven straight off the real
// property catalogue (src/lib/projects.ts) — same four addresses the detail
// pages use — rather than an invented, separately-maintained list. Each
// project's six highlight pairs become the feature grid, cycling through a
// fixed set of icons purely for visual rhythm (they aren't semantically
// tied to a given stat).
const FEATURE_ICON_CYCLE = ["sliders", "phone", "headphones", "monitor", "radar", "refresh"] as const;

const PORTFOLIO_CARDS = PROJECTS.map((project) => ({
  id: project.slug,
  slug: project.slug,
  letter: project.title.replace(/^The\s+/i, "").charAt(0).toUpperCase(),
  title: project.title,
  tag: `${project.category} · ${project.location}`,
  description: project.tagline,
  image: project.image,
  features: project.highlights.slice(0, 6).map((h, i) => ({
    icon: FEATURE_ICON_CYCLE[i % FEATURE_ICON_CYCLE.length],
    label: h.label,
    value: h.value,
  })),
}));

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

function PinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

function ChevronDownIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BookmarkIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-4-6 4V5.5a1 1 0 0 1 1-1Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShareIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <circle cx="18" cy="5.5" r="2.2" />
      <circle cx="6" cy="12" r="2.2" />
      <circle cx="18" cy="18.5" r="2.2" />
      <path d="m8 10.8 8-4.2M8 13.2l8 4.2" strokeLinecap="round" />
    </svg>
  );
}

function SlidersIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M4 6h9M17 6h3M4 12h3M9 12h11M4 18h13M21 18h-2" strokeLinecap="round" />
      <circle cx="13" cy="6" r="2" />
      <circle cx="7" cy="12" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  );
}

function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path
        d="M5 4.5h3.2l1.3 4-2 1.5a11.5 11.5 0 0 0 5.5 5.5l1.5-2 4 1.3V18a1.5 1.5 0 0 1-1.6 1.5C10.5 19 5 13.5 4.5 6.1A1.5 1.5 0 0 1 5 4.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeadsetIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" strokeLinecap="round" />
      <rect x="3" y="13" width="4" height="6" rx="1.4" />
      <rect x="17" y="13" width="4" height="6" rx="1.4" />
      <path d="M19 19v.5A3.5 3.5 0 0 1 15.5 23H13" strokeLinecap="round" />
    </svg>
  );
}

function MonitorIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <rect x="3" y="4.5" width="18" height="12" rx="1.6" />
      <path d="M9 20.5h6M12 16.5v4" strokeLinecap="round" />
    </svg>
  );
}

function RadarIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 12 18 7" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function RefreshIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path
        d="M4.5 12a7.5 7.5 0 0 1 12.6-5.5M19.5 12a7.5 7.5 0 0 1-12.6 5.5"
        strokeLinecap="round"
      />
      <path d="M17 4.5v3.5h-3.5M7 19.5V16H10.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const FEATURE_ICONS: Record<string, (props: { className?: string }) => React.JSX.Element> = {
  sliders: SlidersIcon,
  phone: PhoneIcon,
  headphones: HeadsetIcon,
  monitor: MonitorIcon,
  radar: RadarIcon,
  refresh: RefreshIcon,
};

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

// One panel of the "portfolio" scroll accordion. Owns its own transforms
// (rather than being built inline inside a .map — hooks can't safely live
// there) and reveals its copy from an overlay pinned to its own left edge,
// so the panel can genuinely collapse to a sliver: nothing in its normal
// flow (the feature grid included) is left to force it wide.
//
// Each panel's flex value ramps up, holds a flat plateau at full width, then
// ramps back down — scroll only *moves* things during the short ramp at
// each boundary; the rest of a card's turn is a static hold, so a panel
// visibly finishes opening and stays open before the next one takes over.
function PortfolioCard({
  card,
  index,
  total,
  progress,
}: {
  card: (typeof PORTFOLIO_CARDS)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const step = 1 / total;
  const isFirst = index === 0;
  const isLast = index === total - 1;
  // Half-width of the ramp at each boundary, as a fraction of one card's
  // slot — small relative to the slot so most of it is a flat hold.
  const w = step * 0.16;

  let flexInput: number[];
  let flexOutput: number[];
  if (isFirst) {
    flexInput = [0, step - w, step + w];
    flexOutput = [18, 18, 1];
  } else if (isLast) {
    // Left boundary is between card (index-1) and this one, which sits at
    // index*step — using (index-1)*step here (this card's *own* left slot
    // edge, one boundary too early) made it ramp open a full segment ahead
    // of schedule, overlapping the previous card's entire plateau.
    flexInput = [index * step - w, index * step + w, 1];
    flexOutput = [1, 18, 18];
  } else {
    flexInput = [index * step - w, index * step + w, (index + 1) * step - w, (index + 1) * step + w];
    flexOutput = [1, 18, 18, 1];
  }

  const rawFlex = useTransform(progress, flexInput, flexOutput);
  const flex = useSpring(rawFlex, { stiffness: 320, damping: 34, mass: 0.35 });

  // Derived straight from the flex value itself (not a second scroll range),
  // and gated to the top of the range so only one panel's copy is legible at
  // a time — a lower threshold left both the outgoing and incoming card
  // readable mid-crossfade, overlapping their titles.
  const contentOpacity = useTransform(flex, [11, 16], [0, 1]);
  const contentY = useTransform(flex, [11, 16], [14, 0]);

  return (
    <motion.div
      style={{ flex }}
      className="group relative h-full min-w-0 overflow-hidden border-r border-white/10 bg-black last:border-r-0"
    >
      <img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 h-full w-full object-cover brightness-[0.55] transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

      {/* Collapsed state: the letter this panel shrinks down to */}
      <div className="absolute inset-y-0 right-0 flex w-11 items-end justify-center border-l border-white/10 bg-black/50 pb-7 backdrop-blur-sm sm:w-16 sm:pb-9">
        <span className="font-aurum-heading text-lg font-light text-white/80 sm:text-2xl">{card.letter}</span>
      </div>

      {/* Expanded content — pinned to this panel's own left edge with a fixed
          width, so it's revealed left-to-right as the panel opens rather
          than reflowing with it. */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="absolute bottom-0 left-0 z-10 w-[min(88vw,860px)] px-6 pb-6 sm:px-10 sm:pb-10"
      >
        <span className="text-[0.65rem] font-light tracking-[0.3em] text-aurum-gold-light uppercase">
          {card.tag}
        </span>
        <h3 className="mt-2 font-aurum-heading text-2xl font-light text-white uppercase sm:text-4xl lg:text-5xl">
          {card.title}
        </h3>
        <p className="mt-3 max-w-md text-[0.75rem] leading-relaxed text-white/60 sm:text-[0.8rem]">
          {card.description}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:mt-8 sm:grid-cols-3 sm:gap-y-5 lg:grid-cols-6">
          {card.features.map((feature) => {
            const Icon = FEATURE_ICONS[feature.icon];
            return (
              <div key={feature.label} className="flex flex-col gap-2">
                <Icon className="h-4 w-4 text-aurum-gold-light" />
                <div>
                  <p className="text-[0.58rem] tracking-wide text-white/45 uppercase">{feature.label}</p>
                  <p className="text-[0.72rem] leading-snug font-light text-white/90">{feature.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        <Link
          href={`/sample/projects/${card.slug}`}
          className="mt-6 inline-flex items-center gap-1.5 text-[0.7rem] font-light tracking-[0.15em] text-aurum-gold-light uppercase transition-colors hover:text-aurum-gold sm:mt-8"
        >
          View Project <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </Link>
      </motion.div>
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

  // Portfolio accordion: one shared scroll progress drives every
  // PortfolioCard's expand/collapse, plus the header counter and Prev/Next.
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: projectsScrollProgress } = useScroll({
    target: projectsContainerRef,
    offset: ["start start", "end end"],
  });
  const [activePortfolioIndex, setActivePortfolioIndex] = useState(0);
  useMotionValueEvent(projectsScrollProgress, "change", (v) => {
    const next = Math.min(PORTFOLIO_CARDS.length - 1, Math.max(0, Math.floor(v * PORTFOLIO_CARDS.length)));
    setActivePortfolioIndex((prev) => (prev === next ? prev : next));
  });

  // Prev/Next step relative to the *live* scroll progress rather than the
  // activePortfolioIndex state — state only catches up after a render, so a
  // second click fired before that render (e.g. two quick clicks) would
  // still be reading the pre-click index and overshoot by a card.
  function goToPortfolioCard(delta: number) {
    const el = projectsContainerRef.current;
    if (!el) return;
    const currentIndex = Math.min(
      PORTFOLIO_CARDS.length - 1,
      Math.max(0, Math.floor(projectsScrollProgress.get() * PORTFOLIO_CARDS.length)),
    );
    const clamped = Math.min(PORTFOLIO_CARDS.length - 1, Math.max(0, currentIndex + delta));
    const progress = (clamped + 0.5) / PORTFOLIO_CARDS.length;
    const rect = el.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const scrollRange = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: containerTop + progress * scrollRange, behavior: "smooth" });
  }

  // As the section rises from below and overlaps the pinned About block, its
  // top corners morph from square to rounded — an organic, liquid transition. once it fully settles.
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
    <main className="theme-aurum theme-aurum-blue min-h-screen bg-white">
      <SampleNavbar transparent />

      {/* Hero — lands as a small square on black (nav included), then expands
          to a full-bleed, edge-to-edge frame with the nav floating on top. */}
      <div className="relative h-svh min-h-130 w-full overflow-hidden bg-black">
        {/* Video reveal: starts as a small centered square and expands to
            fill the frame. The growing box itself is clipped (not just the
            video inside it), so the crop resolves smoothly instead of a
            rectangle visibly stretching into shape. */}
        <motion.div
          initial={{ width: "32vh", height: "32vh", borderRadius: "32px" }}
          animate={{ width: "100%", height: "100%", borderRadius: "0px" }}
          transition={{ duration: 1.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        >
          <motion.video
            src="/h.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
        <div className="absolute inset-0 z-1 bg-linear-to-t from-black/60 via-black/10 to-black/30" />

        {/* Top row: brand badge (left) + quick stats (right) — sits below the fixed, transparent nav */}
        {/* <div className="absolute inset-x-0 top-20 z-10 flex items-start justify-between gap-4 px-6 sm:top-24 sm:px-10 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full bg-aurum-cream/90 px-4 py-2 text-[0.65rem] font-light tracking-widest text-aurum-ink uppercase backdrop-blur-md"
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-aurum-gold"
            />
            RERA Certified &middot; Est. 2011
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden items-center gap-4 rounded-full bg-white/10 px-5 py-2.5 text-[0.7rem] font-light tracking-wide text-aurum-cream backdrop-blur-md sm:flex"
          >
            <span>15+ Years</span>
            <span className="h-3 w-px bg-aurum-cream/30" />
            <span>500+ Clients</span>
            <span className="h-3 w-px bg-aurum-cream/30" />
            <span>350+ Properties</span>
          </motion.div>
        </div> */}

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start justify-start gap-4 px-6 pb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-8 sm:px-10 sm:pb-10 lg:px-14 lg:pb-12">
          {/* Left: heading, team, blurb */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.85, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-full sm:max-w-md lg:max-w-xl"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2 }}
              className="text-[0.7rem] font-light tracking-[0.3em] text-aurum-gold-light uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
            >
              Infraguru
            </motion.span>

            <h1 className="mt-3 text-[clamp(1.6rem,4.2vw,3rem)] font-light text-aurum-cream drop-shadow-[0_4px_20px_rgba(0,0,0,0.55)]">
              {HERO_HEADING_LINES.map((line, li) => (
                <span key={line} className="block overflow-hidden py-1">
                  {line.split(" ").map((word, wi) => (
                    <motion.span
                      key={word}
                      initial={{ opacity: 0, y: "100%", filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
                      transition={{
                        duration: 0.7,
                        delay: 2 + (li * HERO_HEADING_LINES[0].split(" ").length + wi) * 0.07,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="mr-[0.28em] inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>

            {/* Team avatar stack — each face slides in from the left, one after another */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-3">
                {["advisor-1", "advisor-2", "advisor-3", "advisor-4"].map((seed, i) => (
                  <motion.img
                    key={seed}
                    src={`https://picsum.photos/seed/infraguru-${seed}/64/64`}
                    alt=""
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 2.25 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="h-9 w-9 rounded-full border-2 border-aurum-ink object-cover"
                  />
                ))}
                <motion.span
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 2.25 + 4 * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-aurum-ink bg-aurum-gold text-[0.6rem] font-light text-aurum-ink"
                >
                  +12
                </motion.span>
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.25 + 5 * 0.12 }}
                className="text-[0.7rem] font-light tracking-wide text-aurum-cream/70 uppercase"
              >
                Meet Our Team
              </motion.span>
            </div>

            <p className="mt-5 max-w-md text-[0.8rem] leading-relaxed text-aurum-cream/60">
              From first enquiry to keys-in-hand, our advisors guide every acquisition with RERA-backed transparency.
            </p>
          </motion.div>

          {/* Right: CTA, watermark word, location */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-full flex-row items-center justify-between gap-3 sm:w-auto sm:flex-col sm:items-end sm:justify-normal sm:gap-4"
          >
            <motion.a
              href="#contact"
              className="aurum-btn-gold relative overflow-hidden rounded-full px-7! py-3! text-[0.65rem]!"
            >
              <span className="relative z-10">Book a Consultation</span>

              {/* Glass/semi-transparent center-split curtain reveal overlays */}
              <motion.div
                initial={{ x: "0%" }}
                animate={{ x: "-100%" }}
                transition={{ duration: 1.8, delay: 1.5, ease: [0.25, 1, 0.5, 1] }}
                className="absolute top-0 bottom-0 left-0 w-1/2 z-20 bg-aurum-gold/90 backdrop-blur-md"
              />
              <motion.div
                initial={{ x: "0%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.8, delay: 1.5, ease: [0.25, 1, 0.5, 1] }}
                className="absolute top-0 bottom-0 right-0 w-1/2 z-20 bg-aurum-gold/90 backdrop-blur-md"
              />
            </motion.a>

            {/* <span className="font-aurum-heading text-[clamp(2rem,6vw,4rem)] leading-none font-light text-aurum-cream/90 drop-shadow-[0_4px_20px_rgba(0,0,0,0.55)]">
              Legacy
            </span> */}

            <div className="flex items-center gap-2">
              {SHOW_LOCATION_CHIP && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-[0.7rem] font-light text-aurum-cream backdrop-blur-md">
                  <PinIcon className="h-3.5 w-3.5 text-aurum-gold-light" />
                  Bengaluru, India
                  <ChevronDownIcon className="h-3 w-3 text-aurum-cream/60" />
                </span>
              )}
              <button
                type="button"
                aria-label="Save"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-aurum-cream backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <BookmarkIcon className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                aria-label="Share"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-aurum-cream backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <ShareIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="p-3 sm:p-4 lg:p-5">
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
          className="relative overflow-hidden rounded-2xl bg-aurum-paper px-6 py-8 sm:px-8 sm:py-10"
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
          className="rounded-2xl bg-aurum-paper px-6 py-8 sm:px-8 sm:py-10"
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
          className="rounded-2xl bg-linear-to-br from-aurum-ink via-aurum-ink-soft to-aurum-ink px-6 py-8 sm:px-8 sm:py-10"
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
         

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 md:items-end md:gap-10">
            {/* Left: image card with white center-split curtain reveal */}
            <div className="flex flex-col">
              <span className="aurum-eyebrow mb-6">Modern Architecture</span>
              <div className="relative aspect-[9/10] w-full overflow-hidden rounded-[2rem]">
                <motion.img
                  src="/premium-hero-monolith.png"
                  alt="Signature interior with skyline view"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ scale: aboutImageScale }}
                />

                {/* Section-matching center-split curtain reveal overlays (half left, half right) */}
                <motion.div
                  initial={{ x: "0%" }}
                  whileInView={{ x: "-100%" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute top-0 bottom-0 left-0 w-1/2 z-20 bg-aurum-cream"
                />
                <motion.div
                  initial={{ x: "0%" }}
                  whileInView={{ x: "100%" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute top-0 bottom-0 right-0 w-1/2 z-20 bg-aurum-cream"
                />
              </div>
            </div>

            {/* Right: Same size matching card with identical white center-split curtain animation */}
            <div className="flex flex-col">
              <div className="relative aspect-[9/10] w-full rounded-[2rem] overflow-hidden p-6 sm:p-8 md:p-10 flex flex-col justify-center gap-7 sm:gap-8">
                {/* Blurred background image */}
                <img
                  src="/hero-poster.jpg"
                  alt="Background preview"
                  className="absolute inset-0 h-full w-full object-cover blur-xl scale-110 opacity-40"
                />
                {/* Light semi-transparent overlay to ensure text contrast */}
                <div className="absolute inset-0 bg-aurum-cream/80 backdrop-blur-md" />

                {/* Content layers above background */}
                <div className="relative z-10 flex flex-col justify-center gap-6">
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="flex items-center gap-6"
                  >
                    <span className="aurum-num text-5xl sm:text-6xl font-light tracking-tighter text-aurum-ink w-16 shrink-0">
                      <AnimatedCounter value={15} />
                    </span>
                    <p className="text-[0.85rem] text-aurum-ink font-medium max-w-[15rem] leading-relaxed">
                      Luxurious properties available in the worlds top locations
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center gap-6"
                  >
                    <span className="aurum-num text-5xl sm:text-6xl font-light tracking-tighter text-aurum-ink w-16 shrink-0">
                      <AnimatedCounter value={63} />
                    </span>
                    <p className="text-[0.85rem] text-aurum-ink font-medium max-w-[15rem] leading-relaxed">
                      New properties currently being constructed
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex items-center gap-6"
                  >
                    <span className="aurum-num text-5xl sm:text-6xl font-light tracking-tighter text-aurum-ink w-16 shrink-0">
                      <AnimatedCounter value={96} />
                    </span>
                    <p className="text-[0.85rem] text-aurum-ink font-medium max-w-[15rem] leading-relaxed">
                      Agents working around the clock to help you realize your dream home
                    </p>
                  </motion.div>

                  <motion.a
                    href="#houses"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-1 self-start rounded-xl bg-aurum-ink px-7 py-3 text-[0.8rem] tracking-wide text-aurum-cream"
                  >
                    About Our Houses
                  </motion.a>
                </div>

                {/* Section-matching center-split curtain reveal overlays on the right card as well */}
                <motion.div
                  initial={{ x: "0%" }}
                  whileInView={{ x: "-100%" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute top-0 bottom-0 left-0 w-1/2 z-20 bg-aurum-cream"
                />
                <motion.div
                  initial={{ x: "0%" }}
                  whileInView={{ x: "100%" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute top-0 bottom-0 right-0 w-1/2 z-20 bg-aurum-cream"
                />
              </div>
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

      {/* Portfolio: our signature addresses as a scroll-driven expanding
          accordion on sm+. Each panel owns its transforms via PortfolioCard;
          on mobile the horizontal accordion doesn't have room to breathe, so
          it falls back to a plain stacked list instead. */}
      <div ref={projectsContainerRef} id="portfolio" className="relative z-10 mt-3 hidden h-[380vh] sm:mt-4 sm:block">
        <div className="sticky top-20 sm:top-24 flex h-[calc(100vh-5rem)] sm:h-[calc(100vh-6rem)] w-full flex-col justify-between overflow-hidden rounded-[28px] bg-aurum-ink p-6 text-aurum-cream sm:rounded-[36px] sm:p-10">
          {/* Header row: section title + live "0X — 0N" position counter */}
          <div className="flex items-end justify-between z-20">
            <div>
              <span className="aurum-eyebrow text-aurum-gold-light">Our Portfolio</span>
              <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.4rem)] font-light text-aurum-cream">
                Four Addresses, One Standard
              </h2>
            </div>
            <span className="font-aurum-heading text-sm font-light tracking-[0.25em] text-aurum-cream/50 uppercase">
              0{activePortfolioIndex + 1} — 0{PORTFOLIO_CARDS.length}
            </span>
          </div>

          {/* Expanding vertical card track — zero gaps, stacked z-indexing */}
          <div className="relative my-4 flex flex-1 gap-0 overflow-hidden rounded-2xl border border-aurum-cream/10 bg-aurum-ink">
            {PORTFOLIO_CARDS.map((card, idx) => (
              <PortfolioCard
                key={card.id}
                card={card}
                index={idx}
                total={PORTFOLIO_CARDS.length}
                progress={projectsScrollProgress}
              />
            ))}
          </div>

          {/* Bottom bar: Prev/Next jump controls */}
          <div className="flex items-center justify-end pt-2 text-xs font-light text-aurum-cream/60 z-20">
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => goToPortfolioCard(-1)}
                disabled={activePortfolioIndex === 0}
                className="transition-colors hover:text-aurum-cream disabled:pointer-events-none disabled:opacity-30"
              >
                Prev
              </button>
              <div className="h-0.5 w-12 bg-aurum-cream/40" />
              <button
                type="button"
                onClick={() => goToPortfolioCard(1)}
                disabled={activePortfolioIndex === PORTFOLIO_CARDS.length - 1}
                className="transition-colors hover:text-aurum-cream disabled:pointer-events-none disabled:opacity-30"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile fallback: same four addresses as a plain stacked list */}
      <div className="relative z-10 mt-3 rounded-[28px] bg-aurum-ink px-6 py-14 text-aurum-cream sm:mt-4 sm:hidden">
        <span className="aurum-eyebrow text-aurum-gold-light">Our Portfolio</span>
        <h2 className="mt-3 text-[clamp(1.5rem,6vw,2rem)] font-light text-aurum-cream">
          Four Addresses, One Standard
        </h2>

        <div className="mt-8 flex flex-col gap-4">
          {PORTFOLIO_CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-2xl border border-aurum-cream/10"
            >
              <div className="relative aspect-[4/3] w-full">
                <img src={card.image} alt={card.title} className="absolute inset-0 h-full w-full object-cover brightness-[0.55]" />
                <div className="absolute inset-0 bg-gradient-to-t from-aurum-ink via-aurum-ink/40 to-aurum-ink/10" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="text-[0.6rem] font-light tracking-[0.25em] text-aurum-gold-light uppercase">
                    {card.tag}
                  </span>
                  <h3 className="mt-1 font-aurum-heading text-xl font-light text-aurum-cream uppercase">{card.title}</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 bg-aurum-ink p-5 sm:grid-cols-3">
                {card.features.map((feature) => {
                  const Icon = FEATURE_ICONS[feature.icon];
                  return (
                    <div key={feature.label} className="flex flex-col gap-2">
                      <Icon className="h-4 w-4 text-aurum-gold-light" />
                      <div>
                        <p className="text-[0.55rem] tracking-wide text-aurum-cream/45 uppercase">{feature.label}</p>
                        <p className="text-[0.68rem] leading-snug font-light text-aurum-cream/85">{feature.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link
                href={`/sample/projects/${card.slug}`}
                className="flex items-center gap-1.5 border-t border-aurum-cream/10 bg-aurum-ink px-5 py-4 text-[0.7rem] font-light tracking-[0.15em] text-aurum-gold-light uppercase transition-colors hover:text-aurum-gold"
              >
                View Project <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

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
      </div>
    </main>
  );
}
