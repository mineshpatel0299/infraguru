import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import SealTransitionProvider from "@/components/SealTransition";
import Preloader from "@/components/Preloader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const giordano = localFont({
  src: "../../public/Giordano Gold Serif/Giordano Gold Serif.ttf",
  variable: "--font-giordano",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Infraguru - Ultra Premium Real Estate",
  description: "Experience the pinnacle of luxury real estate with Infraguru.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${giordano.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Preloader>
          <SealTransitionProvider>
            {children}
          </SealTransitionProvider>
        </Preloader>
      </body>
    </html>
  );
}
