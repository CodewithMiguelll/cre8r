"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Exhibit {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  user_id: string;
}

interface ProfileCarouselProps {
  userId: string;
}

export default function ProfileCarousel({ userId }: ProfileCarouselProps) {
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchExhibits();
  }, [userId]);

  const fetchExhibits = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await createClient
        .from("exhibits")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setExhibits(data || []);
      setCurrentIndex(0);
    } catch (err) {
      console.error("Error fetching exhibits:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? exhibits.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === exhibits.length - 1 ? 0 : prev + 1));
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading works...</div>;
  }

  if (exhibits.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No works yet</p>
      </div>
    );
  }

  const currentExhibit = exhibits[currentIndex];
  const currentImage = currentExhibit.images?.[0] || "";

  return (
    <div className="w-full space-y-6">
      {/* Carousel Container */}
      <div className="relative w-full bg-muted rounded-lg overflow-hidden">
        {/* Current Image */}
        {currentImage && (
          <div className="relative w-full aspect-square md:aspect-video">
            <Image
              src={currentImage}
              alt={currentExhibit.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Navigation Buttons */}
        {exhibits.length > 1 && (
          <>
            <Button
              onClick={goToPrevious}
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              onClick={goToNext}
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {exhibits.length}
        </div>
      </div>

      {/* Exhibit Info */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{currentExhibit.title}</h2>
        {currentExhibit.category && (
          <p className="text-sm text-muted-foreground uppercase tracking-wide">
            {currentExhibit.category}
          </p>
        )}
        {currentExhibit.description && (
          <p className="text-foreground">{currentExhibit.description}</p>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {exhibits.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {exhibits.map((exhibit, index) => (
            <button
              key={exhibit.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                index === currentIndex
                  ? "border-primary"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {exhibit.images?.[0] && (
                <Image
                  src={exhibit.images[0]}
                  alt={exhibit.title}
                  fill
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
