"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS, type Project } from '@/lib/projects';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function ProjectCard({ project, index }: { project: Project; index: number }) {
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
              {project.possession === 'Ready to Move' ? 'Ready to Move' : 'New Launch'}
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

export default function ProjectsPage() {
  const [category, setCategory] = useState<'Residential' | 'Commercial'>('Residential');
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  
  // Map our sub-categories into two main ones for the toggle
  const isResidential = (cat: string) => ['Residential', 'Villas', 'Luxury Apartments'].includes(cat);
  const isCommercial = (cat: string) => ['Commercial'].includes(cat);
  
  const baseActiveProjects = PROJECTS.filter(p => 
    category === 'Residential' ? isResidential(p.category) : isCommercial(p.category)
  );

  // Generate exactly 21 projects for Residential as requested by duplicating mock data
  const displayProjects = category === 'Residential' 
    ? Array.from({ length: 21 }, (_, i) => ({ 
        ...baseActiveProjects[i % Math.max(baseActiveProjects.length, 1)], 
        id: (baseActiveProjects[i % Math.max(baseActiveProjects.length, 1)]?.id || 0) * 1000 + i 
      }))
    : baseActiveProjects;

  const resImg = PROJECTS.find(p => isResidential(p.category))?.image || '';
  const comImg = PROJECTS.find(p => isCommercial(p.category))?.image || '';

  const bgImage = category === 'Residential' ? resImg : comImg;

  return (
    <motion.main 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-[#f9f9f9]"
    >
      <Navbar />
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[80vh] w-full bg-neutral-900 overflow-visible">
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={category}
              initial={{ clipPath: "circle(0% at 100% 0%)", zIndex: 10 }}
              animate={{ clipPath: "circle(150% at 100% 0%)", zIndex: 10 }}
              exit={{ zIndex: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0"
            >
              <motion.div style={{ y, scale: 1.15 }} className="absolute inset-0 origin-center">
                <Image src={bgImage} alt="Hero" fill className="object-cover" priority />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-light text-white uppercase leading-tight mb-4 drop-shadow-md">
              FIND PLACE TO <br/><span className="font-bold text-gold-gradient">INVEST</span>
            </h1>
            <p className="text-white/90 text-lg max-w-md font-body drop-shadow">
              Discover exclusive {category.toLowerCase()} properties tailored for excellence and modern living.
            </p>
          </motion.div>

          {/* Right side circle image toggles */}
          <div className="absolute right-6 sm:right-10 lg:right-16 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 z-20">
            {/* Residential Toggle */}
            <div className="relative flex items-center justify-center">
              <AnimatePresence>
                {category === 'Residential' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-full mr-2 md:mr-4 flex items-center whitespace-nowrap drop-shadow-lg z-10"
                  >
                    <motion.span 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="text-white font-body text-sm md:text-base tracking-[0.2em] uppercase font-medium mr-2 md:mr-4"
                    >
                      Residential
                    </motion.span>
                    <motion.div 
                      initial={{ clipPath: "inset(0 0 0 100%)" }}
                      animate={{ clipPath: "inset(0 0 0 0%)" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="w-12 md:w-20 h-px border-b-[3px] border-dotted border-white/80"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => setCategory('Residential')}
                className={`relative rounded-full overflow-hidden transition-all duration-500 shadow-2xl shrink-0 ${
                  category === 'Residential' 
                    ? 'w-24 h-24 md:w-32 md:h-32 border-[3px] border-white z-20 shadow-[0_0_30px_rgba(0,0,0,0.6)] scale-100' 
                    : 'w-14 h-14 md:w-16 md:h-16 border-2 border-white/60 opacity-70 hover:opacity-100 scale-90 hover:scale-100 z-10'
                }`}
              >
                <Image src={resImg} alt="Residential" fill className="object-cover" />
              </button>
            </div>

            {/* Commercial Toggle */}
            <div className="relative flex items-center justify-center">
              <AnimatePresence>
                {category === 'Commercial' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-full mr-2 md:mr-4 flex items-center whitespace-nowrap drop-shadow-lg z-10"
                  >
                    <motion.span 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="text-white font-body text-sm md:text-base tracking-[0.2em] uppercase font-medium mr-2 md:mr-4"
                    >
                      Commercial
                    </motion.span>
                    <motion.div 
                      initial={{ clipPath: "inset(0 0 0 100%)" }}
                      animate={{ clipPath: "inset(0 0 0 0%)" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="w-12 md:w-20 h-px border-b-[3px] border-dotted border-white/80"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => setCategory('Commercial')}
                className={`relative rounded-full overflow-hidden transition-all duration-500 shadow-2xl shrink-0 ${
                  category === 'Commercial' 
                    ? 'w-24 h-24 md:w-32 md:h-32 border-[3px] border-white z-20 shadow-[0_0_30px_rgba(0,0,0,0.6)] scale-100' 
                    : 'w-14 h-14 md:w-16 md:h-16 border-2 border-white/60 opacity-70 hover:opacity-100 scale-90 hover:scale-100 z-10'
                }`}
              >
                <Image src={comImg} alt="Commercial" fill className="object-cover" />
              </button>
            </div>
          </div>

          {/* Search/Filter Bar (Floating at bottom) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[90%] max-w-5xl bg-white shadow-2xl border border-neutral-100 p-2 md:p-4 flex flex-col md:flex-row items-center justify-between gap-4 z-30">
            <div className="flex-1 w-full flex items-center px-4">
              <svg className="w-5 h-5 text-neutral-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <div>
                <label className="block text-[10px] font-body font-bold text-neutral-500 uppercase tracking-widest">Location</label>
                <input type="text" placeholder="Choose destination" className="w-full text-sm font-medium text-neutral-900 bg-transparent border-none focus:ring-0 p-0 placeholder-neutral-400" />
              </div>
            </div>
            
            <div className="w-full md:w-px h-px md:h-12 bg-neutral-200" />
            
            <div className="flex-1 w-full flex items-center px-4">
              <svg className="w-5 h-5 text-neutral-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m3-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              <div>
                <label className="block text-[10px] font-body font-bold text-neutral-500 uppercase tracking-widest">Type</label>
                <p className="text-sm font-medium text-neutral-900">{category}</p>
              </div>
            </div>
            
            <div className="w-full md:w-px h-px md:h-12 bg-neutral-200" />
            
            <div className="flex-1 w-full flex items-center px-4">
              <svg className="w-5 h-5 text-neutral-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <div>
                <label className="block text-[10px] font-body font-bold text-neutral-500 uppercase tracking-widest">Price Range</label>
                <select className="w-full text-sm font-medium text-neutral-900 bg-transparent border-none focus:ring-0 p-0 appearance-none">
                  <option>Any Price</option>
                  <option>Under ₹5 Cr</option>
                  <option>₹5 Cr - ₹10 Cr</option>
                  <option>Above ₹10 Cr</option>
                </select>
              </div>
            </div>

            <button className="w-full md:w-auto mt-4 md:mt-0 bg-neutral-900 hover:bg-[#12223a] text-white p-4 md:px-8 flex items-center justify-center transition-colors">
              <span className="md:hidden font-body font-bold uppercase tracking-widest mr-2">Search</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="pt-40 pb-24 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-neutral-900">
              Recommended <span className="font-bold text-gold-gradient">Places</span>
            </h2>
            <p className="text-sm text-neutral-500 mt-2 font-medium tracking-wide">
              Showing {displayProjects.length} projects in {category}
            </p>
          </div>
          <button className="text-xs font-body font-bold text-neutral-900 border border-neutral-300 px-4 py-2 uppercase tracking-widest hover:border-neutral-900 transition-colors">
            See All {displayProjects.length}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {displayProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </section>
      <Footer />
    </motion.main>
  );
}
