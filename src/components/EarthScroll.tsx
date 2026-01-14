"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 40;

// Generate frame paths
const getFramePath = (index: number): string => {
  const frameNum = String(index + 1).padStart(3, "0");
  return `/scroll_images/ezgif-frame-${frameNum}.jpg`;
};

interface EarthScrollProps {
  onScrollComplete?: () => void;
}

export default function EarthScroll({ onScrollComplete }: EarthScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [titleVisible, setTitleVisible] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to frame index (complete animation by 65% scroll)
  const frameIndex = useTransform(scrollYProgress, [0, 0.65], [0, TOTAL_FRAMES - 1]);

  // Preload all images
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises: Promise<HTMLImageElement>[] = [];
      
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const promise = new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            setLoadProgress((prev) => Math.min(prev + (100 / TOTAL_FRAMES), 100));
            resolve(img);
          };
          img.onerror = reject;
          img.src = getFramePath(i);
        });
        imagePromises.push(promise);
      }

      try {
        const loadedImages = await Promise.all(imagePromises);
        setImages(loadedImages);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load images:", error);
      }
    };

    loadImages();
  }, []);

  // Draw frame to canvas
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = images[index];

    if (!canvas || !ctx || !img) return;

    const aspectRatio = img.width / img.height;
    const containerWidth = canvas.parentElement?.clientWidth || window.innerWidth;
    const containerHeight = canvas.parentElement?.clientHeight || window.innerHeight;
    
    let drawWidth, drawHeight;
    
    if (containerWidth / containerHeight > aspectRatio) {
      drawWidth = containerWidth;
      drawHeight = containerWidth / aspectRatio;
    } else {
      drawHeight = containerHeight;
      drawWidth = containerHeight * aspectRatio;
    }
    
    canvas.width = containerWidth;
    canvas.height = containerHeight;
    
    const x = (containerWidth - drawWidth) / 2;
    const y = (containerHeight - drawHeight) / 2;
    
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, drawWidth, drawHeight);
  }, [images]);

  // Update canvas on scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const index = Math.min(Math.floor(latest), TOTAL_FRAMES - 1);
    setCurrentFrame(index);
    if (images.length > 0) {
      drawFrame(index);
    }
  });

  // Lock scroll when title should appear
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.68 && !titleVisible) {
      setTitleVisible(true);
    }
    
    // Lock scroll at 75%
    if (latest >= 0.75 && !isLocked) {
      setIsLocked(true);
      // Prevent further scrolling
      document.body.style.overflow = 'hidden';
      // Scroll to the lock position
      if (containerRef.current) {
        const lockPosition = containerRef.current.offsetHeight * 0.75;
        window.scrollTo({ top: lockPosition, behavior: 'smooth' });
      }
    }
  });

  // Initial draw and resize handler
  useEffect(() => {
    if (images.length > 0) {
      drawFrame(currentFrame);
      
      const handleResize = () => drawFrame(currentFrame);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [images, currentFrame, drawFrame]);

  // Handle enter button click
  const handleEnter = () => {
    document.body.style.overflow = '';
    onScrollComplete?.();
  };

  return (
    <div 
      ref={containerRef} 
      className="relative h-[600vh] w-full bg-black"
    >
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Loading State */}
        {isLoading && (
          <motion.div 
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative mb-8">
              <motion.div
                className="w-16 h-16 rounded-full border-2 border-[var(--accent-warm)]/20"
                style={{ borderTopColor: "var(--accent-warm)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[var(--accent-warm)]"
                initial={{ width: 0 }}
                animate={{ width: `${loadProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            <p className="mt-4 text-white/40 text-sm font-light tracking-wider">
              Loading experience...
            </p>
          </motion.div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ 
            opacity: isLoading ? 0 : 1,
            transition: "opacity 0.5s ease-out"
          }}
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          {/* Scroll indicator - Only at the very start */}
          <motion.div
            className="absolute bottom-12"
            style={{ 
              opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0])
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-white/40 text-xs tracking-[0.2em] uppercase">
                Scroll to begin
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg 
                  className="w-5 h-5 text-[var(--accent-warm)] opacity-60" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          {/* Title - Appears after scrolling through images */}
          <motion.div
            className="text-center px-6"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ 
              opacity: titleVisible ? 1 : 0, 
              y: titleVisible ? 0 : 60,
              scale: titleVisible ? 1 : 0.9
            }}
            transition={{ 
              duration: 1.2, 
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.1
            }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: titleVisible ? 1 : 0, y: titleVisible ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[var(--text-muted)] text-sm tracking-[0.3em] uppercase mb-6"
            >
              A Personal Artifact
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: titleVisible ? 1 : 0, y: titleVisible ? 0 : 30 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-white mb-6 leading-[1.1]"
              style={{ textShadow: "0 0 80px rgba(0,0,0,0.9)" }}
            >
              How I Learned<br />
              <span className="text-[var(--accent-warm)]">to Be Human</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: titleVisible ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-white/60 text-lg md:text-xl font-light tracking-wide mb-12"
            >
              by Brighton Ng
            </motion.p>

            {/* Begin Phase I Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: titleVisible ? 1 : 0, y: titleVisible ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="pointer-events-auto"
            >
              <motion.button
                onClick={handleEnter}
                className="group relative px-10 py-4 cursor-pointer overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Button background */}
                <motion.div 
                  className="absolute inset-0 border border-[var(--accent-warm)]/50 rounded-sm"
                  whileHover={{ borderColor: "var(--accent-warm)" }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Hover fill effect */}
                <motion.div 
                  className="absolute inset-0 bg-[var(--accent-warm)]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{ transformOrigin: "left" }}
                />
                
                <span className="relative z-10 flex items-center gap-3 text-[var(--accent-warm)] group-hover:text-black transition-colors duration-300">
                  <span className="text-sm tracking-[0.2em] uppercase font-medium">
                    Begin Phase I
                  </span>
                  <motion.svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" 
                    />
                  </motion.svg>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Vignette overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)"
          }}
        />
      </div>
    </div>
  );
}
