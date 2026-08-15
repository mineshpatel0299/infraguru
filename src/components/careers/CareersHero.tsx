"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { CareerApplyModal } from "./CareerApplyModal";

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
        <span key={i} className="mr-[0.28em] inline-block overflow-hidden pt-[0.2em] -mt-[0.2em] pb-[0.1em] -mb-[0.1em]">
          <motion.span className="inline-block" variants={wordVariant}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default function CareersHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section ref={sectionRef} className="relative h-[100svh] w-full overflow-hidden bg-primary-dark">
      <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0 z-0">
        <Image
          src="/heroi.jpg"
          alt="InfraGuru — where careers are built as thoughtfully as our addresses"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/70 to-primary-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
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
            Careers
          </span>
          <div className="h-[2px] w-8 bg-gold-gradient" />
        </motion.div>

        <h1 className="max-w-4xl text-center text-[clamp(2rem,6vw,5rem)] font-heading font-light uppercase leading-[1.2] tracking-tight text-white">
          <SlideUpWordReveal text="Build The Skyline." />
          <SlideUpWordReveal text="Build Your" />
          <SlideUpWordReveal text="Career." className="text-gold-gradient font-semibold mt-2 block" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-body text-white/75 sm:mt-8"
        >
          Join a team that treats every address, and every career, as something worth building
          properly — with craft, integrity, and room to grow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-col items-center gap-4 sm:mt-10 sm:flex-row"
        >
          <a
            href="#careers-openings"
            className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-3.5 text-[12px] font-bold uppercase tracking-widest text-black shadow-[0_12px_30px_rgba(255,255,255,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-100"
          >
            View Open Roles
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </a>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-3 rounded-xl border border-white/30 bg-transparent px-8 py-3.5 text-[12px] font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            Send Your Resume
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex items-center gap-2 text-caption uppercase tracking-[0.25em] text-white/50 sm:mt-10"
        >
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <span className="text-gold-gradient">/</span>
          <span className="text-white/80">Careers</span>
        </motion.div>
      </motion.div>

      <CareerApplyModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
