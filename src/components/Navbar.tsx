"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/careers', label: 'Careers' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    let ticking = false;
    const checkScrolled = () => {
      setScrolled((prev) => {
        const next = window.scrollY > 40;
        return prev === next ? prev : next;
      });
      ticking = false;
    };
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(checkScrolled);
    };
    checkScrolled();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-[100] flex justify-center"
    >
      {/* Capsule shell — morphs from an edge-to-edge bar into a floating pill as the page scrolls */}
      <motion.div
        animate={{
          marginTop: scrolled ? 14 : 0,
          width: scrolled ? '94%' : '100%',
          maxWidth: scrolled ? 1180 : 2400,
          borderRadius: scrolled ? 999 : 0,
          backgroundColor: scrolled ? 'rgba(11,19,32,0.82)' : 'rgba(11,19,32,0)',
          borderColor: scrolled ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0)',
          boxShadow: scrolled ? '0 12px 34px rgba(0,0,0,0.32)' : '0 0px 0px rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full border transition-[backdrop-filter] duration-700 ${scrolled ? 'backdrop-blur-xl' : 'backdrop-blur-0'}`}
      >
        <div className="container mx-auto px-5 sm:px-8 grid grid-cols-2 min-[901px]:grid-cols-3 items-center py-1 sm:py-3 lg:py-4">
          {/* Left: Logo */}
          <div className="flex justify-start">
            <Link href="/" className="inline-flex items-center shrink-0 z-10">
              <Image
                src="/logo.png"
                alt="Infraguru"
                width={280}
                height={90}
                className="object-contain transition-all duration-500 drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)] brightness-0 invert h-10 sm:h-[4.25rem] w-auto"
                priority
              />
            </Link>
          </div>

          {/* Center: Desktop Links */}
          <div className="hidden min-[901px]:flex justify-center items-center gap-2">
            {LINKS.map((link) =>
              link.href.startsWith('/') ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-5 py-2.5 text-sm font-semibold tracking-[0.1em] uppercase transition-all duration-300 rounded-lg text-white drop-shadow-md hover:bg-white/20"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative px-5 py-2.5 text-sm font-semibold tracking-[0.1em] uppercase transition-all duration-300 rounded-lg text-white drop-shadow-md hover:bg-white/20"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* Right: Desktop CTA & Mobile Hamburger */}
          <div className="flex justify-end items-center">
            <Link
              href="/contact"
              className={`hidden min-[901px]:inline-flex items-center gap-3 px-6 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${scrolled
                ? 'rounded-full border border-transparent bg-gold-gradient text-primary-dark hover:brightness-110'
                : 'rounded-[4px] border border-white/30 bg-transparent text-white hover:bg-white hover:text-black'
                }`}
            >
              BOOK A CONSULTATION
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7m0 0H8m9 0v9" /></svg>
            </Link>

            <button
              className="z-[110] flex h-9 w-9 flex-col items-center justify-center gap-[5px] min-[901px]:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span className={`block h-[1.5px] w-6 transition-all duration-300 origin-center bg-white ${menuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
              <span className={`block h-[1.5px] w-6 transition-all duration-300 bg-white ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-[1.5px] w-6 transition-all duration-300 origin-center bg-white ${menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-4 top-full mt-2 flex flex-col gap-1.5 rounded-[24px] border border-white/10 bg-[#0B1320]/95 backdrop-blur-3xl p-6 shadow-[0_40px_80px_rgba(0,0,0,0.6)] min-[901px]:hidden"
            >
              {LINKS.map((link) =>
                link.href.startsWith('/') ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center justify-between px-4 py-4 text-xs font-bold uppercase tracking-widest text-white/80 hover:text-white rounded-2xl hover:bg-white/5 transition-all duration-300"
                  >
                    {link.label}
                    <span className="text-white/30 text-lg font-light transition-colors group-hover:text-gold-gradient">→</span>
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center justify-between px-4 py-4 text-xs font-bold uppercase tracking-widest text-white/80 hover:text-white rounded-2xl hover:bg-white/5 transition-all duration-300"
                  >
                    {link.label}
                    <span className="text-white/30 text-lg font-light transition-colors group-hover:text-gold-gradient">→</span>
                  </a>
                )
              )}
              <Link
                href="/contact"
                className="mt-4 flex w-full items-center justify-center rounded-full bg-gold-gradient py-4 text-center text-[11px] font-bold text-[#132731] uppercase tracking-widest shadow-[0_10px_30px_rgba(212,175,55,0.2)] transition-all duration-300 hover:brightness-110 hover:shadow-[0_15px_40px_rgba(212,175,55,0.3)]"
                onClick={() => setMenuOpen(false)}
              >
                BOOK A CONSULTATION
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}
