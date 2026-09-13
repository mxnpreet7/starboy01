import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Compass, Eye, KeyRound } from 'lucide-react';
import { EasterEggNotification } from '../types';

interface EasterEggsProps {
  externalTrigger?: EasterEggNotification | null;
  onClearTrigger?: () => void;
}

export const EasterEggs: React.FC<EasterEggsProps> = ({ externalTrigger, onClearTrigger }) => {
  const [notification, setNotification] = useState<EasterEggNotification | null>(null);
  const [keyBuffer, setKeyBuffer] = useState<string>('');
  const [warpActive, setWarpActive] = useState(false);

  // Synchronize external triggers (like 3 clicks on logo)
  useEffect(() => {
    if (externalTrigger) {
      setNotification(externalTrigger);
      const timer = setTimeout(() => {
        setNotification(null);
        if (onClearTrigger) onClearTrigger();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [externalTrigger, onClearTrigger]);

  // Easter Egg 04: Type "STARBOY" on keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input field
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      const char = e.key.toUpperCase();
      if (/^[A-Z]$/.test(char)) {
        setKeyBuffer((prev) => {
          const next = (prev + char).slice(-7);
          if (next === 'STARBOY') {
            triggerWarp();
            return '';
          }
          return next;
        });
      }
    };

    const triggerWarp = () => {
      setWarpActive(true);
      setNotification({
        id: 'egg-type-starboy',
        title: 'KEY SEQUENCE UNLOCKED',
        message: 'Cinematic Frequency Harmonized. Welcome to the Inner Orbit.',
        badge: 'TRANSCENDENCE',
      });
      setTimeout(() => {
        setWarpActive(false);
      }, 2500);
      setTimeout(() => {
        setNotification(null);
      }, 6000);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Easter Egg 02: Rapid upward scroll after reaching bottom
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    let hasReachedBottom = false;

    const onScroll = () => {
      const scrollY = window.scrollY;
      const now = Date.now();
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollY >= docHeight - 50) {
        hasReachedBottom = true;
      }

      if (hasReachedBottom && scrollY < docHeight - 400) {
        const deltaY = lastScrollY - scrollY;
        const deltaTime = now - lastTime;
        const velocity = deltaY / Math.max(deltaTime, 1);

        // Rapid scroll up
        if (velocity > 1.8) {
          hasReachedBottom = false;
          setNotification({
            id: 'egg-rapid-scroll',
            title: "THERE'S ALWAYS MORE.",
            message: 'You reversed the flow of time. Keep digging beneath the surface.',
            badge: 'CURIOSITY',
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
        }
      }

      lastScrollY = scrollY;
      lastTime = now;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Golden Warp Shimmer Flash (Easter Egg 04) */}
      <AnimatePresence>
        {warpActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(185,151,74,0.35)_0%,rgba(5,5,5,0.95)_75%)] backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, letterSpacing: '0.1em' }}
              animate={{ scale: 1.1, letterSpacing: '0.4em' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="text-center"
            >
              <h2 className="font-display font-black text-4xl sm:text-7xl text-gold-shimmer">
                STARBOY
              </h2>
              <p className="font-mono text-xs tracking-[0.3em] text-[#F5F5F5]/70 mt-4 uppercase">
                COGNITIVE WARP PROTOCOL ACTIVE
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Toast Badge Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[90%] p-4 rounded-xl border border-[#B9974A]/40 bg-[#0B0B0B]/95 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(185,151,74,0.2)] text-[#F5F5F5]"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#B9974A]/10 text-[#B9974A] mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] tracking-widest text-[#B9974A] uppercase">
                    {notification.badge || 'SECRET DISCOVERED'}
                  </span>
                  <button
                    onClick={() => setNotification(null)}
                    className="text-[#B8B8B8]/50 hover:text-white text-xs"
                  >
                    ✕
                  </button>
                </div>
                <h4 className="font-display font-semibold text-sm tracking-wide text-[#F5F5F5]">
                  {notification.title}
                </h4>
                <p className="font-sans text-xs text-[#B8B8B8] mt-1 leading-relaxed">
                  {notification.message}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
