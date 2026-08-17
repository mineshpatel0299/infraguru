"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { GALLERY_HERO_DEFAULT_CONTENT, type GalleryHeroContent } from "@/lib/pageSections";
import { useSectionEdit } from "../pagebuilder/SectionEditBoundary";
import EditableText from "../pagebuilder/EditableText";

export default function GalleryHero({
  content = GALLERY_HERO_DEFAULT_CONTENT,
}: {
  content?: GalleryHeroContent;
}) {
  const ctx = useSectionEdit();
  const live = (ctx?.content as GalleryHeroContent | undefined) ?? content;

  return (
    <section className="relative w-full overflow-hidden bg-primary-dark pb-16 pt-36 sm:pb-20 sm:pt-44">
      {/* Ambient gold glow, matches the site's cinematic dark sections */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-secondary/10 blur-[140px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-6 flex items-center justify-center gap-3"
        >
          <div className="h-[2px] w-8 bg-gold-gradient" />
          <EditableText
            as="span"
            path="eyebrow"
            fallback={live.eyebrow}
            className="font-body text-label font-semibold uppercase tracking-[0.3em] text-gold-gradient"
          />
          <div className="h-[2px] w-8 bg-gold-gradient" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.08 }}
          className="font-heading text-[clamp(2.5rem,4.2vw,5rem)] font-light uppercase leading-[1.05] tracking-tight text-white"
        >
          <EditableText as="span" path="headline" fallback={live.headline} />
        </motion.h1>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.16 }}
          className="mt-6 max-w-xl"
        >
          <EditableText
            as="p"
            path="description"
            fallback={live.description}
            multiline
            className="text-body text-white/65"
          />
        </motion.div>
      </div>
    </section>
  );
}
