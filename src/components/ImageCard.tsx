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
  totalImages?: number;
}

export default function ImageCard({ src, alt, caption, index, shouldAnimate = false, totalImages = 6 }: ImageCardProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const jpgPath = `${src}.jpg`;
    setImageSrc(jpgPath);
    setImageError(false);
  }, [src]);

  const handleError = () => {
    if (imageSrc?.endsWith('.jpg')) {
      setImageSrc(`${src}.svg`);
    } else {
      setImageError(true);
    }
  };

  const imageNumber = src.match(/\/(\d+)$/)?.[1] || "";

  // Calculate stagger delay based on position
  const baseDelay = 0.3;
  const staggerDelay = index * 0.15;
  const totalDelay = baseDelay + staggerDelay;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: 15 }}
      animate={{ 
        opacity: shouldAnimate ? 1 : 0, 
        y: shouldAnimate ? 0 : 60,
        scale: shouldAnimate ? 1 : 0.9,
        rotateX: shouldAnimate ? 0 : 15
      }}
      transition={{ 
        duration: 0.8,
        delay: shouldAnimate ? totalDelay : 0,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="group perspective-1000"
      style={{ transformStyle: "preserve-3d" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="relative overflow-hidden rounded-sm bg-[var(--background)]"
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Glowing border on hover */}
        <motion.div
          className="absolute inset-0 rounded-sm z-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: "inset 0 0 0 1px var(--accent-warm), 0 0 30px rgba(212, 165, 116, 0.2)"
          }}
        />
        
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
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.1 }}
              animate={{ scale: shouldAnimate ? 1 : 1.1 }}
              transition={{ duration: 1.2, delay: totalDelay, ease: "easeOut" }}
            >
              <Image
                src={imageSrc}
                alt={alt}
                fill
                className="object-cover"
                onError={handleError}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
            
            {/* Cinematic overlay on hover */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Light sweep effect on entry */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: shouldAnimate ? "200%" : "-100%" }}
              transition={{ 
                duration: 0.8, 
                delay: totalDelay + 0.3,
                ease: "easeInOut"
              }}
            />
          </div>
        )}
      </motion.div>
      
      {/* Caption with reveal animation */}
      <motion.figcaption 
        className="mt-4 px-1 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: shouldAnimate ? 1 : 0 }}
        transition={{ duration: 0.6, delay: totalDelay + 0.4 }}
      >
        <motion.p 
          className="caption leading-relaxed"
          initial={{ y: 20 }}
          animate={{ y: shouldAnimate ? 0 : 20 }}
          transition={{ duration: 0.6, delay: totalDelay + 0.4 }}
        >
          {caption}
        </motion.p>
      </motion.figcaption>
    </motion.figure>
  );
}
