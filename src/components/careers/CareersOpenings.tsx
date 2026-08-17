"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { fadeUp, viewportMirror } from "@/lib/motion";
import { DEPARTMENTS, type Department, type JobOpening } from "@/lib/db/types";
import { CareerApplyModal } from "./CareerApplyModal";

function LocationIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export default function CareersOpenings({ jobs }: { jobs: JobOpening[] }) {
  const [activeDept, setActiveDept] = useState<Department>("All");
  const [genericModalOpen, setGenericModalOpen] = useState(false);

  const filtered = jobs.filter((role) => activeDept === "All" || role.department === activeDept);

  return (
    <section id="careers-openings" className="relative w-full bg-bg-soft py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportMirror}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-[2px] w-8 bg-gold-gradient" />
            <span className="font-body text-label font-semibold uppercase tracking-wide text-secondary-hover">
              Open Roles
            </span>
            <div className="h-[2px] w-8 bg-gold-gradient" />
          </div>
          <h2 className="font-heading text-[clamp(1.5rem,2.3vw,2.75rem)] font-light leading-tight tracking-normal text-primary-dark">
            Current <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#c5a028] to-[#d4af37]">Openings</span>
          </h2>
        </motion.div>

        {/* Department filter */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportMirror}
          className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:mb-14 sm:gap-3"
        >
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setActiveDept(dept)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all duration-300 sm:px-5 sm:text-label ${
                activeDept === dept
                  ? "bg-gold-gradient text-primary-dark shadow-[0_8px_20px_rgba(212,175,55,0.3)]"
                  : "border border-hairline text-muted hover:border-primary/30 hover:text-primary"
              }`}
            >
              {dept}
            </button>
          ))}
        </motion.div>

        {/* Openings card grid */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((role, i) => (
              <motion.div
                layout
                key={role.id}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex"
              >
                <div className="group flex h-full w-full flex-col overflow-hidden rounded-[26px] border border-hairline bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_30px_60px_rgba(3,46,151,0.14)]">
                  {/* Header */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-[#253d67] to-primary-dark px-7 py-7 sm:px-8">
                    <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-secondary/10 blur-2xl" />
                    <span className="relative z-10 block text-caption font-semibold uppercase tracking-[0.2em] text-gold-gradient">
                      {role.department}
                    </span>
                    <h3 className="relative z-10 mt-2 font-body text-xl font-semibold uppercase leading-snug text-white sm:text-[1.4rem]">
                      {role.title}
                    </h3>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col px-7 py-7 sm:px-8">
                    <span className="mb-4 inline-flex items-center gap-2 text-label font-bold uppercase tracking-wide text-primary">
                      <span className="h-2 w-2 rotate-45 bg-secondary" />
                      Requirements
                    </span>
                    <ul className="flex-1 space-y-3.5">
                      {role.requirements.map((req) => (
                        <li key={req} className="flex items-start gap-3 text-body font-light leading-relaxed text-neutral-600">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-secondary-hover" />
                          {req}
                        </li>
                      ))}
                    </ul>

                    {/* Footer */}
                    <div className="mt-7 flex items-center justify-between gap-3 border-t border-hairline pt-6">
                      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                        <LocationIcon />
                        {role.workMode}
                      </span>
                      <Link
                        href={`/careers/apply/${role.slug}`}
                        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold-gradient px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-primary-dark shadow-[0_10px_24px_rgba(212,175,55,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(212,175,55,0.4)]"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-body text-muted">No open roles in this department right now.</p>
        )}

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportMirror}
          className="mt-14 text-center text-body font-light text-muted"
        >
          Don&apos;t see the right fit?{" "}
          <button
            type="button"
            onClick={() => setGenericModalOpen(true)}
            className="font-semibold text-primary underline decoration-secondary decoration-2 underline-offset-4 transition-colors hover:text-primary-dark"
          >
            Send us your resume anyway.
          </button>
        </motion.p>
      </div>

      <CareerApplyModal open={genericModalOpen} onClose={() => setGenericModalOpen(false)} />
    </section>
  );
}
