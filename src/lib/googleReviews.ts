import { unstable_cache } from "next/cache";
import "server-only";

// Live Google reviews, pulled from the Places API (New) "Place Details"
// endpoint. Credentials are read lazily so the app can boot before they're
// set — the section just stays hidden until GOOGLE_PLACES_* env vars exist.
// The homepage renders `dynamic = "force-dynamic"`, which would otherwise
// force every fetch to `no-store`; wrapping the call in `unstable_cache`
// keeps it on its own revalidate schedule instead of hitting Google's
// (billed) API on every single page load.
const REVALIDATE_SECONDS = 6 * 60 * 60; // 6 hours

export type GoogleReview = {
  id: string;
  authorName: string;
  authorPhoto: string | null;
  authorProfileUrl: string | null;
  rating: number;
  text: string;
  relativeTime: string;
};

export type GooglePlaceReviews = {
  rating: number;
  reviewCount: number;
  mapsUri: string | null;
  reviews: GoogleReview[];
};

function getConfig() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;
  return { apiKey, placeId };
}

export function isGoogleReviewsConfigured(): boolean {
  return getConfig() !== null;
}

type PlacesApiReview = {
  name: string;
  relativePublishTimeDescription: string;
  rating: number;
  text?: { text: string };
  originalText?: { text: string };
  authorAttribution?: { displayName: string; photoUri?: string; uri?: string };
};

type PlacesApiResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesApiReview[];
};

async function fetchGoogleReviews(): Promise<GooglePlaceReviews | null> {
  const config = getConfig();
  if (!config) return null;

  const url = `https://places.googleapis.com/v1/places/${config.placeId}`;
  const res = await fetch(url, {
    headers: {
      "X-Goog-Api-Key": config.apiKey,
      "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
    },
  });

  if (!res.ok) {
    console.error(`Google Places API request failed: ${res.status} ${await res.text().catch(() => res.statusText)}`);
    return null;
  }

  const data = (await res.json()) as PlacesApiResponse;

  return {
    rating: data.rating ?? 0,
    reviewCount: data.userRatingCount ?? 0,
    mapsUri: data.googleMapsUri ?? null,
    reviews: (data.reviews ?? []).map((r) => ({
      id: r.name,
      authorName: r.authorAttribution?.displayName ?? "Google User",
      authorPhoto: r.authorAttribution?.photoUri ?? null,
      authorProfileUrl: r.authorAttribution?.uri ?? null,
      rating: r.rating,
      text: r.originalText?.text ?? r.text?.text ?? "",
      relativeTime: r.relativePublishTimeDescription,
    })),
  };
}

export const getGoogleReviews = unstable_cache(fetchGoogleReviews, ["google-place-reviews"], {
  revalidate: REVALIDATE_SECONDS,
  tags: ["google-reviews"],
});
