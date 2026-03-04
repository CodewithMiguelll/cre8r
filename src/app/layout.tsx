import type { Metadata } from "next";
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
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
