export type PriceRangeFilter = "any" | "under-5" | "5-10" | "above-10";

export const PRICE_RANGE_OPTIONS: { value: PriceRangeFilter; label: string }[] = [
  { value: "any", label: "Any Price" },
  { value: "under-5", label: "Under ₹5 Cr" },
  { value: "5-10", label: "₹5 Cr - ₹10 Cr" },
  { value: "above-10", label: "Above ₹10 Cr" },
];

// Project prices are free-text (e.g. "₹1.47 – 1.94 Cr onwards", "₹50 Lacs onwards"),
// so we take the lowest figure mentioned as the project's entry price for filtering.
export function parsePriceCr(price: string): number | null {
  const match = price.match(/[\d,]+(?:\.\d+)?/);
  if (!match) return null;
  const num = parseFloat(match[0].replace(/,/g, ""));
  if (Number.isNaN(num)) return null;
  return /lac|lakh/i.test(price) ? num / 100 : num;
}

export function matchesPriceRange(price: string, filter: PriceRangeFilter): boolean {
  if (filter === "any") return true;
  const cr = parsePriceCr(price);
  if (cr === null) return false;
  if (filter === "under-5") return cr < 5;
  if (filter === "5-10") return cr >= 5 && cr <= 10;
  return cr > 10;
}
