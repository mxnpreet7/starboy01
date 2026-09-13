import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { personalData } from '../data/personalData';
import { Hero3DCanvas } from '../components/3d/Hero3DCanvas';

export const HeroSection: React.FC = () => {
  const [namePhase, setNamePhase] = useState<'manni' | 'manpreet' | 'starboy'>('manni');
  const { scrollY } = useScroll();

  // Cinematic sequence timing
  useEffect(() => {
    const t1 = setTimeout(() => setNamePhase('manpreet'), 1800);
    const t2 = setTimeout(() => setNamePhase('starboy'), 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Parallax scroll into depth
  const textScale = useTransform(scrollY, [0, 600], [1, 0.45]);
  const textOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const textBlur = useTransform(scrollY, [0, 450], ['blur(0px)', 'blur(12px)']);
  const textZ = useTransform(scrollY, [0, 600], [0, -250]);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen w-full flex flex-col items-center justify-between px-6 sm:px-12 py-20 overflow-hidden bg-[#050505] select-none"
    >
      {/* 3D WebGL Canvas Layer */}
      <Hero3DCanvas />

      {/* Top subtle atmosphere line */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="relative z-10 pt-12 sm:pt-16 flex items-center gap-2 text-[9px] sm:text-xs font-sans tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#B8B8B8]/70 text-center px-4"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#B9974A] shrink-0" />
        <span className="truncate sm:overflow-visible">{personalData.taglines.opening}</span>
      </motion.div>

      {/* Hero Central Typography Transformation */}
      <motion.div
        style={{
          scale: textScale,
          opacity: textOpacity,
          filter: textBlur,
          translateZ: textZ,
        }}
        className="relative z-10 text-center my-auto max-w-5xl w-full flex flex-col items-center justify-center py-6 sm:py-10 px-2"
      >
        {/* Transforming Name Identity */}
        <div className="h-14 sm:h-16 flex items-center justify-center mb-2">
          {namePhase === 'manni' && (
            <motion.p
              key="manni"
              initial={{ opacity: 0, letterSpacing: '0.4em' }}
              animate={{ opacity: 0.7, letterSpacing: '0.3em' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="font-mono text-xs sm:text-base text-[#B8B8B8] tracking-[0.25em] sm:tracking-[0.4em]"
            >
              MANNI
            </motion.p>
          )}

          {namePhase === 'manpreet' && (
            <motion.p
              key="manpreet"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.85, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              className="font-sans text-[11px] sm:text-xs md:text-sm text-[#D4B265] tracking-[0.2em] sm:tracking-[0.3em] font-medium uppercase truncate max-w-full px-2"
            >
              MANPREET SINGH
            </motion.p>
          )}

          {namePhase === 'starboy' && (
            <motion.div
              key="starboy-badge"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="flex items-center gap-2 px-3 py-1 rounded-full border border-[#B9974A]/30 bg-[#B9974A]/5 text-[9px] sm:text-[10px] font-mono tracking-[0.15em] sm:tracking-[0.25em] text-[#B9974A] uppercase"
            >
              <Sparkles className="w-3 h-3 text-[#B9974A]" />
              <span>THE DIGITAL UNIVERSE OF</span>
            </motion.div>
          )}
        </div>

        {/* Main STARBOY Monolith Heading */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[6.8rem] xl:text-[7.8rem] tracking-[0.04em] sm:tracking-[0.08em] text-[#F5F5F5] leading-none uppercase drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-center w-full max-w-full"
        >
          STARBOY
        </motion.h1>

        {/* Supporting Quotes & Intention */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-5 sm:mt-6 flex flex-col items-center gap-2 max-w-xl px-4"
        >
          <p className="font-serif italic text-base sm:text-xl text-[#E5E5E5] font-light tracking-wide text-center">
            "{personalData.taglines.heroSub}"
          </p>
          <p className="font-sans text-[11px] sm:text-xs text-[#B8B8B8]/60 tracking-[0.12em] sm:tracking-[0.18em] uppercase font-light text-center">
            {personalData.taglines.heroSubAlt}
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="relative z-10 flex flex-col items-center gap-2 pb-6 text-[#B8B8B8]/50 hover:text-[#B9974A] transition-colors cursor-pointer"
        onClick={() => {
          document.getElementById('identity')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase">
          SCROLL TO DISCOVER
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#B9974A]" />
      </motion.div>
    </section>
  );
};
