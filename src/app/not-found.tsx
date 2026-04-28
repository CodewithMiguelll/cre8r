"use client";

import { Palette } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-white to-gray-50">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated 404 Number */}
        <div
          className={`mb-8 transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        >
          <h1 className="text-9xl md:text-[150px] font-playfair font-bold text-black animate-pulse">
            404
          </h1>
        </div>

        {/* Main Text */}
        <div
          className={`mb-8 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-gray-900">
            Oops! Page Not Found
          </h2>
          <p className="text-lg md:text-xl font-sora text-gray-600 mb-2">
            Looks like this creative space doesn't exist yet.
          </p>
          <p className="text-base font-sora text-gray-500">
            Let's get you back to discovering amazing Nigerian creatives.
          </p>
        </div>

        {/* Call to Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mt-12 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <Link
            href="/"
            className="px-8 py-4 bg-black text-white font-sora font-semibold rounded-lg transition-all duration-300 transform md:hover:scale-105 md:hover:shadow-lg"
          >
            Back to Home
          </Link>
          <Link
            href="/explore"
            className="px-8 py-4 bg-gray-200 text-gray-900 font-sora font-semibold rounded-lg md:hover:bg-gray-300 transition-all duration-300 transform md:hover:scale-105 md:hover:shadow-lg"
          >
            Explore Creatives
          </Link>
        </div>
      </div>
    </div>
  );
}
