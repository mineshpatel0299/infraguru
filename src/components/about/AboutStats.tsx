"use client";

import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, viewportMirror } from "@/lib/motion";
import Counter from "@/components/Counter";

const STATS = [
  { value: 77, suffix: "+", label: "Properties Listed" },
  { value: 350, suffix: "+", label: "Properties Sold" },
  { value: 500, suffix: "+", label: "Satisfied Clients" },
  { value: 25, suffix: "+", label: "Realtor Awards" },
];

export default function AboutStats() {
  return (
    <section id="about-stats" className="relative w-full bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
