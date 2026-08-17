"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.045, delayChildren: 0.45 },
  },
};

const wordVariant: Variants = {
  hidden: { y: "115%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

function SlideUpWordReveal({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      {text.split(" ").map((word, i) => (
        <span key={i} className="mr-[0.22em] inline-block overflow-hidden pt-[0.2em] -mt-[0.2em] pb-[0.1em] -mb-[0.1em]">
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
    <section className="relative w-full h-screen overflow-hidden">
      {/* Full-bleed background image */}
      <Image
        src="/blog-hero.jpg"
        alt="Luxury highrise architecture"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Multi-layer overlay for deep, cinematic look */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#060d18]/95 via-[#060d18]/70 to-[#060d18]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060d18]/80 via-transparent to-[#060d18]/30" />

      {/* Curtain reveal on enter */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-30 border-b-2 border-secondary bg-white"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.85, 0, 0.15, 1] }}
      />

      {/* Content — left-aligned, vertically centered */}
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-20 xl:px-28">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 flex items-center gap-3"
          >
            <div className="h-[2px] w-10 bg-gold-gradient" />
            <span className="font-body text-label font-semibold uppercase tracking-[0.3em] text-gold-gradient">
              The Journal
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-[clamp(1.8rem,3.5vw,3.5rem)] font-heading font-light uppercase leading-[1.15] tracking-tight text-white">
            <SlideUpWordReveal text="Perspectives On" />
            <SlideUpWordReveal text="Property." className="text-gold-gradient font-semibold" />
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-md text-base text-white/60 leading-relaxed font-body"
          >
            Market analysis, buying guides, and design perspective from the InfraGuru
            advisory desk — for readers who take real estate as seriously as we do.
          </motion.p>
        </div>
      </div>

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
    </section>
  );
}
