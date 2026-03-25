"use client";

import Link from "next/link";
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

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-gray-300 hover:text-white transition-colors"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <X className="text-black" size={26} />
        ) : (
          <Menu className="text-black" size={26} />
        )}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Slide Menu */}
          <div className="fixed top-0 right-0 h-screen w-64 bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            {/* Menu Content */}
            <div className="pt-16 px-6 space-y-6">
              {/* Links Section */}
              <div className="space-y-4">
                <p className="text-gray-400 text-sm uppercase font-semibold">
                  Navigation
                </p>
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block font-sora"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Niches Section */}
              <div className="space-y-4 border-t border-gray-700 pt-6">
                <p className="text-gray-400 text-sm uppercase font-semibold">
                  Disciplines
                </p>
                {niches.map((niche) => (
                  <a
                    key={niche.href}
                    href={niche.href}
                    className="block font-sora"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {niche.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navigation;
