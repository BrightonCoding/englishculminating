"use client";

import { motion } from "framer-motion";

interface FooterProps {
  isActive?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
}

export default function Footer({ isActive = false, onNext, onPrevious }: FooterProps) {
  return (
    <footer className="h-screen flex items-center justify-center px-6 bg-[#0a0908] border-t border-[var(--border-subtle)]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.6, delay: isActive ? 0.2 : 0 }}
        className="max-w-4xl mx-auto text-center"
      >
        <p className="text-[var(--foreground)] text-lg font-serif mb-2">
          Brighton Ng, 2025
        </p>
        <p className="text-[var(--text-muted)] text-sm mb-4">
          AP English Culminating Project
        </p>
        <div className="flex items-center justify-center gap-2 text-[var(--accent-warm)] text-sm">
          <span className="tracking-wider">Grandfather Teaching:</span>
          <span className="font-serif italic">Love</span>
        </div>
        
        {/* Film Attribution */}
        <div className="mt-8 pt-8 border-t border-[var(--border-subtle)]">
          <p className="text-[var(--text-muted)] text-xs">
            Course Text Connection: <em>Portraits from a Fire</em> (2021) — A Tsilhqot&apos;in film by Trevor Mack
          </p>
          <p className="text-[var(--text-muted)] text-xs mt-2">
            Daniel Heath Justice Question: ;How do we learn to be human?
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
