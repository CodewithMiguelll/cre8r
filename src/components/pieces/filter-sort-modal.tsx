"use client";

import { useState } from "react";
import { X, Filter } from "lucide-react";
import { NicheCategory } from "@/lib/types";

interface FilterSortModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: NicheCategory[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  sortBy: "newest" | "mostLiked" | "mostViewed" | "trending";
  onSortChange: (
    sort: "newest" | "mostLiked" | "mostViewed" | "trending",
  ) => void;
}

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "mostLiked", label: "Most Liked" },
  { value: "mostViewed", label: "Most Viewed" },
  { value: "trending", label: "Trending" },
];

export function FilterSortModal({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: FilterSortModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-lg overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Filter & Sort</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Sort Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={sortBy === option.value}
                    onChange={(e) =>
                      onSortChange(
                        e.target.value as
                          | "newest"
                          | "mostLiked"
                          | "mostViewed"
                          | "trending",
                      )
                    }
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="ml-3 text-sm font-medium">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Section */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
            <div className="space-y-2">
              {/* All Categories Option */}
              <label className="flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={selectedCategory === null}
                  onChange={() => onCategoryChange(null)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="ml-3 text-sm font-medium">All Categories</span>
              </label>

              {/* Category Options */}
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.slug}
                    checked={selectedCategory === category.slug}
                    onChange={() => onCategoryChange(category.slug)}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="ml-3 text-sm font-medium">
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={() => {
                onCategoryChange(null);
                onSortChange("newest");
                onClose();
              }}
              className="w-full py-2 text-center text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
