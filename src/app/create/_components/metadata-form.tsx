"use client";

import { useEffect, useState } from "react";
import { Niche } from "@/lib/types";

interface MetadataFormProps {
  formData: {
    title: string;
    description: string;
    niche: Niche;
    category?: string;
    tags: string[];
    isPublished: boolean;
  };
  onChange: (updates: Partial<MetadataFormProps["formData"]>) => void;
  disabled: boolean;
}

const NICHES: { value: Niche; label: string }[] = [
  { value: "writing", label: "Writing" },
  { value: "photography", label: "Photography" },
  { value: "music", label: "Music" },
  { value: "art", label: "Art" },
  { value: "design", label: "Design" },
];

const CATEGORY_MAP: Record<Niche, string[]> = {
  writing: ["Poetry", "Prose", "Essay", "Short Story", "Article", "Other"],
  photography: [
    "Portrait",
    "Landscape",
    "Still Life",
    "Street",
    "Nature",
    "Other",
  ],
  music: ["Original", "Cover", "Beat", "Remix", "Instrumental", "Other"],
  art: [
    "Digital",
    "Traditional",
    "Sculpture",
    "Abstract",
    "Mixed Media",
    "Other",
  ],
  design: ["Graphic", "UI/UX", "Logo", "Branding", "Illustration", "Other"],
};

export function MetadataForm({
  formData,
  onChange,
  disabled,
}: MetadataFormProps) {
  const [tagInput, setTagInput] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    setCategories(CATEGORY_MAP[formData.niche] || []);
    // Reset category when niche changes
    onChange({ category: "" });
  }, [formData.niche, onChange]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTags = [...formData.tags, tagInput.trim().toLowerCase()];
      onChange({ tags: newTags });
      setTagInput("");
    }
  };

  const handleRemoveTag = (index: number) => {
    onChange({ tags: formData.tags.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Content Details</h2>

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          placeholder="Give your piece a compelling title"
          value={formData.title}
          onChange={(e) => onChange({ title: e.target.value })}
          disabled={disabled}
          maxLength={200}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <p className="mt-1 text-sm text-gray-500">
          {formData.title.length}/200
        </p>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          placeholder="Describe your piece and provide context..."
          value={formData.description}
          onChange={(e) => onChange({ description: e.target.value })}
          disabled={disabled}
          maxLength={1000}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
        />
        <p className="mt-1 text-sm text-gray-500">
          {formData.description.length}/1000
        </p>
      </div>

      {/* Niche Selection */}
      <div>
        <label
          htmlFor="niche"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Niche <span className="text-red-500">*</span>
        </label>
        <select
          id="niche"
          value={formData.niche}
          onChange={(e) => onChange({ niche: e.target.value as Niche })}
          disabled={disabled}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          {NICHES.map((niche) => (
            <option key={niche.value} value={niche.value}>
              {niche.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category Selection */}
      {categories.length > 0 && (
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category
          </label>
          <select
            id="category"
            value={formData.category || ""}
            onChange={(e) =>
              onChange({ category: e.target.value || undefined })
            }
            disabled={disabled}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Select a category (optional)</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Tags */}
      <div>
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Tags
        </label>
        <div className="space-y-2">
          <input
            id="tags"
            type="text"
            placeholder="Add a tag and press Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            disabled={disabled}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <div
                  key={tag}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(index)}
                    disabled={disabled}
                    className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-500">
          {formData.tags.length} tags added
        </p>
      </div>

      {/* Visibility Settings */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isPublished}
            onChange={(e) => onChange({ isPublished: e.target.checked })}
            disabled={disabled}
            className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <div className="flex-1">
            <p className="font-medium text-gray-900">Publish immediately</p>
            <p className="text-sm text-gray-600">
              {formData.isPublished
                ? "Your piece will be visible to everyone"
                : "Your piece will be saved as a draft (only you can see it)"}
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}
