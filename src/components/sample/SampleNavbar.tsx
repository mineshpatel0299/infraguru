"use client";

import Link from "next/link";

const NAV_LINKS = ["About", "Services", "Portfolio", "Process"];

export default function SampleNavbar({ homeHref = "/sample" }: { homeHref?: string }) {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-2 py-4 sm:px-4">
      <Link href="/sample">
        <img src="/logo.png" alt="Brand Logo" className="h-12 w-auto object-contain" />
      </Link>

      <div className="hidden items-center gap-10 text-[0.8rem] font-medium tracking-wide text-aurum-ink/70 md:flex">
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

      <Link href={`${homeHref}#contact`} className="aurum-btn-gold rounded-full px-6! py-2.5! text-[0.65rem]!">
        Book a Call
      </Link>
    </nav>
  );
}
