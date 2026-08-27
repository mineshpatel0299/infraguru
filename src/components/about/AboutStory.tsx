"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, viewportMirror } from "@/lib/motion";
import { ABOUT_STORY_DEFAULT_CONTENT, type AboutStoryContent } from "@/lib/pageSections";
import { useSectionEdit } from "../pagebuilder/SectionEditBoundary";
import EditableText from "../pagebuilder/EditableText";
import EditableImage from "../pagebuilder/EditableImage";
import RemoveItemButton from "../pagebuilder/RemoveItemButton";
import AddItemButton from "../pagebuilder/AddItemButton";

export default function AboutStory({ content = ABOUT_STORY_DEFAULT_CONTENT }: { content?: AboutStoryContent }) {
  const ctx = useSectionEdit();
  const live = (ctx?.content as AboutStoryContent | undefined) ?? content;
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["22%", "-22%"]);

  return (
    <section
      id="about-story"
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-12">
          {/* Left: Layered image composition */}
          <div className="relative order-2 flex h-[460px] w-full items-center justify-center sm:h-[560px] lg:order-1 lg:h-[640px]">
            <motion.div
              style={{ y: y1 }}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportMirror}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-6 h-[75%] w-[78%] overflow-hidden rounded-2xl shadow-2xl sm:left-0"
            >
              <EditableImage path="image1" fallback={live.image1} wrapperClassName="relative h-full w-full">
                {(src) => (
                  <Image
                    src={src}
                    alt="InfraGuru, a decade of curated real estate"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 80vw, 40vw"
                  />
                )}
              </EditableImage>
              <div className="pointer-events-none absolute inset-0 bg-primary-dark/15 mix-blend-multiply" />
            </motion.div>

            <motion.div
              style={{ y: y2 }}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportMirror}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 right-0 h-[52%] w-[58%] overflow-hidden rounded-2xl border border-primary-dark/10 shadow-[0_30px_60px_rgba(3,46,151,0.18)]"
            >
              <EditableImage path="image2" fallback={live.image2} wrapperClassName="relative h-full w-full">
                {(src) => (
                  <Image
                    src={src}
                    alt="InfraGuru architecture and craft"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 60vw, 30vw"
                  />
                )}
              </EditableImage>
            </motion.div>

            {/* Founding-year badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={viewportMirror}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -top-4 right-2 z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-gold-gradient text-center shadow-[0_16px_40px_rgba(212,175,55,0.4)] sm:-right-4 sm:h-28 sm:w-28"
            >
              <EditableText as="span" path="badgeYear" fallback={live.badgeYear} className="font-body text-xl font-bold text-primary-dark sm:text-2xl" />
              <EditableText
                as="span"
                path="badgeLabel"
                fallback={live.badgeLabel}
                className="font-body text-[9px] font-semibold uppercase tracking-widest text-primary-dark/80"
              />
            </motion.div>
          </div>

          {/* Right: Copy */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportMirror}
            className="order-1 flex flex-col gap-6 lg:order-2"
          >
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-12 bg-gold-gradient" />
              <EditableText
                as="span"
                path="eyebrow"
                fallback={live.eyebrow}
                className="font-body text-label font-semibold uppercase tracking-widest text-gold-gradient"
              />
            </div>

            <h2 className="font-heading text-3xl font-light leading-tight tracking-tight text-primary-dark sm:text-4xl lg:text-5xl">
              <EditableText as="span" path="headingPlain1" fallback={live.headingPlain1} />{" "}
              <EditableText as="span" path="headingHighlight" fallback={live.headingHighlight} className="font-semibold text-gold-gradient" />{" "}
              <EditableText as="span" path="headingPlain2" fallback={live.headingPlain2} />
            </h2>

            <div className="mt-2 flex flex-col gap-4 text-base font-light leading-relaxed text-neutral-600 sm:text-lg">
              {live.paragraphs.map((paragraph, i) => (
                <div key={i} className="group relative">
                  <RemoveItemButton arrayPath="paragraphs" index={i} />
                  <EditableText as="p" path={`paragraphs[${i}]`} fallback={paragraph} multiline />
                </div>
              ))}
              {ctx && <AddItemButton arrayPath="paragraphs" newItem="New paragraph…" label="Add paragraph" />}
            </div>

            <motion.div
              variants={fadeUp}
              className="mt-4 grid grid-cols-2 gap-6 border-t border-hairline pt-8 sm:gap-10"
            >
              {live.stats.map((stat, i) => (
                <div key={i} className="group relative">
                  <RemoveItemButton arrayPath="stats" index={i} />
                  <EditableText as="p" path={`stats[${i}].value`} fallback={stat.value} className="font-body text-2xl font-semibold text-primary-dark sm:text-3xl" />
                  <EditableText as="p" path={`stats[${i}].label`} fallback={stat.label} className="mt-1 text-caption uppercase tracking-wide text-muted" />
                </div>
              ))}
              {ctx && (
                <AddItemButton
                  arrayPath="stats"
                  newItem={{ value: "0+", label: "New Stat" }}
                  className="flex items-center justify-center rounded-lg border border-dashed border-primary/20 py-3 text-[11px] font-bold uppercase tracking-wide text-primary/50 transition-colors hover:border-primary/40 hover:text-primary/80"
                />
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
