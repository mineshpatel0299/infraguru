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
  /** Overlays a full-bleed hero: fixed position, hidden until the hero reaches full-bleed, then a permanent light overlay. */
  transparent?: boolean;
  /**
   * 0→1 scroll progress of the hero's box-to-full-bleed expansion (see
   * SamplePage). Drives the overlay nav's visibility: hidden while the hero
   * is still a small framed box, fading in only once the image has reached
   * full-bleed. From that point on the nav keeps this same look for the
   * rest of the page — it never switches to a different "scrolled" style.
   */
  heroProgress?: MotionValue<number>;
}) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(!transparent);

  useEffect(() => {
    if (!transparent) {
      setVisible(true);
      return;
    }
    if (!heroProgress) return;
    const update = (v: number) => setVisible(v >= 0.9);
    update(heroProgress.get());
    return heroProgress.on("change", update);
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
      {/*
       * A dedicated scrim, independent of whatever the hero image is doing
       * underneath — by the time this is visible the hero is already
       * full-bleed, but the scrim keeps the nav readable as the page
       * continues scrolling past it into lighter sections below.
       */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-36 bg-gradient-to-b from-black/30 to-transparent sm:h-44"
      />

      <motion.nav
        initial={false}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -16 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: visible ? "auto" : "none" }}
        className="fixed top-0 z-50 flex w-full flex-col items-center gap-3 bg-transparent px-4 py-4 sm:gap-4 sm:py-6"
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="absolute top-4 right-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-aurum-cream/40 text-aurum-cream sm:top-5 sm:right-8 md:hidden"
        >
          <BurgerLines open={open} />
        </button>

        <Link href="/sample" onClick={() => setOpen(false)}>
          <img
            src="/logo.png"
            alt="Brand Logo"
            className="h-10 w-auto object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] brightness-0 invert sm:h-14"
          />
        </Link>

        <div className="hidden items-center gap-8 text-[0.7rem] font-light tracking-[0.25em] text-aurum-cream/90 uppercase md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.hash ? `${homeHref}#${link.hash}` : homeHref}
              className="transition-colors hover:text-aurum-gold-light"
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
