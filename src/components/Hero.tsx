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

    let rafId: number;
    let duration = video.duration || 0;

    const onLoadedMetadata = () => {
      duration = video.duration || 0;
    };
    video.addEventListener('loadedmetadata', onLoadedMetadata);

    const isMobile = window.matchMedia('(max-width: 640px)').matches;

    if (isMobile) {
      // On mobile, MP4 scrubbing is often laggy/broken due to hardware decoding limits.
      // So we just play the video normally.
      video.play().catch(() => {});
    } else {
      // On desktop, we scrub the video based on scroll position.
      const tick = () => {
        if (duration && video.readyState >= 2) {
          const target = smoothScrollProgress.get() * duration;
          if (Math.abs(target - video.currentTime) > 1 / 60) {
            video.currentTime = target;
          }
        }
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [smoothScrollProgress]);

  return (
    <section id="hero" ref={sectionRef} className="relative bg-primary-dark h-[100svh] sm:h-[300vh]">
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
              loop
              preload="auto"
              className="h-full w-full object-cover scale-[1.15] sm:scale-[1.2]"
            />
          </div>
        </motion.div>

        {/* Color gradient overlay from bottom to top */}
        <div className="absolute bottom-0 left-0 right-0 h-[50%] z-1 bg-gradient-to-t from-[#132731] via-[#132731]/60 to-transparent pointer-events-none" />

        {/* Curtain reveal */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 border-t-2 border-secondary bg-white"
          initial={{ y: 0 }}
          animate={{ y: '100%' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.85, 0, 0.15, 1] }}
        />

        {/* Main Content Area (Centers the text block vertically) */}
        <div className="container relative z-10 mx-auto px-5 sm:px-8 flex-1 flex flex-col justify-center w-full pb-36 sm:pb-0">
          <motion.div className="flex flex-col items-start text-left w-full max-w-4xl">
            <h1 className="mb-4 sm:mb-6 font-heading font-light uppercase text-[#132731] flex flex-col items-start">
              <SlideUpWordReveal 
                text="LIVE THE ART OF" 
                delay={1.2} 
                className="font-body text-[clamp(1rem,3vw,1.5rem)] sm:text-[clamp(1.2rem,2vw,2rem)] tracking-[0.25em] block justify-start pb-2 sm:pb-4 flex-nowrap whitespace-nowrap text-[#132731]/80" 
              />
              <SlideUpWordReveal
                text="LUXURY."
                delay={1.45}
                className="text-[clamp(3.5rem,10vw,7rem)] leading-[0.85] tracking-[-0.02em] block justify-start flex-nowrap whitespace-nowrap text-[#132731] drop-shadow-sm"
              />
            </h1>
            
            <motion.div 
               className="mt-2 sm:mt-4 hidden sm:flex flex-col gap-4 sm:gap-6"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 1.75, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="w-16 sm:w-24 h-[2px] bg-gold-gradient"></div>
               <p className="text-sm sm:text-base lg:text-lg text-white sm:text-[#132731] leading-relaxed font-body font-medium max-w-md drop-shadow-md sm:drop-shadow-none">
                 Premium residences crafted for those<br className="hidden sm:block"/>
                 who value quality, comfort, and timeless living.
               </p>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
               className="mt-6 sm:mt-12"
            >
               <a href="/projects" className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-[#132731] px-5 sm:px-9 py-3 sm:py-4 text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest rounded-full hover:bg-gold-gradient hover:text-[#132731] transition-all duration-300 border border-transparent shadow-[0_8px_24px_rgba(0,0,0,0.15)] group">
                 EXPLORE PROJECTS
                 <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7m0 0H8m9 0v9" /></svg>
               </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Bottom Bar */}
        <motion.div
          className="w-full relative z-10 bg-gradient-to-t from-[#132731] to-transparent pt-4 sm:pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="container mx-auto px-2 sm:px-8 pb-4 sm:pb-8">
            <div className="grid grid-cols-4 gap-0 divide-x divide-white/15">

              {/* Stat 1 */}
              <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2">
                <span className="text-xl sm:text-4xl font-light text-white leading-none">25<span className="text-gold-gradient font-medium">+</span></span>
                <span className="text-[7px] sm:text-[10px] md:text-xs font-semibold tracking-wider text-white/60 uppercase mt-1 sm:mt-2">YEARS OF<br className="block sm:hidden" /> EXCELLENCE</span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2">
                <span className="text-xl sm:text-4xl font-light text-white leading-none">50<span className="text-gold-gradient font-medium">+</span></span>
                <span className="text-[7px] sm:text-[10px] md:text-xs font-semibold tracking-wider text-white/60 uppercase mt-1 sm:mt-2">PREMIUM<br className="block sm:hidden" /> PROJECTS</span>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2">
                <span className="text-xl sm:text-4xl font-light text-white leading-none">15K<span className="text-gold-gradient font-medium">+</span></span>
                <span className="text-[7px] sm:text-[10px] md:text-xs font-semibold tracking-wider text-white/60 uppercase mt-1 sm:mt-2">HAPPY<br className="block sm:hidden" /> FAMILIES</span>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2">
                <span className="text-xl sm:text-4xl font-light text-white leading-none">10<span className="text-gold-gradient font-medium">+</span></span>
                <span className="text-[7px] sm:text-[10px] md:text-xs font-semibold tracking-wider text-white/60 uppercase mt-1 sm:mt-2">CITIES<br className="block sm:hidden" /> PRESENT</span>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}



