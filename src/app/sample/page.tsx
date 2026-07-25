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

// Width (as a % of a card's own width) that each not-yet-opened card peeks
// out from behind the one ahead of it, so the resting state reads as a
// fanned stack of cards rather than a single panel with the rest invisible.
const STACK_PEEK_PERCENT = 15;

// Shared spring for every scroll-driven motion value in a PortfolioCard (its
// x position, and the arrival values that drive text opacity) — using one
// config everywhere keeps them moving in lockstep instead of drifting apart.
const PORTFOLIO_SPRING = { stiffness: 280, damping: 32, mass: 0.4 };

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
  const step = 1 / Math.max(1, total - 1);
  const cardStart = Math.max(0, (index - 1) * step);
  const cardEnd = Math.min(1, index * step);

  // Resting position (before this card's turn): a fanned stack peek rather
  // than fully off-canvas, so cards ahead in the queue stay visible as
  // receding slivers instead of disappearing until it's their turn.
  const stackedX = `${Math.max(0, 100 - (total - index) * STACK_PEEK_PERCENT)}%`;

  const rawX = useTransform(
    progress,
    [cardStart, cardEnd],
    [index === 0 ? "0%" : stackedX, "0%"]
  );

  const x = useSpring(rawX, PORTFOLIO_SPRING);

  // Text (title + detail row) only ever reads cleanly while this card sits
  // fully open and uncovered — anywhere else, the next card's edge slices
  // straight through it mid-word. So rather than always rendering it (and
  // letting the covering card clip it), fade it in as this card finishes
  // arriving and fade it back out as the next card starts sliding over it.
  // Both fades are driven off the *same spring* as `x` itself (not raw
  // scroll progress) — otherwise opacity reacts instantly to scroll while
  // the card's position lags behind it, and the two visibly fall out of
  // sync mid-scroll (text arriving/leaving before the card visually does).
  const isFirst = index === 0;
  const isLast = index === total - 1;

  // 0→1 as THIS card arrives; constant 1 for the first card, which is open
  // from rest and never animates in.
  const rawArrival = isFirst
    ? useTransform(progress, [0, 1], [1, 1])
    : useTransform(progress, [cardStart, cardEnd], [0, 1]);
  const arrival = useSpring(rawArrival, PORTFOLIO_SPRING);

  // 0→1 as the NEXT card arrives — used only to fade this card's text out
  // once the following card visibly starts covering it. Unused (but still
  // computed, to keep hook order stable) when this is the last card.
  const nextCardEnd = isLast ? cardEnd + 0.0001 : Math.min(1, cardEnd + step);
  const rawNextArrival = useTransform(progress, [cardEnd, nextCardEnd], [0, 1]);
  const nextArrival = useSpring(rawNextArrival, PORTFOLIO_SPRING);

  const textOpacityIn = useTransform(arrival, [0.55, 1], [0, 1]);
  const textOpacityOut = useTransform(nextArrival, [0.15, 0.55], [1, 0]);
  const textOpacity = useTransform(
    [textOpacityIn, textOpacityOut],
    ([inVal, outVal]) => (isLast ? (inVal as number) : Math.min(inVal as number, outVal as number))
  );

  return (
    <motion.div
      style={{
        x: index === 0 ? "0%" : x,
        zIndex: index + 1,
        boxShadow: "-12px 0 30px rgba(0, 0, 0, 0.12)",
      }}
      className="absolute inset-y-0 left-0 w-full overflow-hidden bg-white p-4 sm:p-6 flex flex-col justify-between"
    >
      {/* The Main Card with Image & Project Name */}
      <div className="relative w-full flex-1 rounded-2xl overflow-hidden min-h-[320px] sm:min-h-[420px] shadow-md group">
        <img
          src={card.image}
          alt={card.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Project Name inside card — only readable once this card has fully
            arrived and is no longer being sliced by the next card's edge */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 z-10 flex items-end justify-between"
        >
          <div>
            <span className="aurum-eyebrow text-aurum-cream/80">{card.tag}</span>
            <h3 className="mt-1 text-2xl sm:text-4xl md:text-5xl font-light text-white uppercase tracking-tight">
              {card.title}
            </h3>
          </div>
          <span className="aurum-num text-3xl sm:text-5xl font-light text-white/60">
            0{index + 1}
          </span>
        </motion.div>
      </div>

      {/* Details shown outside the card below it — same fade as the title */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="mt-4 sm:mt-6 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-aurum-ink/10 pt-4 sm:pt-5"
      >
        <p className="max-w-xl text-xs sm:text-sm text-aurum-ink/75 leading-relaxed font-medium">
          {card.description}
        </p>

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
    </motion.div>
  );
}

export default function SamplePage() {
  // Hero: pinned while the page scrolls past, scrubbing the framed image open
  // to full-bleed. Text stays put (same fixed position throughout) — only
  // the box around it grows, and the copy shifts from ink to cream as the
  // image spreads underneath it.
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroWrapperRef,
    offset: ["start start", "end end"],
  });
  const heroInsetY = useTransform(heroProgress, [0, 1], ["19vh", "0vh"]);
  const heroInsetX = useTransform(heroProgress, [0, 1], ["21vw", "0vw"]);
  // Switches late on purpose: the text sits at a fixed position while the
  // box grows underneath it, so flipping to cream has to wait until the
  // box's edge has actually swept past the text — otherwise there's a
  // window where cream text is still sitting over the plain white page,
  // and reads as invisible. 0.58 is where insetX (21vw shrinking to 0)
  // drops below the text's 8% inset, i.e. where the image edge reaches it.
  const heroTextColor = useTransform(heroProgress, [0.58, 0.68], ["#0e0d09", "#faf9f7"]);

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
      <SampleNavbar transparent heroProgress={heroProgress} />

      {/* Hero — lands as a small framed image on white, text overlapping its
          edges. Scrolling scrubs the frame open to full-bleed; the copy
          never moves, it just shifts from ink to cream as the image spreads
          underneath it. */}
      <div ref={heroWrapperRef} className="relative w-full" style={{ height: `calc(${HERO_SCROLL_VH}vh + 100svh)` }}>
        <div className="sticky top-0 h-svh min-h-130 w-full overflow-hidden bg-white">
          <motion.div
            style={{
              top: heroInsetY,
              bottom: heroInsetY,
              left: heroInsetX,
              right: heroInsetX,
            }}
            className="absolute overflow-hidden"
          >
            <img src="/fhero.png" alt="Exceptional living begins" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/10 to-black/20" />
          </motion.div>

          {/* Copy: fixed within the sticky frame, unaffected by the box's own
              growth — only its color is scroll-driven. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: heroTextColor }}
            className="pointer-events-none absolute left-[8%] top-[27%] max-w-[70%] font-aurum-heading text-[clamp(1.9rem,6vw,4.4rem)] leading-[1.05] font-light drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)] sm:max-w-[48%]"
          >
            <span className="block">Exceptional</span>
            <span className="block">LIVING</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: heroTextColor }}
            className="pointer-events-none absolute right-[8%] top-[64%] font-aurum-heading text-[clamp(1.9rem,6vw,4.4rem)] leading-[1.05] font-light drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)]"
          >
            Begins.
          </motion.div>
        </div>
      </div>

      {/* Value props: what searching with Infraguru actually gets you */}
      <div className="mx-auto max-w-7xl pt-24 sm:pt-32 pb-16 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-[clamp(1.25rem,2.8vw,2.1rem)] font-semibold whitespace-normal text-aurum-ink sm:whitespace-nowrap">
            Your search for the perfect home ends here.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[0.95rem] leading-relaxed text-aurum-muted">
            Discover thoughtfully curated properties that match your lifestyle, aspirations, and investment goals.
          </p>
        </motion.div>
      </div>

      {/* About: pinned while the page scrolls past, its content scrubbing into
          focus as you move through — a single tilting image instead of a grid
          of photos, wrapped in a continuously orbiting seal. */}
      <div ref={aboutWrapperRef} className="relative mt-12 h-[150vh] sm:mt-16 sm:h-[200vh]">
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

            {/* Right: 3 horizontal cards in 3 rows */}
            <div className="flex flex-col gap-4 justify-between h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative flex items-center gap-6 bg-[#edf4fa] p-7 sm:p-9 flex-1"
              >
                <span className="aurum-num text-5xl sm:text-6xl font-light tracking-tighter text-aurum-ink w-16 shrink-0">
                  <AnimatedCounter value={15} />
                </span>
                <p className="text-[0.85rem] sm:text-[0.9rem] text-aurum-ink font-medium max-w-[19rem] leading-relaxed">
                  Luxurious properties available in the world's top locations
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative flex items-center gap-6 bg-[#edf4fa] p-7 sm:p-9 flex-1"
              >
                <span className="aurum-num text-5xl sm:text-6xl font-light tracking-tighter text-aurum-ink w-16 shrink-0">
                  <AnimatedCounter value={63} />
                </span>
                <p className="text-[0.85rem] sm:text-[0.9rem] text-aurum-ink font-medium max-w-[19rem] leading-relaxed">
                  New properties currently being constructed
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative flex items-center gap-6 bg-[#edf4fa] p-7 sm:p-9 flex-1"
              >
                <span className="aurum-num text-5xl sm:text-6xl font-light tracking-tighter text-aurum-ink w-16 shrink-0">
                  <AnimatedCounter value={96} />
                </span>
                <p className="text-[0.85rem] sm:text-[0.9rem] text-aurum-ink font-medium max-w-[19rem] leading-relaxed">
                  Agents working around the clock to help you realize your dream home
                </p>
              </motion.div>
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
        className="relative z-10 flex min-h-screen flex-col justify-center overflow-hidden bg-[#375972] px-6 py-10 mt-[-45vh] sm:mt-[-90vh] sm:px-10 sm:py-14 lg:px-14"
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

      {/* Portfolio: full screen width & height horizontal scroll cards */}
      <div ref={projectsContainerRef} id="portfolio" className="relative z-10 hidden h-[380vh] sm:block">
        <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-white p-6 sm:p-10 text-aurum-ink">
          {/* Header row: section title + live "0X — 0N" position counter */}
          <div className="flex items-end justify-between z-20">
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

          {/* Full width stacked card track */}
          <div className="relative my-3 flex flex-1 gap-0 overflow-hidden bg-white">
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
          <div className="flex items-center justify-end pt-1 text-xs font-light text-aurum-ink/60 z-20">
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

      {/* Ultra-Premium Interactive Location Map Section */}
      <section className="relative z-10 w-full bg-white border-t border-b border-aurum-ink/10">

        {/* Full-width Map Container with Premium Overlay Card Controls */}
        <div className="relative w-full h-[450px] sm:h-[550px] overflow-hidden bg-slate-100 shadow-inner">
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
      <section id="process" className="relative z-10 w-full bg-[#375972] px-6 py-16 sm:px-10 sm:py-24 lg:px-14 text-white">
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
      <section id="contact" className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full overflow-hidden bg-white border-t border-b border-aurum-ink/10 px-6 py-14 sm:px-12 sm:py-20"
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
        </motion.div>
      </section>

      <SampleFooter />
    </main>
  );
}
