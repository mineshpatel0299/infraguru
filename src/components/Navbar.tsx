"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#project-showcase', label: 'Projects' },
  { href: '#testimonials', label: 'Testimonials' },
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
      className={`fixed inset-x-0 top-0 z-[100] border-b transition-all duration-500 ${
        scrolled
          ? 'border-white/10 bg-[#0b1320]/80 shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl'
          : 'border-white/10 bg-black/40 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto max-w-7xl px-5 sm:px-8 transition-all duration-500 grid grid-cols-2 min-[901px]:grid-cols-3 items-center py-3 lg:py-4">
        {/* Left: Logo */}
        <div className="flex justify-start">
          <a href="#hero" className="inline-flex items-center shrink-0 z-10">
            <Image
              src="/logo.png"
              alt="Infraguru"
              width={280}
              height={90}
              className="object-contain transition-all duration-500 drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)] brightness-0 invert h-14 sm:h-[4.25rem] w-auto"
              priority
            />
          </a>
        </div>

        {/* Center: Desktop Links */}
        <div className="hidden min-[901px]:flex justify-center items-center gap-2">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-5 py-2.5 text-sm font-semibold tracking-[0.1em] uppercase transition-all duration-300 rounded-lg text-white drop-shadow-md hover:bg-white/20"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: Desktop CTA & Mobile Hamburger */}
        <div className="flex justify-end items-center">
          <a
            href="#contact"
            className="hidden min-[901px]:inline-flex rounded-xl bg-white px-7 py-3 text-sm font-bold text-black uppercase tracking-[0.05em] shadow-[0_8px_24px_rgba(255,255,255,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-100 hover:shadow-[0_12px_30px_rgba(255,255,255,0.15)]"
          >
            Book A Consultation
          </a>

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
            className="absolute inset-x-4 top-full mt-2 flex flex-col gap-1 rounded-[20px] border border-white/10 bg-[#0b1320]/95 backdrop-blur-3xl p-6 shadow-[0_30px_80px_rgba(0,0,0,0.5)] min-[901px]:hidden"
          >
            <div className="mb-4 pb-4 border-b border-white/10">
              <Image src="/logo.png" alt="Infraguru" width={140} height={44} className="h-12 w-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)] brightness-0 invert" />
            </div>
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between px-2 py-3 text-h4 font-semibold uppercase text-white/90 hover:text-white rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                {link.label}
                <span className="text-white/30 text-caption">→</span>
              </a>
            ))}
            <a
              href="#contact"
              className="mt-4 flex w-full items-center justify-center rounded-xl bg-white py-3 text-center text-label font-bold text-black uppercase shadow-md hover:bg-neutral-100"
              onClick={() => setMenuOpen(false)}
            >
              Book A Consultation
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
