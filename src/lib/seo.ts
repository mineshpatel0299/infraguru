export const SITE_URL = "https://www.infraguru.in";
export const SITE_NAME = "Infraguru";
export const DEFAULT_TITLE = "Infraguru - Ultra Premium Real Estate";
export const DEFAULT_DESCRIPTION =
  "Infraguru is a private real estate advisory curating ultra-premium residences and commercial addresses across Gurugram, Delhi NCR, Goa, Dubai and Europe.";
export const DEFAULT_OG_IMAGE = "/hero-poster.jpg";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
