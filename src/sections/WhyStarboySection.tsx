import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Star, ArrowDown } from 'lucide-react';
import { personalData } from '../data/personalData';

export const WhyStarboySection: React.FC = () => {
  return (
    <section
      id="why-starboy"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 sm:px-12 py-28 bg-[#070707] text-[#F5F5F5] overflow-hidden"
    >
      {/* Cinematic Spotlight Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(185,151,74,0.07)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto text-center relative z-10">
        {/* Subtitle */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="font-mono text-xs text-[#B9974A] tracking-[0.3em]">03</span>
          <span className="h-[1px] w-12 bg-[#B9974A]/40" />
          <h2 className="font-sans text-xs tracking-[0.35em] text-[#B8B8B8] uppercase">
            THE ALIAS ORIGIN
          </h2>
          <span className="h-[1px] w-12 bg-[#B9974A]/40" />
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight mb-10 sm:mb-14"
        >
          WHY STARBOY?
        </motion.h3>

        {/* Cinematic Downward Progression */}
        <div className="flex flex-col items-center gap-4 sm:gap-5 my-6 sm:my-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-sm sm:text-lg tracking-[0.15em] sm:tracking-[0.25em] text-[#B8B8B8]"
          >
            {personalData.nickname}
          </motion.div>

          <ArrowDown className="w-4 h-4 text-[#B9974A]/60 animate-bounce" />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-base sm:text-xl md:text-2xl font-semibold tracking-[0.12em] sm:tracking-[0.2em] text-[#E5E5E5] uppercase"
          >
            {personalData.name}
          </motion.div>

          <ArrowDown className="w-4 h-4 text-[#B9974A]/60 animate-bounce" />

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative py-3 sm:py-4 px-6 sm:px-10 max-w-full rounded-2xl border border-[#B9974A]/40 bg-gradient-to-b from-[#141414] to-[#0A0A0A] shadow-[0_0_40px_rgba(185,151,74,0.15)]"
          >
            <div className="font-display font-black text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[0.06em] sm:tracking-[0.1em] text-gold-shimmer uppercase text-center">
              {personalData.starboyName}
            </div>
          </motion.div>
        </div>

        {/* Narrative Revelation Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 sm:mt-12 max-w-xl mx-auto space-y-3 px-4"
        >
          <p className="font-serif italic text-lg sm:text-2xl text-[#F5F5F5] font-light">
            "People usually call me STARBOY."
          </p>
          <p className="font-sans text-xs sm:text-sm text-[#B8B8B8]/70 leading-relaxed font-light">
            Born from an effortless synthesis of midnight music obsession, sharp monochrome aesthetic, and an unapologetic creative vision. It isn't a mask or a persona—it is simply who I am when the world gets quiet and the focus gets razor-sharp.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
