"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/motion';

const LINK_COLUMNS = [
  {
    title: 'Company',
    links: ['About Us', 'Our Process', 'Careers', 'Press'],
  },
  {
    title: 'Services',
    links: ['Residential', 'Commercial', 'Infrastructure', 'Consulting'],
  },
];

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-visible bg-[linear-gradient(160deg,var(--color-primary-dark)_0%,var(--color-primary)_100%)] pt-22 pb-8 text-white/85">
      <div className="container mx-auto max-w-7xl px-8">
        <motion.div
          className="relative top-[-8rem] mb-[-3rem] flex flex-wrap items-center justify-between gap-10 rounded-[28px] border-t-5 border-secondary bg-white p-14 shadow-strong max-md:flex-col max-md:items-start max-md:p-10 max-sm:top-[-4rem] max-sm:p-8"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <span className="mb-3 block text-[0.78rem] font-bold tracking-[3px] text-secondary-hover uppercase">Take The Next Step</span>
            <h2 className="mb-2.5 text-[clamp(1.9rem,3vw,2.6rem)] text-primary-dark">Your Legacy Awaits</h2>
            <p className="max-w-95 text-[1rem] text-muted">
              Connect with our private advisors to schedule an exclusive consultation.
            </p>
          </div>
          <form className="flex flex-wrap gap-4 max-sm:w-full" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="min-w-60 rounded border-[1.5px] border-hairline px-5.5 py-3.75 font-body text-[0.95rem] text-ink focus:border-primary focus:outline-none max-sm:min-w-0 max-sm:flex-1"
            />
            <button type="submit" className="btn-gold">Request Consultation</button>
          </form>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-10 pt-8 pb-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <div>
            <span className="mb-5 block font-heading text-[1.6rem] tracking-[2px] text-white">INFRAGURU</span>
            <p className="mb-7 max-w-80 text-[0.92rem] leading-[1.7] text-white/65">
              A Tradition of Trust — engineering premium infrastructure and real estate
              legacies since 2011.
            </p>
            <div className="flex gap-3">
              {['LinkedIn', 'Instagram', 'X'].map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="flex h-9.5 w-9.5 items-center justify-center rounded-full border border-white/20 text-[0.85rem] font-bold transition-all duration-200 hover:-translate-y-0.75 hover:border-secondary hover:bg-secondary hover:text-primary-dark"
                >
                  {s.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {LINK_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-6 text-[1rem] tracking-wide text-white uppercase">{col.title}</h4>
              <ul className="flex flex-col gap-3.5">
                {col.links.map((link) => (
                  <li key={link} className="text-[0.92rem] text-white/65">
                    <a href="#" className="transition-colors duration-200 hover:text-secondary">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-6 text-[1rem] tracking-wide text-white uppercase">Contact</h4>
            <ul className="flex flex-col gap-3.5 text-[0.92rem] text-white/65">
              <li>Skyline Tower, Sector 44</li>
              <li>Gurugram, India</li>
              <li>hello@infraguru.com</li>
              <li>+91 98765 43210</li>
            </ul>
          </div>
        </motion.div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/12 pt-7 text-[0.85rem] text-white/55">
          <span>&copy; {new Date().getFullYear()} Infraguru. All rights reserved.</span>
          <div className="flex gap-7">
            <a href="#" className="hover:text-secondary">Privacy Policy</a>
            <a href="#" className="hover:text-secondary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
