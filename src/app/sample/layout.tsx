import type { Metadata } from "next";

// /sample is an internal design preview that duplicates the primary site's
// project detail content — keep it out of search results so it doesn't
// compete with the canonical pages under "/projects".
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function SampleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
