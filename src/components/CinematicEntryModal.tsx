import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sparkles, Music2 } from 'lucide-react';
import { isInstagramBrowser, YOUTUBE_TRACK_TITLE, YOUTUBE_TRACK_ARTIST } from '../utils/audioEngine';

interface CinematicEntryModalProps {
  onEnter: (soundEnabled: boolean) => void;
}

export const CinematicEntryModal: React.FC<CinematicEntryModalProps> = ({ onEnter }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const isIg = isInstagramBrowser();

  useEffect(() => {
    // Quick, smooth loading progression
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoaded(true);
          return 100;
        }
        const step = Math.floor(Math.random() * 25) + 20;
        return Math.min(prev + step, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }}
        className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#050505] text-[#F5F5F5] px-6 selection:bg-[#B9974A] selection:text-black"
      >
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(185,151,74,0.08)_0,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-md w-full text-center flex flex-col items-center">
          {/* Ambient micro brand */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 text-[10px] font-sans tracking-[0.35em] text-[#B9974A] uppercase mb-6"
          >
            <Sparkles className="w-3 h-3 text-[#B9974A]" />
            <span>DIGITAL IDENTITY ARCHIVE</span>
          </motion.div>

          {/* Typography transformation preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-6"
          >
            <h2 className="font-serif italic text-lg sm:text-xl text-[#B8B8B8] mb-2 tracking-wide font-light">
              Somewhere between curiosity and chaos
            </h2>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-[0.2em] text-[#F5F5F5]">
              STARBOY
            </h1>
            <p className="font-sans text-xs tracking-[0.25em] text-[#B8B8B8]/60 uppercase mt-3">
              MANPREET SINGH
            </p>
          </motion.div>

          {/* Track preview badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-[#0E0E0E] text-[10px] font-mono text-[#B8B8B8] tracking-wider"
          >
            <Music2 className="w-3 h-3 text-[#B9974A] animate-pulse" />
            <span>SOUNDTRACK: {YOUTUBE_TRACK_TITLE}</span>
            <span className="text-[#B9974A]/70">• {YOUTUBE_TRACK_ARTIST}</span>
          </motion.div>

          {/* Progress or Actions */}
          {!isLoaded ? (
            <div className="w-full max-w-xs flex flex-col items-center space-y-3">
              <div className="w-full h-[2px] bg-[#1C1C1C] overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#B9974A] to-[#F5E6C8]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.2 }}
                />
              </div>
              <div className="flex justify-between w-full text-[11px] font-sans text-[#B8B8B8]/50 tracking-widest">
                <span>INITIALIZING UNIVERSE...</span>
                <span className="font-mono text-[#B9974A]">{progress}%</span>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-2"
            >
              <button
                id="enter-with-sound-btn"
                onClick={() => onEnter(true)}
                className="group relative flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-[#B9974A] text-black font-sans font-medium text-xs tracking-widest uppercase transition-all duration-300 hover:bg-[#D4B265] hover:shadow-[0_0_24px_rgba(185,151,74,0.4)] active:scale-95"
              >
                <Volume2 className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>Enter With Sound</span>
              </button>

              <button
                id="enter-silent-btn"
                onClick={() => onEnter(false)}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full border border-white/15 bg-white/5 text-[#B8B8B8] font-sans text-xs tracking-widest uppercase transition-all duration-300 hover:text-white hover:border-white/35 hover:bg-white/10 active:scale-95"
              >
                <VolumeX className="w-3.5 h-3.5 opacity-60" />
                <span>Enter Silently</span>
              </button>
            </motion.div>
          )}

          {/* Subtext info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-[11px] font-serif italic text-[#B8B8B8]/40 mt-8"
          >
            {isIg ? 'Optimized for Instagram • Tap to start sound' : '"Curious about everything. Attached to almost nothing."'}
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
