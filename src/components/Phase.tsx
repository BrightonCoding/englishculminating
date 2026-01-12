"use client";

import { motion } from "framer-motion";
import ImageCard from "./ImageCard";

interface PhaseImage {
  id: number;
  caption: string;
}

interface PhaseProps {
  number: number;
  title: string;
  subtitle: string;
  images: PhaseImage[];
  textContent?: string;
  isActive?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
}

export default function Phase({ number, title, subtitle, images, textContent, isActive = false, onNext, onPrevious }: PhaseProps) {
  const getImagePath = (imageId: number) => {
    // Determine which phase folder the image belongs to based on image ranges
    const phaseRanges: Record<number, [number, number]> = {
      1: [1, 6],
      2: [7, 9],
      3: [10, 10],
      4: [11, 17],
      5: [18, 20],
      6: [21, 23],
      7: [24, 25],
      8: [26, 29],
      9: [30, 33],
      10: [0, 0], // No images
      11: [34, 36],
    };

    let phaseFolder = number;
    for (const [phase, [start, end]] of Object.entries(phaseRanges)) {
      if (imageId >= start && imageId <= end) {
        phaseFolder = parseInt(phase);
        break;
      }
    }

    // Try .jpg first, fallback to .svg for placeholders
    return `/images/phase${phaseFolder}/${imageId}`;
  };

  // Determine grid layout based on number of images
  const getGridClass = (imageCount: number) => {
    if (imageCount === 1) return "grid-cols-1 max-w-2xl mx-auto";
    if (imageCount === 2) return "grid-cols-1 md:grid-cols-2";
    if (imageCount === 3) return "grid-cols-1 md:grid-cols-3";
    if (imageCount <= 4) return "grid-cols-1 md:grid-cols-2";
    if (imageCount <= 6) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  };

  return (
    <section className="phase-section h-screen overflow-y-auto px-6 md:px-12 py-12 md:py-16">
      <div className="max-w-6xl mx-auto min-h-full flex flex-col justify-center">
        {/* Phase Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 md:mb-16 text-center"
        >
          <span className="text-[var(--accent-warm)] text-sm tracking-[0.3em] uppercase mb-4 block opacity-70">
            Phase {number}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[var(--foreground)] mb-6 glow-text">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-muted)] italic font-light max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.header>

        {/* Text Content (for Phase 10) */}
        {textContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <div className="bg-[rgba(212,165,116,0.03)] border border-[var(--border-subtle)] rounded-sm p-8 md:p-12">
              <p className="text-[var(--foreground)] text-lg leading-relaxed font-light">
                {textContent}
              </p>
              
              {/* Film reference */}
              <div className="mt-10 pt-8 border-t border-[var(--border-subtle)]">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-32 h-44 bg-[rgba(212,165,116,0.08)] rounded-sm flex items-center justify-center border border-[var(--border-subtle)]">
                    <div className="text-center p-4">
                      <svg className="w-8 h-8 mx-auto mb-2 text-[var(--accent-warm)] opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
                      </svg>
                      <span className="text-xs text-[var(--text-muted)]">Film Poster</span>
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-xl font-serif text-[var(--foreground)] mb-2">
                      Portraits from a Fire
                    </h4>
                    <p className="text-[var(--text-muted)] text-sm mb-1">
                      2021 • Tsilhqot&apos;in Film
                    </p>
                    <p className="text-[var(--text-muted)] text-sm">
                      Directed by Trevor Mack
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Images Grid */}
        {images.length > 0 && (
          <div className={`grid ${getGridClass(images.length)} gap-8 md:gap-12`}>
            {images.map((image, index) => (
              <ImageCard
                key={image.id}
                src={getImagePath(image.id)}
                alt={`Photo ${image.id} - ${title}`}
                caption={image.caption}
                index={index}
                shouldAnimate={isActive}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
