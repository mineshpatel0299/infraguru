"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, type MotionValue } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", hash: "" },
  { label: "About", hash: "about" },
  { label: "Projects", hash: "portfolio" },
  { label: "Contact", hash: "contact" },
];

export default function SampleNavbar({
  homeHref = "/sample",
  transparent = false,
  heroProgress,
}: {
  homeHref?: string;
  /** Overlays a full-bleed hero: fixed position, hidden through the hero, then shows only on scroll-up afterward. */
  transparent?: boolean;
  /**
   * 0→1 scroll progress of the hero's box-to-full-bleed expansion (see
   * SamplePage). Gates the overlay nav: hidden outright while the hero is
   * still a small framed box. Once it's fully expanded, visibility switches
   * to scroll direction — up reveals the nav, down hides it again — the
   * same show-on-scroll-up pattern most sites use, just suppressed for the
   * hero's own deliberate reveal instead of engaging immediately.
   */
  heroProgress?: MotionValue<number>;
}) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(!transparent);

  const [isLightSection, setIsLightSection] = useState(false);

  useEffect(() => {
    if (!transparent) {
      setVisible(true);
      return;
    }
    if (!heroProgress) return;

    const evaluate = () => {
      const heroExpanded = heroProgress.get() >= 0.95;

      // Check if inside portfolio section
      const portfolioEl = document.getElementById("portfolio");
      let inPortfolio = false;
      if (portfolioEl) {
        const rect = portfolioEl.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          inPortfolio = true;
        }
      }

      // Check if inside about section or light background
      const aboutEl = document.getElementById("about");
      let inLight = false;
      if (portfolioEl && inPortfolio) {
        inLight = true;
      } else if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          inLight = true;
        }
      }
      setIsLightSection(inLight);

      // Visibility Rules:
      // 1. Hidden in initial stage / while video hero is zooming into screen (heroProgress < 0.95)
      // 2. Hidden inside portfolio section
      // 3. Visible once video hero is completely zoomed in / expanded
      if (!heroExpanded || inPortfolio) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    evaluate();
    window.addEventListener("scroll", evaluate, { passive: true });
    const unsubscribeHero = heroProgress.on("change", evaluate);
    return () => {
      window.removeEventListener("scroll", evaluate);
      unsubscribeHero();
    };
  }, [transparent, heroProgress]);

  if (!transparent) {
    return (
      <motion.nav className="sticky top-0 z-50 flex w-full items-center justify-between bg-white/90 px-4 py-3 backdrop-blur-md sm:px-8 sm:py-4 lg:px-14">
        <Link href="/sample" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="Brand Logo" className="h-9 w-auto object-contain sm:h-12" />
        </Link>

        <div className="hidden items-center gap-10 text-[0.8rem] font-light tracking-wide text-aurum-ink/70 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.hash ? `${homeHref}#${link.hash}` : homeHref}
              className="transition-colors hover:text-aurum-gold-dark"
            >
              {link.label}
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
            <BurgerLines open={open} />
          </button>
        </div>

        <MobileMenu open={open} setOpen={setOpen} homeHref={homeHref} />
      </motion.nav>
    );
  }

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -16 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: visible ? "auto" : "none" }}
        className="fixed top-0 inset-x-0 z-50 flex w-full flex-col items-center justify-center py-3 sm:py-4 border-b border-white/20 bg-black/25 backdrop-blur-xl transition-all duration-500 shadow-2xl"
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="absolute top-4 right-6 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 text-white bg-black/30 backdrop-blur-md md:hidden"
        >
          <BurgerLines open={open} />
        </button>

        {/* Centered Brand Logo */}
        <Link href="/sample" onClick={() => setOpen(false)} className="mb-2 sm:mb-3">
          <img
            src="/logo.png"
            alt="Brand Logo"
            className="h-10 sm:h-12 w-auto object-contain brightness-0 invert drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
          />
        </Link>

        {/* Centered Nav Links Row */}
        <div className="hidden md:flex items-center gap-10 lg:gap-14 text-white">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.hash ? `${homeHref}#${link.hash}` : homeHref}
              className="text-[0.75rem] sm:text-[0.8rem] font-medium tracking-[0.25em] text-white/90 uppercase transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <MobileMenu open={open} setOpen={setOpen} homeHref={homeHref} />
      </motion.nav>
    </>
  );
}

function BurgerLines({ open }: { open: boolean }) {
  return (
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
  );
}

function MobileMenu({
  open,
  setOpen,
  homeHref,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  homeHref: string;
}) {
  return (
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
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.hash ? `${homeHref}#${link.hash}` : homeHref}
                    onClick={() => setOpen(false)}
                    className="block py-4 text-lg text-aurum-ink"
                  >
                    {link.label}
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
  );
}
