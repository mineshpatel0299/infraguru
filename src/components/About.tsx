"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);

  return (
    <section
      id="about-intro"
      ref={containerRef}
      className="relative w-full bg-[#132731] py-24 sm:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-12 bg-gold-gradient" />
              <span className="font-body text-label uppercase tracking-widest text-gold-gradient font-semibold">
                About InfraGuru
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight tracking-tight">
              Redefining Real Estate{" "}
              <span className="font-semibold text-gold-gradient">
                Excellence.
              </span>
            </h2>

            <div className="flex flex-col gap-4 text-neutral-300 text-base sm:text-lg font-light leading-relaxed mt-4">
              <p>
                At InfraGuru, we don't just facilitate transactions; we
                architect futures. With decades of collective experience, our
                team navigates the complexities of the real estate market with
                unmatched precision and deep local insight.
              </p>
              <p>
                Whether you are acquiring a flagship commercial asset, seeking
                the perfect residential sanctuary, or structuring a joint
                development, we provide the strategic clarity you need to move
                forward with absolute confidence.
              </p>
            </div>

            <div className="mt-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 border-b border-[#d4af37] pb-1 text-white hover:text-[#d4af37] transition-colors uppercase tracking-wide font-medium text-sm group"
              >
                <span>Discover Our Legacy</span>
                <span className="transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Overlapping Images */}
          <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] flex items-center justify-center">
            {/* Primary Image (Back) */}
            <motion.div
              style={{ y: y1 }}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute top-0 right-10 sm:right-0 w-[75%] h-[75%] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/about-1.jpg"
                alt="InfraGuru Real Estate"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
              <div className="absolute inset-0 bg-primary-dark/20 mix-blend-multiply" />
            </motion.div>

            {/* Secondary Image (Front) */}
            <motion.div
              style={{ y: y2 }}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="absolute bottom-0 left-0 w-[60%] h-[55%] rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10"
            >
              <Image
                src="/about-2.jpg"
                alt="InfraGuru Architecture"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 60vw, 30vw"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
