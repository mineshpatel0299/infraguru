"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportMirror } from "@/lib/motion";

export default function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="relative w-full overflow-hidden bg-primary-dark py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[55vw] w-[55vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/5 blur-[160px]" />
      </div>

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportMirror}
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-7 px-6 text-center lg:px-8"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <div className="h-[2px] w-8 bg-gold-gradient" />
          <span className="font-body text-label font-semibold uppercase tracking-wide text-gold-gradient">
            Stay Informed
          </span>
          <div className="h-[2px] w-8 bg-gold-gradient" />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="font-body text-[clamp(1.5rem,2.3vw,2.75rem)] font-light leading-tight tracking-tight text-white"
        >
          Market intelligence, <span className="font-semibold text-gold-gradient">delivered monthly.</span>
        </motion.h2>

        <motion.p variants={fadeUp} className="max-w-md text-body font-light text-white/70">
          Join our advisory list for early access to market reports, off-market opportunities, and
          the occasional unfiltered opinion.
        </motion.p>

        <motion.form variants={fadeUp} onSubmit={handleSubmit} className="mt-2 w-full max-w-md">
          {submitted ? (
            <p className="rounded-xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-medium text-gold-gradient">
              Thank you — you&apos;re on the list.
            </p>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full flex-1 rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm text-white placeholder-white/40 outline-none transition-colors duration-300 focus:border-secondary/60"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-[0.05em] text-black shadow-[0_12px_30px_rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-100"
              >
                Subscribe
              </button>
            </div>
          )}
        </motion.form>
      </motion.div>
    </section>
  );
}
