"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type CarouselItem = {
  id: string;
  src: string;
};

type Props = {
  items: CarouselItem[];
  /** Tailwind class for each slide's aspect ratio, e.g. "aspect-[4/5]" */
  slideAspect: string;
  /** Slides visible at once on desktop (≥ 640px). Default: 3 */
  desktopSlides?: number;
  /** Slides visible at once on mobile. Default: 1 */
  mobileSlides?: number;
};

/** Gap between slides in px — matches gap-4 (16px) */
const GAP = 16;

export default function DesignCarousel({
  items,
  slideAspect,
  desktopSlides = 3,
  mobileSlides = 1,
}: Props) {
  // Track how many slides are visible based on viewport
  const [slidesPerView, setSlidesPerView] = useState(mobileSlides);

  useEffect(() => {
    const update = () => {
      setSlidesPerView(window.innerWidth >= 640 ? desktopSlides : mobileSlides);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [desktopSlides, mobileSlides]);

  // Exact slide width accounting for gaps between slides
  // Formula: (100% - gap * (n-1)) / n  →  as flex-basis
  const slideWidth = `calc(${100 / slidesPerView}% - ${(GAP * (slidesPerView - 1)) / slidesPerView}px)`;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,       // drag bebas, tapi button scroll 1 slide
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (items.length === 0) {
    return (
      <p className="text-sm text-neutral-500 py-8">
        Belum ada item di kategori ini.
      </p>
    );
  }

  return (
    <div className="relative group">
      {/* Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 cursor-grab active:cursor-grabbing">
          {items.map((item) => (
            <div
              key={item.id}
              style={{ flex: `0 0 ${slideWidth}` }}
            >
              <div
                className={`relative w-full ${slideAspect} rounded-2xl overflow-hidden bg-neutral-900 ring-1 ring-white/5`}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next buttons */}
      <button
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="
          absolute -left-4 top-1/2 -translate-y-1/2 z-10
          w-9 h-9 flex items-center justify-center
          rounded-full bg-black/70 border border-white/10
          text-white backdrop-blur-sm
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          hover:bg-white/10
        "
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next slide"
        className="
          absolute -right-4 top-1/2 -translate-y-1/2 z-10
          w-9 h-9 flex items-center justify-center
          rounded-full bg-black/70 border border-white/10
          text-white backdrop-blur-sm
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          hover:bg-white/10
        "
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
