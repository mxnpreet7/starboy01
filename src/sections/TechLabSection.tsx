import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Cpu, Sparkles, Code2, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { personalData, TechNode } from '../data/personalData';

export const TechLabSection: React.FC = () => {
  const [activeNode, setActiveNode] = useState<TechNode>(personalData.techNodes[0]);

  return (
    <section
      id="technology"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-28 bg-[#080808] text-[#F5F5F5] border-t border-white/5"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-[#B9974A] tracking-[0.3em]">07</span>
          <span className="h-[1px] w-12 bg-[#B9974A]/40" />
          <h2 className="font-sans text-xs tracking-[0.35em] text-[#B8B8B8] uppercase">
            DIGITAL LABORATORY
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
              THE OTHER SIDE.
            </motion.h3>
            <p className="font-serif italic text-base sm:text-lg text-[#B8B8B8] mt-3 max-w-2xl font-light leading-relaxed">
              Behind the nocturnal soundscapes and monochrome silhouettes lies an engineer disciplined in systems, computation, and autonomous machine intelligence.
            </p>
          </div>

          {/* Academic Stamp */}
          <div className="p-4 rounded-2xl border border-white/10 bg-[#0C0C0C] font-mono text-xs text-[#B8B8B8]/80 space-y-1 shrink-0">
            <div className="text-[#B9974A] font-semibold">B.Tech CSE • 2nd Year</div>
            <div>{personalData.education.institution}</div>
          </div>
        </div>

        {/* Interactive Digital Laboratory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {/* Interactive Floating Nodes */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {personalData.techNodes.map((node, idx) => {
              const isSelected = activeNode.id === node.id;
              return (
                <motion.div
                  key={node.id}
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveNode(node)}
                  className={`p-4 sm:p-5 rounded-2xl border cursor-pointer flex flex-col justify-between min-h-[130px] transition-all duration-300 ${
                    isSelected
                      ? 'border-[#B9974A] bg-[#121212] shadow-[0_0_24px_rgba(185,151,74,0.18)]'
                      : 'border-white/5 bg-[#0A0A0A] hover:border-white/20 hover:bg-[#0E0E0E]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className={isSelected ? 'text-[#B9974A]' : 'text-[#B8B8B8]/40'}>
                      0{idx + 1}
                    </span>
                    <span className="text-[#B8B8B8]/50 uppercase tracking-widest text-[9px]">
                      {node.category}
                    </span>
                  </div>

                  <div className="font-display font-bold text-xs xs:text-sm sm:text-base lg:text-sm xl:text-base text-[#F5F5F5] tracking-normal sm:tracking-wide my-2 leading-snug break-words">
                    {node.name}
                  </div>

                  <div className="text-[10px] sm:text-[11px] font-sans text-[#B8B8B8]/60 truncate">
                    {node.level}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Active Node Deep-Dive Terminal View */}
          <div className="lg:col-span-1 p-6 sm:p-8 rounded-3xl border border-[#B9974A]/30 bg-[#0A0A0A] flex flex-col justify-between">
            <div className="space-y-5 sm:space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 font-mono text-xs text-[#B9974A]">
                  <Terminal className="w-4 h-4" />
                  <span>SPECIFICATION</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#B9974A]/10 text-[10px] font-mono text-[#B9974A] uppercase">
                  {activeNode.category}
                </span>
              </div>

              <div>
                <h4 className="font-display font-black text-2xl sm:text-3xl text-[#F5F5F5] mb-1">
                  {activeNode.name}
                </h4>
                <div className="font-mono text-xs text-[#B9974A] tracking-wider mb-3">
                  {activeNode.level}
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#B8B8B8] leading-relaxed font-light">
                  {activeNode.detail}
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#B8B8B8]/60">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B9974A]" />
                <span>Architecture Verified</span>
              </div>
              <div className="text-[10px] font-mono text-[#B8B8B8]/40 uppercase tracking-widest">
                RUNTIME: PRODUCTION GRADE • LOW LATENCY
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
