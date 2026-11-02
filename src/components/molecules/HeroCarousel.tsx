"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { EventData } from "@/components/molecules/EventCard";
import { API_BASE_URL } from "@/utils/fetchData";
import { formatDate } from "@/utils/formatDate";

export interface CarouselSlide {
  id: string;
  title: string;
  category: string;
  venueName: string;
  dateLabel: string;
  priceLabel: string;
  imageUrl: string;
  href: string;
}

const FALLBACK_SLIDES: CarouselSlide[] = [
  {
    id: "fallback-1",
    title: "Product Design Conference 2025",
    category: "Design",
    venueName: "Jakarta Convention Center",
    dateLabel: "Oct 24, 2025",
    priceLabel: "$49",
    imageUrl: "/images/2.png",
    href: "/browse",
  },
  {
    id: "fallback-2",
    title: "Fullstack Engineering Masterclass",
    category: "Development",
    venueName: "Grand Ballroom, Singapore",
    dateLabel: "Nov 12, 2025",
    priceLabel: "Free",
    imageUrl: "/images/1.png",
    href: "/browse",
  },
  {
    id: "fallback-3",
    title: "AI & Modern Data Architecture Summit",
    category: "Technology",
    venueName: "Kuala Lumpur Tech Hub",
    dateLabel: "Dec 05, 2025",
    priceLabel: "$79",
    imageUrl: "/images/details-image.png",
    href: "/browse",
  },
  {
    id: "fallback-4",
    title: "Growth Marketing & Scaling Startups",
    category: "Marketing",
    venueName: "Bangkok Digital Park",
    dateLabel: "Jan 18, 2026",
    priceLabel: "$35",
    imageUrl: "/images/card-1.png",
    href: "/browse",
  },
  {
    id: "fallback-5",
    title: "Cybersecurity & Cloud Defense Forum",
    category: "Security",
    venueName: "Virtual Event, Global",
    dateLabel: "Feb 02, 2026",
    priceLabel: "$59",
    imageUrl: "/images/card-2.png",
    href: "/browse",
  },
];

interface HeroCarouselProps {
  events?: EventData[];
}

