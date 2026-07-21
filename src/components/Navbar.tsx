"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#process', label: 'Process' },
  { href: '#testimonials', label: 'Testimonials' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-8 sm:top-12 lg:top-14 z-[100]"
    >
      <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
        <nav
          className={`flex items-center justify-between rounded-full border px-5 py-2.5 sm:px-7 sm:py-3 transition-all duration-500 ${
            scrolled
              ? 'border-primary/10 bg-white/90 shadow-[0_8px_30px_rgba(3,46,151,0.12)] backdrop-blur-xl'
              : 'border-white/25 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-md'
          }`}
        >
          {/* Logo */}
          <a href="#hero" className="inline-flex items-center shrink-0 z-10">
            <Image
              src="/logo.png"
              alt="Infraguru"
              width={200}
              height={64}
              className={`object-contain transition-all duration-500 drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)] ${
                scrolled ? 'h-11 w-auto' : 'h-12 w-auto'
              }`}
              priority
            />
          </a>

          {/* Desktop Links */}
          <div className="hidden items-center gap-1 min-[901px]:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-[0.78rem] font-semibold tracking-[0.12em] uppercase transition-colors duration-200 rounded-full hover:bg-white/10 ${
                  scrolled
                    ? 'text-ink hover:text-primary hover:bg-primary/5'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="ml-3 h-5 w-px bg-current opacity-20" />
            <a
              href="#footer"
              className={`ml-3 rounded-full px-7 py-2.5 text-[0.78rem] font-bold tracking-[0.12em] uppercase transition-all duration-300 hover:-translate-y-0.5 ${
                scrolled
                  ? 'bg-primary text-white shadow-[0_8px_24px_rgba(3,46,151,0.25)] hover:bg-primary-dark hover:shadow-[0_12px_30px_rgba(3,46,151,0.35)]'
                  : 'bg-secondary text-primary-dark shadow-[0_8px_24px_rgba(212,175,55,0.3)] hover:bg-secondary-hover'
              }`}
            >
              Connect
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="z-[110] flex h-9 w-9 flex-col items-center justify-center gap-[5px] min-[901px]:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block h-[1.5px] w-6 transition-all duration-300 origin-center ${scrolled ? 'bg-primary' : 'bg-white'} ${menuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
            <span className={`block h-[1.5px] w-6 transition-all duration-300 ${scrolled ? 'bg-primary' : 'bg-white'} ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-[1.5px] w-6 transition-all duration-300 origin-center ${scrolled ? 'bg-primary' : 'bg-white'} ${menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-4 top-full mt-3 flex flex-col gap-1 rounded-[28px] border border-primary/10 bg-white/98 backdrop-blur-2xl p-6 shadow-[0_30px_80px_rgba(3,46,151,0.18)] min-[901px]:hidden"
            >
              {/* Logo in mobile menu */}
              <div className="mb-4 pb-4 border-b border-hairline">
                <Image src="/logo.png" alt="Infraguru" width={140} height={44} className="h-10 w-auto object-contain" />
              </div>
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-2 py-3 text-[0.9rem] font-semibold uppercase tracking-[0.1em] text-ink hover:text-primary rounded-xl hover:bg-bg-soft transition-all duration-200"
                >
                  {link.label}
                  <span className="text-muted text-xs">→</span>
                </a>
              ))}
              <a
                href="#footer"
                className="btn-primary mt-4 justify-center text-center rounded-full"
                onClick={() => setMenuOpen(false)}
              >
                Connect
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
