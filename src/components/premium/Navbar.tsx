"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumLogo from './PremiumLogo';

const LINKS = [
  { href: '#about', label: 'Philosophy' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#journey', label: 'Journey' },
  { href: '#voices', label: 'Voices' },
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
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-500 ${
        scrolled ? 'bg-aurum-cream/95 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-350 items-center justify-between px-6 py-5 sm:px-10 lg:px-14">
        <a href="#hero" className="shrink-0">
          <img src="/logo2.png" alt="Infraguru Logo" className={`transition-all duration-300 ${scrolled ? 'h-12' : 'h-16 w-auto object-contain brightness-0 invert'}`} />
        </a>

        <nav className="hidden items-center gap-9 min-[960px]:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-aurum-gold after:transition-all after:duration-300 hover:after:w-full ${
                scrolled ? 'text-aurum-ink-soft hover:text-aurum-ink' : 'text-aurum-cream/85 hover:text-aurum-cream'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#footer"
          className={`hidden min-[960px]:inline-flex items-center gap-2.5 border px-6 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
            scrolled
              ? 'border-aurum-ink text-aurum-ink hover:bg-aurum-ink hover:text-aurum-cream'
              : 'border-aurum-cream/50 text-aurum-cream hover:border-aurum-cream hover:bg-aurum-cream/10'
          }`}
        >
          Private Consultation
        </a>

        {/* Hamburger */}
        <button
          className="z-[110] flex h-9 w-9 flex-col items-center justify-center gap-[6px] min-[960px]:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block h-px w-6 transition-all duration-300 origin-center ${scrolled || menuOpen ? 'bg-aurum-ink' : 'bg-aurum-cream'} ${menuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
          <span className={`block h-px w-6 transition-all duration-300 ${scrolled || menuOpen ? 'bg-aurum-ink' : 'bg-aurum-cream'} ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 transition-all duration-300 origin-center ${scrolled || menuOpen ? 'bg-aurum-ink' : 'bg-aurum-cream'} ${menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
        </button>
      </div>

      <div className={`h-px w-full transition-colors duration-500 ${scrolled ? 'bg-aurum-hairline' : 'bg-transparent'}`} />

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full flex flex-col gap-1 bg-aurum-cream p-8 shadow-[0_30px_60px_rgba(27,26,22,0.18)] min-[960px]:hidden"
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-aurum-hairline py-4 text-[0.95rem] font-medium uppercase tracking-[0.12em] text-aurum-ink"
              >
                {link.label}
                <span className="text-aurum-gold text-xs">&rarr;</span>
              </a>
            ))}
            <a
              href="#footer"
              onClick={() => setMenuOpen(false)}
              className="aurum-btn-solid mt-6 justify-center text-center"
            >
              Private Consultation
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
