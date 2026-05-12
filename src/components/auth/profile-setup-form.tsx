"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { completeProfileSetup } from "@/lib/profile-actions";
import { Button } from "@/components/ui/button";

const CREATIVE_INTERESTS = ["writing", "photography", "music", "art", "design"];

export function ProfileSetupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    bio: "",
    location: "",
    portfolio_links: [""],
    creative_interests: [] as string[],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePortfolioLinkChange = (index: number, value: string) => {
    const newLinks = [...formData.portfolio_links];
    newLinks[index] = value;
    setFormData((prev) => ({
      ...prev,
      portfolio_links: newLinks,
    }));
  };

  const addPortfolioLink = () => {
    setFormData((prev) => ({
      ...prev,
      portfolio_links: [...prev.portfolio_links, ""],
    }));
  };

  const removePortfolioLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      portfolio_links: prev.portfolio_links.filter((_, i) => i !== index),
    }));
  };

  const toggleCreativeInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      creative_interests: prev.creative_interests.includes(interest)
        ? prev.creative_interests.filter((i) => i !== interest)
        : [...prev.creative_interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.username.trim()) {
      setError("Username is required");
      setLoading(false);
      return;
    }

    if (!formData.full_name.trim()) {
      setError("Full name is required");
      setLoading(false);
      return;
    }

    if (formData.creative_interests.length === 0) {
      setError("Please select at least one creative interest");
      setLoading(false);
      return;
    }

    const result = await completeProfileSetup(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/explore");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div>
        <label
          htmlFor="full_name"
          className="block text-sm font-medium text-gray-700"
        >
          Full Name *
        </label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          value={formData.full_name}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          placeholder="John Doe"
        />
      </div>

      {/* Username */}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username *
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          placeholder="johndoe"
        />
        <p className="mt-1 text-xs text-gray-500">
          Your unique identifier on Cre8r (can contain letters, numbers,
          underscores, hyphens)
        </p>
      </div>

      {/* Bio */}
      <div>
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-gray-700"
        >
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          placeholder="Tell us about yourself and your creative work..."
        />
      </div>

      {/* Location */}
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          value={formData.location}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          placeholder="City, Country"
        />
      </div>

      {/* Portfolio Links */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Portfolio Links
        </label>
        <div className="space-y-2">
          {formData.portfolio_links.map((link, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="url"
                value={link}
                onChange={(e) =>
                  handlePortfolioLinkChange(index, e.target.value)
                }
                className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                placeholder="https://example.com"
              />
              {formData.portfolio_links.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePortfolioLink(index)}
                  className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addPortfolioLink}
          className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          + Add another link
        </button>
      </div>

      {/* Creative Interests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Creative Interests *
        </label>
        <div className="grid grid-cols-2 gap-3">
          {CREATIVE_INTERESTS.map((interest) => (
            <label key={interest} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.creative_interests.includes(interest)}
                onChange={() => toggleCreativeInterest(interest)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">
                {interest}
              </span>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-3">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Setting up profile..." : "Complete Profile Setup"}
      </Button>
    </form>
  );
}
