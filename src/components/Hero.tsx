"use client";

import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, type Variants } from 'framer-motion';
import Navbar from './Navbar';

const HEADLINE_LINE_1 = "LIVE THE ART";
const HEADLINE_LINE_2 = "OF LUXURY.";


const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: delay },
  }),
};

const wordVariant: Variants = {
  hidden: { y: "115%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

function SlideUpWordReveal({
  text,
  className = '',
  delay = 0.5,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={`inline-flex flex-wrap justify-center ${className}`}
      custom={delay}
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      {text.split(' ').map((word, i) => (
        <span key={i} className="mr-[0.25em] inline-block overflow-hidden pt-[0.2em] -mt-[0.2em] pb-[0.1em] -mb-[0.1em]">
          <motion.span className="inline-block" variants={wordVariant}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Smooths out jittery/jumpy raw scroll deltas (fast wheel flicks, trackpad
  // micro-steps) before they drive the video, so the scrub target itself
  // moves fluidly instead of in the raw, uneven steps the scroll event gives us.
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    mass: 0.5,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let duration = video.duration || 0;
    let rafId: number;

    const onLoadedMetadata = () => {
      duration = video.duration || 0;
    };
    video.addEventListener('loadedmetadata', onLoadedMetadata);

    const tick = () => {
      if (duration && video.readyState >= 2) {
        const target = smoothScrollProgress.get() * duration;
        // Skip sub-frame seeks; setting currentTime is expensive and forces a decode.
        if (Math.abs(target - video.currentTime) > 1 / 60) {
          video.currentTime = target;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [smoothScrollProgress]);

  return (
    <section id="hero" ref={sectionRef} className="relative bg-primary-dark h-[300vh]">
      <Navbar />

      <div
        className="sticky top-0 left-0 w-full flex h-[100svh] flex-col overflow-hidden"
      >
        {/* Cinematic background */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <video
              ref={videoRef}
              src="/ffinal.mp4"
              poster=""
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover scale-[1.15] sm:scale-[1.2]"
            />
          </div>
        </motion.div>

        {/* Color gradient overlay from bottom to top */}
        <div className="absolute bottom-0 left-0 right-0 h-[50%] z-1 bg-gradient-to-t from-[#132731] via-[#132731]/60 to-transparent pointer-events-none" />

        {/* Film grain */}
        <div
          className="pointer-events-none absolute inset-0 z-2 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Curtain reveal */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 border-t-2 border-secondary bg-white"
          initial={{ y: 0 }}
          animate={{ y: '100%' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.85, 0, 0.15, 1] }}
        />

        {/* Main Content Area (Centers the text block vertically) */}
        <div className="container relative z-10 mx-auto px-5 sm:px-8 flex-1 flex flex-col justify-center w-full mt-24 md:mt-0">
          <motion.div className="flex flex-col items-start text-left w-full">
            <h1 className="mb-2 font-heading font-light uppercase text-[#132731] flex flex-col items-start">
              <SlideUpWordReveal 
                text="LIVE THE ART OF" 
                delay={1.2} 
                className="font-body text-[clamp(1.2rem,2vw,2rem)] tracking-[0.2em] block justify-start pb-4 flex-nowrap whitespace-nowrap" 
              />
              <SlideUpWordReveal
                text="LUXURY."
                delay={1.45}
                className="text-[clamp(3rem,6.5vw,6.5rem)] leading-[0.9] tracking-[-0.02em] block justify-start flex-nowrap whitespace-nowrap text-[#132731] drop-shadow-none"
              />
            </h1>
            
            <motion.div 
               className="mt-3 sm:mt-4 flex flex-col gap-4"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 1.75, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="w-24 h-[2px] bg-[#d4af37]"></div>
               <p className="text-sm sm:text-base text-[#132731] leading-relaxed font-body font-medium">
                 Premium residences crafted for those<br className="hidden sm:block"/>
                 who value quality, comfort, and timeless living.
               </p>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
               className="mt-8 sm:mt-10"
            >
               <a href="/projects" className="inline-flex items-center gap-3 bg-[#0a1435] px-6 sm:px-8 py-3.5 text-[10px] font-bold text-white uppercase tracking-widest rounded hover:bg-white hover:text-[#0a1435] transition-colors border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.5)]">
                 EXPLORE PROJECTS
                 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7m0 0H8m9 0v9" /></svg>
               </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Bottom Bar */}
        <motion.div
          className="w-full relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="container mx-auto px-5 sm:px-8 py-6 sm:py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-x divide-white/10">

              {/* Stat 1 */}
              <div className="flex flex-col items-center justify-center text-center px-2">
                <span className="text-2xl sm:text-3xl font-light text-white leading-none">25+</span>
                <span className="text-[9px] font-bold tracking-widest text-white/50 uppercase mt-1.5">YEARS OF<br/>EXCELLENCE</span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center justify-center text-center px-2">
                <span className="text-2xl sm:text-3xl font-light text-white leading-none">50+</span>
                <span className="text-[9px] font-bold tracking-widest text-white/50 uppercase mt-1.5">PREMIUM<br/>PROJECTS</span>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center justify-center text-center px-2">
                <span className="text-2xl sm:text-3xl font-light text-white leading-none">15K+</span>
                <span className="text-[9px] font-bold tracking-widest text-white/50 uppercase mt-1.5">HAPPY<br/>FAMILIES</span>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col items-center justify-center text-center px-2">
                <span className="text-2xl sm:text-3xl font-light text-white leading-none">10+</span>
                <span className="text-[9px] font-bold tracking-widest text-white/50 uppercase mt-1.5">CITIES<br/>PRESENT</span>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}



