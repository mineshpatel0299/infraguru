"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = ["About", "Services", "Portfolio", "Process"];

export default function SampleNavbar({ homeHref = "/sample" }: { homeHref?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 mx-auto flex max-w-7xl items-center justify-between rounded-full bg-white/85 px-3 py-3 backdrop-blur-md sm:px-4 sm:py-4">
      <Link href="/sample" onClick={() => setOpen(false)}>
        <img src="/logo.png" alt="Brand Logo" className="h-9 w-auto object-contain sm:h-12" />
      </Link>

      <div className="hidden items-center gap-10 text-[0.8rem] font-light tracking-wide text-aurum-ink/70 md:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link}
            href={`${homeHref}#${link.toLowerCase()}`}
            className="transition-colors hover:text-aurum-gold-dark"
          >
            {link}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href={`${homeHref}#contact`}
          className="aurum-btn-gold hidden rounded-full px-6! py-2.5! text-[0.65rem]! sm:inline-flex"
        >
          Book a Call
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-aurum-hairline text-aurum-ink md:hidden"
        >
          <span className="relative flex h-3 w-4 flex-col justify-between">
            <motion.span
              animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="h-px w-full origin-center bg-current"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="h-px w-full bg-current"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="h-px w-full origin-center bg-current"
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            {/* Tap-outside-to-close catcher, starts below the header so the toggle stays visible */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-x-0 top-18 bottom-0 z-40 bg-aurum-ink/30 backdrop-blur-[2px] md:hidden"
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-full z-50 mt-2 rounded-3xl border border-aurum-hairline bg-white p-6 shadow-2xl md:hidden"
            >
              <div className="flex flex-col divide-y divide-aurum-hairline">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={`${homeHref}#${link.toLowerCase()}`}
                      onClick={() => setOpen(false)}
                      className="block py-4 text-lg text-aurum-ink"
                    >
                      {link}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <Link
                href={`${homeHref}#contact`}
                onClick={() => setOpen(false)}
                className="aurum-btn-gold mt-6 w-full justify-center rounded-full py-3.5 text-[0.7rem]"
              >
                Book a Call
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
