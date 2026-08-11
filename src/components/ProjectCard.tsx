"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/db/types';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  // Very subtle and slow parallax for luxury feel
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className="h-full">
      <motion.div
        layout
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group h-full flex flex-col bg-white border border-neutral-200 hover:border-neutral-300 transition-shadow duration-500 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]"
      >
      <Link href={`/projects/${project.id}`} className="flex flex-col h-full">
        {/* Image Container */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-neutral-100">
          <motion.div style={{ y: imgY, scale: 1.15 }} className="absolute inset-0 transform-gpu">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            />
          </motion.div>

          {/* Gradient overlay at bottom for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          {/* Top Left Tag */}
          <div className="absolute top-4 left-4 bg-neutral-900 px-3 py-1.5 shadow-sm">
            <span className="text-[10px] font-body font-bold uppercase tracking-widest text-white">
              {project.category}
            </span>
          </div>

          {/* Top Right Tag */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm border border-neutral-200/50 px-3 py-1.5 shadow-sm">
            <span className="text-[10px] font-body font-bold uppercase tracking-widest text-neutral-900">
              {project.possession}
            </span>
          </div>
        </div>

        {/* Info Container */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-neutral-900 font-body text-xl md:text-2xl font-medium mb-1">
              {project.title}
            </h3>
            <p className="text-neutral-500 text-sm font-medium tracking-wide mb-2">
              {project.location}
            </p>
            <p className="text-neutral-400 text-xs font-medium tracking-wide line-clamp-1">
              {project.tagline}
            </p>
          </div>

          {/* 2x2 Grid Details */}
          <div className="grid grid-cols-2 gap-3 mb-8 flex-grow">
            <div className="bg-neutral-50/50 border border-neutral-100 p-3 flex flex-col justify-center">
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Price</span>
              <span className="text-sm font-medium text-neutral-900">{project.price}</span>
            </div>
            <div className="bg-neutral-50/50 border border-neutral-100 p-3 flex flex-col justify-center">
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Project Size</span>
              <span className="text-sm font-medium text-neutral-900 line-clamp-1">
                {project.specs.split('·')[1]?.trim() || project.specs}
              </span>
            </div>
            <div className="bg-neutral-50/50 border border-neutral-100 p-3 flex flex-col justify-center">
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Location</span>
              <span className="text-sm font-medium text-neutral-900 line-clamp-1">{project.location.split(',')[0]}</span>
            </div>
            <div className="bg-neutral-50/50 border border-neutral-100 p-3 flex flex-col justify-center">
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Properties for Sale</span>
              <span className="text-sm font-medium text-neutral-900 line-clamp-1">
                {project.specs.split('·')[0]?.trim() || 'Various'}
              </span>
            </div>
          </div>

          {/* Button */}
          <div>
            <button className="bg-neutral-900 text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#12223a] transition-colors">
              View Details
            </button>
          </div>
        </div>
      </Link>
      </motion.div>
    </div>
  );
}
