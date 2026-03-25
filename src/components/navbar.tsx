"use client"

import Link  from "next/link";
import { useState } from "react";
import { X, Menu } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    { name: "Explore", href: "/" },
    { name: "About", href: "/about" },
    { name: "Exhibits", href: "/exhibits" },
    { name: "Profile", href: "/profile" },
  ];
  const niches = [
    { name: "Writers", href: "/writers" },
    { name: "Visual Art", href: "/visual-art" },
    { name: "Design", href: "/design" },
    { name: "Music", href: "/music" },
    { name: "Video", href: "/video" },
  ];

  return (
    <nav className="w-full py-6 px-5 flex items-center justify-between">
      {/* Header Logo */}
      <Link href="/">
        <h1 className="text-2xl font-playfair uppercase font-bold">Cre8r</h1>
      </Link>
      <div className="hidden md:flex gap-8 items-center">
        {niches.map((niche) => (
          <a
            key={niche.href}
            href={niche.href}
            className="hover:opacity-70 transition-opacity font-sora"
          >
            {niche.name}
          </a>
        ))}
      </div>

      <div className="hidden md:flex gap-8 items-center">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hover:opacity-70 transition-opacity font-sora"
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
