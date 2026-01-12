"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface ImageCardProps {
  src: string;
  alt: string;
  caption: string;
  index: number;
  shouldAnimate?: boolean;
}

export default function ImageCard({ src, alt, caption, index, shouldAnimate = false }: ImageCardProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  // Try different extensions
  useEffect(() => {
    // First try .jpg, then .svg
    const jpgPath = `${src}.jpg`;
    const svgPath = `${src}.svg`;
    
    // Start with jpg
    setImageSrc(jpgPath);
    setImageError(false);
  }, [src]);

  const handleError = () => {
    if (imageSrc?.endsWith('.jpg')) {
      // Try SVG as fallback
      setImageSrc(`${src}.svg`);
    } else {
      // Both failed, show placeholder
      setImageError(true);
    }
  };

  const imageNumber = src.match(/\/(\d+)$/)?.[1] || "";

  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: shouldAnimate ? 1 : 0, y: shouldAnimate ? 0 : 20 }}
      transition={{ 
        duration: 0.6, 
        delay: shouldAnimate ? 0.3 + index * 0.1 : 0,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-sm bg-[var(--background)]">
        {imageError || !imageSrc ? (
          <div className="image-placeholder">
            <div className="relative z-10 flex flex-col items-center gap-3 text-[var(--text-muted)]">
              <svg 
                className="w-12 h-12 opacity-40" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              <span className="text-sm font-light tracking-wider">
                Image {imageNumber}
              </span>
            </div>
          </div>
        ) : (
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={imageSrc}
              alt={alt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              onError={handleError}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        )}
      </div>
      
      <figcaption className="mt-4 px-1">
        <p className="caption leading-relaxed">
          {caption}
        </p>
      </figcaption>
    </motion.figure>
  );
}
