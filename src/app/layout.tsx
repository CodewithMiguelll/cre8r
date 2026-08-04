import type { Metadata, Viewport } from "next";
import { Playfair_Display, Sora, Figtree } from "next/font/google";

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
import { Footer } from "@/components/footer";
import { QueryProvider } from "@/lib/query-provider";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cre8r.pxxl.click";

export const metadata: Metadata = {
  title: {
    default: "Cre8r | The Home for Nigerian Creatives",
    template: "%s | Cre8r",
  },
  description:
    "Discover and showcase Nigerian creative talents. A platform for artists, designers, photographers, and creative professionals.",
  keywords: [
    "Nigerian creatives",
    "African artists",
    "creative portfolio",
    "design platform",
    "Nigerian designers",
    "creative community",
  ],
  authors: [{ name: "Cre8r" }],
  creator: "Cre8r",
  publisher: "Cre8r",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Cre8r | The Home for Nigerian Creatives",
    description:
      "Discover and showcase Nigerian creative talents. A platform for artists, designers, photographers, and creative professionals.",
    siteName: "Cre8r",
    images: [
      {
        url: "/images/Cre8r-og-image.png",
        width: 1200,
        height: 630,
        alt: "Cre8r - The home for Nigerian creatives",
        type: "image/png",
      },
    ],
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cre8r | The Home for Nigerian Creatives",
    description:
      "Discover and showcase Nigerian creative talents. A platform for artists, designers, photographers, and creative professionals.",
    images: ["/images/Cre8r-og-image.png"],
    creator: "@Chikaimaaa",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
        <QueryProvider>
          <Navigation />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
