"use client";

import Link from "next/link";

const NAV_LINKS = ["About", "Services", "Portfolio", "Process"];
const SOCIAL_LINKS = ["Facebook", "LinkedIn", "Instagram"];

export default function SampleFooter({ homeHref = "/sample" }: { homeHref?: string }) {
  return (
    <footer className="mt-3 rounded-t-[28px] bg-aurum-ink px-6 pt-14 pb-8 sm:mt-4 sm:rounded-t-[36px] sm:px-10 sm:pt-20 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <img src="/logo.png" alt="Brand Logo" className="h-10 w-auto object-contain brightness-0 invert" />
            <p className="mt-4 max-w-50 text-[0.8rem] leading-relaxed text-aurum-cream/50">
              A tradition of trust — engineering premium infrastructure and real estate legacies since 2011.
            </p>
          </div>

          <div>
            <span className="text-[0.65rem] tracking-[0.25em] text-aurum-cream/40 uppercase">Explore</span>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <Link
                    href={`${homeHref}#${link.toLowerCase()}`}
                    className="text-sm text-aurum-cream/70 transition-colors hover:text-aurum-gold-light"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[0.65rem] tracking-[0.25em] text-aurum-cream/40 uppercase">Contact</span>
            <ul className="mt-4 space-y-3 text-sm text-aurum-cream/70">
              <li>info@infraguru.in</li>
              <li>+91 90 90 65 65 75</li>
              <li>Sector-49, Gurugram, Haryana</li>
            </ul>
          </div>

          <div>
            <span className="text-[0.65rem] tracking-[0.25em] text-aurum-cream/40 uppercase">Follow</span>
            <ul className="mt-4 space-y-3">
              {SOCIAL_LINKS.map((s) => (
                <li key={s}>
                  <a href="#" className="text-sm text-aurum-cream/70 transition-colors hover:text-aurum-gold-light">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-aurum-cream/10 pt-6 text-[0.7rem] text-aurum-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Infraguru. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-aurum-cream/70">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-aurum-cream/70">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
