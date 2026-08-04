"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";

const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.045, delayChildren: 0.15 },
  },
};

const wordVariant: Variants = {
  hidden: { y: "115%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

function SlideUpWordReveal({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.span
      className={`inline-flex flex-wrap justify-center ${className}`}
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      {text.split(" ").map((word, i) => (
        <span key={i} className="mr-[0.28em] inline-block overflow-hidden pb-[0.1em] -mb-[0.1em]">
          <motion.span className="inline-block" variants={wordVariant}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default function AboutHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // On-exit: image drifts + scales up and dims as the section leaves the viewport.
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section ref={sectionRef} className="relative h-[100svh] w-full overflow-hidden bg-primary-dark">
      <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0 z-0">
        <Image
          src="/about.jpg"
          alt="InfraGuru — the story behind the address"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/55 to-primary-dark/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
      </motion.div>

      {/* Film grain, matches homepage cinematic hero */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Curtain reveal on enter */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-30 border-t-2 border-secondary bg-white"
        initial={{ y: 0 }}
        animate={{ y: "100%" }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.85, 0, 0.15, 1] }}
      />

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex h-full w-full flex-col items-center justify-center px-5 text-center sm:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 flex items-center justify-center gap-3 sm:mb-7"
        >
          <div className="h-[2px] w-8 bg-gold-gradient" />
          <span className="font-body text-label font-semibold uppercase tracking-[0.3em] text-gold-gradient">
            Our Story
          </span>
          <div className="h-[2px] w-8 bg-gold-gradient" />
        </motion.div>

        <h1 className="max-w-4xl text-center text-[clamp(2rem,6vw,5rem)] font-body font-light uppercase leading-[1.05] tracking-tight text-white">
          <SlideUpWordReveal text="Engineering" />
          <SlideUpWordReveal text="Legacies," className="text-gold-gradient font-semibold" />
          <SlideUpWordReveal text="Not Just" />
          <SlideUpWordReveal text="Listings." />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-body text-white/75 sm:mt-8"
        >
          Since 2011, InfraGuru has stood at the intersection of trust and craftsmanship —
          curating real estate that is bought once and cherished for generations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex items-center gap-2 text-caption uppercase tracking-[0.25em] text-white/50 sm:mt-10"
        >
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <span className="text-gold-gradient">/</span>
          <span className="text-white/80">About</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
