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

const linkBase =
  "relative text-[0.85rem] font-semibold tracking-wide uppercase transition-colors duration-200 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-secondary after:transition-all after:duration-200 hover:after:w-full";

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
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-4 z-100 sm:top-6"
    >
      <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
        <nav
          className={`flex items-center justify-between rounded-full border px-5 py-2.5 transition-all duration-300 sm:px-7 sm:py-3 ${
            scrolled
              ? 'border-primary/10 bg-white/90 shadow-[0_8px_30px_rgba(3,46,151,0.12)] backdrop-blur-xl'
              : 'border-white/25 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-md'
          }`}
        >
          <a href="#hero" className="inline-flex">
            <Image
              src="/logo.png"
              alt="Infraguru"
              width={160}
              height={48}
              className="h-auto w-28 object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
              priority
            />
          </a>

          <div className="hidden items-center gap-8 min-[901px]:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`${linkBase} ${scrolled ? 'text-ink hover:text-primary' : 'text-white hover:text-secondary-light'}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#footer"
              className="rounded-full bg-secondary px-6 py-2.5 text-[0.85rem] font-bold tracking-wide text-primary-dark uppercase transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary-hover"
            >
              Connect
            </a>
          </div>

          <button
            className="z-110 flex h-8 w-8 flex-col justify-center gap-1.25 min-[901px]:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-full transition-all duration-200 ${scrolled ? 'bg-primary' : 'bg-white'} ${menuOpen ? 'translate-y-1.75 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-full transition-all duration-200 ${scrolled ? 'bg-primary' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-full transition-all duration-200 ${scrolled ? 'bg-primary' : 'bg-white'} ${menuOpen ? '-translate-y-1.75 -rotate-45' : ''}`} />
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-4 top-full mt-3 flex flex-col gap-6 rounded-[28px] border border-primary/10 bg-white p-8 shadow-strong sm:inset-x-6 min-[901px]:hidden"
            >
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[1.1rem] font-semibold uppercase tracking-wide text-ink"
                >
                  {link.label}
                </a>
              ))}
              <a href="#footer" className="btn-primary mt-2 justify-center text-center" onClick={() => setMenuOpen(false)}>
                Connect
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
