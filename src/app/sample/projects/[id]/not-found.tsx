import Link from "next/link";

export default function NotFound() {
  return (
    <main className="theme-aurum flex min-h-screen flex-col items-center justify-center bg-aurum-cream px-6 text-center">
      <img src="/logo.png" alt="Infraguru" className="mb-10 h-11 w-auto object-contain" />
      <span className="aurum-eyebrow justify-center">Deed Not Found</span>
      <h1 className="mt-5 mb-5 max-w-lg text-[clamp(2rem,4vw,3rem)] font-normal text-aurum-ink">
        This Parcel Isn&rsquo;t On Record
      </h1>
      <p className="mb-10 max-w-md text-[1.02rem] leading-[1.7] text-aurum-muted">
        The listing you&rsquo;re looking for may have been sold, renamed, or never existed. Let&rsquo;s get you
        back to the portfolio.
      </p>
      <Link href="/sample#projects" className="aurum-btn-gold">
        Return To Portfolio
      </Link>
    </main>
  );
}
