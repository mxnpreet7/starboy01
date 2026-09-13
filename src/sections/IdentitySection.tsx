import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { MapPin, Home, Calendar, Sparkles, GraduationCap } from 'lucide-react';
import { personalData } from '../data/personalData';

interface IdentitySectionProps {
  onBirthdayEggTrigger: () => void;
}

export const IdentitySection: React.FC<IdentitySectionProps> = ({ onBirthdayEggTrigger }) => {
  const [bdayHoverTime, setBdayHoverTime] = useState<number>(0);
  const hoverTimer = useRef<number | null>(null);
  const [starBurst, setStarBurst] = useState(false);

  const handleMouseEnterBday = () => {
    hoverTimer.current = window.setTimeout(() => {
      setStarBurst(true);
      onBirthdayEggTrigger();
      setTimeout(() => setStarBurst(false), 4000);
    }, 2400); // 2.4 seconds hover
  };

  const handleMouseLeaveBday = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  const fragments = [
    {
      label: personalData.location,
      sub: personalData.locationType,
      icon: MapPin,
      detail: 'Hub of technical academia & design exploration',
    },
    {
      label: personalData.hometown,
      sub: personalData.hometownType,
      icon: Home,
      detail: 'Roots of calm perspective and grounded clarity',
    },
    {
      label: personalData.originYear,
      sub: 'ORIGIN',
      icon: Calendar,
      detail: 'The beginning of the timeline',
    },
    {
      label: personalData.birthday,
      sub: 'BIRTHDAY',
      icon: Sparkles,
      detail: 'A date written in constellation frequencies',
      isBirthday: true,
    },
  ];

  return (
    <section
      id="identity"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-28 bg-[#080808] border-t border-white/5"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs text-[#B9974A] tracking-[0.3em]">01</span>
          <span className="h-[1px] w-12 bg-[#B9974A]/40" />
          <h2 className="font-sans text-xs tracking-[0.35em] text-[#B8B8B8] uppercase">
            FRAGMENTED IDENTITY
          </h2>
        </div>

        {/* Section Title */}
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9 }}
          className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-[#F5F5F5] mb-10 sm:mb-14"
        >
          WHO AM I?
        </motion.h3>

        {/* Fragmented Origin Coordinates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-16 sm:mb-20">
          {fragments.map((frag, idx) => (
            <motion.div
              key={frag.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
              onMouseEnter={frag.isBirthday ? handleMouseEnterBday : undefined}
              onMouseLeave={frag.isBirthday ? handleMouseLeaveBday : undefined}
              className={`relative p-6 sm:p-7 rounded-2xl border transition-all duration-300 ${
                frag.isBirthday
                  ? 'border-[#B9974A]/30 bg-[#0E0E0E] hover:border-[#B9974A] cursor-pointer'
                  : 'border-white/5 bg-[#0C0C0C] hover:border-white/20'
              }`}
            >
              {frag.isBirthday && starBurst && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center rounded-2xl bg-[#B9974A]/10 animate-pulse">
                  <Sparkles className="w-8 h-8 text-[#B9974A] animate-spin" />
                </div>
              )}

              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#B9974A] uppercase">
                  {frag.sub}
                </span>
                <frag.icon className="w-4 h-4 text-[#B8B8B8]/50" />
              </div>

              <div className="font-display text-lg sm:text-xl lg:text-lg xl:text-xl font-bold tracking-normal sm:tracking-wide text-[#F5F5F5] mb-2 break-words">
                {frag.label}
              </div>

              <p className="font-sans text-xs text-[#B8B8B8]/60 leading-relaxed">
                {frag.detail}
              </p>

              {frag.isBirthday && (
                <span className="inline-block mt-3 text-[9px] font-mono text-[#B9974A]/70 uppercase tracking-widest">
                  [Hold cursor to align stars]
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Formal Engineering Revelation Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="relative p-6 sm:p-10 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-b from-[#111111] to-[#0A0A0A] overflow-hidden"
        >
          {/* Ambient Corner Accent */}
          <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-[#B9974A]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B9974A]">
                <GraduationCap className="w-4 h-4" />
                <span>ACADEMIC FOUNDATION</span>
              </div>
              <h4 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-[#F5F5F5]">
                {personalData.name}
              </h4>
              <p className="font-serif italic text-sm sm:text-base text-[#B8B8B8]">
                {personalData.education.degree}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 border-t md:border-t-0 md:border-l border-white/10 pt-5 md:pt-0 md:pl-8 text-sm">
              <div>
                <span className="block font-mono text-[10px] text-[#B8B8B8]/50 uppercase tracking-widest">
                  CURRENT STANDING
                </span>
                <span className="font-display text-base sm:text-lg font-semibold text-[#F5F5F5]">
                  {personalData.education.year}
                </span>
              </div>

              <div>
                <span className="block font-mono text-[10px] text-[#B8B8B8]/50 uppercase tracking-widest">
                  INSTITUTION
                </span>
                <span className="font-display text-base sm:text-lg font-semibold text-[#B9974A]">
                  {personalData.education.institution}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
