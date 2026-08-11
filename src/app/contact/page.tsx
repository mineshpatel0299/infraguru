import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Connect with Infraguru's private advisors for an exclusive consultation on premium real estate investments in Gurugram and beyond.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Infraguru",
    description:
      "Connect with Infraguru's private advisors for an exclusive consultation on premium real estate investments.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
