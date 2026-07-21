"use client";

import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/projects";
import ProjectExperience from "./ProjectExperience";

export default function ProjectModal({ project, related }: { project: Project; related: Project[] }) {
  const router = useRouter();

  const close = useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-200 flex items-center justify-center p-0 md:p-8 lg:p-12" style={{ perspective: 2400 }}>
        {/* Backdrop: deep primary wash, a faint blueprint grid, and a vignette pulling focus to center */}
        <motion.div
          key="backdrop"
          className="absolute inset-0 bg-primary-dark/80 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={close}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(2,15,60,0.6) 100%)" }}
          />
        </motion.div>

        {/* Ambient gold glow floating behind the frame */}
        <motion.div
          key="glow"
          aria-hidden
          className="pointer-events-none absolute z-5 h-[65%] w-[88%] max-w-[1600px] rounded-[4rem] bg-secondary/25 blur-[110px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.55, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.div
          key="frame"
          className="relative z-10 h-full w-full overflow-hidden bg-white shadow-strong md:h-full md:max-h-[92vh] md:max-w-[1480px] md:rounded-[1.75rem]"
          initial={{ opacity: 0, scale: 0.92, y: 36, rotateX: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 18, rotateX: 5 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Certificate-style gold hairline, inset from the true edge */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[10px] z-30 hidden rounded-[1.35rem] border border-secondary-light/30 md:block"
          />

          {/* Deed tag: the project's drawing code, pinned like a folder label */}
          <div className="pointer-events-none absolute -top-2.5 left-9 z-30 hidden -rotate-2 md:block">
            <div className="flex items-center gap-2 rounded-t-lg border border-b-0 border-secondary/40 bg-primary-dark px-4 py-1.5 shadow-[0_-6px_18px_rgba(0,0,0,0.3)]">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              <span className="font-mono text-[0.62rem] tracking-[0.15em] text-secondary-light uppercase">
                {project.code}
              </span>
            </div>
          </div>

          <ProjectExperience project={project} related={related} mode="modal" onClose={close} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
