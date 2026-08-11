"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/db/types";
import type { LocationConfig } from "@/lib/locations";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";

export default function LocationProjectsClient({
  location,
  projects,
}: {
  location: LocationConfig;
  projects: Project[];
}) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-[#f9f9f9]"
    >
      <Navbar />

      {/* Hero band */}
      <section className="relative pt-40 pb-16 sm:pt-48 sm:pb-20 bg-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-white/5 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-8 bg-secondary" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-secondary">
              {location.region}
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-light uppercase leading-tight mb-4">
            {location.label} <span className="font-bold text-gold-gradient">Projects</span>
          </h1>
          <p className="text-white/70 max-w-xl font-body">
            {projects.length > 0
              ? `${projects.length} ultra-premium ${projects.length === 1 ? "project" : "projects"} curated by Infraguru in ${location.label}.`
              : `Our ${location.label} portfolio is launching soon. Register your interest to get early access to new listings.`}
          </p>
        </div>
      </section>

      {/* Grid / empty state */}
      <section className="py-16 sm:py-24 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-24 border border-dashed border-neutral-200 rounded-2xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-secondary-hover mb-4">
              Coming Soon
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-light text-neutral-900 mb-4 max-w-lg">
              We&apos;re curating our {location.label} portfolio.
            </h2>
            <p className="text-neutral-500 max-w-md mb-8 font-body">
              Be the first to know when new {location.label} listings go live.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded text-label bg-primary px-8 py-3.5 font-semibold uppercase text-white shadow-[0_12px_30px_rgba(3,46,151,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light"
            >
              Register Your Interest
            </Link>
          </div>
        )}
      </section>

      <Footer />
    </motion.main>
  );
}
