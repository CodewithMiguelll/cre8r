"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import { useUser } from "@/lib/use-user";
import { createClient } from "@/lib/supabase";

const Navigation = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useUser();
  const links = [
    { name: "Explore", href: "/explore" },
    { name: "About", href: "/about" },
    { name: "Exhibits", href: "/exhibits" },
    { name: "Profile", href: "/profile" },
  ];
  const createLink = { name: "Create", href: "/create" };
  const niches = [
    { name: "Writing", href: "/niches/writing" },
    { name: "Photography", href: "/niches/photography" },
    { name: "Art", href: "/niches/art" },
    { name: "Design", href: "/niches/design" },
  ];

  const handleNicheClick = (e: React.MouseEvent, href: string) => {
    if (!user) {
      e.preventDefault();
      router.push("/auth");
    } else {
      router.push(href);
    }
  };

  return (
    <nav className="w-full py-10 px-5 flex items-center justify-between shadow-md">
      {/* Header Logo */}
      <Link href="/">
        <h1 className="text-2xl font-sora font-bold">cre8r</h1>
      </Link>
      <div className="hidden md:flex gap-8 items-center">
        {niches.map((niche) => (
          <a
            key={niche.href}
            href={niche.href}
            onClick={(e) => handleNicheClick(e, niche.href)}
            className="hover:opacity-70 transition-opacity font-sora"
          >
            {niche.name}
          </a>
        ))}
      </div>

      <div className="hidden md:flex gap-8 items-center">
        {user &&
          links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:opacity-70 transition-opacity font-sora"
            >
              {link.name}
            </a>
          ))}
        {user && (
          <Link
            href={createLink.href}
            className=" text-black hover:text-white hover:bg-black transition-colors font-sora p-2 rounded-lg  border-2 border-black"
          >
            {createLink.name}
          </Link>
        )}
        {!loading &&
          (user ? (
            <button
              onClick={async () => {
                const supabase = createClient;
                await supabase.auth.signOut();
                router.push("/");
                router.refresh();
              }}
              className="bg-red-600 text-white hover:opacity-70 transition-opacity font-sora p-2.5 rounded-lg hover:cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/auth?form=login"
                className="hover:opacity-70 transition-opacity font-sora bg-black p-2.5 text-white rounded-lg"
              >
                Sign In
              </Link>
              <Link
                href="/auth?form=signup"
                className="hover:opacity-70 transition-opacity font-sora p-2 rounded-lg border border-black"
              >
                Create Account
              </Link>
            </>
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
              {user && (
                <div className="space-y-4">
                  <p className="text-gray-400 text-sm uppercase font-semibold">
                    Navigation
                  </p>
                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block font-sora text-gray-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                  <Link
                    href={createLink.href}
                    className="block font-sora bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {createLink.name}
                  </Link>
                </div>
              )}
              <div className="space-y-4">
                {!loading &&
                  (user ? (
                    <button
                      onClick={async () => {
                        const supabase = createClient;
                        await supabase.auth.signOut();
                        setIsMenuOpen(false);
                        router.push("/");
                        router.refresh();
                      }}
                      className="block font-sora text-left bg-black/50 p-2.5 rounded-xl w-full text-white"
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <Link
                        href="/auth?form=login"
                        className="block font-sora bg-black p-2.5 text-white rounded-xl"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/auth?form=signup"
                        className="block font-sora text-gray-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Create Account
                      </Link>
                    </>
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
                    onClick={(e) => {
                      handleNicheClick(e, niche.href);
                      setIsMenuOpen(false);
                    }}
                    className="block font-sora text-gray-300"
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
