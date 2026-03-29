import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our platform and mission.",
};

export default function AboutLayout({
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
