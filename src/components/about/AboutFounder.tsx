"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, slideRight, viewportMirror } from "@/lib/motion";
import { ABOUT_FOUNDER_DEFAULT_CONTENT, type AboutFounderContent } from "@/lib/pageSections";
import { useSectionEdit } from "../pagebuilder/SectionEditBoundary";
import EditableText from "../pagebuilder/EditableText";
import EditableImage from "../pagebuilder/EditableImage";

export default function AboutFounder({ content = ABOUT_FOUNDER_DEFAULT_CONTENT }: { content?: AboutFounderContent }) {
  const ctx = useSectionEdit();
  const live = (ctx?.content as AboutFounderContent | undefined) ?? content;
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="about-founder"
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
          <h2 className="font-heading text-[clamp(1.5rem,2.3vw,2.75rem)] font-light leading-tight tracking-normal text-primary-dark">
            <EditableText as="span" path="headingPlain" fallback={live.headingPlain} />{" "}
            <EditableText as="span" path="headingHighlight" fallback={live.headingHighlight} className="font-bold text-gold-gradient" />
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Portrait */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportMirror}
            className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[28px] shadow-2xl lg:mx-0"
          >
            <motion.div style={{ y: imgY }} className="absolute inset-0 h-[120%] -top-[10%]">
              <EditableImage path="portraitImage" fallback={live.portraitImage} wrapperClassName="relative h-full w-full">
                {(src) => (
                  <Image
                    src={src}
                    alt={`${live.name}, ${live.role} of InfraGuru`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="object-cover"
                  />
                )}
              </EditableImage>
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-dark/50 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <EditableText as="p" path="name" fallback={live.name} className="font-body text-h4 font-medium text-white" />
              <EditableText as="p" path="role" fallback={live.role} className="text-caption font-medium uppercase tracking-widest text-white/70" />
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportMirror}
            className="flex flex-col gap-6"
          >
            <span className="font-heading text-5xl leading-none text-gold-gradient/80 sm:text-6xl">
              &ldquo;
            </span>

            <EditableText
              as="p"
              path="quote"
              fallback={live.quote}
              multiline
              className="-mt-8 text-xl font-light italic leading-relaxed text-primary-dark sm:text-2xl"
            />

            <div className="mt-2 flex flex-col gap-4 text-base font-light leading-relaxed text-neutral-600 sm:text-lg">
              <EditableText as="p" path="bio" fallback={live.bio} multiline />
            </div>

            <motion.div variants={fadeUp} className="mt-4 border-t border-hairline pt-6">
              <EditableText as="p" path="name" fallback={live.name} className="font-heading text-2xl italic text-primary-dark" />
              <p className="mt-1 text-caption font-medium uppercase tracking-widest text-muted">
                <EditableText as="span" path="role" fallback={live.role} />, InfraGuru
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
