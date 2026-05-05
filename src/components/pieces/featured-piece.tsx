"use client";

import Link from "next/link";
import { Heart, MessageCircle, Eye, ArrowRight } from "lucide-react";
import { PieceWithAuthor } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

interface FeaturedPieceProps {
  piece: PieceWithAuthor | null;
  linkHref: string;
}

export function FeaturedPiece({ piece, linkHref }: FeaturedPieceProps) {
  if (!piece) {
    return (
      <div className="w-full bg-linear-to-r from-gray-100 to-gray-50 rounded-xl p-12 text-center">
        <p className="text-gray-500">No featured piece yet</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
        {/* Left: Image */}
        <div className="flex items-center justify-center">
          {piece.cover_image ? (
            <img
              src={piece.cover_image}
              alt={piece.title}
              className="w-full h-80 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-80 bg-linear-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">No cover image</p>
            </div>
          )}
        </div>

        {/* Right: Content */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4">
            {/* Badge */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                Featured
              </span>
              {piece.category && (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                  {piece.category}
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              {piece.title}
            </h2>

            {/* Excerpt */}
            {piece.excerpt && (
              <p className="text-lg text-gray-600 leading-relaxed">
                {piece.excerpt}
              </p>
            )}

            {/* Author */}
            <div className="flex items-center gap-3 pt-4">
              {piece.author?.avatar_url && (
                <img
                  src={piece.author.avatar_url}
                  alt={piece.author.full_name || "Author"}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <p className="font-semibold">
                  {piece.author?.full_name || "Anonymous"}
                </p>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(piece.created_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Footer: Stats and CTA */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200">
            <div className="flex gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span className="text-sm font-medium">{piece.view_count}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-medium">0</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm font-medium">0</span>
              </div>
            </div>

            <Link href={linkHref}>
              <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Read More
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
