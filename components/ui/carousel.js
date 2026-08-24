"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Carousel({ children, itemsPerViewDesktop = 3, hideDots = false }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi, setSelectedIndex]);

  const onInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onInit();
    onSelect();
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  const desktopBasis = {
    3: "lg:flex-[0_0_33.333333%]",
    4: "lg:flex-[0_0_25%]",
    5: "lg:flex-[0_0_20%]",
  }[itemsPerViewDesktop] || "lg:flex-[0_0_33.333333%]";

  return (
    <div className="relative px-10 md:px-16">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-8 py-4">
          {React.Children.map(children, (child, index) => (
            <div key={index} className={`flex-[0_0_100%] md:flex-[0_0_50%] min-w-0 pl-8 ${desktopBasis}`}>
              {child}
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 hidden md:flex items-center justify-center rounded-full bg-brand-surface border border-white/20 text-white shadow-xl hover:bg-brand-accent hover:border-brand-accent transition-all z-10 disabled:opacity-50"
        aria-label="Previous slide"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 hidden md:flex items-center justify-center rounded-full bg-brand-surface border border-white/20 text-white shadow-xl hover:bg-brand-accent hover:border-brand-accent transition-all z-10 disabled:opacity-50"
        aria-label="Next slide"
      >
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Pagination Dots */}
      {!hideDots && (
        <div className="flex justify-center gap-3 mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === selectedIndex ? "bg-brand-accent scale-125" : "bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
