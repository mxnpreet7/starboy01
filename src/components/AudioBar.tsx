import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, ExternalLink, Disc3, Music2 } from 'lucide-react';
import { audioEngine, YOUTUBE_TRACK_TITLE, YOUTUBE_TRACK_ARTIST, isInstagramBrowser } from '../utils/audioEngine';
import { personalData } from '../data/personalData';

interface AudioBarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const AudioBar: React.FC<AudioBarProps> = ({ isPlaying, onTogglePlay }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const freqData = useRef(new Uint8Array(32));
  const isIg = isInstagramBrowser();

  // Audio waveform animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const render = () => {
      audioEngine.getFrequencyData(freqData.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const numBars = 12;
      const barWidth = 2;
      const gap = 2;
      const startX = (canvas.width - (numBars * (barWidth + gap) - gap)) / 2;

      for (let i = 0; i < numBars; i++) {
        let barHeight = 2;
        if (isPlaying && !isMuted) {
          const val = freqData.current[i * 2] || 0;
          barHeight = Math.max(2, (val / 255) * canvas.height * 0.95);
        } else {
          barHeight = 2;
        }

        const x = startX + i * (barWidth + gap);
        const y = (canvas.height - barHeight) / 2;

        ctx.fillStyle = isPlaying && !isMuted ? '#B9974A' : 'rgba(255, 255, 255, 0.25)';
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isMuted]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioEngine.setMuted(nextMuted);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5">
        {/* Floating audio pill button */}
        <div 
          id="audio-controller-pill"
          onClick={onTogglePlay}
          className={`group flex items-center gap-3 px-3.5 py-2 rounded-full border backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] cursor-pointer transition-all duration-300 ${
            isPlaying
              ? 'border-[#B9974A]/40 bg-[#0A0A0A]/95 hover:border-[#B9974A] hover:bg-[#121212]'
              : 'border-white/15 bg-[#0D0D0D]/95 hover:border-[#B9974A]/60 animate-pulse'
          }`}
          title={isPlaying ? "Click to pause audio" : "Click to play 'Timeless'"}
        >
          {/* Animated Mini Vinyl Disc / Icon */}
          <div className="relative flex items-center justify-center">
            <Disc3 className={`w-4 h-4 text-[#B9974A] ${isPlaying && !isMuted ? 'animate-[spin_4s_linear_infinite]' : 'opacity-60'}`} />
          </div>

          {/* Mini Waveform Canvas */}
          <canvas
            ref={canvasRef}
            width={48}
            height={16}
            className="w-12 h-4 block"
          />

          {/* Status Text & Track Name */}
          <div className="flex items-center gap-1.5 text-[11px] font-sans font-medium tracking-wider uppercase">
            <span className={isPlaying ? 'text-[#F5F5F5]' : 'text-[#B9974A] font-semibold'}>
              {isPlaying ? 'PLAYING' : isIg ? 'TAP FOR SOUND' : 'PAUSED'}
            </span>
          </div>

          {/* Quick Mute Toggle */}
          <button
            id="audio-mute-toggle"
            onClick={toggleMute}
            className="p-1 text-[#B8B8B8]/60 hover:text-[#B9974A] transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Extra Info Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowPlayerModal(true);
            }}
            className="text-[10px] font-mono text-[#B9974A] opacity-70 hover:opacity-100 pl-1 border-l border-white/10 transition-opacity"
            title="Audio details & track info"
          >
            TRACK
          </button>
        </div>
      </div>

      {/* Audio Info & Reference Modal */}
      {showPlayerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-sm w-full p-6 rounded-2xl border border-white/10 bg-[#0C0C0C] text-[#F5F5F5] shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Music2 className="w-4 h-4 text-[#B9974A]" />
                <span className="text-xs font-sans tracking-widest text-[#B9974A] uppercase">
                  ACTIVE SOUNDTRACK
                </span>
              </div>
              <button
                onClick={() => setShowPlayerModal(false)}
                className="text-[#B8B8B8] hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="mb-4">
              <h4 className="font-display text-xl font-bold text-[#F5F5F5]">
                {YOUTUBE_TRACK_TITLE}
              </h4>
              <p className="font-sans text-xs text-[#B9974A] tracking-wider uppercase mt-0.5">
                {YOUTUBE_TRACK_ARTIST}
              </p>
            </div>

            <p className="text-xs font-serif italic text-[#B8B8B8] leading-relaxed mb-4">
              "Some people listen to music. I live through it."
            </p>

            <div className="space-y-2 mb-6 text-xs text-[#B8B8B8]/80 font-sans">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#B8B8B8]/50">SOURCE</span>
                <span className="text-[#F5F5F5] font-mono text-[11px]">YouTube (LiXIoqGXfh8)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#B8B8B8]/50">AUTOPLAY STATUS</span>
                <span className={isPlaying ? 'text-[#B9974A]' : 'text-[#B8B8B8]'}>
                  {isPlaying ? 'STREAMING ACTIVE' : 'STANDBY'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-[#B8B8B8]/50">PLATFORM COMPATIBILITY</span>
                <span className="text-[#F5F5F5] text-[11px]">Web & Instagram In-App Browser</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <a
                href={personalData.musicAudioReference.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-xs font-sans text-[#F5F5F5] hover:bg-[#B9974A] hover:text-black hover:border-transparent transition-all"
              >
                <span>Listen Directly on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setShowPlayerModal(false)}
                className="w-full py-2 text-xs font-sans text-[#B8B8B8]/60 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
