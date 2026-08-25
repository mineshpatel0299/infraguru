import { getGoogleReviews } from "@/lib/googleReviews";

function Star({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-4 w-4 ${filled ? "fill-secondary" : "fill-neutral-300"}`}>
      <path d="M10 1.5l2.6 5.53 6.1.63-4.6 4.16 1.28 5.98L10 14.9l-5.38 2.9 1.28-5.98-4.6-4.16 6.1-.63L10 1.5z" />
    </svg>
  );
}

function StarRow({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} filled={i < rounded} />
      ))}
    </div>
  );
}

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0">
      <path fill="#4285F4" d="M23.52 12.27c0-.82-.07-1.6-.2-2.36H12v4.47h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.74z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3a7.15 7.15 0 0 1-10.65-3.76H1.4v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.42 14.34a7.2 7.2 0 0 1 0-4.62V6.62H1.4a12 12 0 0 0 0 10.82l4.02-3.1z" />
      <path fill="#EA4335" d="M12 4.75c1.76 0 3.35.6 4.6 1.79l3.45-3.45C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.4 6.62l4.02 3.1A7.15 7.15 0 0 1 12 4.75z" />
    </svg>
  );
}

export default async function GoogleReviews() {
  const data = await getGoogleReviews();
  if (!data || data.reviews.length === 0) return null;

  return (
    <section id="google-reviews" className="bg-bg-soft">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 md:px-14 lg:px-16 py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <span className="eyebrow">GOOGLE REVIEWS</span>
            <h2 className="text-h2 font-heading font-light text-ink">
              Rated by clients, <span className="font-bold text-gradient">verified on Google.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <GoogleLogo />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-h3 font-semibold text-ink">{data.rating.toFixed(1)}</span>
                <StarRow rating={data.rating} />
              </div>
              <p className="text-caption text-muted mt-1">Based on {data.reviewCount.toLocaleString()} Google reviews</p>
            </div>
            {data.mapsUri && (
              <a
                href={data.mapsUri}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary ml-2 hidden sm:inline-flex"
              >
                Read All Reviews
              </a>
            )}
          </div>
        </div>

        <div className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 -mx-6 px-6 sm:mx-0 sm:px-0">
          {data.reviews.map((review) => (
            <div
              key={review.id}
              className="snap-start shrink-0 w-[300px] sm:w-[340px] rounded-2xl bg-white border border-hairline shadow-soft p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {review.authorPhoto ? (
                    // Google-hosted profile photos come from unpredictable
                    // subdomains, so a plain <img> avoids maintaining a
                    // next/image remotePatterns allowlist for them.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={review.authorPhoto}
                      alt={review.authorName}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-bg-soft-2 text-primary font-semibold text-caption flex items-center justify-center">
                      {initials(review.authorName)}
                    </div>
                  )}
                  <div>
                    <p className="font-body font-semibold text-body text-ink leading-tight">{review.authorName}</p>
                    <p className="text-caption text-muted">{review.relativeTime}</p>
                  </div>
                </div>
                <GoogleLogo />
              </div>
              <StarRow rating={review.rating} />
              <p className="text-body text-muted mt-3 leading-relaxed line-clamp-6">{review.text}</p>
            </div>
          ))}
        </div>

        {data.mapsUri && (
          <a
            href={data.mapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8 sm:hidden inline-flex"
          >
            Read All Reviews
          </a>
        )}
      </div>
    </section>
  );
}
