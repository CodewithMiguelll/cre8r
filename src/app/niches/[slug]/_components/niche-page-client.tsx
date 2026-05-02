"use client";

import { useState, useCallback, useEffect } from "react";
import { Plus, Filter } from "lucide-react";
import Link from "next/link";
import { Niche, PieceWithAuthor } from "@/lib/types";
import { usePieces, useNicheCategories } from "@/lib/hooks";
import { FeaturedPiece, FilterSortModal, PieceGrid } from "@/components/pieces";

const PIECES_PER_PAGE = 9;

type SortType = "newest" | "mostLiked" | "mostViewed" | "trending";

interface NichePageClientProps {
  niche: string;
}

export function NichePageClient({ niche }: NichePageClientProps) {
  const [sortBy, setSortBy] = useState<SortType>("newest");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [displayedPieces, setDisplayedPieces] = useState<PieceWithAuthor[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Fetch pieces and categories
  const { data: allPieces = [], isLoading: piecesLoading } = usePieces(
    niche as Niche,
    selectedCategory || undefined,
  );
  const { data: categories = [], isLoading: categoriesLoading } =
    useNicheCategories(niche as Niche);

  // Sort pieces based on selected sort option
  const sortedPieces = useCallback(
    (pieces: PieceWithAuthor[]) => {
      const sorted = [...pieces];
      switch (sortBy) {
        case "newest":
          sorted.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          );
          break;
        case "mostViewed":
          sorted.sort((a, b) => b.view_count - a.view_count);
          break;
        case "mostLiked":
          // TODO: Add like count to pieces when available
          sorted.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          );
          break;
        case "trending":
          // Trending = combination of views and recency
          sorted.sort((a, b) => {
            const aDate = new Date(a.created_at).getTime();
            const bDate = new Date(b.created_at).getTime();
            const daysSinceA = (Date.now() - aDate) / (1000 * 60 * 60 * 24);
            const daysSinceB = (Date.now() - bDate) / (1000 * 60 * 60 * 24);

            const aTrendScore = a.view_count / (daysSinceA + 1);
            const bTrendScore = b.view_count / (daysSinceB + 1);

            return bTrendScore - aTrendScore;
          });
          break;
      }
      return sorted;
    },
    [sortBy],
  );

  // Update displayed pieces based on sort/filter changes
  useEffect(() => {
    if (piecesLoading) return;

    const sorted = sortedPieces(allPieces);
    setDisplayedPieces(sorted.slice(0, PIECES_PER_PAGE));
    setHasMore(sorted.length > PIECES_PER_PAGE);
    setIsLoadingMore(false);
  }, [allPieces, sortBy, piecesLoading, sortedPieces]);

  // Handle load more
  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      const sorted = sortedPieces(allPieces);
      const newCount = displayedPieces.length + PIECES_PER_PAGE;
      setDisplayedPieces(sorted.slice(0, newCount));
      setHasMore(newCount < sorted.length);
      setIsLoadingMore(false);
    }, 300);
  }, [allPieces, displayedPieces.length, sortedPieces]);

  // Get featured piece (first piece when sorted by newest)
  const featuredPiece =
    sortedPieces(allPieces).length > 0 ? sortedPieces(allPieces)[0] : null;

  return (
    <div className="space-y-12">
      {/* Header with CTA and Filter Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Latest Pieces</h2>
          <p className="text-gray-600 mt-1">
            {allPieces.length} {allPieces.length === 1 ? "piece" : "pieces"}{" "}
            published
          </p>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex-1 sm:flex-none justify-center sm:justify-start"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filter & Sort</span>
          </button>

          {/* Write/Submit CTA */}
          <Link href={`/niches/${niche}/write`} className="flex-1 sm:flex-none">
            <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Create</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Filter/Sort Modal */}
      <FilterSortModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Featured Piece Section */}
      {!piecesLoading && (
        <>
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">
              Featured
            </h3>
            <FeaturedPiece
              piece={featuredPiece}
              linkHref={
                featuredPiece ? `/niches/${niche}/${featuredPiece.id}` : "#"
              }
            />
          </div>

          {/* Pieces Grid */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-900">Browse</h3>
            <PieceGrid
              pieces={displayedPieces.slice(1)} // Exclude featured piece from grid
              isLoading={isLoadingMore}
              onLoadMore={handleLoadMore}
              hasMore={hasMore}
              niche={niche}
            />
          </div>
        </>
      )}

      {/* Loading State */}
      {piecesLoading && (
        <div className="space-y-8">
          <div className="h-96 bg-gray-200 animate-pulse rounded-xl" />
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-96 bg-gray-200 animate-pulse rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
