import React from 'react';
import { motion } from 'motion/react';
import { Users, ShieldAlert, Sparkles, Target, Zap } from 'lucide-react';
import { personalData } from '../data/personalData';
import { Super60Particles } from '../components/3d/Super60Particles';

export const Super60Section: React.FC = () => {
  const pillars = personalData.community.pillars;

  return (
    <section
      id="super60"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-28 bg-[#050505] text-[#F5F5F5] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-[#B9974A] tracking-[0.3em]">08</span>
          <span className="h-[1px] w-12 bg-[#B9974A]/40" />
          <h2 className="font-sans text-xs tracking-[0.35em] text-[#B8B8B8] uppercase">
            COLLECTIVE INTELLIGENCE
          </h2>
        </div>

        {/* Section Title & Subtitle */}
        <div className="mb-12 sm:mb-14">
          <motion.h3
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#F5F5F5]"
          >
            {personalData.community.name}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-xs sm:text-sm md:text-base font-bold tracking-[0.12em] sm:tracking-[0.18em] text-[#B9974A] uppercase mt-2"
          >
            {personalData.community.subtitle}
          </motion.p>

          <p className="font-serif italic text-sm sm:text-base text-[#B8B8B8] mt-3 max-w-2xl font-light leading-relaxed">
            An elite academic cohort at {personalData.community.institution} selected for computational rigor, leadership, and unyielding intellectual hunger.
          </p>
        </div>

        {/* 3D 60-Particle Interactive Constellation Engine */}
        <div className="mb-16 sm:mb-20">
          <Super60Particles />
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
              className="p-6 sm:p-7 rounded-2xl border border-white/5 bg-[#090909] hover:border-[#B9974A]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] text-[#B9974A] tracking-[0.25em]">
                  CORE 0{idx + 1}
                </span>
                <h4 className="font-display text-lg sm:text-xl font-bold text-[#F5F5F5] mt-3 mb-2">
                  {pillar.title}
                </h4>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#B8B8B8]/70 leading-relaxed font-light">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
