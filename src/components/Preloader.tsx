'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

type Phase = 'loading' | 'revealing' | 'done';
type LoaderType = 'splash' | 'lazy';

export default function Preloader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin') ?? false;
  
  const [phase, setPhase] = useState<Phase>(isAdmin ? 'done' : 'loading');
  const [loaderType, setLoaderType] = useState<LoaderType>('splash');
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isAdmin) return;

    let currentLoaderType: LoaderType = 'lazy';
    // lazyloader.mp4 runs ~5s — only the first second is ever shown here, so
    // this timer (not onEnded) is what cuts it off.
    let duration = 1000;

    if (isFirstMount.current) {
      isFirstMount.current = false;
      const lastLoad = sessionStorage.getItem('infraguru_preloader_time');
      const now = Date.now();

      // If no last load or it was >20s ago, play the full video preloader
      if (!lastLoad || now - parseInt(lastLoad, 10) >= 20000) {
        currentLoaderType = 'splash';
        // prefinal.mp4 runs ~4.4s (trimmed) — this is only a safety-net fallback
        // in case onEnded never fires (e.g. autoplay blocked); it must exceed
        // the video's own length + its post-end pause, or it cuts the video
        // off mid-playback before onEnded gets a chance to run.
        duration = 5200;
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
          className="fixed inset-0 z-1000 flex items-center justify-center bg-black"
          initial={{ opacity: 1, scale: 1 }}
          animate={
            revealing
              ? { opacity: 0, scale: loaderType === 'splash' ? 1.35 : 1.15 }
              : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {loaderType === 'splash' ? (
            <video
              className="h-[85%] w-[85%] object-contain"
              src="/prefinal.mp4"
              autoPlay
              muted
              playsInline
              onEnded={() => setTimeout(() => setPhase('revealing'), 500)}
              onError={() => setPhase('revealing')}
            />
          ) : (
            <video
              className="h-56 w-56 sm:h-72 sm:w-72 object-contain"
              src="/lazyloader.mp4"
              autoPlay
              muted
              playsInline
            />
          )}
        </motion.div>
      )}
    </>
  );
}
