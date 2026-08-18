"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { GALLERY_DEFAULT_CONTENT, type GalleryContent } from "@/lib/pageSections";
import { useSectionEdit } from "../pagebuilder/SectionEditBoundary";
import EditableImage from "../pagebuilder/EditableImage";
import RemoveItemButton from "../pagebuilder/RemoveItemButton";
import AddItemButton from "../pagebuilder/AddItemButton";

// Cycled by index so the masonry columns settle into a considered,
// non-repetitive rhythm no matter how many photos the CMS content has.
const ASPECT_PATTERN = ["aspect-[3/4]", "aspect-[4/3]", "aspect-square", "aspect-[4/5]", "aspect-[16/11]", "aspect-[3/4]"];

export default function GalleryGrid({
  content = GALLERY_DEFAULT_CONTENT,
}: {
  content?: GalleryContent;
}) {
  const ctx = useSectionEdit();
  const live = (ctx?.content as GalleryContent | undefined) ?? content;
  const images = live.images ?? [];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length]
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, showPrev, showNext]);

  const active = activeIndex !== null ? images[activeIndex] : null;

  return (
    <section className="relative w-full bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
          {images.map((image, i) => {
            // In edit mode EditableImage renders its own "Replace" <button>,
            // so this wrapper must not also be a <button> — a <button> can't
            // legally contain another <button>, and the browser's parser
            // auto-closes the outer one, breaking hydration and swallowing
            // clicks on Replace. Only render it as a button for the public
            // lightbox, where EditableImage renders no button at all.
            const Wrapper = ctx ? "div" : "button";
            return (
              <div key={i} className="group relative mb-5 break-inside-avoid">
                <Wrapper
                  {...(ctx ? {} : { type: "button", onClick: () => setActiveIndex(i) })}
                  className={`relative block w-full overflow-hidden rounded-2xl bg-bg-soft ring-1 ring-transparent transition-all duration-500 hover:ring-secondary/50 ${
                    ctx ? "cursor-default" : "cursor-zoom-in"
                  } ${ASPECT_PATTERN[i % ASPECT_PATTERN.length]}`}
                  aria-label={ctx ? undefined : `Open photo: ${image.alt}`}
                >
                  <EditableImage
                    path={`images[${i}].src`}
                    fallback={image.src}
                    wrapperClassName="relative h-full w-full"
                  >
                    {(src) => (
                      <Image
                        src={src}
                        alt={image.alt || "InfraGuru gallery photo"}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                    )}
                  </EditableImage>

                  {!ctx && (
                    <>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-dark/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <span className="pointer-events-none absolute bottom-3 left-4 font-heading text-xs font-light tracking-[0.2em] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 translate-y-1.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
                        </svg>
                      </span>
                    </>
                  )}
                </Wrapper>

                {ctx && <RemoveItemButton arrayPath="images" index={i} />}
              </div>
            );
          })}

          {ctx && (
            <AddItemButton
              arrayPath="images"
              newItem={{ src: "/about-1.jpg", alt: "New gallery photo" }}
              label="Add photo"
              className="mb-5 flex aspect-[4/5] w-full items-center justify-center rounded-2xl border-2 border-dashed border-[#032E97]/25 text-xs font-bold uppercase tracking-wide text-[#032E97]/60 transition-colors hover:border-[#d4af37]/60 hover:text-[#032E97]"
            />
          )}
        </div>

        {images.length === 0 && !ctx && (
          <p className="py-24 text-center text-body text-muted">More photographs coming soon.</p>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
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

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-auto flex h-[78vh] w-[92vw] max-w-5xl items-center justify-center sm:h-[82vh]"
            >
              <Image
                src={active.src}
                alt={active.alt || "InfraGuru gallery photo"}
                fill
                sizes="92vw"
                className="object-contain"
                priority
              />
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-caption uppercase tracking-[0.25em] text-white/50">
              {String((activeIndex ?? 0) + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
