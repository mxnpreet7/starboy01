import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Eye, Scissors } from 'lucide-react';
import { personalData } from '../data/personalData';

export const FashionSection: React.FC = () => {
  const statements = personalData.fashionStatements;

  return (
    <section
      id="style"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-28 bg-[#050505] text-[#F5F5F5] border-t border-white/5"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-[#B9974A] tracking-[0.3em]">06</span>
          <span className="h-[1px] w-12 bg-[#B9974A]/40" />
          <h2 className="font-sans text-xs tracking-[0.35em] text-[#B8B8B8] uppercase">
            EDITORIAL SILHOUETTE
          </h2>
        </div>

        {/* Section Title */}
        <motion.h3
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight mb-4 text-[#F5F5F5]"
        >
          STYLE IS A LANGUAGE.
        </motion.h3>

        {/* Core Editorial Manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <p className="font-serif italic text-lg sm:text-2xl text-[#E5E5E5] font-light leading-relaxed">
            "{personalData.taglines.fashionQuote}"
          </p>
        </motion.div>

        {/* Luxury Monochrome Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-16 sm:mb-20">
          {statements.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
              className="group relative p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#090909] hover:border-[#B9974A]/60 hover:bg-[#0E0E0E] transition-all duration-300 flex flex-col justify-between min-h-[220px] sm:min-h-[240px]"
            >
              <div>
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[#B9974A]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#B9974A] transition-colors" />
                </div>

                <h4 className="font-display text-lg sm:text-xl lg:text-lg xl:text-xl font-bold tracking-wide text-[#F5F5F5] mb-2 break-words">
                  {item.label}
                </h4>
              </div>

              <p className="font-serif italic text-xs sm:text-sm text-[#B8B8B8] leading-relaxed">
                {item.note}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Editorial Monochrome Statement Banner */}
        <div className="relative p-6 sm:p-10 rounded-3xl border border-white/10 bg-gradient-to-r from-[#0A0A0A] via-[#111111] to-[#0A0A0A] overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-2.5 max-w-xl">
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#B9974A] uppercase">
                THE STARBOY UNIFORM
              </span>
              <h5 className="font-display text-xl sm:text-2xl font-bold text-[#F5F5F5]">
                Heavyweight Noir & Intentional Restraint
              </h5>
              <p className="font-sans text-xs sm:text-sm text-[#B8B8B8]/70 leading-relaxed font-light">
                Monochrome palette. Tailored proportions. Every piece chosen for architecture rather than flash. When visual clutter is stripped away, the wearer becomes the statement.
              </p>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono text-[#B8B8B8]/50 uppercase tracking-widest shrink-0">
              <span>NOIR</span>
              <span>•</span>
              <span>STRUCTURE</span>
              <span>•</span>
              <span>PRESENCE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
