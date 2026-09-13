import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Lock, Sparkles, Send } from 'lucide-react';
import { personalData, SocialLink } from '../data/personalData';

export const SocialSection: React.FC = () => {
  const socials = personalData.socialLinks;

  return (
    <section
      id="social"
      className="relative min-h-[80vh] w-full flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-28 bg-[#070707] text-[#F5F5F5] border-t border-white/5"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-[#B9974A] tracking-[0.3em]">13</span>
          <span className="h-[1px] w-12 bg-[#B9974A]/40" />
          <h2 className="font-sans text-xs tracking-[0.35em] text-[#B8B8B8] uppercase">
            COMMUNICATION FREQUENCIES
          </h2>
        </div>

        {/* Section Title */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#F5F5F5]"
            >
              CONNECT.
            </motion.h3>
            <p className="font-serif italic text-base sm:text-lg text-[#B8B8B8] mt-2 font-light max-w-2xl">
              Digital nodes across networks. Open for creative collaboration, engineering discussions, and shared vision.
            </p>
          </div>

          <div className="font-mono text-xs text-[#B9974A] tracking-widest uppercase">
            STATUS: ACTIVE TRANSMISSION
          </div>
        </div>

        {/* Minimal Social Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-16">
          {socials.map((soc: SocialLink, idx: number) => {
            const isExternal = Boolean(soc.url);

            const content = (
              <div
                className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 flex flex-col justify-between min-h-[200px] ${
                  soc.isPrivate
                    ? 'border-white/5 bg-[#0A0A0A] hover:border-white/20'
                    : 'border-white/10 bg-[#0C0C0C] hover:border-[#B9974A]/60 hover:bg-[#111111]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[#B9974A] uppercase">
                    {soc.label || soc.platform}
                  </span>
                  {soc.isPrivate ? (
                    <Lock className="w-4 h-4 text-[#B8B8B8]/40" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-[#B8B8B8]/60 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#B9974A]" />
                  )}
                </div>

                <div>
                  <h4 className="font-display font-extrabold text-xl sm:text-2xl text-[#F5F5F5] mb-1.5 tracking-normal sm:tracking-wide break-words">
                    {soc.handle}
                  </h4>
                  <div className="font-sans text-xs text-[#B8B8B8]/60 uppercase tracking-wider">
                    {soc.platform}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-[#B8B8B8]/40">
                  {soc.isPrivate ? 'RESTRICTED CIRCLE' : 'OPEN TO PUBLIC'}
                </div>
              </div>
            );

            return (
              <motion.div
                key={soc.handle + idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="group"
              >
                {isExternal ? (
                  <a
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {content}
                  </a>
                ) : (
                  <div>{content}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
