import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowUp, Compass } from 'lucide-react';
import { personalData } from '../data/personalData';

interface FinalScreenProps {
  onReturnToTop: () => void;
}

export const FinalScreen: React.FC<FinalScreenProps> = ({ onReturnToTop }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <section
      id="final"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 sm:px-12 py-32 bg-[#050505] text-[#F5F5F5] select-none overflow-hidden"
    >
      <div className="max-w-4xl w-full mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Subtle Epilogue Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <span className="font-mono text-xs tracking-[0.35em] text-[#B8B8B8]/40 uppercase">
            YOU'VE REACHED THE END.
          </span>
        </motion.div>

        {/* The Enigmatic Question */}
        <motion.h3
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight sm:tracking-[0.05em] text-[#F5F5F5] mb-10 sm:mb-12"
        >
          OR HAVE YOU?
        </motion.h3>

        {/* Central Monolith Identity Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="relative max-w-xl w-full p-6 sm:p-10 rounded-3xl border border-white/10 bg-[#090909]/90 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col items-center"
        >
          {/* Subtle Rotating Emblem Icon */}
          <div className="w-12 h-12 rounded-full border border-[#B9974A]/40 bg-[#B9974A]/10 flex items-center justify-center text-[#B9974A] mb-6 sm:mb-8">
            <Sparkles className="w-5 h-5 animate-spin" />
          </div>

          <div className="space-y-2 mb-6 sm:mb-8">
            <h4 className="font-sans text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#D4B265] uppercase">
              {personalData.name}
            </h4>
            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-[0.15em] sm:tracking-[0.2em] text-[#F5F5F5] uppercase">
              {personalData.starboyName}
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-sans text-[#B8B8B8]/70 mb-8 pb-6 sm:pb-8 border-b border-white/10 w-full">
            <a
              href="https://www.instagram.com/thmnprt/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#B9974A] transition-colors"
            >
              @thmnprt
            </a>
            <span>•</span>
            <span className="text-[#B8B8B8]/40">@mnprt.404</span>
            <span>•</span>
            <a
              href="https://www.snapchat.com/add/thmnprt?share_id=GYPMvvLhJSw&locale=en-IN"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#B9974A] transition-colors"
            >
              Snapchat
            </a>
          </div>

          {/* Final Whisper */}
          <p className="font-serif italic text-base sm:text-xl text-[#E5E5E5] font-light mb-8">
            "{personalData.taglines.finalQuote}"
          </p>

          {/* Return To Orbit Button */}
          <button
            id="return-to-orbit-btn"
            onClick={onReturnToTop}
            className="group flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-xs font-sans tracking-[0.2em] text-[#B8B8B8] uppercase hover:text-white hover:border-[#B9974A] hover:bg-white/10 transition-all active:scale-95"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#B9974A] transition-transform group-hover:-translate-y-1" />
            <span>RETURN TO ORBIT</span>
          </button>
        </motion.div>

        {/* Deep space copyright & coordinates */}
        <div className="mt-16 text-center font-mono text-[10px] text-[#B8B8B8]/30 tracking-widest uppercase space-y-1">
          <div>CHANDIGARH • SVIET SUPER 60 • 2008 — PRESENT</div>
          <div>MANPREET SINGH ARCHIVE • ALL FREQUENCIES RESERVED</div>
        </div>
      </div>
    </section>
  );
};
