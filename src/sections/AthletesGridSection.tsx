import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Trophy, ChevronLeft, ChevronRight, Sparkles, Activity } from 'lucide-react';
import { personalData, Athlete } from '../data/personalData';

export const AthletesGridSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="athletes"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-28 bg-[#070707] text-[#F5F5F5] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-[#B9974A] tracking-[0.3em]">09</span>
          <span className="h-[1px] w-12 bg-[#B9974A]/40" />
          <h2 className="font-sans text-xs tracking-[0.35em] text-[#B8B8B8] uppercase">
            THE GRID • KINETIC ARCHIVE
          </h2>
        </div>

        {/* Section Title & Horizontal Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#F5F5F5]"
            >
              PEOPLE I WATCH.
            </motion.h3>
            <p className="font-serif italic text-base sm:text-lg text-[#B8B8B8] mt-2 font-light">
              Athletic masters whose composure, precision, and relentless standard of execution inspire my craft.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-white/10 bg-[#0C0C0C] text-[#F5F5F5] hover:border-[#B9974A] hover:bg-[#151515] transition-all"
              title="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full border border-white/10 bg-[#0C0C0C] text-[#F5F5F5] hover:border-[#B9974A] hover:bg-[#151515] transition-all"
              title="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Athlete Cards */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {personalData.athletes.map((athlete: Athlete, idx: number) => (
            <motion.div
              key={athlete.name}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group min-w-[280px] sm:min-w-[320px] p-6 sm:p-7 rounded-3xl border border-white/10 bg-[#0B0B0B] hover:border-[#B9974A]/60 hover:bg-[#111111] transition-all duration-300 flex flex-col justify-between snap-start"
            >
              <div>
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <span className="font-mono text-[10px] sm:text-xs text-[#B9974A] tracking-[0.2em] uppercase">
                    {athlete.sport}
                  </span>
                  {athlete.number && (
                    <span className="font-display font-black text-xl sm:text-2xl text-white/20 group-hover:text-[#B9974A] transition-colors">
                      #{athlete.number}
                    </span>
                  )}
                </div>

                <h4 className="font-display text-xl sm:text-2xl font-extrabold text-[#F5F5F5] tracking-normal sm:tracking-wide mb-2 break-words">
                  {athlete.name}
                </h4>

                <div className="inline-block px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono tracking-wider text-[#D4B265] uppercase mb-5">
                  {athlete.tag}
                </div>
              </div>

              <div className="pt-5 border-t border-white/5">
                <p className="font-serif italic text-xs sm:text-sm text-[#B8B8B8] leading-relaxed">
                  "{athlete.trait}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
