"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportMirror } from "@/lib/motion";
import { ABOUT_CTA_DEFAULT_CONTENT, type AboutCTAContent } from "@/lib/pageSections";
import { useSectionEdit } from "../pagebuilder/SectionEditBoundary";
import EditableText from "../pagebuilder/EditableText";

export default function AboutCTA({ content = ABOUT_CTA_DEFAULT_CONTENT }: { content?: AboutCTAContent }) {
  const ctx = useSectionEdit();
  const live = (ctx?.content as AboutCTAContent | undefined) ?? content;
  return (
    <section id="about-cta" className="relative w-full overflow-hidden bg-primary-dark py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/5 blur-[160px]" />
      </div>

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportMirror}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 text-center lg:px-8"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <div className="h-[2px] w-8 bg-gold-gradient" />
          <EditableText
            as="span"
            path="eyebrow"
            fallback={live.eyebrow}
            className="font-body text-label font-semibold uppercase tracking-wide text-gold-gradient"
          />
          <div className="h-[2px] w-8 bg-gold-gradient" />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="font-body text-[clamp(1.75rem,3.4vw,3.25rem)] font-light leading-tight tracking-tight text-white sm:whitespace-nowrap"
        >
          <EditableText as="span" path="headingPlain" fallback={live.headingPlain} />{" "}
          <EditableText as="span" path="headingHighlight" fallback={live.headingHighlight} className="font-semibold text-gold-gradient" />
        </motion.h2>

        <motion.div variants={fadeUp} className="max-w-lg">
          <EditableText as="p" path="subcopy" fallback={live.subcopy} multiline className="text-body font-light text-white/70" />
        </motion.div>

        <motion.div variants={fadeUp}>
          <a
            href={content.ctaHref}
            className="inline-flex items-center gap-3 rounded-xl bg-white px-9 py-4 text-sm font-bold uppercase tracking-[0.05em] text-black shadow-[0_12px_30px_rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-100 hover:shadow-[0_16px_36px_rgba(255,255,255,0.18)]"
          >
            <EditableText as="span" path="ctaLabel" fallback={live.ctaLabel} />
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
