import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "User Profile"
};

export default function ProfileLayout({
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
