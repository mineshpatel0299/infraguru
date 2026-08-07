"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export default function CareersPageMotion({ children }: { children: ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white"
    >
      {children}
    </motion.main>
  );
}
