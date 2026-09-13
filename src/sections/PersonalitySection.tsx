import React from 'react';
import { motion } from 'motion/react';
import { personalData } from '../data/personalData';
import { Compass, Sparkles, ShieldCheck } from 'lucide-react';

export const PersonalitySection: React.FC = () => {
  const statements = personalData.personalityTraits;

  const coreAttributes = [
    'Chill demeanor & peaceful pacing',
    'Unapologetically comfortable being himself',
    'Ultra-curious mind exploring architecture & code',
    'Deep love for nocturnal music frequencies',
    'Quiet appreciation for luxury fashion & silhouettes',
    'Lifelong affinity for books on perspective and habit',
    'Exploring new horizons & solitary reflection',
    'Values grounded happiness over external validation',
    'Reverent faith and quiet inner strength',
  ];

  return (
    <section
      id="personality"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-28 bg-[#050505] overflow-hidden"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-[#B9974A] tracking-[0.3em]">02</span>
          <span className="h-[1px] w-12 bg-[#B9974A]/40" />
          <h2 className="font-sans text-xs tracking-[0.35em] text-[#B8B8B8] uppercase">
            CHARACTER & TEMPERAMENT
          </h2>
        </div>

        {/* Section Title */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#F5F5F5] mb-10 sm:mb-14"
        >
          JUST ME.
        </motion.h3>

        {/* Kinetic Giant Typography Row */}
        <div className="space-y-4 mb-16 sm:mb-20">
          {statements.map((stmt, idx) => (
            <motion.div
              key={stmt.title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center justify-between p-5 sm:p-7 rounded-2xl border border-white/5 bg-[#080808]/80 hover:border-[#B9974A]/40 hover:bg-[#0D0D0D] transition-all duration-300 gap-3"
            >
              <h4 className="font-display font-black text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight sm:tracking-wide text-[#E5E5E5] group-hover:text-[#B9974A] transition-colors">
                {stmt.title}
              </h4>
              <p className="font-serif italic text-xs sm:text-sm md:text-base text-[#B8B8B8]/70 group-hover:text-[#F5F5F5] transition-colors md:text-right max-w-sm">
                {stmt.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Peaceful Self-Awareness Ethos Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 p-8 rounded-2xl border border-[#B9974A]/20 bg-[#090909] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#B9974A]/10 flex items-center justify-center text-[#B9974A]">
                <Compass className="w-5 h-5" />
              </div>
              <h5 className="font-display text-xl font-bold text-[#F5F5F5]">
                Quiet Equilibrium
              </h5>
              <p className="font-serif italic text-sm text-[#B8B8B8] leading-relaxed">
                Exploring alone is not an escape from others—it is a serene communion with thoughts, space, and the craft of creation.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 text-[11px] font-mono text-[#B9974A] tracking-widest uppercase">
              INDEPENDENT • PEACEFUL • GROUNDED
            </div>
          </div>

          <div className="md:col-span-2 p-8 rounded-2xl border border-white/5 bg-[#090909] flex flex-col justify-center">
            <h5 className="font-sans text-xs tracking-[0.25em] text-[#B8B8B8]/60 uppercase mb-6 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B9974A]" />
              <span>THE PERSONAL CANVAS</span>
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {coreAttributes.map((attr, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-xs sm:text-sm text-[#B8B8B8] hover:text-white transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B9974A]/80 shrink-0" />
                  <span>{attr}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
