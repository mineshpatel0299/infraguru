"use client";

import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, viewportMirror } from "@/lib/motion";

const VALUES = [
  {
    number: "01",
    title: "Growth-Driven Environment",
    description:
      "We nurture ambition and empower professionals who are passionate about success.",
  },
  {
    number: "02",
    title: "Collaborative Culture",
    description:
      "Work with like-minded professionals who believe in teamwork and shared goals.",
  },
  {
    number: "03",
    title: "Impactful Projects",
    description:
      "Be part of real estate projects that challenge you and create visible impact.",
  },
  {
    number: "04",
    title: "Continuous Learning",
    description:
      "Access mentorship, workshops and on-the-job training for continuous improvement.",
  },
];

export default function CareersValues() {
  return (
    <section id="careers-values" className="relative w-full overflow-hidden bg-primary-dark py-24 sm:py-32">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[20%] right-[8%] h-[45vw] w-[45vw] rounded-full bg-secondary/5 blur-[140px]" />
        <div className="absolute bottom-[-15%] left-[5%] h-[35vw] w-[35vw] rounded-full bg-white/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
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
              Our Culture
            </span>
            <div className="h-[2px] w-8 bg-gold-gradient" />
          </div>
          <h2 className="font-heading text-[clamp(1.5rem,3.2vw,2.75rem)] font-light leading-tight tracking-normal text-white">
            Careers at <span className="font-bold text-gold-gradient">InfraGuru</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-body font-light leading-relaxed text-white/70">
            At InfraGuru, we believe in building strong careers along with strong real estate
            solutions. Join a team that values innovation, growth and meaningful impact.
          </p>
        </motion.div>

        {/* Editorial values grid — every title sits flush with the top of its row,
            so titles and body copy line up across columns regardless of how long
            any one description runs. */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportMirror}
          className="grid grid-cols-1 gap-x-14 gap-y-14 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-16"
        >
          {VALUES.map((value) => (
            <motion.div key={value.number} variants={fadeUp} className="group flex items-start gap-6 sm:gap-8">
              <span className="w-16 shrink-0 font-heading text-[3.25rem] font-light leading-none text-white/15 transition-colors duration-500 group-hover:text-gold-gradient sm:w-20 sm:text-[4rem]">
                {value.number}
              </span>

              <div className="flex-1 border-l border-white/10 pb-2 pl-6 pt-1 transition-colors duration-500 group-hover:border-secondary/50 sm:pl-8">
                <h3 className="mb-3 font-heading text-xl uppercase tracking-tight text-white transition-colors duration-500 group-hover:text-gold-gradient sm:text-2xl">
                  {value.title}
                </h3>
                <p className="max-w-md text-body font-light leading-relaxed text-white/60">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
