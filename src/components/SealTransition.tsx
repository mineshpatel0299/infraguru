'use client';

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

type Point = { x: number; y: number };
type Phase = 'idle' | 'sealing' | 'cracking' | 'shattering';

type SealTransitionContextValue = {
  breakSeal: (href: string, origin?: Point) => void;
};

const SealTransitionContext = createContext<SealTransitionContextValue | null>(null);

/** Wraps the app so any descendant can trigger the "break the seal" page transition. */
export function useSealTransition() {
  const ctx = useContext(SealTransitionContext);
  if (!ctx) throw new Error('useSealTransition must be used within SealTransitionProvider');
  return ctx;
}

const SEAL_SIZE = 132;
const CRACK_MS = 380;
const NAVIGATE_MS = 540;
const SHATTER_MS = 640;
const RESET_MS = 1080;

const backdropVariants: Variants = {
  idle: { opacity: 0 },
  sealing: { opacity: 1, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } },
  cracking: { opacity: 1 },
  shattering: { opacity: 0, transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: 0.06 } },
};

const crackVariants: Variants = {
  idle: { opacity: 0, pathLength: 0 },
  sealing: { opacity: 0, pathLength: 0 },
  cracking: { opacity: 1, pathLength: 1, transition: { duration: 0.26, ease: 'easeInOut' } },
  shattering: { opacity: 0, transition: { duration: 0.15 } },
};

const flashVariants: Variants = {
  idle: { opacity: 0, scale: 0.6 },
  sealing: { opacity: 0, scale: 0.6 },
  cracking: { opacity: [0, 1, 0], scale: [0.6, 1.6, 1.9], transition: { duration: 0.4, times: [0, 0.3, 1] } },
  shattering: { opacity: 0 },
};

function halfVariants(direction: 1 | -1): Variants {
  return {
    idle: { scale: 0.15, opacity: 0, x: 0, y: 0, rotate: 0 },
    sealing: {
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: { type: 'spring', stiffness: 240, damping: 15, mass: 0.6 },
    },
    cracking: {
      scale: 1.04,
      opacity: 1,
      x: direction * -1,
      y: 0,
      rotate: direction * -5,
      transition: { duration: 0.18, ease: 'easeOut' },
    },
    shattering: {
      scale: 1.08,
      opacity: 0,
      x: direction * 180,
      y: -60,
      rotate: direction * 28,
      transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
    },
  };
}

export default function SealTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('idle');
  const [origin, setOrigin] = useState<Point | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const breakSeal = useCallback(
    (href: string, originPoint?: Point) => {
      if (phase !== 'idle') return;

      const reducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

      if (reducedMotion) {
        router.push(href);
        return;
      }

      const point =
        originPoint ??
        (typeof window !== 'undefined'
          ? { x: window.innerWidth / 2, y: window.innerHeight / 2 }
          : { x: 0, y: 0 });

      clearTimers();
      setOrigin(point);
      setPhase('sealing');

      timers.current.push(
        setTimeout(() => setPhase('cracking'), CRACK_MS),
        setTimeout(() => router.push(href), NAVIGATE_MS),
        setTimeout(() => setPhase('shattering'), SHATTER_MS),
        setTimeout(() => {
          setPhase('idle');
          setOrigin(null);
        }, RESET_MS)
      );
    },
    [phase, router, clearTimers]
  );

  const active = phase !== 'idle' && origin !== null;

  return (
    <SealTransitionContext.Provider value={{ breakSeal }}>
      {children}

      <div aria-hidden className="fixed inset-0 z-300" style={{ pointerEvents: active ? 'auto' : 'none' }}>
        <AnimatePresence>
          {active && origin && (
            <motion.div
              key="seal-backdrop"
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at ${origin.x}px ${origin.y}px, var(--color-primary) 0%, var(--color-primary-dark) 55%, #04154d 100%)`,
              }}
              variants={backdropVariants}
              initial="idle"
              animate={phase}
              exit="idle"
            />
          )}
        </AnimatePresence>

        {active && origin && (
          <div className="absolute" style={{ left: origin.x, top: origin.y, width: 0, height: 0 }}>
            {([-1, 1] as const).map((direction) => (
              <motion.div
                key={direction}
                className="absolute rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
                style={{
                  width: SEAL_SIZE,
                  height: SEAL_SIZE,
                  left: -SEAL_SIZE / 2,
                  top: -SEAL_SIZE / 2,
                  clipPath: direction === -1 ? 'inset(0 50% 0 0)' : 'inset(0 0 0 50%)',
                  background:
                    'radial-gradient(circle at 32% 28%, var(--color-secondary-light) 0%, var(--color-secondary) 45%, var(--color-secondary-hover) 100%)',
                }}
                variants={halfVariants(direction)}
                initial="idle"
                animate={phase}
              >
                <img
                  src="/g.png"
                  alt=""
                  className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                />
              </motion.div>
            ))}

            <svg
              width={SEAL_SIZE * 1.4}
              height={SEAL_SIZE * 1.4}
              viewBox="0 0 100 100"
              className="absolute"
              style={{ left: -(SEAL_SIZE * 1.4) / 2, top: -(SEAL_SIZE * 1.4) / 2 }}
            >
              <motion.path
                d="M50 4 L57 24 L43 34 L60 48 L41 60 L55 74 L48 96"
                fill="none"
                stroke="#fff8e1"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: 'drop-shadow(0 0 6px rgba(255,244,207,0.9))' }}
                variants={crackVariants}
                initial="idle"
                animate={phase}
              />
            </svg>

            <motion.div
              className="absolute rounded-full"
              style={{
                width: SEAL_SIZE * 1.8,
                height: SEAL_SIZE * 1.8,
                left: -(SEAL_SIZE * 1.8) / 2,
                top: -(SEAL_SIZE * 1.8) / 2,
                background: 'radial-gradient(circle, rgba(255,244,207,0.9) 0%, rgba(212,175,55,0) 70%)',
              }}
              variants={flashVariants}
              initial="idle"
              animate={phase}
            />
          </div>
        )}
      </div>
    </SealTransitionContext.Provider>
  );
}
