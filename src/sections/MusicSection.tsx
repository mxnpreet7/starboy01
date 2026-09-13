import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Music, Play, Pause, Disc, ExternalLink, Sparkles, Radio } from 'lucide-react';
import { personalData } from '../data/personalData';
import { audioEngine } from '../utils/audioEngine';

interface MusicSectionProps {
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const MusicSection: React.FC<MusicSectionProps> = ({ isAudioPlaying, onToggleAudio }) => {
  const [selectedArtist, setSelectedArtist] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const freqData = useRef(new Uint8Array(32));

  // Live Sound Waveform Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.parentElement?.clientWidth || 800;
      const h = 80;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      phase += 0.04;
      audioEngine.getFrequencyData(freqData.current);
      const width = canvas.parentElement?.clientWidth || 800;
      const height = 80;
      ctx.clearRect(0, 0, width, height);

      const centerY = height / 2;

      // Draw flowing sine waveform
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#B9974A';

      for (let x = 0; x < width; x += 2) {
        const normX = x / width;
        const freqIdx = Math.floor(normX * 16);
        const energy = (freqData.current[freqIdx] || (isAudioPlaying ? 80 : 20)) / 255;
        const amplitude = isAudioPlaying ? 24 * energy + 6 : 8;

        const y = centerY + Math.sin(normX * 12 + phase) * amplitude * Math.sin(normX * Math.PI);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Second harmonic wave
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      for (let x = 0; x < width; x += 3) {
        const normX = x / width;
        const y = centerY + Math.cos(normX * 18 - phase * 0.8) * 12 * Math.sin(normX * Math.PI);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, [isAudioPlaying]);

  return (
    <section
      id="music"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-28 bg-[#050505] text-[#F5F5F5] border-t border-white/5"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-[#B9974A] tracking-[0.3em]">04</span>
          <span className="h-[1px] w-12 bg-[#B9974A]/40" />
          <h2 className="font-sans text-xs tracking-[0.35em] text-[#B8B8B8] uppercase">
            SONIC FREQUENCIES
          </h2>
        </div>

        {/* Massive Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#F5F5F5]"
            >
              MUSIC IS A LANGUAGE.
            </motion.h3>
            <p className="font-serif italic text-base sm:text-xl text-[#B8B8B8] mt-2 sm:mt-3 max-w-xl font-light">
              "{personalData.taglines.musicQuote}"
            </p>
          </div>

          {/* Persistent Sound Station Trigger */}
          <div className="flex items-center gap-4">
            <button
              id="music-section-audio-toggle"
              onClick={onToggleAudio}
              className="group flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-[#B9974A]/40 bg-[#0E0E0E] hover:bg-[#B9974A] hover:text-black transition-all duration-300 active:scale-95"
            >
              {isAudioPlaying ? (
                <Pause className="w-4 h-4 text-[#B9974A] group-hover:text-black" />
              ) : (
                <Play className="w-4 h-4 text-[#B9974A] group-hover:text-black" />
              )}
              <span className="font-sans text-xs tracking-widest uppercase font-medium">
                {isAudioPlaying ? 'PAUSE TIMELESS' : 'PLAY TIMELESS'}
              </span>
            </button>
          </div>
        </div>

        {/* Soundwave Interactive Display */}
        <div className="relative w-full h-36 rounded-2xl border border-white/10 bg-[#090909] p-5 sm:p-6 mb-12 sm:mb-16 overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#B8B8B8]/60 tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-[#B9974A] animate-pulse" />
              <span className="text-[10px] sm:text-xs">LIVE FREQUENCY OSCILLATOR</span>
            </div>
            <span className="text-[10px] sm:text-xs">SYNTH: {isAudioPlaying ? 'ACTIVE 44.1 kHz' : 'STANDBY'}</span>
          </div>

          <canvas
            ref={canvasRef}
            width={800}
            height={90}
            className="w-full h-20 block"
          />
        </div>

        {/* Favorite Artists Interactive Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {personalData.musicArtists.map((artist, idx) => {
            const isSelected = selectedArtist === idx;
            return (
              <motion.div
                key={artist.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                onClick={() => setSelectedArtist(idx)}
                className={`p-6 sm:p-7 rounded-2xl border cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'border-[#B9974A] bg-[#0E0E0E] shadow-[0_10px_30px_rgba(185,151,74,0.1)]'
                    : 'border-white/5 bg-[#080808] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <span className="font-mono text-[10px] text-[#B9974A] tracking-[0.25em] uppercase">
                    0{idx + 1} // INFLUENCE
                  </span>
                  <Disc className={`w-4 h-4 ${isSelected ? 'text-[#B9974A] animate-spin' : 'text-[#B8B8B8]/40'}`} />
                </div>

                <h4 className="font-display text-xl sm:text-2xl font-bold text-[#F5F5F5] mb-1.5 tracking-wide">
                  {artist.name}
                </h4>

                <div className="font-sans text-xs text-[#B9974A] tracking-wider uppercase mb-3">
                  {artist.genre}
                </div>

                <p className="font-serif italic text-xs sm:text-sm text-[#B8B8B8] leading-relaxed mb-5">
                  "{artist.quote}"
                </p>

                <div className="pt-4 border-t border-white/5 text-[11px] font-sans text-[#B8B8B8]/60">
                  <span className="block font-mono text-[9px] text-[#B8B8B8]/40 uppercase tracking-widest mb-1">
                    ATMOSPHERE
                  </span>
                  {artist.favoriteMood}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* YouTube Reference Link Banner */}
        <div className="mt-12 p-6 rounded-2xl border border-white/5 bg-[#080808] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-[#B8B8B8]">
            <Sparkles className="w-4 h-4 text-[#B9974A]" />
            <span>ATMOSPHERIC SOUNDTRACK: <strong>The Weeknd & Playboi Carti — Timeless (Instrumental)</strong></span>
          </div>
          <a
            href={personalData.musicAudioReference.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-mono text-[#B9974A] hover:underline"
          >
            <span>OFFICIAL YOUTUBE STREAM</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
