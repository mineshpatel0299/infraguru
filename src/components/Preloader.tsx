'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

type Phase = 'loading' | 'revealing' | 'done';

export default function Preloader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin') ?? false;
  const [phase, setPhase] = useState<Phase>(isAdmin ? 'done' : 'loading');

  useEffect(() => {
    if (isAdmin) return;

    const lastLoad = sessionStorage.getItem('infraguru_preloader_time');
    const now = Date.now();
    
    // If refreshed within 20 seconds, skip preloader
    if (lastLoad && now - parseInt(lastLoad, 10) < 20000) {
      setPhase('done');
      return;
    }
    
    sessionStorage.setItem('infraguru_preloader_time', now.toString());

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setPhase('done');
      return;
    }

    document.body.style.overflow = 'hidden';

    const maxTimer = setTimeout(() => setPhase('revealing'), 6500);
    return () => clearTimeout(maxTimer);
  }, [isAdmin]);

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
              ? { opacity: 0, scale: 1.35 }
              : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <video
            className="h-full w-full object-cover"
            src="/preloader.mp4"
            autoPlay
            muted
            playsInline
            onEnded={() => setPhase('revealing')}
            onError={() => setPhase('revealing')}
          />
        </motion.div>
      )}
    </>
  );
}
