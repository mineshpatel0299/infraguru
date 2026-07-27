import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import SealTransitionProvider from "@/components/SealTransition";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Infraguru - Ultra Premium Real Estate",
  description: "Experience the pinnacle of luxury real estate with Infraguru.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body>
        <SealTransitionProvider>
          {children}
          {modal}
        </SealTransitionProvider>
      </body>
    </html>
  );
}
