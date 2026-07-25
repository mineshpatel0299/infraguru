"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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
import AOS from "aos";
import "aos/dist/aos.css";
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

// How far (in viewport heights) the hero's box-to-full-bleed expansion is
// scrubbed across. The sticky frame itself is always 100svh; this is the
// *extra* scroll distance beyond that before the section releases.
const HERO_SCROLL_VH = 180;

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

const VALUE_PROPS = [
  {
    icon: "shield",
    title: "RERA Verified",
    description: "Every listing is legally vetted and RERA-certified, so you can commit with total confidence.",
  },
  {
    icon: "headphones",
    title: "Dedicated Advisors",
    description: "A personal relationship manager guides you from the first shortlist to the final signature.",
  },
  {
    icon: "route",
    title: "End-to-End Support",
    description: "From site visits to registration, we stay by your side through every step of the journey.",
  },
] as const;

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

function ShieldCheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M12 3.5 5 6v5.5c0 4.6 3 7.9 7 9 4-1.1 7-4.4 7-9V6l-7-2.5Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RouteIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <circle cx="5" cy="6" r="2" />
      <path d="M5 8v3a4 4 0 0 0 4 4h6a4 4 0 0 1 4 4v1" strokeLinecap="round" />
      <circle cx="19" cy="20" r="2" />
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

const VALUE_PROP_ICONS: Record<string, (props: { className?: string }) => React.JSX.Element> = {
  shield: ShieldCheckIcon,
  headphones: HeadsetIcon,
  route: RouteIcon,
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
      className="relative bg-white px-6 py-8 shadow-sm"
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
          className="absolute inset-0 flex items-center justify-center rounded-full bg-[#375972] text-sm font-light text-white"
        >
          {step.num}
        </motion.span>
      </span>
      <h3 className="mt-6 font-aurum-heading font-light text-xl text-aurum-ink">{step.title}</h3>
      <p className="mt-2 text-[0.8rem] leading-relaxed text-aurum-muted">{step.description}</p>
    </motion.div>
  );
}

