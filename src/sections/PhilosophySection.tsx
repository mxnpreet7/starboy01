import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  const kineticWords = [
    'MUSIC.',
    'BOOKS.',
    'STYLE.',
    'CODE.',
    'TRAVEL.',
    'CURIOSITY.',
    'FAITH.',
    'SELF.',
  ];

  return (
    <section
      id="philosophy"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 sm:px-12 py-32 bg-[#060606] text-[#F5F5F5] border-t border-white/5 overflow-hidden select-none"
    >
      {/* Background kinetic text ticker or pulse */}
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-[#B9974A] tracking-[0.3em]">12</span>
          <span className="h-[1px] w-12 bg-[#B9974A]/40" />
          <h2 className="font-sans text-xs tracking-[0.35em] text-[#B8B8B8] uppercase">
            THE SYNTHESIS
          </h2>
          <span className="h-[1px] w-12 bg-[#B9974A]/40" />
        </div>

        {/* Rapid Kinetic Stream Words */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-6 gap-y-2 sm:gap-y-3 max-w-4xl mb-12 sm:mb-16">
          {kineticWords.map((word, idx) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="font-display font-black text-lg xs:text-xl sm:text-3xl md:text-4xl text-[#444444] hover:text-[#B9974A] transition-colors cursor-default"
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* The Final Climax Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative py-4 sm:py-6 px-6 sm:px-12 max-w-full rounded-3xl border border-[#B9974A]/30 bg-gradient-to-b from-[#111111] to-[#080808] shadow-[0_0_50px_rgba(185,151,74,0.15)]"
        >
          <h3 className="font-display font-black text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.04em] sm:tracking-[0.08em] text-[#F5F5F5] uppercase text-center leading-none">
            BE YOURSELF.
          </h3>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-serif italic text-sm sm:text-xl text-[#B8B8B8] max-w-xl mt-6 font-light px-4 text-center"
        >
          No persona to defend. No template to copy. Pure authenticity in an age of imitation.
        </motion.p>
      </div>
    </section>
  );
};
