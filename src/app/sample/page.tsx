"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const NAV_LINKS = ["About", "Service", "Portfolio", "Careers"];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const SOCIAL_LINKS = ["Facebook", "LinkedIn", "Instagram"];

const PORTFOLIO_ITEMS = [
  { id: "urban-design", title: "Urban Design", image: "/hero-poster.jpg" },
  { id: "interiors", title: "Interiors", image: "/premium-hero-monolith.png" },
  { id: "architecture", title: "Architecture", image: "https://picsum.photos/seed/infraguru-architecture/480/640" },
  { id: "landscape", title: "Landscape", image: "https://picsum.photos/seed/infraguru-landscape/480/640" },
  { id: "retail", title: "Retail", image: "https://picsum.photos/seed/infraguru-retail/480/640" },
  { id: "arts-team", title: "Arts Team", image: "https://picsum.photos/seed/infraguru-arts/480/640" },
  { id: "graphics", title: "Graphics", image: "https://picsum.photos/seed/infraguru-graphics/480/640" },
  { id: "3d-object-rendering", title: "3D Object Rendering", image: "https://picsum.photos/seed/infraguru-3d/480/640" },
];

const PROJECT_SHOWCASE = [
  {
    id: "sky-hal",
    title: "Sky Hal",
    image: "/hero-poster.jpg",
    variant: "stats" as const,
    stats: ["124 850 m²", "1 300 apartments", "900 parking spaces"],
    tags: ["Public Buildings", "Implemented"],
  },
  {
    id: "architecture-note",
    title: "Architecture",
    image: "https://picsum.photos/seed/infraguru-arch-note/480/640",
    variant: "note" as const,
    description:
      "We provide comprehensive management services through the development, design and construction phases of general building projects.",
  },
  {
    id: "business-center",
    title: "Business Center",
    image: "/premium-hero-monolith.png",
    variant: "note" as const,
    description:
      "The building's facades are designed with glass mirror panels that reflect the sky clouds for lightness of the building.",
  },
];

const PROJECT_ROWS = [
  { id: "restaurant", title: "Restaurant", category: "Public Buildings", status: "Implemented", area: "600 m²" },
  { id: "business-center-row", title: "Business center", category: "Public Buildings", status: "Implemented", area: "1 800 m²" },
  { id: "care-ambulatory", title: "Care Ambulatory", category: "Public Buildings", status: "Implemented", area: "600 m²" },
];

const projectContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const projectCardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const projectRowContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const projectRowVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

function ArrowUpRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SamplePage() {
  const aboutRef = useRef<HTMLElement>(null);

  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const [pinWrapperNode, setPinWrapperNode] = useState<HTMLDivElement | null>(null);
  const setPinWrapperRef = (node: HTMLDivElement | null) => {
    pinWrapperRef.current = node;
    setPinWrapperNode(node);
  };
  const pinWrapperTarget = useMemo(() => ({ current: pinWrapperNode }), [pinWrapperNode]);
  const { scrollYProgress: overlapProgress } = useScroll({
    target: pinWrapperTarget,
    offset: ["start start", "end end"],
  });
  const rawOverlayY = useTransform(overlapProgress, [0, 1], ["100%", "0%"]);
  const overlayY = useSpring(rawOverlayY, { stiffness: 60, damping: 22, mass: 0.6 });

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

  // Projects showcase: first card starts expanded; hovering another card
  // expands it instead, shrinking the rest slightly.
  const [activeProjectCard, setActiveProjectCard] = useState(0);

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
    <main className="theme-aurum min-h-screen bg-white p-3 sm:p-4 lg:p-5">
      {/* Navbar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-2 py-4 sm:px-4">
        <img src="/logo.png" alt="Brand Logo" className="h-12 w-auto object-contain" />

        <div className="hidden items-center gap-10 text-[0.8rem] font-medium tracking-wide text-aurum-ink/70 md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="transition-colors hover:text-aurum-gold-dark">
              {link}
            </a>
          ))}
        </div>

        <a href="#contact" className="aurum-btn-gold px-6! py-2.5! text-[0.65rem]!">
          Book a Call
        </a>
      </nav>

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

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-linear-to-t from-aurum-ink via-aurum-ink/10 to-aurum-ink/40" />

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-6 px-6 pb-8 sm:px-10 sm:pb-10 lg:px-14">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="max-w-xs text-[0.8rem] leading-relaxed text-aurum-cream/60"
          >
            Turner is a North America based multi-brand construction company and real estate agency operating in Korea market segments.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl text-[clamp(1.8rem,4.5vw,3.4rem)] font-normal text-aurum-cream"
          >
            The best way to predict
            <br />
            the future is to invent it
          </motion.h1>
        </div>
      </div>

      {/* Stat strip */}
      <div className="mx-auto mt-3 grid max-w-7xl grid-cols-1 gap-3 sm:mt-4 sm:grid-cols-3">
        <motion.div
          custom={0}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="relative overflow-hidden rounded-2xl bg-aurum-paper px-8 py-10"
        >
          <span className="aurum-eyebrow absolute top-6 right-6 rounded-full border border-aurum-hairline px-3 py-1 text-[0.6rem] text-aurum-muted">
            +12%
          </span>
          <div className="aurum-num text-5xl text-aurum-ink sm:text-6xl">10 K</div>
          <p className="mt-2 text-[0.75rem] tracking-wide text-aurum-muted uppercase">Happy homeowners &amp; investors</p>
        </motion.div>

        <motion.div
          custom={1}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="rounded-2xl bg-aurum-paper px-8 py-10"
        >
          <div className="aurum-num text-5xl text-aurum-ink sm:text-6xl">$12 Bn</div>
          <p className="mt-2 text-[0.75rem] tracking-wide text-aurum-muted uppercase">Assets developed to date</p>
        </motion.div>

        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="rounded-2xl bg-linear-to-br from-aurum-ink via-aurum-ink-soft to-aurum-ink px-8 py-10"
        >
          <div className="aurum-num text-5xl text-aurum-gold sm:text-6xl">18+</div>
          <p className="mt-2 text-[0.75rem] tracking-wide text-aurum-cream/50 uppercase">Years building legacies</p>
        </motion.div>
      </div>

      {/* About: pinned while its internal image swaps, then releases into whatever follows */}
      <div ref={setPinWrapperRef} className="relative mt-3 h-[220vh] sm:mt-4">
        <section
          ref={aboutRef}
          className="sticky top-0 mx-auto max-w-7xl scroll-smooth rounded-[28px] bg-aurum-cream px-6 py-12 sm:rounded-[36px] sm:px-10 sm:py-16 lg:px-14"
        >
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
            {/* Left: intro copy + image overlap (only this image changes) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="max-w-xs text-[0.85rem] leading-relaxed text-aurum-muted">
                We provide comprehensive management services through the development, design and construction phases of general building projects.
              </p>

              <div className="relative mt-6 h-105 overflow-hidden rounded-2xl sm:h-120">
                {/* Base image */}
                <img
                  src="/premium-hero-monolith.png"
                  alt="Lounge interior with skyline view"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Overlay image: slides up from below to fully cover the base image */}
                <motion.div
                  style={{ y: overlayY }}
                  className="absolute inset-0 overflow-hidden will-change-transform"
                >
                  <img
                    src="https://picsum.photos/seed/infraguru-about/640/420"
                    alt="Featured project detail"
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Right: image pair + about copy + vision statement — stays put */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
                  <img
                    src="/hero-poster.jpg"
                    alt="Architectural facade detail"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-aurum-ink/70 via-transparent to-transparent" />
                  <button className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-aurum-cream/90 py-1.5 pr-4 pl-1.5 text-[0.65rem] font-semibold tracking-wide text-aurum-ink backdrop-blur-sm">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-aurum-ink text-aurum-cream">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3 translate-x-px">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    Learn More About
                  </button>
                </div>

                <div className="aspect-4/5 overflow-hidden rounded-2xl">
                  <img
                    src="/hero-poster.jpg"
                    alt="Architectural facade wide view"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: "70% 30%" }}
                  />
                </div>
              </div>

              <div className="mt-10">
                <span className="aurum-eyebrow">About</span>

                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <p className="text-[0.85rem] leading-relaxed text-aurum-muted">
                    The company has earned recognition for undertaking large, complex projects, fostering innovation, embracing emerging technologies, and making a difference for their clients, employees and community.
                  </p>
                  <p className="text-[0.85rem] leading-relaxed text-aurum-muted">
                    Turner offers clients the accessibility and support of a local firm with the stability and resources of a multi-national organization.
                  </p>
                </div>

                <h2 className="mt-8 max-w-xl text-[clamp(1.5rem,3vw,2.3rem)] font-normal text-aurum-ink">
                  Our vision is to be the highest value provider of global construction services and technical expertise.
                </h2>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Portfolio: horizontal hover-preview list, sliding up to overlap the still-pinned About section */}
      <motion.section
        ref={setPreviewRef}
        onMouseMove={handlePreviewMouseMove}
        style={{ borderTopLeftRadius: topRadiusPx, borderTopRightRadius: topRadiusPx }}
        className="relative z-10 flex min-h-screen flex-col justify-center overflow-hidden rounded-b-[36px] bg-aurum-ink px-6 py-10 mt-[-70vh] sm:mt-[-90vh] sm:px-10 sm:py-14 lg:px-14"
      >
        <span className="text-[0.7rem] font-semibold tracking-[0.3em] text-aurum-cream/70 uppercase">
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
                className={`cursor-pointer font-heading text-2xl uppercase transition-colors duration-500 sm:text-3xl lg:text-4xl ${
                  activeItem === i ? "text-aurum-cream" : "text-aurum-cream/40"
                }`}
              >
                {item.title}
                <sup className="ml-1 text-[0.65rem] font-sans tracking-wide sm:text-xs">
                  0{i + 1}
                </sup>
              </motion.span>
              {i < PORTFOLIO_ITEMS.length - 1 && (
                <span className="font-heading text-2xl text-aurum-cream/20 sm:text-3xl lg:text-4xl">/</span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-10 flex justify-end sm:mt-14">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.15em] text-aurum-gold-light uppercase transition-colors hover:text-aurum-gold"
          >
            Book a Discovery Call <span>&#8599;</span>
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

      {/* Projects: showcase cards + project list, staggered reveal on scroll */}
      <section className="relative z-10 mt-3 rounded-[28px] bg-aurum-cream px-6 py-16 sm:mt-4 sm:rounded-[36px] sm:px-10 sm:py-24 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={projectContainerVariants}
            onMouseLeave={() => setActiveProjectCard(0)}
            className="flex flex-col gap-3 sm:flex-row"
          >
            {PROJECT_SHOWCASE.map((card, i) => (
              <motion.div
                key={card.id}
                variants={projectCardVariants}
                onMouseEnter={() => setActiveProjectCard(i)}
                animate={{ flexGrow: activeProjectCard === i ? 1.6 : 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative h-105 shrink-0 basis-0 overflow-hidden rounded-2xl sm:h-120"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-aurum-ink/90 via-aurum-ink/25 to-aurum-ink/10" />

                {card.variant === "note" && (
                  <a
                    href="#"
                    className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-aurum-cream/90 text-aurum-ink transition-transform duration-300 group-hover:scale-110"
                  >
                    <ArrowUpRightIcon />
                  </a>
                )}

                <div className="absolute inset-x-0 bottom-0 p-6">
                  {card.variant === "stats" ? (
                    <>
                      <h3 className="font-heading text-2xl text-aurum-cream">{card.title}</h3>
                      <div className="mt-4 space-y-2.5">
                        {card.stats.map((s) => (
                          <div key={s} className="text-[0.95rem] text-aurum-cream/80">
                            {s}
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {card.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-aurum-cream/25 px-3 py-1 text-[0.6rem] tracking-wide text-aurum-cream/70 uppercase"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="font-heading text-2xl text-aurum-cream">{card.title}</h3>
                      <p className="mt-3 max-w-55 text-[0.8rem] leading-relaxed text-aurum-cream/60">
                        {card.description}
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={projectRowContainerVariants}
            className="mt-3 divide-y divide-aurum-hairline overflow-hidden rounded-2xl bg-aurum-ink/2 sm:mt-4"
          >
            {PROJECT_ROWS.map((row) => (
              <motion.a
                key={row.id}
                href="#"
                variants={projectRowVariants}
                className="group flex flex-col gap-2 px-6 py-5 transition-colors duration-300 hover:bg-aurum-ink/5 sm:flex-row sm:items-center sm:justify-between sm:px-8"
              >
                <span className="font-heading text-lg text-aurum-ink sm:w-48">{row.title}</span>
                <span className="text-[0.7rem] tracking-wide text-aurum-muted uppercase sm:w-52">
                  Category: {row.category}
                </span>
                <span className="text-[0.7rem] tracking-wide text-aurum-muted uppercase sm:w-48">
                  Status: {row.status}
                </span>
                <span className="text-[0.7rem] tracking-wide text-aurum-muted uppercase sm:w-52">
                  Building area {row.area}
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-aurum-hairline text-aurum-muted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mt-3 sm:mt-4">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 lg:grid-cols-2">
          {/* Left: form card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col justify-between overflow-hidden rounded-[28px] bg-aurum-ink px-8 py-12 sm:rounded-[36px] sm:px-12 sm:py-16"
          >
            <div>
              <h2 className="font-heading text-4xl leading-tight text-aurum-cream sm:text-5xl">
                Let's work <br /><em className="text-aurum-gold-light">together.</em>
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-aurum-cream/60">
                Tell us about your project, and we will get back to you with a tailored solution.
              </p>
            </div>

            <form className="mt-12 flex flex-col gap-8 sm:mt-16" onSubmit={(e) => e.preventDefault()}>
              <label className="block">
                <span className="text-[0.7rem] font-medium tracking-widest text-aurum-cream/50 uppercase">Email</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full border-b border-aurum-cream/20 bg-transparent py-2.5 text-base text-aurum-cream placeholder:text-aurum-cream/20 focus:border-aurum-gold focus:outline-none focus:ring-0"
                />
              </label>

              <label className="block">
                <span className="text-[0.7rem] font-medium tracking-widest text-aurum-cream/50 uppercase">
                  Project Details
                </span>
                <input
                  type="text"
                  placeholder="Briefly describe your requirements"
                  className="mt-2 w-full border-b border-aurum-cream/20 bg-transparent py-2.5 text-base text-aurum-cream placeholder:text-aurum-cream/20 focus:border-aurum-gold focus:outline-none focus:ring-0"
                />
              </label>

              <button type="submit" className="aurum-btn-gold mt-4 w-fit px-8 py-3.5 text-[0.75rem]">
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Right: get in touch card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between rounded-[28px] bg-aurum-paper px-8 py-12 sm:rounded-[36px] sm:px-12 sm:py-16"
          >
            <div>
              <h2 className="font-heading text-4xl text-aurum-ink sm:text-5xl">Contact Us</h2>
              
              <div className="mt-12 flex flex-col gap-8">
                <div>
                  <span className="text-[0.7rem] font-medium tracking-widest text-aurum-muted uppercase">Email</span>
                  <a
                    href="mailto:building@gmail.com"
                    className="mt-2 block font-heading text-2xl text-aurum-ink transition-colors hover:text-aurum-gold sm:text-3xl"
                  >
                    building@gmail.com
                  </a>
                </div>
                
                <div>
                  <span className="text-[0.7rem] font-medium tracking-widest text-aurum-muted uppercase">Phone</span>
                  <a
                    href="tel:+12075550139"
                    className="mt-2 block font-heading text-2xl text-aurum-ink transition-colors hover:text-aurum-gold sm:text-3xl"
                  >
                    (207) 555-0139
                  </a>
                </div>

                <div>
                  <span className="text-[0.7rem] font-medium tracking-widest text-aurum-muted uppercase">Office</span>
                  <address className="mt-2 block font-sans text-base not-italic leading-relaxed text-aurum-ink/70">
                    123 Architect Way<br />
                    Suite 450<br />
                    New York, NY 10001
                  </address>
                </div>
              </div>
            </div>

            <div className="mt-16 flex items-center gap-6 border-t border-aurum-hairline pt-8 sm:mt-24">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-[0.7rem] font-medium tracking-widest text-aurum-muted uppercase transition-colors hover:text-aurum-ink"
                >
                  {s}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-3 rounded-t-[28px] bg-aurum-ink px-6 pt-14 pb-8 sm:mt-4 sm:rounded-t-[36px] sm:px-10 sm:pt-20 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <div className="col-span-2 sm:col-span-1">
              <img
                src="/logo.png"
                alt="Brand Logo"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
              <p className="mt-4 max-w-50 text-[0.8rem] leading-relaxed text-aurum-cream/50">
                A tradition of trust in real estate and construction, building legacies since 2011.
              </p>
            </div>

            <div>
              <span className="text-[0.65rem] tracking-[0.25em] text-aurum-cream/40 uppercase">Explore</span>
              <ul className="mt-4 space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-sm text-aurum-cream/70 transition-colors hover:text-aurum-gold-light"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-[0.65rem] tracking-[0.25em] text-aurum-cream/40 uppercase">Contact</span>
              <ul className="mt-4 space-y-3 text-sm text-aurum-cream/70">
                <li>building@gmail.com</li>
                <li>(207) 555-0139</li>
                <li>Gurgaon, Haryana</li>
              </ul>
            </div>

            <div>
              <span className="text-[0.65rem] tracking-[0.25em] text-aurum-cream/40 uppercase">Follow</span>
              <ul className="mt-4 space-y-3">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s}>
                    <a href="#" className="text-sm text-aurum-cream/70 transition-colors hover:text-aurum-gold-light">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-4 border-t border-aurum-cream/10 pt-6 text-[0.7rem] text-aurum-cream/40 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Infraguru. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-aurum-cream/70">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-aurum-cream/70">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
