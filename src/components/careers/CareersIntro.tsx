"use client";

import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, viewportMirror } from "@/lib/motion";
import Counter from "@/components/Counter";

const STATS = [
  { value: 120, suffix: "+", label: "Team Members" },
  { value: 8, suffix: "", label: "Open Positions" },
  { value: 10, suffix: "+", label: "Cities Present" },
  { value: 92, suffix: "%", label: "Employee Retention" },
];

export default function CareersIntro() {
  return (
    <section id="careers-intro" className="relative w-full bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportMirror}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-[2px] w-8 bg-gold-gradient" />
            <span className="font-body text-label font-semibold uppercase tracking-wide text-secondary-hover">
              Why InfraGuru
            </span>
            <div className="h-[2px] w-8 bg-gold-gradient" />
          </div>
          <h2 className="font-heading text-[clamp(1.5rem,2.3vw,2.75rem)] font-light leading-tight tracking-normal text-primary-dark">
            Careers Built With The Same{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#c5a028] to-[#d4af37]">
              Precision
            </span>{" "}
            As Our Portfolios
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-body font-light leading-relaxed text-muted">
            We hire people who obsess over the details, because in real estate, and in a career,
            the details are the difference. Here, ambition is matched with mentorship, and every
            role comes with real ownership.
          </p>
        </motion.div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8 sm:mt-20">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportMirror}
          className="grid grid-cols-2 gap-10 border-t border-hairline pt-12 sm:gap-16 lg:grid-cols-4"
        >
          {STATS.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp} className="flex flex-col items-center gap-2 text-center">
              <span className="font-body text-4xl font-semibold text-primary-dark sm:text-5xl lg:text-6xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-caption font-medium uppercase tracking-wide text-muted sm:text-body">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
