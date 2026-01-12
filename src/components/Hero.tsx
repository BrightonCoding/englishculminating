"use client";

import { motion } from "framer-motion";

interface HeroProps {
  isActive?: boolean;
  onNext?: () => void;
}

export default function Hero({ isActive = true, onNext }: HeroProps) {

  return (
    <section className="h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden">
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0908] via-[var(--background)] to-[var(--background)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,165,116,0.05)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(184,115,51,0.03)_0%,transparent_50%)]" />
      
      {/* Subtle decorative lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-[var(--accent-warm)] to-transparent opacity-20" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Epigraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-[var(--text-muted)] text-sm tracking-[0.25em] uppercase mb-8"
        >
          A Personal Artifact
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-[var(--foreground)] mb-8 leading-[1.1] glow-text"
        >
          Who Am I?<br />
         
        </motion.h1>

        {/* Author */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-lg md:text-xl text-[var(--text-muted)] font-light tracking-wide mb-4"
        >
          by Brighton Ng
        </motion.p>

        {/* Thesis quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="max-w-2xl mx-auto mt-12 mb-16"
        >
          <p className="text-[var(--foreground)] text-lg md:text-lg font-light italic leading-relaxed opacity-80">
           I was drowning myself in piles of work, hoping that  will give me purpose in life. But I realized the only way to find myself is by opening up to others and genuinely sharing my feelings. Learning to be human not only means learning to love others, but ourselves too.
          </p>
        </motion.blockquote>

        {/* Begin button */}
        <motion.button
          onClick={onNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="group mt-8 cursor-pointer"
          aria-label="Begin reading"
        >
          <span className="text-[var(--accent-warm)] text-sm tracking-[0.2em] uppercase block mb-4 group-hover:opacity-80 transition-opacity">
            Begin
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg 
              className="w-6 h-6 mx-auto text-[var(--accent-warm)] opacity-60 group-hover:opacity-100 transition-opacity" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </motion.div>
        </motion.button>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />
    </section>
  );
}
