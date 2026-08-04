"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

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

export default function BlogHero() {
  return (
    <section className="relative w-full overflow-hidden bg-primary-dark pb-20 pt-40 sm:pb-28 sm:pt-48">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[15%] left-1/2 h-[50vw] w-[50vw] -translate-x-1/2 rounded-full bg-secondary/5 blur-[150px]" />
      </div>

      {/* Curtain reveal on enter */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-30 border-b-2 border-secondary bg-white"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.85, 0, 0.15, 1] }}
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 flex items-center justify-center gap-3 sm:mb-7"
        >
          <div className="h-[2px] w-8 bg-gold-gradient" />
          <span className="font-body text-label font-semibold uppercase tracking-[0.3em] text-gold-gradient">
            The Journal
          </span>
          <div className="h-[2px] w-8 bg-gold-gradient" />
        </motion.div>

        <h1 className="max-w-3xl text-center text-[clamp(2rem,5.5vw,4.5rem)] font-body font-light uppercase leading-[1.05] tracking-tight text-white">
          <SlideUpWordReveal text="Insight, Curated" />
          <SlideUpWordReveal text="Like Every" className="text-gold-gradient font-semibold" />
          <SlideUpWordReveal text="Address" className="text-gold-gradient font-semibold" />
          <SlideUpWordReveal text="We Sell." />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-body text-white/70 sm:mt-8"
        >
          Market analysis, buying guides, and design perspective from the InfraGuru advisory
          desk — for readers who take real estate as seriously as we do.
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
          <span className="text-white/80">Journal</span>
        </motion.div>
      </div>
    </section>
  );
}
