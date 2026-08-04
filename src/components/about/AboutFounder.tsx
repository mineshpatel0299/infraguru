"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, slideRight, viewportMirror } from "@/lib/motion";

export default function AboutFounder() {
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
            <span className="font-body text-label font-semibold uppercase tracking-wide text-gold-gradient">
              Meet The Founder
            </span>
            <div className="h-[2px] w-8 bg-gold-gradient" />
          </div>
          <h2 className="font-heading text-[clamp(1.5rem,3.2vw,2.75rem)] font-light leading-tight tracking-normal text-primary-dark">
            The Vision <span className="font-bold text-gold-gradient">Behind InfraGuru</span>
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
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop&q=80"
                alt="Baljeet Singh, Founder & CEO of InfraGuru"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="font-body text-h4 font-medium text-white">Baljeet Singh</p>
              <p className="text-caption font-medium uppercase tracking-widest text-white/70">
                Founder &amp; CEO
              </p>
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

            <p className="-mt-8 text-xl font-light italic leading-relaxed text-primary-dark sm:text-2xl">
              I started InfraGuru on a belief that&apos;s stayed with me since day one — real estate isn&apos;t
              about square footage, it&apos;s about the life that happens inside it. Every client walks away
              with more than a property; they walk away with a decision they&apos;ll never second-guess.
            </p>

            <div className="mt-2 flex flex-col gap-4 text-base font-light leading-relaxed text-neutral-600 sm:text-lg">
              <p>
                With over fifteen years navigating Gurugram&apos;s real estate landscape, Baljeet founded
                InfraGuru to close the gap between what buyers are promised and what they actually receive.
                That principle still shapes every mandate the firm takes on today.
              </p>
            </div>

            <motion.div variants={fadeUp} className="mt-4 border-t border-hairline pt-6">
              <p className="font-heading text-2xl italic text-primary-dark">Baljeet Singh</p>
              <p className="mt-1 text-caption font-medium uppercase tracking-widest text-muted">
                Founder &amp; CEO, InfraGuru
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
