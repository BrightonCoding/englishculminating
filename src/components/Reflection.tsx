"use client";

import { motion } from "framer-motion";

interface ReflectionProps {
  isActive?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
}

export default function Reflection({ isActive = false, onNext, onPrevious }: ReflectionProps) {
  const paragraphs = [
    "This artifact traces my journey from receiving love to losing myself to finding my way back. My father taught me to observe—to see who people are without them speaking. But observation without connection became isolation. I poured myself into building startups, achieving goals, and becoming someone impressive. I stopped talking to people. I had no time, and I convinced myself I did not need anyone.",
    
    "Then I watched Portraits from a Fire—a Tsilhqot'in film about a boy named Tyler whose father is physically present but emotionally absent. Tyler heals by sharing his most personal story with his community. The final scene, where his father finally hugs him, broke something open in me. I kept thinking about it. I started sharing—first with myself, then with friends, then with my family.",
    
    "The Daniel Heath Justice question asks: How do we learn to be human? My answer: We learn by breaking. By walking alone at night until we can breathe. By letting the same people who wound us also be the ones who heal us. By taking a spontaneous trip when we have nothing left. By sitting at a table with our family and remembering why any of it matters.",
    
    "The Grandfather Teaching of Love is not about softness. It is about courage—the courage to be vulnerable, to share what we have buried, to hope for the hug at the end even when it has not come yet.",
    
    "I lost myself in building. I found myself in sharing. Learning to be human means learning to love again—others, and myself."
  ];

  return (
    <section className="h-screen overflow-y-auto px-6 md:px-12 py-12 md:py-16 bg-gradient-to-b from-[var(--background)] to-[#0a0908]">
      <div className="max-w-3xl mx-auto min-h-full flex flex-col justify-center">
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 md:mb-16 text-center"
        >
          <div className="w-16 h-px bg-[var(--accent-warm)] mx-auto mb-8 opacity-40" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[var(--foreground)] glow-text">
            Reflection
          </h2>
        </motion.header>

        {/* Reflection Content */}
        <div className="space-y-8">
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
              transition={{ 
                duration: 0.6, 
                delay: isActive ? 0.3 + index * 0.1 : 0,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className={`text-lg md:text-xl leading-relaxed font-light ${
                index === paragraphs.length - 1 
                  ? "text-[var(--accent-warm)] italic text-center mt-12 pt-8 border-t border-[var(--border-subtle)]" 
                  : "text-[var(--foreground)] opacity-90"
              }`}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Decorative end element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.6, delay: isActive ? 0.8 : 0 }}
          className="mt-12 md:mt-16 flex justify-center"
        >
          <svg 
            className="w-8 h-8 text-[var(--accent-warm)] opacity-30" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
