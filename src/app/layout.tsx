import type { Metadata } from "next";
import SealTransitionProvider from "@/components/SealTransition";
import "./globals.css";

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
    <html lang="en">
      <body>
        <SealTransitionProvider>
          {children}
          {modal}
        </SealTransitionProvider>
      </body>
    </html>
  );
}