// One panel of the "portfolio" accordion. Sized with real flex-grow (not an
// absolutely-positioned full-width slide clipped by its neighbours) so every
// card's image renders at its own actual visible width — object-cover then
// shows a properly centred crop of the *whole* photo at any width, instead
// of whatever arbitrary edge-sliver happened to remain uncovered.
//
// Cards that have already had their turn are dropped out of the row
// entirely (see the `.slice(activeIndex)` at the call site) rather than
// shrinking down and staying parked on the left — so whichever card is
// active is always the leftmost, full panel, and `layout` here smoothly
// reflows the remaining siblings into place as one wipes out.
function PortfolioCard({
  card,
  isActive,
}: {
  card: (typeof PORTFOLIO_CARDS)[number];
  isActive: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, flexGrow: 0 }}
      animate={{ opacity: 1, flexGrow: isActive ? 10 : 1 }}
      exit={{ opacity: 0, flexGrow: 0 }}
      transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
      className="relative h-full min-w-0 shrink-0 basis-0 overflow-hidden group"
    >
      <img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Overlay text at bottom left inside card */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 z-10 max-w-lg text-white"
          >
            <span className="text-[0.65rem] font-medium tracking-[0.25em] text-white/80 uppercase">
              {card.tag}
            </span>
            <h3 className="mt-1 font-aurum-heading text-2xl sm:text-4xl lg:text-5xl font-light text-white uppercase tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              {card.title}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-white/85 leading-relaxed font-light drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
              {card.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// The active card's title/tag/description/feature icons, rendered once
// below the sliding track rather than per-card inside it — crossfades to
// the new project's copy as `activeIndex` changes, completely decoupled
// from the image stack's horizontal motion.
function ActivePortfolioInfo({
  card,
  activeIndex,
}: {
  card: (typeof PORTFOLIO_CARDS)[number];
  activeIndex: number;
}) {
  return (
    <div className="relative mt-4 sm:mt-6 border-t border-aurum-ink/10 pt-4 sm:pt-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between"
        >
          <Link
            href={`/sample/projects/${card.slug}`}
            className="inline-flex items-center gap-2 text-xs font-light tracking-[0.2em] text-[#375972] uppercase hover:text-aurum-ink transition-colors"
          >
            Explore Masterplan <span>&#8599;</span>
          </Link>

          <div className="flex flex-wrap gap-5 sm:gap-8 items-center shrink-0">
            {card.features.map((feature) => {
              const Icon = FEATURE_ICONS[feature.icon];
              return (
                <div key={feature.label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-aurum-ink/60" />
                  <div>
                    <p className="text-[0.6rem] tracking-wider text-aurum-ink/50 uppercase">{feature.label}</p>
                    <p className="text-xs font-semibold text-aurum-ink">{feature.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function SamplePage() {
  // AOS drives the simple section-level reveals below — once:false + mirror
  // so each one animates back out on the way past too, replaying every time
  // you land on it, not just the first.
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out-cubic", once: false, mirror: true, offset: 80 });
  }, []);

  // Hero auto-expansion after 1.5 seconds delay
  const [isHeroExpanded, setIsHeroExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeroExpanded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Effective motion value for navbar detection
  const effectiveHeroProgress = useMotionValue(0);

  useEffect(() => {
    if (isHeroExpanded) {
      effectiveHeroProgress.set(1);
    } else {
      effectiveHeroProgress.set(0);
    }
  }, [isHeroExpanded, effectiveHeroProgress]);

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
      <SampleNavbar transparent heroProgress={effectiveHeroProgress} />

      {/* Hero — lands as a small framed video card on white, stays framed for 1.5s, then automatically expands to full-bleed */}
      <div className="relative w-full h-svh min-h-130 overflow-hidden bg-white">
        <div className="relative h-full w-full overflow-hidden">
          <motion.div
            initial={{
              top: "19vh",
              bottom: "19vh",
              left: "21vw",
              right: "21vw",
              scale: 0.85,
              opacity: 0,
            }}
            animate={{
              top: isHeroExpanded ? "0vh" : "19vh",
              bottom: isHeroExpanded ? "0vh" : "19vh",
              left: isHeroExpanded ? "0vw" : "21vw",
              right: isHeroExpanded ? "0vw" : "21vw",
              scale: 1,
              opacity: 1,
            }}
            transition={{
              top: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
              bottom: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
              left: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
              right: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
            }}
            className="absolute overflow-hidden shadow-2xl"
          >
            <motion.video
              autoPlay
              loop
              muted
              playsInline
              initial={{ scale: 1.45 }}
              animate={{ scale: isHeroExpanded ? 1.0 : 1.35 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 h-full w-full object-cover origin-center"
            >
              <source src="/webhero.mp4" type="video/mp4" />
            </motion.video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/20" />
          </motion.div>

          {/* Copy: slides in dynamically as the hero arrives —
              "Exceptional LIVING" slides in from left to right (-x to 0),
              "Begins." slides in from right to left (+x to 0). */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0, color: isHeroExpanded ? "#faf9f7" : "#0e0d09" }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute left-[8%] top-[27%] max-w-[70%] font-aurum-heading text-[clamp(1.9rem,6vw,4.4rem)] leading-[1.05] font-light drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)] sm:max-w-[48%]"
          >
            <span className="block">Exceptional</span>
            <span className="block">LIVING</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0, color: isHeroExpanded ? "#faf9f7" : "#0e0d09" }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute right-[8%] top-[64%] font-aurum-heading text-[clamp(1.9rem,6vw,4.4rem)] leading-[1.05] font-light drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)]"
          >
            Begins.
          </motion.div>
        </div>
      </div>

      {/* Value props statement - centered vertically with ultra-premium text reveal animation */}
      <div className="w-full py-24 min-h-[45vh] flex items-center justify-center">
        <div className="mx-auto max-w-4xl px-6 text-center flex flex-col items-center justify-center">
          <div className="flex flex-col items-center">
            {/* Eyebrow badge */}
            <span
              data-aos="fade-up"
              data-aos-duration="600"
              className="aurum-eyebrow text-[#375972] mb-4 tracking-[0.3em]"
            >
              The Perfection Standard
            </span>

            {/* Shimmering headline */}
            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="900"
              className="text-[clamp(1.4rem,3.2vw,2.4rem)] font-light leading-snug tracking-tight text-aurum-ink"
            >
              Your search for the perfect home{" "}
              <span className="relative inline-block font-normal bg-gradient-to-r from-[#375972] via-aurum-gold to-[#375972] bg-clip-text text-transparent bg-[size:200%_auto] animate-gradient">
                ends here.
              </span>
            </h2>

            {/* Subtle animated divider line */}
            <div
              data-aos="zoom-in"
              data-aos-delay="300"
              data-aos-duration="1200"
              className="mt-6 mb-6 h-0.5 w-16 bg-gradient-to-r from-transparent via-[#375972]/40 to-transparent"
            />

            {/* Paragraph fade & lift */}
            <p
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="800"
              className="max-w-2xl text-[0.95rem] sm:text-[1.05rem] leading-relaxed text-aurum-muted font-light"
            >
              Discover thoughtfully curated properties that match your lifestyle, aspirations, and investment goals.
            </p>
          </div>
        </div>
      </div>

      {/* About: pinned while the page scrolls past, its content scrubbing into
          focus as you move through — a single tilting image instead of a grid
          of photos, wrapped in a continuously orbiting seal. */}
      <div ref={aboutWrapperRef} className="relative py-24 h-[150vh] sm:h-[200vh]">
        <section
          id="about"
          ref={aboutRef}
          className="sticky top-24 w-full px-4 sm:px-8 py-6 sm:py-10 flex flex-col justify-center"
        >
          {/* Giant drifting numeral watermark, clipped to its own layer so it
              never spills past the section's rounded corners */}
         

          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 md:items-stretch md:gap-8">
            {/* Left: image card with white center-split curtain reveal */}
            <div className="flex flex-col h-full min-h-[440px] sm:min-h-[520px]">
              <div className="relative h-full w-full overflow-hidden">
                <motion.img
                  src="/about.jpg"
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

            {/* Right: 3 horizontal cards in 3 rows */}
            <div className="flex flex-col gap-4 justify-between h-full">
              <div
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="600"
                className="relative flex items-center gap-6 bg-[#edf4fa] p-7 sm:p-9 flex-1"
              >
                <span className="aurum-num text-5xl sm:text-6xl font-light tracking-tighter text-aurum-ink w-16 shrink-0">
                  <AnimatedCounter value={15} />
                </span>
                <p className="text-[0.85rem] sm:text-[0.9rem] text-aurum-ink font-medium max-w-[19rem] leading-relaxed">
                  Luxurious properties available in the world's top locations
                </p>
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="600"
                className="relative flex items-center gap-6 bg-[#edf4fa] p-7 sm:p-9 flex-1"
              >
                <span className="aurum-num text-5xl sm:text-6xl font-light tracking-tighter text-aurum-ink w-16 shrink-0">
                  <AnimatedCounter value={63} />
                </span>
                <p className="text-[0.85rem] sm:text-[0.9rem] text-aurum-ink font-medium max-w-[19rem] leading-relaxed">
                  New properties currently being constructed
                </p>
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-duration="600"
                className="relative flex items-center gap-6 bg-[#edf4fa] p-7 sm:p-9 flex-1"
              >
                <span className="aurum-num text-5xl sm:text-6xl font-light tracking-tighter text-aurum-ink w-16 shrink-0">
                  <AnimatedCounter value={96} />
                </span>
                <p className="text-[0.85rem] sm:text-[0.9rem] text-aurum-ink font-medium max-w-[19rem] leading-relaxed">
                  Agents working around the clock to help you realize your dream home
                </p>
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
        className="relative z-10 flex min-h-screen flex-col justify-center overflow-hidden bg-[#375972] px-6 py-24 mt-[-45vh] sm:mt-[-90vh] sm:px-10 lg:px-14"
      >
        <span
          data-aos="fade-up"
          data-aos-duration="600"
          className="text-[0.7rem] font-light tracking-[0.3em] text-aurum-cream/70 uppercase"
        >
          What We Do
        </span>


        <div
          onMouseLeave={() => setActiveItem(null)}
          className="mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-2 sm:mt-14 sm:gap-x-4"
        >
          {PORTFOLIO_ITEMS.map((item, i) => (
            <React.Fragment key={item.id}>
              <span
                onMouseEnter={() => setActiveItem(i)}
                data-aos="fade-up"
                data-aos-delay={i * 60}
                data-aos-duration="700"
                className={`cursor-pointer font-aurum-heading font-light text-2xl uppercase transition-colors duration-500 sm:text-3xl lg:text-4xl ${
                  activeItem === i ? "text-aurum-cream" : "text-aurum-cream/40"
                }`}
              >
                {item.title}
                <sup className="ml-1 text-[0.65rem] tracking-wide sm:text-xs">
                  0{i + 1}
                </sup>
              </span>
              {i < PORTFOLIO_ITEMS.length - 1 && (
                <span className="font-aurum-heading font-light text-2xl text-aurum-cream/20 sm:text-3xl lg:text-4xl">/</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-10 flex justify-end sm:mt-14">
          <a
            href="#contact"
            data-aos="fade-up"
            data-aos-duration="600"
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

      {/* Portfolio: full screen width & height horizontal scroll cards */}
      <div ref={projectsContainerRef} id="portfolio" className="relative z-10 hidden h-[380vh] sm:block my-24">
        <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-white p-6 sm:p-10 text-aurum-ink">
          {/* Header row: section title + live "0X — 0N" position counter */}
          <div
            data-aos="fade-up"
            data-aos-duration="700"
            className="flex items-end justify-between z-20"
          >
            <div>
              <span className="aurum-eyebrow text-aurum-muted">Our Portfolio</span>
              <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.4rem)] font-light text-aurum-ink">
                Four Addresses, One Standard
              </h2>
            </div>
            <span className="font-aurum-heading text-sm font-light tracking-[0.25em] text-aurum-ink/50 uppercase">
              0{activePortfolioIndex + 1} — 0{PORTFOLIO_CARDS.length}
            </span>
          </div>

          {/* Full width card accordion — panels sit flush, no gap/radius, so
              the active one reads as a single continuous surface wiping
              across into the next as scroll hands off between cards. Cards
              before the active index are sliced out of the row rather than
              parked as slivers on the left, so the active card is always
              leftmost; popLayout lets the exiting card wipe out while its
              siblings reflow into its place in the same motion. */}
          <div className="relative my-3 flex flex-1 gap-0 overflow-hidden bg-white">
            <AnimatePresence mode="popLayout" initial={false}>
              {PORTFOLIO_CARDS.slice(activePortfolioIndex).map((card, idx) => (
                <PortfolioCard key={card.id} card={card} isActive={idx === 0} />
              ))}
            </AnimatePresence>
          </div>

          {/* Active card's copy — outside the track, crossfades independently
              of the image stack's slide */}
          <ActivePortfolioInfo card={PORTFOLIO_CARDS[activePortfolioIndex]} activeIndex={activePortfolioIndex} />

          {/* Bottom bar: Prev/Next jump controls */}
          <div className="flex items-center justify-end mt-3 pt-2 sm:mt-4 text-xs font-light text-aurum-ink/60 z-20">
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => goToPortfolioCard(-1)}
                disabled={activePortfolioIndex === 0}
                className="transition-colors hover:text-aurum-ink disabled:pointer-events-none disabled:opacity-30"
              >
                Prev
              </button>
              <div className="h-0.5 w-12 bg-aurum-ink/30" />
              <button
                type="button"
                onClick={() => goToPortfolioCard(1)}
                disabled={activePortfolioIndex === PORTFOLIO_CARDS.length - 1}
                className="transition-colors hover:text-aurum-ink disabled:pointer-events-none disabled:opacity-30"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile fallback: same four addresses as a plain stacked list */}
      <div className="relative z-10 my-24 rounded-[28px] bg-aurum-ink px-6 py-14 text-aurum-cream sm:hidden">
        <span data-aos="fade-up" data-aos-duration="600" className="aurum-eyebrow text-aurum-gold-light">
          Our Portfolio
        </span>
        <h2
          data-aos="fade-up"
          data-aos-delay="80"
          data-aos-duration="700"
          className="mt-3 text-[clamp(1.5rem,6vw,2rem)] font-light text-aurum-cream"
        >
          Four Addresses, One Standard
        </h2>

        <div className="mt-8 flex flex-col gap-4">
          {PORTFOLIO_CARDS.map((card, i) => (
            <div
              key={card.id}
              data-aos="fade-up"
              data-aos-delay={i * 80}
              data-aos-duration="600"
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
            </div>
          ))}
        </div>
      </div>

      {/* Ultra-Premium Interactive Location Map Section */}
      <section className="relative z-10 w-full bg-white border-t border-b border-aurum-ink/10 my-24">

        {/* Full-width Map Container with Premium Overlay Card Controls */}
        <div
          data-aos="zoom-in"
          data-aos-duration="900"
          className="relative w-full h-[450px] sm:h-[550px] overflow-hidden bg-slate-100 shadow-inner"
        >
          <iframe
            title="Infraguru Masterplan Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112282.8872288325!2d77.00845347209355!3d28.42398462002341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fe8e5c64b1e!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "contrast(1.05) saturate(1.1)" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full object-cover"
          />

        </div>
      </section>

      {/* Process: how we work, staggered reveal */}
      <section id="process" className="hidden relative z-10 w-full bg-[#375972] px-6 py-24 sm:px-10 lg:px-14 text-white my-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 flex max-w-lg flex-col gap-3 sm:mb-16 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <span className="aurum-eyebrow text-white/60">How We Work</span>
              <h2 className="mt-4 text-[clamp(1.6rem,3.5vw,2.6rem)] font-light text-white">
                A Process Built On Trust
              </h2>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-white/75">
                From first conversation to final handover, every step is designed to keep you informed and in control.
              </p>
            </div>
          </motion.div>

          {/* Scroll-scrubbed track: fills and its marker glides along as you
              scroll past the steps below, instead of animating once on view. */}
          <div ref={processTrackRef} className="relative">
            <div className="relative mb-12 hidden lg:block">
              <div className="h-px w-full bg-white/20" />
              <motion.div
                style={{ scaleX: processProgress, transformOrigin: "left" }}
                className="absolute inset-0 h-px w-full bg-white"
              />
              <motion.div
                style={{ left: processMarkerLeft }}
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_5px_rgba(255,255,255,0.25)]"
              />
              <motion.span
                style={{ left: processMarkerLeft }}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-[calc(100%+14px)] text-[0.6rem] font-light tracking-widest text-white/80 uppercase"
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
      {/* Contact CTA: full width without rounded borders */}
      <section id="contact" className="w-full my-24">
        <div
          data-aos="fade-up"
          data-aos-duration="800"
          className="relative w-full overflow-hidden bg-white border-t border-b border-aurum-ink/10 px-6 py-24 sm:px-12"
        >
          {/* Ambient glow */}
          <motion.div
            animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute top-1/2 left-1/4 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurum-gold/15 blur-3xl"
          />

          <div className="relative mx-auto max-w-7xl flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            {/* Left: text */}
            <div className="max-w-xl">
              <span className="aurum-eyebrow text-aurum-muted">Get Started</span>

              <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.2rem)] font-light text-aurum-ink leading-tight">
                Ready To Build Your Legacy?
              </h2>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-aurum-muted">
                Connect with our private advisors to schedule an exclusive consultation on your next property.
              </p>
            </div>

            {/* Right: actions */}
            <div className="flex shrink-0 flex-col items-stretch gap-4 sm:flex-row lg:flex-col lg:items-end">
              <a
                href="mailto:info@infraguru.in"
                className="inline-flex items-center justify-center rounded-full bg-aurum-ink px-8 py-3.5 text-[0.75rem] font-medium tracking-wider text-aurum-cream uppercase transition-colors hover:bg-black"
              >
                Book a Consultation
              </a>
              <a
                href="tel:+919090656575"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-aurum-ink/20 px-8 py-3.5 text-[0.75rem] font-medium tracking-wide text-aurum-ink uppercase transition-colors hover:bg-aurum-ink/5"
              >
                +91 90 90 65 65 75
              </a>
            </div>
          </div>
        </div>
      </section>

      <SampleFooter />
    </main>
  );
}
