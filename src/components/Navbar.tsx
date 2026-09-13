import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';
import { personalData } from '../data/personalData';

interface NavbarProps {
  onTriggerStarboyEgg: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onTriggerStarboyEgg, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [starboyClicks, setStarboyClicks] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.round((window.scrollY / totalHeight) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle STARBOY logo clicks for Easter Egg 01
  const handleLogoClick = () => {
    const nextCount = starboyClicks + 1;
    setStarboyClicks(nextCount);
    if (nextCount >= 3) {
      onTriggerStarboyEgg();
      setStarboyClicks(0);
    }
  };

  const menuItems = [
    { num: '01', label: 'IDENTITY', id: 'identity' },
    { num: '02', label: 'MUSIC', id: 'music' },
    { num: '03', label: 'BOOKS', id: 'books' },
    { num: '04', label: 'STYLE', id: 'style' },
    { num: '05', label: 'CODE', id: 'technology' },
    { num: '06', label: 'SUPER 60', id: 'super60' },
    { num: '07', label: 'ATHLETES', id: 'athletes' },
    { num: '08', label: 'ARCHIVE', id: 'travel' },
    { num: '09', label: 'CONNECT', id: 'social' },
  ];

  const handleItemClick = (id: string) => {
    setIsMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-6 flex items-center justify-between pointer-events-none">
        {/* Top-Left: STARBOY logo with secret 3-click trigger */}
        <div className="pointer-events-auto">
          <button
            id="nav-logo-starboy"
            onClick={handleLogoClick}
            className="group flex items-center gap-2 text-left focus:outline-none"
            title="STARBOY — Manpreet Singh"
          >
            <span className="font-display font-black text-lg sm:text-xl tracking-[0.25em] text-[#F5F5F5] transition-colors group-hover:text-[#B9974A]">
              STARBOY
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#B8B8B8]/40 border-l border-white/10 pl-2">
              06.07
            </span>
          </button>
        </div>

        {/* Center: Subtle Scroll Percentage Indicator */}
        <div className="pointer-events-auto hidden md:flex items-center gap-3 px-3 py-1 rounded-full border border-white/5 bg-[#0A0A0A]/60 backdrop-blur-md text-[10px] font-mono text-[#B8B8B8]/60">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B9974A] animate-pulse" />
          <span>EXP: {scrollProgress}%</span>
        </div>

        {/* Top-Right: MENU toggle button */}
        <div className="pointer-events-auto flex items-center gap-4">
          <button
            id="nav-menu-toggle-btn"
            onClick={() => setIsMenuOpen(true)}
            className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md text-xs font-sans tracking-[0.2em] uppercase text-[#F5F5F5] transition-all hover:border-[#B9974A]/50 hover:bg-[#121212]"
          >
            <Menu className="w-3.5 h-3.5 text-[#B9974A] transition-transform group-hover:scale-110" />
            <span>MENU</span>
          </button>
        </div>
      </header>

      {/* Full-Screen Dark Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#050505]/95 backdrop-blur-2xl text-[#F5F5F5] p-8 sm:p-16 overflow-y-auto"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#B9974A]" />
                <span className="text-[11px] font-sans tracking-[0.3em] text-[#B9974A] uppercase">
                  DIRECTORY
                </span>
              </div>

              <button
                id="close-menu-btn"
                onClick={() => setIsMenuOpen(false)}
                className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-sans tracking-widest uppercase hover:bg-white/10 hover:border-white/30 transition-all"
              >
                <span>CLOSE</span>
                <X className="w-4 h-4 text-[#B8B8B8] group-hover:text-white" />
              </button>
            </div>

            {/* Navigation Items Grid */}
            <div className="w-full max-w-6xl mx-auto my-auto py-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                {menuItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.04 }}
                    className="group"
                  >
                    <button
                      onClick={() => handleItemClick(item.id)}
                      className="w-full flex items-baseline justify-between py-3 border-b border-white/10 text-left transition-all group-hover:border-[#B9974A]/60"
                    >
                      <div className="flex items-baseline gap-4 sm:gap-6">
                        <span className="font-mono text-xs sm:text-sm text-[#B9974A] tracking-wider">
                          {item.num}
                        </span>
                        <span className="font-display text-xl sm:text-2xl md:text-3xl font-semibold tracking-wider text-[#B8B8B8] transition-all group-hover:text-white group-hover:translate-x-2">
                          {item.label}
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/20 transition-all group-hover:text-[#B9974A] group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Menu Footer */}
            <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-[#B8B8B8]/50 gap-4 pt-6 border-t border-white/10">
              <span className="font-serif italic">
                {personalData.taglines.heroSubAlt}
              </span>
              <div className="flex items-center gap-6">
                <span>MANPREET SINGH</span>
                <span className="text-[#B9974A]">CHANDIGARH</span>
                <span>2008</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
