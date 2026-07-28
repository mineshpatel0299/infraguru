"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import SampleNavbar from "./SampleNavbar";
import SampleFooter from "./SampleFooter";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const staggerContainer = (stagger = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: 0.1 } },
});

const viewportOnce = { once: true, amount: 0.25 } as const;

function ArrowUpRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 shrink-0">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProjectDetail({
  project,
  related,
}: {
  project: Project;
  related: Project[];
}) {
  return (
    <main className="theme-aurum theme-aurum-blue min-h-screen bg-white p-3 sm:p-4 lg:p-5">
      <SampleNavbar homeHref="/sample" />

      {/* Hero */}
      <div className="relative mt-2 h-[calc(100svh-6rem)] min-h-130 w-full overflow-hidden rounded-[28px] bg-aurum-ink sm:rounded-[36px] lg:rounded-[44px]">
        <motion.img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-aurum-ink via-aurum-ink/15 to-aurum-ink/40" />

        {/* Back link */}
        <Link
          href="/sample#projects"
          className="absolute top-6 left-6 z-10 inline-flex items-center gap-2 rounded-full bg-aurum-cream/10 px-4 py-2 text-[0.7rem] font-light tracking-widest text-aurum-cream uppercase backdrop-blur-sm transition-colors hover:bg-aurum-cream/20 sm:top-8 sm:left-10"
        >
          <span className="rotate-180 inline-block">
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </span>
          All Projects
        </Link>

        <span className="absolute top-6 right-6 z-10 rounded-full border border-aurum-cream/25 bg-aurum-cream/10 px-4 py-2 text-[0.65rem] font-light tracking-widest text-aurum-cream uppercase backdrop-blur-sm sm:top-8 sm:right-10">
          {project.category}
        </span>

        <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-4 px-6 pb-8 sm:px-10 sm:pb-10 lg:px-14">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[0.7rem] font-light tracking-[0.25em] text-aurum-gold-light uppercase"
          >
            {project.code} — {project.location}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="max-w-3xl text-[clamp(1.8rem,4.5vw,3.4rem)] font-light text-aurum-cream"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="max-w-lg text-[0.9rem] leading-relaxed text-aurum-cream/70"
          >
            {project.tagline}
          </motion.p>
        </div>
      </div>

      {/* Meta strip */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer(0.08)}
        className="mx-auto mt-3 grid max-w-7xl grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-4"
      >
        {[
          { label: "Certified Value", value: project.price },
          { label: "Specification", value: project.specs },
          { label: "Possession", value: project.possession },
          { label: "RERA", value: project.rera },
        ].map((item) => (
          <motion.div
            key={item.label}
            variants={fadeUp}
            className="rounded-2xl bg-aurum-paper px-6 py-6 sm:px-7 sm:py-7"
          >
            <span className="aurum-eyebrow text-[0.6rem]">{item.label}</span>
            <div className="mt-2 font-aurum-heading text-lg text-aurum-ink sm:text-xl">{item.value}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Description + highlights */}
      <section className="mx-auto mt-3 max-w-7xl rounded-[28px] bg-aurum-cream px-6 py-12 sm:mt-4 sm:rounded-[36px] sm:px-10 sm:py-16 lg:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.12)}
          >
            <motion.span variants={fadeUp} className="aurum-eyebrow">
              The Deed
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 max-w-xl text-[clamp(1.5rem,3vw,2.3rem)] font-light text-aurum-ink"
            >
              {project.tagline}
            </motion.h2>
            <div className="mt-6 flex flex-col gap-5">
              {project.description.map((para, i) => (
                <motion.p
                  key={i}
                  variants={fadeUp}
                  className="text-[0.9rem] leading-relaxed text-aurum-muted"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4 border-t border-aurum-hairline pt-8">
              <div>
                <span className="block text-[0.65rem] font-light tracking-[0.2em] text-aurum-muted/70 uppercase">
                  Architect
                </span>
                <span className="font-aurum-heading text-base text-aurum-ink">{project.architect}</span>
              </div>
              <div className="ml-auto">
                <span className="block text-[0.65rem] font-light tracking-[0.2em] text-aurum-muted/70 uppercase">
                  Developer
                </span>
                <span className="font-aurum-heading text-base text-aurum-ink">{project.developer}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Highlights ledger */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.08)}
            className="flex flex-col"
          >
            <motion.span variants={fadeUp} className="aurum-eyebrow">
              Highlights
            </motion.span>
            <div className="mt-4 flex flex-col">
              {project.highlights.map((h) => (
                <motion.div
                  key={h.label}
                  variants={fadeUp}
                  className="flex items-center justify-between border-b border-aurum-hairline py-4"
                >
                  <span className="text-[0.85rem] text-aurum-muted">{h.label}</span>
                  <span className="font-aurum-heading text-base text-aurum-ink">{h.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Amenities + Landmarks */}
      <section className="mx-auto mt-3 max-w-7xl rounded-[28px] bg-aurum-ink px-6 py-12 sm:mt-4 sm:rounded-[36px] sm:px-10 sm:py-16 lg:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.06)}
          >
            <motion.span
              variants={fadeUp}
              className="text-[0.72rem] font-light tracking-[0.32em] uppercase text-aurum-gold"
            >
              Amenities
            </motion.span>
            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {project.amenities.map((a) => (
                <motion.div key={a} variants={fadeUp} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-aurum-gold/15 text-aurum-gold">
                    <CheckIcon />
                  </span>
                  <span className="text-[0.85rem] leading-relaxed text-aurum-cream/75">{a}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.08)}
          >
            <motion.span
              variants={fadeUp}
              className="text-[0.72rem] font-light tracking-[0.32em] uppercase text-aurum-gold"
            >
              Nearby
            </motion.span>
            <div className="mt-6 flex flex-col">
              {project.landmarks.map((l) => (
                <motion.div
                  key={l.label}
                  variants={fadeUp}
                  className="flex items-center justify-between border-b border-aurum-cream/10 py-4"
                >
                  <span className="text-[0.85rem] text-aurum-cream/70">{l.label}</span>
                  <span className="font-aurum-heading text-sm text-aurum-gold-light">{l.distance}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto mt-3 max-w-7xl sm:mt-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {project.gallery.map((src, i) => (
            <motion.div
              key={src + i}
              variants={fadeUp}
              className={`group relative overflow-hidden rounded-2xl ${
                i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : "aspect-square"
              }`}
            >
              <img
                src={src}
                alt={`${project.title} gallery ${i + 1}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonial */}
      <section className="mx-auto mt-3 max-w-7xl sm:mt-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative overflow-hidden rounded-[28px] bg-aurum-paper px-8 py-14 text-center sm:rounded-[36px] sm:px-16 sm:py-20"
        >
          <span className="block font-aurum-heading text-6xl leading-none text-aurum-hairline" aria-hidden>
            &ldquo;
          </span>
          <p className="mx-auto mt-4 max-w-2xl font-aurum-heading text-[1.3rem] leading-[1.6] text-aurum-ink italic sm:text-[1.6rem]">
            {project.testimonial.quote}
          </p>
          <div className="mt-6">
            <div className="font-aurum-heading text-lg text-aurum-gold-dark italic">{project.testimonial.author}</div>
            <div className="mt-1 text-[0.8rem] text-aurum-muted">{project.testimonial.role}</div>
          </div>
        </motion.div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="mx-auto mt-3 max-w-7xl rounded-[28px] bg-aurum-cream px-6 py-14 sm:mt-4 sm:rounded-[36px] sm:px-10 sm:py-20 lg:px-14">
          <div className="mb-10 flex items-end justify-between sm:mb-14">
            <div>
              <span className="aurum-eyebrow">More From The Portfolio</span>
              <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.2rem)] font-light text-aurum-ink">
                Related Deeds
              </h2>
            </div>
            <Link
              href="/sample#projects"
              className="hidden items-center gap-2 text-[0.75rem] font-light tracking-[0.15em] text-aurum-gold-dark uppercase transition-colors hover:text-aurum-gold sm:inline-flex"
            >
              View All <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerContainer(0.12)}
            className="grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {related.map((p) => (
              <motion.div key={p.id} variants={fadeUp} className="group relative">
                <Link
                  href={`/sample/projects/${p.slug}`}
                  className="relative block h-80 overflow-hidden rounded-2xl"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-aurum-ink/90 via-aurum-ink/20 to-transparent" />
                  <span className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-aurum-cream/90 text-aurum-ink transition-transform duration-300 group-hover:scale-110">
                    <ArrowUpRightIcon />
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="text-[0.65rem] font-light tracking-[0.2em] text-aurum-gold-light uppercase">
                      {p.category}
                    </span>
                    <h3 className="mt-1 font-aurum-heading text-xl text-aurum-cream">{p.title}</h3>
                    <span className="mt-1 block text-[0.75rem] text-aurum-cream/60">{p.price}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* CTA */}
      <section className="mx-auto mt-3 max-w-7xl sm:mt-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative flex flex-col items-center gap-6 overflow-hidden rounded-[28px] bg-aurum-ink px-8 py-14 text-center sm:rounded-[36px] sm:px-12 sm:py-20"
        >
          <h2 className="font-aurum-heading text-3xl leading-tight text-aurum-cream sm:text-4xl">
            Interested in <em className="text-aurum-gold-light">{project.title}?</em>
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-aurum-cream/60">
            Connect with our private advisors to schedule a viewing or request the full deed.
          </p>
          <Link href="/sample#contact" className="aurum-btn-gold">
            Request Consultation
          </Link>
        </motion.div>
      </section>

      <SampleFooter homeHref="/sample" />
    </main>
  );
}
