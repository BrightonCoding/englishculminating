"use client";

import { useState, useEffect, ReactNode, cloneElement, isValidElement } from "react";

interface SlideContainerProps {
  children: ReactNode[];
  totalSlides: number;
}

export default function SlideContainer({ children, totalSlides }: SlideContainerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
      } else if (e.key === "ArrowRight" && currentSlide < totalSlides - 1) {
        setCurrentSlide((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, totalSlides]);

  const goToNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0f0e0c]">
      {/* Slides Container */}
      <div
        className="flex transition-transform ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}vw)`,
          width: `${totalSlides * 100}vw`,
          transitionDuration: "600ms",
        }}
      >
        {children.map((child, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={index}
              className="w-screen h-screen flex-shrink-0"
              style={{ width: "100vw" }}
            >
              {isValidElement(child)
                ? cloneElement(child as React.ReactElement<any>, {
                    isActive,
                    onNext: goToNext,
                    onPrevious: goToPrevious,
                  })
                : child}
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      {currentSlide > 0 && (
        <button
          onClick={goToPrevious}
          className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0f0e0c]/80 backdrop-blur-sm border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-warm)] opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 group"
          aria-label="Previous slide"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {currentSlide < totalSlides - 1 && (
        <button
          onClick={goToNext}
          className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0f0e0c]/80 backdrop-blur-sm border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-warm)] opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 group"
          aria-label="Next slide"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      {/* Progress Indicator */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 items-center">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-8 h-2 bg-[var(--accent-warm)]"
                : "w-2 h-2 bg-[var(--text-muted)]/30 hover:bg-[var(--text-muted)]/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
