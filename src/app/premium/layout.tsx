import type { Metadata } from "next";

// /premium is an internal design preview that duplicates the primary site's
// content — keep it out of search results so it doesn't compete with the
// canonical pages under "/".
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PremiumLayout({ children }: { children: React.ReactNode }) {
  return children;
}
