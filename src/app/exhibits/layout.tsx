import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exhibits",
  description: "Art Exhibits happening near you"
};

export default function ExhibitLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
