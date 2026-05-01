"use client";

import { PieceWithAuthor } from "@/lib/types";
import { PieceCard } from "./piece-card";

interface PieceGridProps {
  pieces: PieceWithAuthor[];
  isLoading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  niche: string;
}

export function PieceGrid({
  pieces,
  isLoading = false,
  onLoadMore,
  hasMore = false,
  niche,
}: PieceGridProps) {
  if (!isLoading && pieces.length === 0) {
    return (
      <div className="w-full py-16 text-center">
        <p className="text-gray-500 text-lg">No pieces found</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pieces.map((piece) => (
          <PieceCard
            key={piece.id}
            piece={piece}
            linkHref={`/niches/${niche}/${piece.id}`}
          />
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-96 bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !isLoading && (
        <div className="flex justify-center pt-8">
          <button
            onClick={onLoadMore}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Load More
          </button>
        </div>
      )}

      {/* End Message */}
      {!hasMore && pieces.length > 0 && !isLoading && (
        <div className="text-center py-8 text-gray-500">
          No more pieces to load
        </div>
      )}
    </div>
  );
}
