"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SectionCarousel({ title, badge, badgeColor = "text-brand-accent", items, renderItem }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="mb-24 w-full">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="text-left max-w-3xl">
          <h2 className={`text-sm font-bold uppercase tracking-[0.35em] mb-4 ${badgeColor}`}>{badge}</h2>
          <h3 className="text-3xl md:text-5xl font-semibold text-white leading-tight">{title}</h3>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="text-white/50 text-sm font-bold tracking-widest mr-2">
            {selectedIndex + 1} / {items.length}
          </span>
          <button 
            onClick={scrollPrev}
            className="w-12 h-12 rounded-full border border-white/20 bg-brand-surface/80 flex items-center justify-center text-white hover:bg-brand-accent hover:border-brand-accent transition-all shadow-xl"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={scrollNext}
            className="w-12 h-12 rounded-full border border-white/20 bg-brand-surface/80 flex items-center justify-center text-white hover:bg-brand-accent hover:border-brand-accent transition-all shadow-xl"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
        <div className="flex -ml-6 py-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex-[0_0_100%] min-w-0 pl-6 sm:flex-[0_0_50%] md:flex-[0_0_33.3333%] lg:flex-[0_0_20%]">
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
