import type { Metadata } from "next";
import { Playfair_Display,Sora, Figtree } from "next/font/google";

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
import { cn } from "@/lib/utils";
import Navigation from "@/components/navbar";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("font-sans", figtree.variable)}>
      <body
      suppressHydrationWarning
        className={`${playfair.variable} ${sora.variable} antialiased`}
      >
        <Navigation/>
        {children}
      </body>
    </html>
  );
}
