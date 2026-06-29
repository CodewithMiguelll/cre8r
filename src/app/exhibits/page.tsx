"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Sparkles, ChevronDown, Users } from "lucide-react";

interface CuratedExhibit {
  id: string;
  title: string;
  creator: string;
  category: string;
  excerpt: string;
  image: string;
  date: string;
}

const curatedExhibits: CuratedExhibit[] = [
  {
    id: "echoes-of-the-niger",
    title: "Echoes of the Niger",
    creator: "@khalid_art",
    category: "Visual Art",
    excerpt:
      "A living gallery exploring the spirit of river communities through motion and color.",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80",
    date: "2026-06-18",
  },
  {
    id: "silence-is-a-woman",
    title: "Silence is a Woman",
    creator: "@adaora_writes",
    category: "Writing",
    excerpt:
      "A poetic anthology from the margins that speaks to strength, memory, and reclaiming voice.",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=80",
    date: "2026-06-09",
  },
  {
    id: "afro-futurism-icons",
    title: "Afro-Futurism Icons",
    creator: "@design_don",
    category: "Design",
    excerpt:
      "A digital suite of icons and interfaces inspired by tomorrow’s African creative culture.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    date: "2026-06-23",
  },
  {
    id: "sound-of-kin",
    title: "Sound of Kin",
    creator: "@rima_music",
    category: "Music",
    excerpt:
      "Live audio pieces layered with field recordings from the diaspora and intimate studio sessions.",
    image:
      "https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=1200&q=80",
    date: "2026-06-12",
  },
  {
    id: "city-ink",
    title: "City Ink",
    creator: "@nina_illustrates",
    category: "Visual Art",
    excerpt:
      "A curated visual exhibit of neon cityscapes, typography, and immersive street narratives.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    date: "2026-05-30",
  },
];

const categories = ["All", "Visual Art", "Writing", "Design", "Music"];
const creators = [
  "All",
  "@khalid_art",
  "@adaora_writes",
  "@design_don",
  "@rima_music",
  "@nina_illustrates",
];
const sortOptions = ["Newest", "Featured"] as const;

type SortOption = (typeof sortOptions)[number];

export default function ExhibitsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCreator, setSelectedCreator] = useState("All");
  const [selectedSort, setSelectedSort] = useState<SortOption>("Newest");

  const filteredExhibits = useMemo(() => {
    let filtered = curatedExhibits;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (selectedCreator !== "All") {
      filtered = filtered.filter((item) => item.creator === selectedCreator);
    }

    return [...filtered].sort((a, b) => {
      if (selectedSort === "Newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return (
        curatedExhibits.findIndex((item) => item.id === a.id) -
        curatedExhibits.findIndex((item) => item.id === b.id)
      );
    });
  }, [selectedCategory, selectedCreator, selectedSort]);

  return (
    <main className="min-h-screen pb-20">
      <section className="px-5 pt-10 pb-8 max-w-6xl mx-auto">
        <div className="rounded-[2rem] overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-2xl shadow-slate-900/30">
          <div className="px-8 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-200">
                <Sparkles className="h-4 w-4" />
                Curated Exhibits
              </div>
              <h1 className="mt-6 text-4xl sm:text-5xl font-semibold tracking-tight">
                Live displays, featured curation, and creator spotlights.
              </h1>
              <p className="mt-4 max-w-2xl text-slate-300 leading-8">
                Explore the latest exhibition events selected by our curators,
                with every tile linking through to a dedicated exhibit page.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className=" border-b border-slate-200/80 bg-white/95 backdrop-blur-md px-5 py-4 shadow-sm shadow-slate-900/5">
        <div className="max-w-6xl mx-auto flex flex-col gap-4 lg:gap-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                Filter by
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                Genre, newest, or creator
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Users className="h-4 w-4" />
              Curated selection only
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr]">
            <div className="flex flex-wrap gap-2">
              {categories.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => setSelectedCategory(genre)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedCategory === genre
                      ? "bg-slate-900 text-white shadow"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
                <span className="font-semibold">Sort</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedSort(option)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      selectedSort === option
                        ? "bg-slate-900 text-white shadow"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {creators.map((creator) => (
              <button
                key={creator}
                type="button"
                onClick={() => setSelectedCreator(creator)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  selectedCreator === creator
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {creator}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 mt-10 max-w-6xl mx-auto">
        <div className="columns-1 sm:columns-2 xl:columns-3 gap-6 space-y-6">
          {filteredExhibits.map((exhibit) => (
            <Link
              key={exhibit.id}
              href={`/exhibits/${exhibit.id}`}
              className="group block break-inside-avoid overflow-hidden rounded-[1.75rem] bg-slate-950 shadow-2xl shadow-slate-900/15 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative h-96 overflow-hidden bg-slate-900">
                <img
                  src={exhibit.image}
                  alt={exhibit.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-300">
                    <span>{exhibit.category}</span>
                    <span className="inline-block rounded-full bg-white/10 px-2 py-1 text-[11px]">
                      {exhibit.creator}
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold leading-tight">
                    {exhibit.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-200 line-clamp-3">
                    {exhibit.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-slate-400">
                    <span>
                      {new Date(exhibit.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>View exhibit</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
