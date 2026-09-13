import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, X, Layers, ArrowUpRight } from 'lucide-react';
import { personalData, Book } from '../data/personalData';

export const BooksSection: React.FC = () => {
  const [activeBook, setActiveBook] = useState<Book | null>(null);

  return (
    <section
      id="books"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-28 bg-[#070707] text-[#F5F5F5] border-t border-white/5"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-[#B9974A] tracking-[0.3em]">05</span>
          <span className="h-[1px] w-12 bg-[#B9974A]/40" />
          <h2 className="font-sans text-xs tracking-[0.35em] text-[#B8B8B8] uppercase">
            LITERARY PERSPECTIVE
          </h2>
        </div>

        {/* Section Title */}
        <motion.h3
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight mb-10 sm:mb-14 text-[#F5F5F5]"
        >
          THE BOOKSHELF
        </motion.h3>

        {/* 3D Floating Book Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {personalData.books.map((book, idx) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              whileHover={{
                rotateY: idx === 0 ? 4 : -4,
                rotateX: -2,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              style={{ perspective: 1000 }}
              onClick={() => setActiveBook(book)}
              className="group relative cursor-pointer"
            >
              {/* 3D Book Silhouette Card */}
              <div className="relative p-6 sm:p-9 md:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[#121212] via-[#0A0A0A] to-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 group-hover:border-[#B9974A]/60">
                {/* Book Spine Texture Edge */}
                <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black via-[#1C1C1C] to-transparent" />

                {/* Ambient Glow */}
                <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-[#B9974A]/10 blur-2xl group-hover:bg-[#B9974A]/20 transition-colors" />

                <div className="flex items-center justify-between mb-8 sm:mb-10">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[#B9974A] uppercase">
                    VOL 0{idx + 1}
                  </span>
                  <BookOpen className="w-5 h-5 text-[#B8B8B8]/40 group-hover:text-[#B9974A] transition-colors" />
                </div>

                <h4 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-[#F5F5F5] tracking-normal sm:tracking-wide mb-3 leading-tight break-words">
                  {book.title}
                </h4>

                <p className="font-serif italic text-xs sm:text-sm md:text-base text-[#B8B8B8] mb-6">
                  {book.theme}
                </p>

                <div className="flex flex-wrap gap-2 pt-5 border-t border-white/5">
                  {book.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-2.5 py-0.5 rounded-full border border-white/5 bg-white/5 text-[10px] font-sans tracking-wider text-[#B8B8B8]"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between text-xs font-sans text-[#B9974A]">
                  <span className="tracking-widest uppercase">READ ANALYSIS</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Minimal Information Drawer/Modal */}
        <AnimatePresence>
          {activeBook && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                className="relative max-w-lg w-full p-8 sm:p-10 rounded-3xl border border-[#B9974A]/40 bg-[#0C0C0C] text-[#F5F5F5] shadow-2xl"
              >
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#B9974A] uppercase">
                    <BookOpen className="w-4 h-4" />
                    <span>LITERARY ANALYSIS</span>
                  </div>
                  <button
                    onClick={() => setActiveBook(null)}
                    className="p-1 text-[#B8B8B8] hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-2">
                  {activeBook.title}
                </h3>
                <p className="font-serif italic text-sm text-[#B9974A] mb-6">
                  {activeBook.theme}
                </p>

                <div className="space-y-4 text-xs sm:text-sm text-[#B8B8B8] leading-relaxed font-sans mb-8">
                  <div>
                    <span className="block font-mono text-[10px] text-[#B8B8B8]/50 uppercase tracking-widest mb-1">
                      CORE PREMISE
                    </span>
                    <p className="font-serif italic text-sm text-white/90">
                      "{activeBook.coreIdea}"
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="block font-mono text-[10px] text-[#B8B8B8]/50 uppercase tracking-widest mb-1">
                      MANPREET'S REFLECTION
                    </span>
                    <p className="text-[#B8B8B8] leading-relaxed">
                      {activeBook.personalTake}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveBook(null)}
                  className="w-full py-3 rounded-full bg-white/10 border border-white/15 text-xs font-sans tracking-widest uppercase text-white hover:bg-[#B9974A] hover:text-black hover:border-transparent transition-all"
                >
                  CLOSE PERSPECTIVE
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
