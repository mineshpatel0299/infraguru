"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { AWARDS_DEFAULT_CONTENT, type AwardsContent } from "@/lib/pageSections";
import { useSectionEdit } from "./pagebuilder/SectionEditBoundary";
import EditableText from "./pagebuilder/EditableText";
import EditableImage from "./pagebuilder/EditableImage";
import EditableVideo from "./pagebuilder/EditableVideo";
import RemoveItemButton from "./pagebuilder/RemoveItemButton";
import RemoveFieldButton from "./pagebuilder/RemoveFieldButton";
import AddItemButton from "./pagebuilder/AddItemButton";

function MedalIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className={className}>
      <circle cx="12" cy="8.5" r="6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.2 13.9 6.5 22l5.5-3 5.5 3-1.7-8.1" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export default function Awards({
  content = AWARDS_DEFAULT_CONTENT,
}: {
  content?: AwardsContent;
}) {
  const ctx = useSectionEdit();
  const live = (ctx?.content as AwardsContent | undefined) ?? content;
  const items = live.items ?? [];

  const [activeVideo, setActiveVideo] = useState<{ src: string; title: string } | null>(null);
  const close = useCallback(() => setActiveVideo(null), []);

  useEffect(() => {
    if (!activeVideo) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeVideo, close]);

  // ── Carousel scroll tracking ──
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState, items.length]);

  // A horizontal-only scroll track has no vertical scroll room of its own,
  // so browsers redirect vertical mouse-wheel input into the track's
  // horizontal scroll instead of letting it bubble up as page scroll — that's
  // what hijacked the page when hovering the cards. Only take over the wheel
  // event for a horizontally-dominant gesture (trackpad swipe); a vertical
  // one is forwarded to the page manually instead of letting the browser's
  // default redirection consume it.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        window.scrollBy({ top: e.deltaY, left: 0 });
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  if (items.length === 0 && !ctx) return null;

  // Heading and paragraph are optional — an admin can remove either
  // independently via RemoveFieldButton, which clears the underlying
  // field(s) to empty. Once empty, that block simply stops rendering here
  // (outside edit mode); in edit mode it still renders so it can be typed
  // back in.
  const hasTitle = Boolean(live.eyebrow.trim() || live.headingPlain.trim() || live.headingHighlight.trim());
  const hasSubheading = Boolean(live.subheading.trim());

  return (
    <section id="awards" className="relative overflow-hidden bg-primary-dark">
      {/* Faint gold vignette for depth, matching the site's premium-dark sections */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-[1760px] px-6 py-20 sm:px-10 sm:py-24 md:px-14 lg:px-16 lg:py-28">
        {/* ── Header ── */}
        {(ctx || hasTitle || hasSubheading) && (
          <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16 lg:mb-20">
            {(ctx || hasTitle) && (
              <div className="group relative">
                <RemoveFieldButton paths={["eyebrow", "headingPlain", "headingHighlight"]} label="Remove title" />
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-4 flex items-center justify-center gap-3"
                >
                  <div className="h-[2px] w-8 bg-gold-gradient" />
                  <EditableText
                    as="span"
                    path="eyebrow"
                    fallback={live.eyebrow}
                    className="inline-block font-body text-label font-semibold uppercase text-gold-gradient tracking-wide"
                  />
                  <div className="h-[2px] w-8 bg-gold-gradient" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 45 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="font-heading text-[clamp(1.5rem,2.3vw,2.75rem)] font-light tracking-normal text-white leading-tight"
                >
                  <EditableText as="span" path="headingPlain" fallback={live.headingPlain} />{" "}
                  <EditableText as="span" path="headingHighlight" fallback={live.headingHighlight} className="font-bold text-gold-gradient" />
                </motion.h2>
              </div>
            )}

            {(ctx || hasSubheading) && (
              <div className="group relative">
                <RemoveFieldButton paths={["subheading"]} label="Remove paragraph" />
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-5 text-body font-light text-white/60"
                >
                  <EditableText as="span" path="subheading" fallback={live.subheading} multiline />
                </motion.p>
              </div>
            )}
          </div>
        )}

        {/* ── Carousel nav ── */}
        <div className="mb-6 flex items-center justify-end gap-3 sm:mb-7">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollPrev}
            aria-label="Previous awards"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:scale-105 hover:bg-white/20 active:scale-95 disabled:pointer-events-none disabled:opacity-30 sm:h-12 sm:w-12"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canScrollNext}
            aria-label="Next awards"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-gradient text-primary-dark shadow-md transition-all duration-300 hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-30 sm:h-12 sm:w-12"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* ── Awards Carousel ── */}
        <div className="relative">
          {/* Edge fades hint that more cards are reachable by scrolling */}
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-primary-dark to-transparent transition-opacity duration-300 sm:w-16 ${canScrollPrev ? "opacity-100" : "opacity-0"}`}
          />
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-primary-dark to-transparent transition-opacity duration-300 sm:w-16 ${canScrollNext ? "opacity-100" : "opacity-0"}`}
          />

          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-visible scroll-smooth pt-2 pb-2 sm:gap-7 lg:gap-8"
          >
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.06 * idx, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex w-[78%] shrink-0 snap-start flex-col sm:w-[46%] lg:w-[31%]"
            >
              <RemoveItemButton arrayPath="items" index={idx} />

              {/* Media panel */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] ring-1 ring-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:ring-secondary/40 group-hover:shadow-[0_24px_60px_rgba(212,175,55,0.18)]">
                {ctx ? (
                  <EditableImage path={`items[${idx}].image`} fallback={item.image} wrapperClassName="relative h-full w-full">
                    {(src) =>
                      src ? (
                        <Image
                          src={src}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#253d67] to-[#12223a] px-6 text-center">
                          <MedalIcon className="h-9 w-9 text-secondary/60" />
                          <span className="text-[11px] font-semibold uppercase tracking-wide text-white/35">
                            Award photo coming soon
                          </span>
                        </div>
                      )
                    }
                  </EditableImage>
                ) : item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#253d67] to-[#12223a] px-6 text-center">
                    <MedalIcon className="h-9 w-9 text-secondary/60" />
                  </div>
                )}

                {/* Bottom gradient for text legibility */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary-dark/15 to-transparent" />

                {/* Year pill — optional like title/issuer: removable via
                    RemoveFieldButton. Unlike plain text, an empty pill still
                    shows its gold background/padding with nothing inside, so
                    once cleared it's hidden completely (edit mode included)
                    rather than left as a blank badge — re-added via a small
                    dashed ghost "+" instead of ever showing an empty pill. */}
                {item.year.trim() ? (
                  <div className="group/year absolute left-4 top-4 z-10 flex items-center gap-1.5">
                    <EditableText
                      as="span"
                      path={`items[${idx}].year`}
                      fallback={item.year}
                      className="inline-block rounded-full bg-gold-gradient px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary-dark shadow-sm"
                    />
                    <RemoveFieldButton
                      paths={[`items[${idx}].year`]}
                      label="Remove year"
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-[10px] text-white opacity-0 shadow transition-opacity group-hover/year:opacity-100"
                    />
                  </div>
                ) : (
                  ctx && (
                    <button
                      type="button"
                      onClick={() => ctx.setField(`items[${idx}].year`, "2026")}
                      aria-label="Add year"
                      className="absolute left-4 top-4 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-dashed border-white/30 text-sm leading-none text-white/50 opacity-0 transition-opacity hover:border-white/60 hover:text-white/80 group-hover:opacity-100"
                    >
                      +
                    </button>
                  )
                )}

                {/* Watch video button */}
                {!ctx && item.video && (
                  <button
                    type="button"
                    onClick={() => setActiveVideo({ src: item.video, title: item.title })}
                    aria-label={`Watch video: ${item.title}`}
                    className="absolute bottom-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-gold-gradient hover:text-primary-dark"
                  >
                    <PlayIcon className="ml-0.5 h-4 w-4" />
                  </button>
                )}

                {/* Title / issuer overlay — each is independently optional:
                    removable to blank via RemoveFieldButton, and skipped
                    entirely outside edit mode once empty. */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5">
                  {(ctx || item.title.trim()) && (
                    <div className="group/title relative flex items-start justify-between gap-2 pointer-events-auto">
                      <EditableText
                        as="h3"
                        path={`items[${idx}].title`}
                        fallback={item.title}
                        className="block flex-1 font-body text-sm font-semibold uppercase tracking-wide text-white leading-snug"
                      />
                      <RemoveFieldButton
                        paths={[`items[${idx}].title`]}
                        label="Remove title"
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-[10px] text-white opacity-0 shadow transition-opacity group-hover/title:opacity-100"
                      />
                    </div>
                  )}
                  {(ctx || item.issuer.trim()) && (
                    <div className="group/issuer relative mt-1 flex items-start justify-between gap-2 pointer-events-auto">
                      <EditableText
                        as="p"
                        path={`items[${idx}].issuer`}
                        fallback={item.issuer}
                        className="block flex-1 text-caption font-medium text-white/60"
                      />
                      <RemoveFieldButton
                        paths={[`items[${idx}].issuer`]}
                        label="Remove issuer"
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-[10px] text-white opacity-0 shadow transition-opacity group-hover/issuer:opacity-100"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Optional award-video uploader (edit mode only) */}
              {ctx && (
                <div className="mt-3 flex items-center gap-2 rounded-xl border border-dashed border-white/15 px-3 py-2">
                  <PlayIcon className="h-3.5 w-3.5 shrink-0 text-white/40" />
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-white/40">
                    {item.video ? "Award video attached" : "Attach award video (optional)"}
                  </span>
                  <EditableVideo path={`items[${idx}].video`} fallback={item.video} wrapperClassName="relative ml-auto">
                    {() => (
                      <span className="cursor-pointer text-[11px] font-bold uppercase tracking-wide text-gold-gradient">
                        {item.video ? "Replace" : "Upload"}
                      </span>
                    )}
                  </EditableVideo>
                </div>
              )}
            </motion.div>
          ))}

          {ctx && (
            <AddItemButton
              arrayPath="items"
              newItem={{ title: "New Award", issuer: "Issuing Organization", year: "2026", image: "", video: "" }}
              label="Add award"
              className="flex aspect-[4/5] w-[78%] shrink-0 snap-start items-center justify-center rounded-[24px] border-2 border-dashed border-white/15 text-xs font-bold uppercase tracking-wide text-white/40 transition-colors hover:border-secondary/50 hover:text-white/70 sm:w-[46%] lg:w-[31%]"
            />
          )}
          </div>
        </div>

        {items.length === 0 && ctx && (
          <p className="py-8 text-center text-body text-white/50">No awards yet — add one above.</p>
        )}
      </div>

      {/* Video lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-primary-dark/97 backdrop-blur-md"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8 sm:top-8"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-auto flex h-[78vh] w-[92vw] max-w-5xl flex-col items-center justify-center gap-4 sm:h-[82vh]"
            >
              <video src={activeVideo.src} controls autoPlay playsInline className="h-full w-full object-contain" />
              <p className="text-center font-body text-sm font-medium uppercase tracking-wide text-white/70">
                {activeVideo.title}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
