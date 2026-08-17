"use client";

import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, viewportMirror } from "@/lib/motion";
import { ABOUT_PILLARS_DEFAULT_CONTENT, type AboutPillarsContent } from "@/lib/pageSections";
import { useSectionEdit } from "../pagebuilder/SectionEditBoundary";
import EditableText from "../pagebuilder/EditableText";
import RemoveItemButton from "../pagebuilder/RemoveItemButton";
import AddItemButton from "../pagebuilder/AddItemButton";

export default function AboutPillars({ content = ABOUT_PILLARS_DEFAULT_CONTENT }: { content?: AboutPillarsContent }) {
  const ctx = useSectionEdit();
  const live = (ctx?.content as AboutPillarsContent | undefined) ?? content;
  const PILLARS = live.pillars.map((pillar, i) => ({
    number: String(i + 1).padStart(2, "0"),
    title: pillar.title,
    description: pillar.description,
  }));

  return (
    <section id="about-pillars" className="relative w-full overflow-hidden bg-primary-dark py-24 sm:py-32">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[20%] right-[8%] h-[45vw] w-[45vw] rounded-full bg-secondary/5 blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[5%] h-[35vw] w-[35vw] rounded-full bg-white/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportMirror}
          className="mx-auto mb-16 max-w-2xl text-center sm:mb-20"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-[2px] w-8 bg-gold-gradient" />
            <EditableText
              as="span"
              path="eyebrow"
              fallback={live.eyebrow}
              className="font-body text-label font-semibold uppercase tracking-wide text-gold-gradient"
            />
            <div className="h-[2px] w-8 bg-gold-gradient" />
          </div>
          <h2 className="font-heading text-[clamp(1.5rem,2.3vw,2.75rem)] font-light leading-tight tracking-normal text-white">
            <EditableText as="span" path="headingPlain1" fallback={live.headingPlain1} />{" "}
            <EditableText as="span" path="headingHighlight" fallback={live.headingHighlight} className="font-bold text-gold-gradient" />{" "}
            <EditableText as="span" path="headingPlain2" fallback={live.headingPlain2} />
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportMirror}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#253d67] to-[#12223a] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-amber-200/30 sm:min-h-[320px] sm:p-8"
            >
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/0 to-white/0 transition-all duration-500 group-hover:from-white/5" />
              <RemoveItemButton arrayPath="pillars" index={idx} />

              <div className="relative z-10 flex items-start justify-between">
                <span className="font-body text-4xl font-semibold text-white/10 transition-all duration-500 group-hover:text-gold-gradient sm:text-5xl">
                  {pillar.number}
                </span>
                <span className="h-2 w-2 rounded-full bg-white/20 transition-all duration-500 group-hover:scale-150 group-hover:bg-gold-gradient group-hover:shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
              </div>

              <div className="relative z-10 mt-10">
                <EditableText
                  as="h3"
                  path={`pillars[${idx}].title`}
                  fallback={pillar.title}
                  className="mb-3 font-body text-h4 font-medium uppercase tracking-tight text-white transition-all duration-500 group-hover:text-gold-gradient block"
                />
                <EditableText
                  as="p"
                  path={`pillars[${idx}].description`}
                  fallback={pillar.description}
                  multiline
                  className="text-body font-light leading-relaxed text-white/70"
                />
              </div>
            </motion.div>
          ))}
          {ctx && (
            <AddItemButton
              arrayPath="pillars"
              newItem={{ title: "New Pillar", description: "Describe this pillar…" }}
              className="flex min-h-[280px] items-center justify-center rounded-[28px] border-2 border-dashed border-white/15 text-xs font-bold uppercase tracking-wide text-white/40 transition-colors hover:border-white/30 hover:text-white/70 sm:min-h-[320px]"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
