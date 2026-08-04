"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportMirror } from '@/lib/motion';

const LINK_COLUMNS = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Residential', href: '#' },
      { label: 'Commercial', href: '#' },
      { label: 'Infrastructure', href: '#' },
      { label: 'Consulting', href: '#' },
    ],
  },
];

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-primary-dark text-white">

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[30%] left-[10%] w-[60vw] h-[60vw] rounded-full bg-white/5 blur-[120px] opacity-50" />
        <div className="absolute -bottom-[20%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-white/5 blur-[100px]" />
      </div>

      {/* Divider */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 mt-8 sm:mt-16">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Main Footer Grid */}
      <motion.div
        className="relative z-10 container mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 py-16 sm:py-24 grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportMirror}
      >
        {/* Brand Column */}
        <motion.div variants={fadeUp} className="col-span-2 lg:col-span-1">
          <a href="#hero" className="inline-block mb-5 sm:mb-8">
            <Image
              src="/logo.png"
              alt="Infraguru"
              width={180}
              height={58}
              className="h-10 sm:h-14 w-auto object-contain brightness-0 invert"
            />
          </a>
          <p className="mb-5 sm:mb-8 max-w-[280px] text-body text-white/70">
            A tradition of trust — engineering premium infrastructure and real estate legacies since 2011.
          </p>
          <div className="flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all duration-300 hover:border-transparent hover:bg-white hover:text-primary-dark hover:-translate-y-0.5"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Link Columns */}
        {LINK_COLUMNS.map((col) => (
          <motion.div key={col.title} variants={fadeUp}>
            <h4 className="mb-3 sm:mb-6 text-label font-semibold text-white/50 uppercase">
              {col.title}
            </h4>
            <ul className="flex flex-col gap-2 sm:gap-3">
              {col.links.map((link) =>
                link.href.startsWith('/') ? (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-body text-white/80 transition-all duration-200 hover:text-white hover:translate-x-1 inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-white transition-all duration-200 group-hover:w-3" />
                      {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-body text-white/80 transition-all duration-200 hover:text-white hover:translate-x-1 inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-white transition-all duration-200 group-hover:w-3" />
                      {link.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </motion.div>
        ))}

        {/* Contact Column */}
        <motion.div variants={fadeUp} className="col-span-2 lg:col-span-1">
          <h4 className="mb-3 sm:mb-6 text-label font-semibold text-white/50 uppercase">
            Contact
          </h4>
          <ul className="flex flex-col gap-2 sm:gap-3 text-body text-white/80">
            <li>
              <span>Tower B-3, Spaze Itech Park<br />Sector-49, Gurugram, Haryana</span>
            </li>
            <li>
              <a href="mailto:info@infraguru.in" className="hover:text-white transition-colors">
                info@infraguru.in
              </a>
            </li>
            <li>
              <a href="tel:+919090656575" className="hover:text-white transition-colors">
                +91 90 90 65 65 75
              </a>
            </li>
            <li>
              <a href="https://www.infraguru.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                www.infraguru.in
              </a>
            </li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 py-5 sm:py-6 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <span className="text-caption text-white/50">
            © {new Date().getFullYear()} Infraguru. All rights reserved.
          </span>
          <div className="flex items-center gap-5 sm:gap-12 lg:gap-16">
            <a href="#" className="text-caption text-white/50 hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-caption text-white/50 hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
