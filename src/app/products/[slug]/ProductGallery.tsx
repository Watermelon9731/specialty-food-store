"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  img: string | null;
  images?: string[] | null;
  name: string;
  note?: string | null;
};

export function ProductGallery({
  img,
  images,
  name,
  note,
}: ProductGalleryProps) {
  // Combine main image and extra images
  const allImages = [img, ...(images || [])].filter(Boolean) as string[];
  const [activeIdx, setActiveIdx] = useState(0);

  const mainImage = allImages[activeIdx] || undefined;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Container */}
      <div className="relative aspect-square w-full bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm group">
        {mainImage ? (
          <img
            key={mainImage} // triggers re-render animation if we want, or just let it swap normally
            src={mainImage}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          />
        ) : (
          <div className="absolute inset-0 bg-[#f5f3ef] flex items-center justify-center">
            <span className="text-7xl opacity-30 select-none">🥩</span>
          </div>
        )}
        {note && (
          <span className="absolute top-6 left-6 z-10 bg-amber-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md pointer-events-none">
            {note}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar scroll-smooth">
          {allImages.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "relative shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 snap-start transition-all cursor-pointer",
                activeIdx === idx
                  ? "border-[#3a7851] shadow-[0_0_0_2px_rgba(58,120,81,0.2)]"
                  : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              <img
                src={image}
                alt={`${name} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
