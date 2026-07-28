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
        <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.1em] -mb-[0.1em]">
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
        className="sticky top-0 left-0 w-full flex h-[100svh] flex-col items-center justify-end overflow-hidden"
      >
        {/* Cinematic background */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              src="/tt.mp4"
              poster=""
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        {/* Color gradient overlay from bottom to top */}
        <div className="absolute bottom-0 left-0 right-0 h-[50%] z-1 bg-gradient-to-t from-primary-dark via-primary-dark/60 to-transparent pointer-events-none" />

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

        <motion.div
          className="container relative z-10 mx-auto flex max-w-6xl flex-col items-center px-5 text-center sm:px-8 pb-4 sm:pb-6 lg:pb-8"
        >
          <h1 className="mb-4 max-w-none text-center text-[clamp(1.5rem,3.2vw,3.4rem)] font-body font-light uppercase tracking-tight text-white sm:mb-6 sm:tracking-[-1px]">
            <SlideUpWordReveal text={HEADLINE_LINE_1} delay={1.2} className="block justify-center pb-1 flex-nowrap whitespace-nowrap" />
            <SlideUpWordReveal
              text={HEADLINE_LINE_2}
              delay={1.45}
              className="block justify-center flex-nowrap whitespace-nowrap text-white drop-shadow-none"
            />
          </h1>

          {/* <motion.p
            className="mb-6 max-w-lg text-body text-white/80 sm:mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.75, ease: [0.16, 1, 0.3, 1] }}
          >
            We bring you the best and take the necessary steps to relieve your property-buying anxiety.
          </motion.p> */}


        </motion.div>

      </div>
    </section>
  );
}



