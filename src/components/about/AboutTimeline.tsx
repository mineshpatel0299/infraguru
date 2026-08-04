"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, slideLeft, slideRight, viewportMirror } from "@/lib/motion";

const MILESTONES = [
  {
    year: "2011",
    title: "InfraGuru Founded",
    description: "Opened our doors in Gurugram with a single mandate: real estate advisory built on trust.",
  },
  {
    year: "2015",
    title: "Commercial Expansion",
    description: "Extended into commercial and infrastructure advisory, serving developers and institutions.",
  },
  {
    year: "2019",
    title: "300+ Transactions",
    description: "Crossed three hundred successful transactions across residential and commercial portfolios.",
  },
  {
    year: "2023",
    title: "Joint-Development Practice",
    description: "Launched a dedicated structuring practice for landowner-developer partnerships.",
  },
  {
    year: "2026",
    title: "500+ Clients, 25+ Awards",
    description: "A decade and a half later — a trusted name behind Gurugram's most discerning acquisitions.",
  },
];

export default function AboutTimeline() {
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
            <span className="font-body text-label font-semibold uppercase tracking-wide text-gold-gradient">
              The Journey
            </span>
            <div className="h-[2px] w-8 bg-gold-gradient" />
          </div>
          <h2 className="font-body text-[clamp(1.5rem,3.2vw,2.75rem)] font-light leading-tight tracking-normal text-primary-dark">
            Fifteen Years, <span className="font-bold text-gold-gradient">One Standard.</span>
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
              return (
                <div
                  key={milestone.year}
                  className="relative flex items-start gap-6 pl-10 sm:grid sm:grid-cols-2 sm:gap-12 sm:pl-0"
                >
                  {/* Node */}
                  <span className="absolute left-[9px] top-1.5 z-10 h-3 w-3 rounded-full border-2 border-secondary bg-white sm:left-1/2 sm:-translate-x-1/2" />

                  {isEven ? (
                    <>
                      <motion.div
                        variants={slideRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportMirror}
                        className="sm:pr-14 sm:text-right"
                      >
                        <span className="font-body text-2xl font-semibold text-gold-gradient sm:text-3xl">
                          {milestone.year}
                        </span>
                        <h3 className="mt-1 font-body text-h4 font-medium text-primary-dark">{milestone.title}</h3>
                        <p className="mt-2 text-body font-light leading-relaxed text-neutral-600">
                          {milestone.description}
                        </p>
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
                        <span className="font-body text-2xl font-semibold text-gold-gradient sm:text-3xl">
                          {milestone.year}
                        </span>
                        <h3 className="mt-1 font-body text-h4 font-medium text-primary-dark">{milestone.title}</h3>
                        <p className="mt-2 text-body font-light leading-relaxed text-neutral-600">
                          {milestone.description}
                        </p>
                      </motion.div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
