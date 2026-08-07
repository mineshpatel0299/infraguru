"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, viewportMirror } from "@/lib/motion";
import { BLOG_CATEGORIES, type BlogPost } from "@/lib/db/types";

const CATEGORIES: Array<string> = ["All", ...BLOG_CATEGORIES];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function CoverImage({ src, alt, sizes, className }: { src: string; alt: string; sizes: string; className: string }) {
  if (!src) {
    return <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-bg-soft to-secondary/10" />;
  }
  return <Image src={src} alt={alt} fill sizes={sizes} className={className} />;
}

function AuthorAvatar({ name, avatar, size }: { name: string; avatar: string; size: number }) {
  if (avatar) {
    return (
      <Image
        src={avatar}
        alt={name}
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  const initials = name.split(" ").map((p) => p[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-primary/10 font-body font-bold text-primary"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials || "?"}
    </span>
  );
}

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<(typeof CATEGORIES)[number]>("All");

  const [featured, ...rest] = posts;

  const filtered = useMemo(
    () => (activeCategory === "All" ? rest : rest.filter((p) => p.category === activeCategory)),
    [activeCategory, rest]
  );

  if (!featured) {
    return (
      <section className="w-full bg-white py-20 sm:py-28">
        <p className="text-center text-body text-muted">No articles published yet.</p>
      </section>
    );
  }

  return (
    <section className="relative w-full bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Featured post */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportMirror}
          className="mb-16 sm:mb-20"
        >
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 gap-8 overflow-hidden rounded-[28px] border border-hairline bg-bg-soft lg:grid-cols-2 lg:gap-0"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-auto">
              <CoverImage
                src={featured.coverImage}
                alt={featured.title}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary-dark shadow-sm backdrop-blur-sm">
                Featured
              </div>
            </div>

            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 lg:px-14">
              <div className="mb-4 flex items-center gap-3 text-caption font-medium uppercase tracking-wide text-gold-gradient">
                <span>{featured.category}</span>
                <span className="h-1 w-1 rounded-full bg-muted" />
                <span className="text-muted">{featured.readTime}</span>
              </div>

              <h2 className="font-body text-2xl font-medium leading-snug text-primary-dark transition-colors duration-300 group-hover:text-primary sm:text-3xl lg:text-4xl">
                {featured.title}
              </h2>

              <p className="mt-4 text-body font-light leading-relaxed text-neutral-600">{featured.excerpt}</p>

              <div className="mt-8 flex items-center gap-3">
                <AuthorAvatar name={featured.author.name} avatar={featured.author.avatar} size={40} />
                <div>
                  <p className="text-sm font-semibold text-primary-dark">{featured.author.name}</p>
                  <p className="text-caption text-muted">{formatDate(featured.date)}</p>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Category filter */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportMirror}
          className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:mb-14 sm:gap-3"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all duration-300 sm:px-5 sm:text-label ${
                activeCategory === cat
                  ? "bg-gold-gradient text-primary-dark shadow-[0_8px_20px_rgba(212,175,55,0.3)]"
                  : "border border-hairline text-muted hover:border-primary/30 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filtered.map((post, i) => (
              <motion.div
                layout
                key={post.id}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-hairline bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_30px_60px_rgba(3,46,151,0.12)]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <CoverImage
                      src={post.coverImage}
                      alt={post.title}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary-dark shadow-sm backdrop-blur-sm">
                      {post.category}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="mb-3 flex items-center gap-2 text-caption text-muted">
                      <span>{formatDate(post.date)}</span>
                      <span className="h-1 w-1 rounded-full bg-muted/50" />
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="mb-3 font-body text-lg font-medium leading-snug text-primary-dark transition-colors duration-300 group-hover:text-primary sm:text-xl">
                      {post.title}
                    </h3>
                    <p className="mb-6 line-clamp-2 flex-1 text-body font-light leading-relaxed text-neutral-600">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between border-t border-hairline pt-5">
                      <div className="flex items-center gap-2.5">
                        <AuthorAvatar name={post.author.name} avatar={post.author.avatar} size={28} />
                        <span className="text-xs font-medium text-neutral-700">{post.author.name}</span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary transition-all duration-300 group-hover:gap-2.5 group-hover:text-secondary-hover">
                        Read
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-body text-muted">No articles in this category yet.</p>
        )}
      </div>
    </section>
  );
}
