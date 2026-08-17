"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GALLERY_VIDEOS_DEFAULT_CONTENT, type GalleryVideosContent } from "@/lib/pageSections";
import { useSectionEdit } from "../pagebuilder/SectionEditBoundary";
import EditableVideo from "../pagebuilder/EditableVideo";
import EditableText from "../pagebuilder/EditableText";
import RemoveItemButton from "../pagebuilder/RemoveItemButton";
import AddItemButton from "../pagebuilder/AddItemButton";

function VideoCard({
  src,
  title,
  onOpen,
}: {
  src: string;
  title?: string;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => videoRef.current?.play().catch(() => {})}
      onMouseLeave={() => {
        const v = videoRef.current;
        if (!v) return;
        v.pause();
        v.currentTime = 0;
      }}
      className="group relative block aspect-video w-full cursor-zoom-in overflow-hidden rounded-2xl bg-primary-dark ring-1 ring-transparent transition-all duration-500 hover:ring-secondary/50"
      aria-label={title ? `Play video: ${title}` : "Play video"}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
          <svg className="ml-1 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
      {title && (
        <span className="pointer-events-none absolute bottom-3 left-4 right-4 truncate font-heading text-xs font-light tracking-[0.15em] text-white opacity-0 transition-all duration-500 translate-y-1.5 group-hover:translate-y-0 group-hover:opacity-100">
          {title}
        </span>
      )}
    </button>
  );
}

export default function VideoGalleryGrid({
  content = GALLERY_VIDEOS_DEFAULT_CONTENT,
}: {
  content?: GalleryVideosContent;
}) {
  const ctx = useSectionEdit();
  const live = (ctx?.content as GalleryVideosContent | undefined) ?? content;
  const videos = live.videos ?? [];
  const playableVideos = videos.filter((v) => v.src);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const close = useCallback(() => setActiveIndex(null), []);

  useEffect(() => {
    if (activeIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close]);

  const active = activeIndex !== null ? playableVideos[activeIndex] : null;

  if (videos.length === 0 && !ctx) return null;

  return (
    <section className="relative w-full bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, i) => (
            <div key={i} className="group relative">
              {ctx ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-primary-dark">
                  <EditableVideo path={`videos[${i}].src`} fallback={video.src} wrapperClassName="relative h-full w-full">
                    {(src) =>
                      src ? (
                        <video src={src} muted loop playsInline preload="metadata" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase tracking-wide text-white/50">
                          No video uploaded
                        </div>
                      )
                    }
                  </EditableVideo>
                </div>
              ) : (
                <VideoCard src={video.src} title={video.title} onOpen={() => setActiveIndex(playableVideos.indexOf(video))} />
              )}

              {ctx && (
                <div className="mt-2">
                  <EditableText
                    as="span"
                    path={`videos[${i}].title`}
                    fallback={video.title || ""}
                    className="block text-xs font-semibold uppercase tracking-wide text-[#032E97]/70"
                  />
                </div>
              )}

              {ctx && <RemoveItemButton arrayPath="videos" index={i} />}
            </div>
          ))}

          {ctx && (
            <AddItemButton
              arrayPath="videos"
              newItem={{ src: "", poster: "", title: "New video" }}
              label="Add video"
              className="flex aspect-video w-full items-center justify-center rounded-2xl border-2 border-dashed border-[#032E97]/25 text-xs font-bold uppercase tracking-wide text-[#032E97]/60 transition-colors hover:border-[#d4af37]/60 hover:text-[#032E97]"
            />
          )}
        </div>

        {videos.length === 0 && ctx && (
          <p className="py-8 text-center text-body text-muted">No videos yet — add one above.</p>
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

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-auto flex h-[78vh] w-[92vw] max-w-5xl items-center justify-center sm:h-[82vh]"
            >
              <video src={active.src} controls autoPlay playsInline className="h-full w-full object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
