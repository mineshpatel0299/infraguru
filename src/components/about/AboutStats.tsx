"use client";

import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, viewportMirror } from "@/lib/motion";
import Counter from "@/components/Counter";
import { ABOUT_STATS_DEFAULT_CONTENT, type AboutStatsContent } from "@/lib/pageSections";
import { useSectionEdit } from "../pagebuilder/SectionEditBoundary";
import EditableText from "../pagebuilder/EditableText";
import RemoveItemButton from "../pagebuilder/RemoveItemButton";
import AddItemButton from "../pagebuilder/AddItemButton";

export default function AboutStats({ content = ABOUT_STATS_DEFAULT_CONTENT }: { content?: AboutStatsContent }) {
  const ctx = useSectionEdit();
  const live = (ctx?.content as AboutStatsContent | undefined) ?? content;

  return (
    <section id="about-stats" className="relative w-full bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportMirror}
          className="grid grid-cols-2 gap-10 border-t border-hairline pt-12 sm:gap-16 lg:grid-cols-4"
        >
          {live.stats.map((stat, i) => (
            <motion.div key={i} variants={fadeUp} className="group relative flex flex-col items-center gap-2 text-center">
              <RemoveItemButton arrayPath="stats" index={i} />
              <span className="font-body text-4xl font-semibold text-primary-dark sm:text-5xl lg:text-6xl">
                {ctx ? (
                  <EditableText as="span" path={`stats[${i}].value`} fallback={stat.value} />
                ) : (
                  <Counter value={parseInt(stat.value, 10) || 0} suffix={stat.value.replace(/^[0-9]+/, "")} />
                )}
              </span>
              <EditableText
                as="span"
                path={`stats[${i}].label`}
                fallback={stat.label}
                className="text-caption font-medium uppercase tracking-wide text-muted sm:text-body"
              />
            </motion.div>
          ))}
          {ctx && (
            <AddItemButton
              arrayPath="stats"
              newItem={{ value: "0+", label: "New Stat" }}
              className="flex items-center justify-center rounded-xl border border-dashed border-primary/20 py-4 text-[11px] font-bold uppercase tracking-wide text-primary/50 transition-colors hover:border-primary/40 hover:text-primary/80"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
