"use client";

import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, viewportMirror } from "@/lib/motion";

const BENEFITS = [
  {
    title: "Health & Wellness",
    description: "Comprehensive medical cover for you and your family, plus an annual wellness stipend.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    ),
  },
  {
    title: "Performance Bonuses",
    description: "Transparent, uncapped incentive structures that reward results — not just tenure.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .672-3 1.5S10.343 11 12 11s3 .672 3 1.5-1.343 1.5-3 1.5m0-6V6m0 1v6m0 0v1m0-1c-1.657 0-3 .672-3 1.5S10.343 16 12 16s3-.672 3-1.5M12 3a9 9 0 100 18 9 9 0 000-18z" />
    ),
  },
  {
    title: "Learning & Development",
    description: "Certification budgets, mentorship tracks, and structured paths into leadership.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    ),
  },
  {
    title: "Flexible Leave",
    description: "Generous paid time off and hybrid work options that respect a real work-life balance.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    ),
  },
  {
    title: "Team Retreats",
    description: "Annual offsites and quarterly team celebrations — because milestones deserve marking.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h18M4 21h16M4 21V8l8-5 8 5v13M9 21v-6h6v6" />
    ),
  },
  {
    title: "Modern Workspace",
    description: "Premium offices designed the way we design our properties — thoughtfully, for people.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1m-1 4h1m4-4h1m-1 4h1m-5 8v-5a1 1 0 011-1h2a1 1 0 011 1v5" />
    ),
  },
];

export default function CareersBenefits() {
  return (
    <section id="careers-benefits" className="relative w-full bg-white py-20 sm:py-28">
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
            <span className="font-body text-label font-semibold uppercase tracking-wide text-secondary-hover">
              Benefits
            </span>
            <div className="h-[2px] w-8 bg-gold-gradient" />
          </div>
          <h2 className="font-heading text-[clamp(1.5rem,2.3vw,2.75rem)] font-light leading-tight tracking-normal text-primary-dark">
            Taken Care Of, <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#c5a028] to-[#d4af37]">Beyond The Paycheck</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportMirror}
          className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {BENEFITS.map((benefit) => (
            <motion.div key={benefit.title} variants={fadeUp} className="group flex items-start gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-hairline bg-bg-soft shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:border-secondary group-hover:shadow-md">
                <svg className="h-5 w-5 text-primary-dark transition-colors group-hover:text-secondary-hover" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {benefit.icon}
                </svg>
              </div>
              <div>
                <h3 className="mb-2 text-h4 font-semibold uppercase tracking-wide text-primary-dark">
                  {benefit.title}
                </h3>
                <p className="text-body font-light leading-relaxed text-muted">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
