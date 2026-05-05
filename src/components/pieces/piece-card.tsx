"use client";

import Link from "next/link";
import { Heart, MessageCircle, Eye } from "lucide-react";
import { PieceWithAuthor } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

interface PieceCardProps {
  piece: PieceWithAuthor;
  linkHref: string;
}

export function PieceCard({ piece, linkHref }: PieceCardProps) {
  return (
    <Link href={linkHref}>
      <div className="group h-full bg-white rounded-lg border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all duration-300 overflow-hidden">
        {/* Cover Image */}
        {piece.cover_image && (
          <div className="relative h-48 bg-gray-100 overflow-hidden">
            <img
              src={piece.cover_image}
              alt={piece.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-4 flex flex-col gap-3">
          {/* Category */}
          {piece.category && (
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {piece.category}
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
            {piece.title}
          </h3>

          {/* Excerpt */}
          {piece.excerpt && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {piece.excerpt}
            </p>
          )}

          {/* Author & Date */}
          <div className="flex items-center gap-2 mt-2">
            {piece.author?.avatar_url && (
              <img
                src={piece.author.avatar_url}
                alt={piece.author.full_name || "Author"}
                className="w-8 h-8 rounded-full bg-gray-200 object-cover"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {piece.author?.full_name || "Anonymous"}
              </p>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(piece.created_at), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4 pt-3 border-t border-gray-100 text-gray-600">
            <div className="flex items-center gap-1 text-sm">
              <Eye className="w-4 h-4" />
              <span>{piece.view_count}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Heart className="w-4 h-4" />
              <span>0</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <MessageCircle className="w-4 h-4" />
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