export default function HeroCarousel({ events = [] }: HeroCarouselProps) {
  const slides: CarouselSlide[] = useMemo(() => {
    const liveSlides: CarouselSlide[] = (events || []).map((e) => {
      const price = e.tickets?.[0]?.price ?? 0;
      return {
        id: e._id,
        title: e.title,
        category: e.category?.name || "Seminar",
        venueName: e.venueName || "Online",
        dateLabel: e.date ? formatDate(e.date) : "Upcoming",
        priceLabel: price === 0 ? "Free" : `$${price}`,
        imageUrl: e.image?.name
          ? e.image.name.startsWith("/")
            ? e.image.name
            : `${API_BASE_URL}/${e.image.name}`
          : "/images/details-image.png",
        href: `/detail/${e._id}`,
      };
    });

    if (liveSlides.length >= 4) {
      return liveSlides;
    }
    return [...liveSlides, ...FALLBACK_SLIDES];
  }, [events]);

  const slideCount = slides.length;
  // Extended track: 2 clones at start + real slides + 2 clones at end
  const extendedSlides = useMemo(() => {
    if (slideCount === 0) return [];
    return [
      ...slides.slice(-2),
      ...slides,
      ...slides.slice(0, 2),
    ];
  }, [slides, slideCount]);

  const [trackIndex, setTrackIndex] = useState(2);
  const [isJumping, setIsJumping] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef<number | null>(null);
  const isTransitioningRef = useRef(false);

  const gap = 24; // gap between slides in px

  // Measure container and slide widths
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      setContainerWidth(width);

      // Slide width calculation:
      // Mobile (< 640px): 82% of container width or max 380px
      // Tablet (< 1024px): 560px
      // Desktop (>= 1024px): 740px
      let calculatedSlideWidth = 740;
      if (width < 640) {
        calculatedSlideWidth = Math.min(Math.round(width * 0.84), 380);
      } else if (width < 1024) {
        calculatedSlideWidth = Math.min(Math.round(width * 0.72), 580);
      }
      setSlideWidth(calculatedSlideWidth);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Compute active real slide index (0 to slideCount - 1)
  const realIndex = useMemo(() => {
    if (slideCount === 0) return 0;
    return (((trackIndex - 2) % slideCount) + slideCount) % slideCount;
  }, [trackIndex, slideCount]);

  const goToNext = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsJumping(false);
    setTrackIndex((prev) => prev + 1);
  }, []);

  const goToPrev = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsJumping(false);
    setTrackIndex((prev) => prev - 1);
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsJumping(false);
    setTrackIndex(index + 2);
  }, []);

  // Handle boundary snap seamlessly at transition end
  const handleTransitionEnd = useCallback(() => {
    isTransitioningRef.current = false;
    if (trackIndex >= slideCount + 2) {
      // Snap to beginning clone
      setIsJumping(true);
      const snapIndex = 2 + (trackIndex - (slideCount + 2));
      setTrackIndex(snapIndex);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsJumping(false);
        });
      });
    } else if (trackIndex < 2) {
      // Snap to end clone
      setIsJumping(true);
      const snapIndex = slideCount + trackIndex;
      setTrackIndex(snapIndex);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsJumping(false);
        });
      });
    }
  }, [trackIndex, slideCount]);

  // Autoplay with pause support & reduced motion check
  useEffect(() => {
    if (isPaused || isDragging) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      goToNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, isDragging, goToNext]);

  // Pointer drag events
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only primary button
    if (e.button !== 0) return;
    dragStartXRef.current = e.clientX;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || dragStartXRef.current === null) return;
    const deltaX = e.clientX - dragStartXRef.current;
    setDragOffset(deltaX);
  };

  const endDrag = () => {
    if (!isDragging || dragStartXRef.current === null) return;
    const threshold = 45;
    if (dragOffset < -threshold) {
      goToNext();
    } else if (dragOffset > threshold) {
      goToPrev();
    }
    dragStartXRef.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goToNext();
    }
  };

  // Compute translateX so active trackIndex slide is centered
  const centerTranslate = useMemo(() => {
    if (containerWidth === 0 || slideWidth === 0) return 0;
    const slideCenterOffset = trackIndex * (slideWidth + gap) + slideWidth / 2;
    return containerWidth / 2 - slideCenterOffset + dragOffset;
  }, [containerWidth, slideWidth, trackIndex, gap, dragOffset]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured Events Carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      className="relative w-full overflow-hidden select-none outline-none focus-visible:ring-2 focus-visible:ring-green/50 py-4 sm:py-6"
    >
      {/* Slide Track */}
      <div
        className="flex items-center touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translateX(${centerTranslate}px)`,
          transition: isJumping || isDragging ? "none" : "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
          gap: `${gap}px`,
        }}
      >
        {extendedSlides.map((slide, idx) => {
          const isActive = idx === trackIndex;
          return (
            <div
              key={`${slide.id}-${idx}`}
              aria-hidden={!isActive}
              style={{ width: `${slideWidth || 340}px` }}
              onClick={() => {
                if (!isActive) {
                  if (idx < trackIndex) goToPrev();
                  else goToNext();
                }
              }}
              className={`shrink-0 transition-transform transition-opacity duration-500 rounded-3xl overflow-hidden relative group cursor-pointer ${
                isActive
                  ? "scale-100 opacity-100 z-20 shadow-2xl ring-1 ring-white/15"
                  : "scale-90 opacity-45 hover:opacity-75 z-10 brightness-90 hover:brightness-100"
              }`}
            >
              {/* Aspect ratio frame with object-cover image */}
              <div className="relative aspect-[16/10] w-full bg-navy-dark overflow-hidden">
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading={isActive ? "eager" : "lazy"}
                  onError={(e) => {
                    // Fallback if image fails to load
                    (e.target as HTMLImageElement).src = "/images/details-image.png";
                  }}
                />

                {/* Dark gradient overlay on bottom of slide */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/55 to-transparent pointer-events-none" />

                {/* Badges on top of slide */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
                  <span className="bg-green text-navy font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    {slide.category}
                  </span>
                  <span className="bg-surface-white/95 text-navy font-bold text-xs px-3 py-1 rounded-full shadow-md">
                    {slide.priceLabel}
                  </span>
                </div>

                {/* Slide content overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 lg:p-7 flex flex-col justify-end z-10">
                  <h3 className="text-white font-bold text-lg sm:text-xl lg:text-2xl line-clamp-1 group-hover:text-green transition-colors">
                    {slide.title}
                  </h3>
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
                    <p className="text-gray-text text-xs sm:text-sm font-medium flex items-center gap-1.5">
                      <span>{slide.venueName}</span>
                      <span>•</span>
                      <span>{slide.dateLabel}</span>
                    </p>
                    <Link
                      href={slide.href}
                      onClick={(e) => {
                        // Avoid triggering drag or click navigation if dragging occurred
                        if (Math.abs(dragOffset) > 5) {
                          e.preventDefault();
                        }
                      }}
                      className="inline-flex items-center justify-center min-h-9 px-4 rounded-full text-xs sm:text-sm font-semibold bg-green text-navy hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green transition-colors shadow-md pointer-events-auto"
                    >
                      View Event
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Prev / Next Controls */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 sm:px-6 lg:px-10 z-30">
        <button
          type="button"
          onClick={goToPrev}
          aria-label="Previous slide"
          className="pointer-events-auto min-h-11 min-w-11 w-11 h-11 rounded-full bg-navy text-white border-2 border-white/30 hover:bg-green hover:text-navy hover:border-navy shadow-xl flex items-center justify-center transition-colors transition-transform duration-150 ease-out enabled:active:scale-[0.96] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
        >
          <svg
            className="w-5 h-5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Next slide"
          className="pointer-events-auto min-h-11 min-w-11 w-11 h-11 rounded-full bg-navy text-white border-2 border-white/30 hover:bg-green hover:text-navy hover:border-navy shadow-xl flex items-center justify-center transition-colors transition-transform duration-150 ease-out enabled:active:scale-[0.96] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
        >
          <svg
            className="w-5 h-5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center items-center mt-6">
        <div
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-navy border border-border-light shadow-md"
          role="tablist"
          aria-label="Carousel pagination"
        >
          {slides.map((slide, i) => {
            const isSelected = i === realIndex;
            return (
              <button
                key={slide.id}
                role="tab"
                type="button"
                aria-selected={isSelected}
                aria-label={`Go to slide ${i + 1}: ${slide.title}`}
                onClick={() => goToSlide(i)}
                className="min-h-7 min-w-7 flex items-center justify-center cursor-pointer p-1 group focus-visible:outline-2 focus-visible:outline-green rounded-full"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 ${
                    isSelected
                      ? "w-8 bg-green shadow-[0_0_8px_rgba(1,251,52,0.6)]"
                      : "w-2.5 bg-gray-text group-hover:bg-white"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
