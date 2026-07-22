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
        {/* Backdrop: transparent, just a soft blur — the homepage stays visible behind it */}
        <motion.div
          key="backdrop"
          className="absolute inset-0 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={close}
        />

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

          <ProjectExperience project={project} related={related} mode="modal" onClose={close} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
