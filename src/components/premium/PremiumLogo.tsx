import React from 'react';

/**
 * Recreated from the brand mark: an interlocking I/G monogram in a
 * gold-to-bronze gradient, set above the "INFRA GURU" wordmark and
 * "A Tradition of Trust" tagline. Rebuilt in SVG/type (no source
 * raster was available) using the supplied brand palette.
 */
export default function PremiumLogo({
  variant = 'dark',
  stacked = false,
  className = '',
}: {
  variant?: 'dark' | 'light';
  stacked?: boolean;
  className?: string;
}) {
  const wordmark = variant === 'dark' ? '#331E00' : '#FFEEE1';
  const tagline = variant === 'dark' ? '#B97A00' : '#FFCA99';
  const gradId = `ig-grad-${variant}`;

  const monogram = (
    <svg width={stacked ? 44 : 34} height={stacked ? 44 : 34} viewBox="0 0 40 40" aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFCA99" />
          <stop offset="45%" stopColor="#EC9C00" />
          <stop offset="100%" stopColor="#895900" />
        </linearGradient>
      </defs>
      {/* G */}
      <path
        d="M29.5 12.5C27.7 9.6 24.9 8 21.2 8 14.6 8 10 13 10 20s4.6 12 11.2 12c5.6 0 9.6-3.3 10.4-8.6H21v-4.2h14.7v2.6c-.9 8.4-7.2 14.4-15.5 14.4C10.4 36.2 4 29.4 4 20S10.4 3.8 20.2 3.8c6.3 0 11.4 2.9 14 8z"
        fill={`url(#${gradId})`}
      />
      {/* I stem */}
      <rect x="18.4" y="17" width="3.6" height="15.5" fill={`url(#${gradId})`} />
      {/* diamond accent above the I */}
      <rect x="17.3" y="10.2" width="5.8" height="5.8" transform="rotate(45 20.2 13.1)" fill={`url(#${gradId})`} />
    </svg>
  );

  if (stacked) {
    return (
      <span className={`inline-flex flex-col items-center ${className}`}>
        {monogram}
        <span
          style={{ fontFamily: "'Manrope', sans-serif", color: wordmark }}
          className="mt-2 text-[1.1rem] font-extrabold tracking-[0.16em]"
        >
          INFRA GURU
        </span>
        <span className="mt-1.5 flex items-center gap-2">
          <span className="h-px w-4" style={{ backgroundColor: tagline }} />
          <span style={{ color: tagline }} className="text-[0.55rem] font-bold tracking-[0.28em] uppercase">
            A Tradition of Trust
          </span>
          <span className="h-px w-4" style={{ backgroundColor: tagline }} />
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      {monogram}
      <span className="flex flex-col leading-none">
        <span
          style={{ fontFamily: "'Manrope', sans-serif", color: wordmark }}
          className="text-[1.05rem] font-extrabold tracking-[0.14em]"
        >
          INFRA GURU
        </span>
        <span style={{ color: tagline }} className="mt-1 text-[0.56rem] font-bold tracking-[0.28em] uppercase">
          A Tradition of Trust
        </span>
      </span>
    </span>
  );
}
