import type { Metadata } from "next";
import { Playfair_Display,Sora } from "next/font/google";

/*
------------------FONT CONFIGURATION------------------
Headings: Playfair Display Bold
Subheadings: Playfair Display Medium
Body: Sora
*/

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

import "./globals.css";

export const metadata: Metadata = {
  title: "Cre8r",
  description: "The home for Nigerian creatives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      suppressHydrationWarning
        className={`${playfair.variable} ${sora.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
