"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = ["About", "Services", "Portfolio", "Process"];

export default function SampleNavbar({
  homeHref = "/sample",
  transparent = false,
}: {
  homeHref?: string;
  /** Overlays a full-bleed hero: fixed position, transparent until scrolled, light text. */
  transparent?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!transparent) return;
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparent]);

  const overlay = transparent && !scrolled;

  return (
    <motion.nav
      initial={transparent ? { opacity: 0, y: -16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: transparent ? 1.8 : 0, ease: [0.16, 1, 0.3, 1] }}
      className={`z-50 flex w-full items-center justify-between px-4 py-3 transition-colors duration-500 sm:px-8 sm:py-4 lg:px-14 ${
        transparent ? "fixed top-0" : "sticky top-0"
      } ${overlay ? "bg-transparent" : "bg-white/90 backdrop-blur-md"}`}
    >
      <Link href="/sample" onClick={() => setOpen(false)}>
        <img
          src="/logo.png"
          alt="Brand Logo"
          className={`h-9 w-auto object-contain sm:h-12 ${
            overlay ? "brightness-0 invert drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]" : ""
          }`}
        />
      </Link>

      <div
        className={`hidden items-center gap-10 text-[0.8rem] font-light tracking-wide md:flex ${
          overlay ? "text-aurum-cream/90" : "text-aurum-ink/70"
        }`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link}
            href={`${homeHref}#${link.toLowerCase()}`}
            className={`transition-colors ${overlay ? "hover:text-aurum-gold-light" : "hover:text-aurum-gold-dark"}`}
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
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border md:hidden ${
            overlay ? "border-aurum-cream/40 text-aurum-cream" : "border-aurum-hairline text-aurum-ink"
          }`}
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
    </motion.nav>
  );
}
