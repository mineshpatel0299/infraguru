'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Phase = 'loading' | 'revealing' | 'done';

export default function Preloader({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>('loading');

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (phase !== 'revealing') return;
    const timer = setTimeout(() => {
      setPhase('done');
      document.body.style.overflow = '';
    }, 900);
    return () => clearTimeout(timer);
  }, [phase]);

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
