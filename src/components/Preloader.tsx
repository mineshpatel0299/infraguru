'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

type Phase = 'loading' | 'revealing' | 'done';
type LoaderType = 'video' | 'image';

export default function Preloader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin') ?? false;
  
  const [phase, setPhase] = useState<Phase>(isAdmin ? 'done' : 'loading');
  const [loaderType, setLoaderType] = useState<LoaderType>('video');
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isAdmin) return;

    let currentLoaderType: LoaderType = 'image';
    let duration = 1500;

    if (isFirstMount.current) {
      isFirstMount.current = false;
      const lastLoad = sessionStorage.getItem('infraguru_preloader_time');
      const now = Date.now();
      
      // If no last load or it was >20s ago, play the full video preloader
      if (!lastLoad || now - parseInt(lastLoad, 10) >= 20000) {
        currentLoaderType = 'video';
        duration = 6500;
      }
      
      sessionStorage.setItem('infraguru_preloader_time', now.toString());
    }

    setLoaderType(currentLoaderType);
    setPhase('loading');

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setPhase('done');
      return;
    }

    document.body.style.overflow = 'hidden';

    const maxTimer = setTimeout(() => setPhase('revealing'), duration);
    return () => clearTimeout(maxTimer);
  }, [isAdmin, pathname]);

  useEffect(() => {
    if (phase !== 'revealing') return;
    const timer = setTimeout(() => {
      setPhase('done');
      document.body.style.overflow = '';
    }, 900);
    return () => clearTimeout(timer);
  }, [phase]);

  // The CMS is a daily-use internal tool — it should never sit behind the
  // marketing splash video, so admin routes skip the preloader entirely.
  if (isAdmin) {
    return <>{children}</>;
  }

  const revealing = phase === 'revealing';

  return (
    <>
      <motion.div
        initial={false}
        animate={
          phase === 'loading'
            ? { opacity: 0.85, scale: 0.94 }
            : { opacity: 1, scale: 1 }
        }
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={phase === 'done' ? undefined : { willChange: 'transform, opacity' }}
      >
        {children}
      </motion.div>

      {phase !== 'done' && (
        <motion.div
          className={`fixed inset-0 z-1000 flex items-center justify-center ${loaderType === 'video' ? 'bg-black' : 'bg-[#0B1320]'}`}
          initial={{ opacity: 1, scale: 1 }}
          animate={
            revealing
              ? { opacity: 0, scale: loaderType === 'video' ? 1.35 : 1.15 }
              : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {loaderType === 'video' ? (
            <video
              className="h-full w-full object-cover"
              src="/preloader.mp4"
              autoPlay
              muted
              playsInline
              onEnded={() => setPhase('revealing')}
              onError={() => setPhase('revealing')}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-24 h-24 sm:w-32 sm:h-32"
            >
              <motion.img
                src="/g.png"
                alt="Loading"
                className="w-full h-full object-contain brightness-0 invert"
                animate={{ 
                  opacity: [0.6, 1, 0.6],
                  scale: [0.95, 1.05, 0.95]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </>
  );
}
