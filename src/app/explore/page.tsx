"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "@/components/Masonry"; // Using your existing component
import Link from "next/link";
import { ArrowRight, Trophy, User } from "lucide-react";

// --- MOCK DATA ---
const niches = ["All", "Visual Art", "Writing", "Design", "Music", "Video"];

const items = [
  {
    id: "1",
    title: "Echoes of the Niger",
    username: "@khalid_art",
    blurb: "A digital exploration of river spirits in modern-day Lagos.",
    category: "Visual Art",
    img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
    height: 400,
  },
  {
    id: "2",
    title: "Silence is a Woman",
    username: "@adaora_writes",
    blurb: "A short story collection about the unheard voices of the north.",
    category: "Writing",
    img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
    height: 300,
  },
  {
    id: "3",
    title: "Afro-Futurism Icons",
    username: "@design_don",
    blurb: "A set of 50 custom icons for the next generation of African UI.",
    category: "Design",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
    height: 500,
  },
  // Add more items to test the masonry...
];

export default function ExplorePage() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter Logic
  const filteredWorks = useMemo(() => {
    if (activeFilter === "All") return items;
    return items.filter((work) => work.category === activeFilter);
  }, [activeFilter]);

  return (
    <main className="min-h-screen pb-20">
      {/* 1. CREATOR OF THE MONTH (Spotlight) */}
      <section className="px-5 py-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full h-100 md:h-125 rounded-3xl overflow-hidden bg-black flex items-end"
        >
          {/* Spotlight Background */}
          <img
            src="https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=2000"
            alt="Creator of the Month"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />

          <div className="relative z-10 p-8 md:p-16 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1 rounded-full w-fit text-white border border-white/30">
                <Trophy size={16} className="text-yellow-400" />
                <span className="text-xs font-sora uppercase tracking-widest font-bold">
                  Creator of the Month
                </span>
              </div>
              <h2 className="text-4xl md:text-7xl font-playfair font-bold text-white">
                Miguel The Artist
              </h2>
              <p className="text-lg text-white/80 font-sora max-w-md">
                Redefining the digital landscape through vibrant storytelling
                and intricate brushwork.
              </p>
            </div>
            <Link href="/profile/migueltheartist">
              <button className="px-8 py-4 bg-white text-black rounded-full font-sora font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                View Gallery <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 2. FILTER HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md py-6 border-b border-gray-100 px-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h1 className="text-3xl font-playfair font-bold">Explore</h1>

          <nav className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {niches.map((niche) => (
              <button
                key={niche}
                onClick={() => setActiveFilter(niche)}
                className={`px-6 py-2 rounded-full font-sora text-sm transition-all whitespace-nowrap ${
                  activeFilter === niche
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {niche}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* 3. MASONRY GRID WITH OVERLAYS */}
      <section className="px-5 mt-12 max-w-400 mx-auto">
        <div className="w-full">
          <AnimatePresence mode="popLayout">
            <motion.div layout className="w-full">
              <Masonry
                items={filteredWorks.map((work) => ({
                  ...work,
                  url: work.img,
                  // We inject the overlay content here
                  render: (
                    <Link
                      href={`/exhibits/${work.id}`}
                      className="block relative group overflow-hidden rounded-2xl"
                    >
                      <img
                        src={work.img}
                        alt={work.title}
                        className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* OVERLAY: Only visible on hover (Desktop focused) */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6 text-white translate-y-4 group-hover:translate-y-0">
                        <span className="text-xs font-sora uppercase tracking-tighter opacity-70 mb-1">
                          {work.category}
                        </span>
                        <h3 className="text-xl font-playfair font-bold mb-2">
                          {work.title}
                        </h3>
                        <p className="text-sm font-sora line-clamp-2 mb-4 opacity-80">
                          {work.blurb}
                        </p>
                        <div className="flex items-center gap-2 text-sm font-bold border-t border-white/20 pt-4">
                          <User size={14} />
                          {work.username}
                        </div>
                      </div>
                    </Link>
                  ),
                }))}
                ease="power3.out"
                duration={0.6}
                stagger={0.05}
                animateFrom="bottom"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
