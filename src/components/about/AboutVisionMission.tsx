"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp, slideLeft, slideRight, viewportMirror } from "@/lib/motion";
import { ABOUT_VISION_MISSION_DEFAULT_CONTENT, type AboutVisionMissionContent } from "@/lib/pageSections";
import { useSectionEdit } from "../pagebuilder/SectionEditBoundary";
import EditableText from "../pagebuilder/EditableText";

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="h-7 w-7 sm:h-8 sm:w-8">
      <path d="M2 12s3.6-7.25 10-7.25S22 12 22 12s-3.6 7.25-10 7.25S2 12 2 12Z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3} className="h-7 w-7 sm:h-8 sm:w-8">
      <circle cx="12" cy="12" r="9.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m15.25 8.75-4.25 1.5-1.5 4.25 4.25-1.5 1.5-4.25Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AboutVisionMission({
  content = ABOUT_VISION_MISSION_DEFAULT_CONTENT,
}: {
  content?: AboutVisionMissionContent;
}) {
  const ctx = useSectionEdit();
  const live = (ctx?.content as AboutVisionMissionContent | undefined) ?? content;

  return (
    <section id="about-vision-mission" className="relative w-full overflow-hidden bg-primary-dark py-24 sm:py-32">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[15%] left-[10%] h-[40vw] w-[40vw] rounded-full bg-secondary/5 blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[8%] h-[35vw] w-[35vw] rounded-full bg-white/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
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

        {/* Framed panel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportMirror}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#22395e] via-[#182c47] to-[#0e1c2d] p-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.55)] sm:p-14 lg:p-16"
        >
          {/* Top edge light catch */}
          <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          {/* Corner brackets */}
          <span className="pointer-events-none absolute left-6 top-6 h-8 w-8 border-l border-t border-secondary/30 sm:left-8 sm:top-8" />
          <span className="pointer-events-none absolute bottom-6 right-6 h-8 w-8 border-b border-r border-secondary/30 sm:bottom-8 sm:right-8" />

          <div className="relative grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
            {/* Vision */}
            <motion.div
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportMirror}
              className="group relative"
            >
              <span className="pointer-events-none absolute -top-3 right-0 select-none font-heading text-[5rem] leading-none text-white/[0.04] sm:text-[6rem]">
                I
              </span>

              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-secondary/40 bg-white/5 text-secondary shadow-[0_0_0_1px_rgba(212,175,55,0.08)] backdrop-blur-sm transition-all duration-500 group-hover:border-secondary/70 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] sm:h-[4.5rem] sm:w-[4.5rem]">
                <EyeIcon />
              </div>

              <EditableText
                as="h3"
                path="vision.title"
                fallback={live.vision.title}
                className="relative z-10 mb-5 mt-8 block font-heading text-h2 font-light italic text-gold-gradient"
              />
              <EditableText
                as="p"
                path="vision.description"
                fallback={live.vision.description}
                multiline
                className="relative z-10 block max-w-md text-base font-light leading-relaxed text-white/70 sm:text-lg"
              />
            </motion.div>

            {/* Mission */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportMirror}
              className="group relative"
            >
              <span className="pointer-events-none absolute -top-3 right-0 select-none font-heading text-[5rem] leading-none text-white/[0.04] sm:text-[6rem]">
                II
              </span>

              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-secondary/40 bg-white/5 text-secondary shadow-[0_0_0_1px_rgba(212,175,55,0.08)] backdrop-blur-sm transition-all duration-500 group-hover:border-secondary/70 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] sm:h-[4.5rem] sm:w-[4.5rem]">
                <CompassIcon />
              </div>

              <EditableText
                as="h3"
                path="mission.title"
                fallback={live.mission.title}
                className="relative z-10 mb-5 mt-8 block font-heading text-h2 font-light italic text-gold-gradient"
              />
              <EditableText
                as="p"
                path="mission.description"
                fallback={live.mission.description}
                multiline
                className="relative z-10 block max-w-md text-base font-light leading-relaxed text-white/70 sm:text-lg"
              />
            </motion.div>
          </div>

          {/* Jeweled divider — desktop only */}
          <div className="pointer-events-none absolute inset-y-10 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-secondary/30 to-transparent lg:block" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-secondary/40 bg-[#182c47] lg:flex">
            <span className="h-2.5 w-2.5 rotate-45 bg-gold-gradient" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
