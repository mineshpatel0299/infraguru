"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeUp, staggerContainer, viewportMirror } from "@/lib/motion";
import type { BlogPost } from "@/lib/blog";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogPostContent({ post, related }: { post: BlogPost; related: BlogPost[] }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white"
    >
      <Navbar />

      {/* Hero */}
      <section className="relative h-[70svh] min-h-[420px] w-full overflow-hidden bg-primary-dark">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/60 to-primary-dark/20" />
        </motion.div>

        {/* Curtain reveal */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 border-t-2 border-secondary bg-white"
          initial={{ y: 0 }}
          animate={{ y: "100%" }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.85, 0, 0.15, 1] }}
        />

        <div className="relative z-10 flex h-full w-full flex-col justify-end px-5 pb-12 sm:px-8 sm:pb-16 lg:px-16">
          <div className="mx-auto w-full max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 flex flex-wrap items-center gap-3 text-caption font-medium uppercase tracking-wide text-gold-gradient"
            >
              <span>{post.category}</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span className="text-white/60">{formatDate(post.date)}</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span className="text-white/60">{post.readTime}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl font-body text-[clamp(1.75rem,4.5vw,3.5rem)] font-light leading-[1.1] tracking-tight text-white"
            >
              {post.title}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportMirror}
          className="mb-12 flex items-center gap-4 border-b border-hairline pb-8"
        >
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={52}
            height={52}
            className="h-[52px] w-[52px] rounded-full object-cover"
          />
          <div>
            <p className="font-body font-semibold text-primary-dark">{post.author.name}</p>
            <p className="text-caption text-muted">{post.author.role}</p>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportMirror}
          className="flex flex-col gap-6"
        >
          {post.content.map((paragraph, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className={`leading-relaxed text-neutral-700 ${
                i === 0
                  ? "text-lg font-light sm:text-xl"
                  : "text-base font-light sm:text-lg"
              }`}
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportMirror}
          className="mt-14 border-t border-hairline pt-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary transition-colors hover:text-secondary-hover"
          >
            ← Back to the Journal
          </Link>
        </motion.div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="border-t border-hairline bg-bg-soft py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportMirror}
              className="mb-10 font-body text-2xl font-light text-primary-dark sm:mb-14 sm:text-3xl"
            >
              More From The <span className="font-semibold text-gold-gradient">Journal</span>
            </motion.h2>

            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportMirror}
              className="grid grid-cols-1 gap-8 sm:grid-cols-3"
            >
              {related.map((p) => (
                <motion.div key={p.id} variants={fadeUp}>
                  <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col">
                    <div className="relative mb-5 aspect-[4/3] w-full overflow-hidden rounded-2xl">
                      <Image
                        src={p.coverImage}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <span className="mb-2 text-caption font-medium uppercase tracking-wide text-gold-gradient">
                      {p.category}
                    </span>
                    <h3 className="font-body text-lg font-medium leading-snug text-primary-dark transition-colors duration-300 group-hover:text-primary">
                      {p.title}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </motion.main>
  );
}
