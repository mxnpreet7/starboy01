import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { personalData } from '../data/personalData';

export const BeliefSection: React.FC = () => {
  return (
    <section
      id="belief"
      className="relative min-h-[70vh] w-full flex flex-col justify-center items-center px-6 sm:px-12 py-32 bg-[#050505] text-[#F5F5F5] border-t border-white/5 select-none"
    >
      <div className="max-w-3xl w-full mx-auto text-center space-y-10">
        {/* Subtle Section Index */}
        <div className="flex items-center justify-center gap-3">
          <span className="font-mono text-xs text-[#B9974A] tracking-[0.3em]">11</span>
          <span className="h-[1px] w-12 bg-[#B9974A]/40" />
          <h2 className="font-sans text-xs tracking-[0.35em] text-[#B8B8B8] uppercase">
            INNER SANCTUARY
          </h2>
          <span className="h-[1px] w-12 bg-[#B9974A]/40" />
        </div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#F5F5F5]"
        >
          BELIEF.
        </motion.h3>

        {/* Minimal Kinetic Resonance Words */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-sans text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-[#B8B8B8]/60 uppercase">
          <span>SILENCE</span>
          <span className="text-[#B9974A]">•</span>
          <span>FAITH</span>
          <span className="text-[#B9974A]">•</span>
          <span>PERSPECTIVE</span>
          <span className="text-[#B9974A]">•</span>
          <span>GRATITUDE</span>
        </div>

        {/* The Profound Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-serif italic text-lg sm:text-2xl md:text-3xl text-[#E5E5E5] font-light leading-relaxed max-w-2xl mx-auto pt-4"
        >
          "{personalData.taglines.beliefQuote}"
        </motion.p>
      </div>
    </section>
  );
};
