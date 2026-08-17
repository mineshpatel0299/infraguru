"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, slideLeft, slideRight, viewportMirror } from "@/lib/motion";
import { ABOUT_TIMELINE_DEFAULT_CONTENT, type AboutTimelineContent } from "@/lib/pageSections";
import { useSectionEdit } from "../pagebuilder/SectionEditBoundary";
import EditableText from "../pagebuilder/EditableText";
import RemoveItemButton from "../pagebuilder/RemoveItemButton";
import AddItemButton from "../pagebuilder/AddItemButton";

export default function AboutTimeline({ content = ABOUT_TIMELINE_DEFAULT_CONTENT }: { content?: AboutTimelineContent }) {
  const ctx = useSectionEdit();
  const live = (ctx?.content as AboutTimelineContent | undefined) ?? content;
  const MILESTONES = live.milestones;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.4"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="about-timeline" className="relative w-full overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportMirror}
          className="mx-auto mb-16 max-w-2xl text-center sm:mb-24"
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
          <h2 className="font-heading text-[clamp(1.5rem,2.3vw,2.75rem)] font-light leading-tight tracking-normal text-primary-dark">
            <EditableText as="span" path="headingPlain" fallback={live.headingPlain} />{" "}
            <EditableText as="span" path="headingHighlight" fallback={live.headingHighlight} className="font-bold text-gold-gradient" />
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Center line track */}
          <div className="absolute left-[15px] top-0 bottom-0 w-px bg-hairline sm:left-1/2 sm:-translate-x-1/2" />
          {/* Animated fill, grows with scroll progress */}
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[15px] top-0 bottom-0 w-px origin-top bg-gold-gradient sm:left-1/2 sm:-translate-x-1/2"
          />

          <div className="flex flex-col gap-14 sm:gap-20">
            {MILESTONES.map((milestone, i) => {
              const isEven = i % 2 === 0;
              const fields = (
                <>
                  <EditableText as="span" path={`milestones[${i}].year`} fallback={milestone.year} className="font-body text-2xl font-semibold text-gold-gradient sm:text-3xl" />
                  <EditableText as="h3" path={`milestones[${i}].title`} fallback={milestone.title} className="mt-1 font-body text-h4 font-medium text-primary-dark block" />
                  <EditableText
                    as="p"
                    path={`milestones[${i}].description`}
                    fallback={milestone.description}
                    multiline
                    className="mt-2 text-body font-light leading-relaxed text-neutral-600"
                  />
                </>
              );
              return (
                <div
                  key={i}
                  className="group relative flex items-start gap-6 pl-10 sm:grid sm:grid-cols-2 sm:gap-12 sm:pl-0"
                >
                  {/* Node */}
                  <span className="absolute left-[9px] top-1.5 z-10 h-3 w-3 rounded-full border-2 border-secondary bg-white sm:left-1/2 sm:-translate-x-1/2" />
                  <RemoveItemButton arrayPath="milestones" index={i} />

                  {isEven ? (
                    <>
                      <motion.div
                        variants={slideRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportMirror}
                        className="sm:pr-14 sm:text-right"
                      >
                        {fields}
                      </motion.div>
                      <div className="hidden sm:block" />
                    </>
                  ) : (
                    <>
                      <div className="hidden sm:block" />
                      <motion.div
                        variants={slideLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportMirror}
                        className="sm:pl-14"
                      >
                        {fields}
                      </motion.div>
                    </>
                  )}
                </div>
              );
            })}
            {ctx && (
              <AddItemButton
                arrayPath="milestones"
                newItem={{ year: "2027", title: "New Milestone", description: "Describe this milestone…" }}
                label="Add milestone"
                className="ml-10 sm:ml-0"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
