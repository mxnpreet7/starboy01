import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Compass, Navigation, ArrowDown, Sparkles, Crosshair } from 'lucide-react';
import { personalData } from '../data/personalData';

export const TravelSection: React.FC = () => {
  const [activeWaypoint, setActiveWaypoint] = useState(0);
  const [virtualCoords, setVirtualCoords] = useState({ lat: 30.7333, lng: 76.7794 });

  useEffect(() => {
    const interval = setInterval(() => {
      setVirtualCoords((prev) => ({
        lat: Number((prev.lat + (Math.random() - 0.5) * 0.002).toFixed(4)),
        lng: Number((prev.lng + (Math.random() - 0.5) * 0.002).toFixed(4)),
      }));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="travel"
      className="relative min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-28 bg-[#050505] text-[#F5F5F5] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-[#B9974A] tracking-[0.3em]">10</span>
          <span className="h-[1px] w-12 bg-[#B9974A]/40" />
          <h2 className="font-sans text-xs tracking-[0.35em] text-[#B8B8B8] uppercase">
            SOLITARY EXPEDITION
          </h2>
        </div>

        {/* Section Title */}
        <motion.h3
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight mb-4 text-[#F5F5F5]"
        >
          KEEP EXPLORING.
        </motion.h3>

        <p className="font-serif italic text-base sm:text-lg text-[#B8B8B8] max-w-2xl mb-12 font-light leading-relaxed">
          Quiet departures, solitary routes, and the tranquility of unfamiliar horizons. Finding meaning in the journey rather than rushing the destination.
        </p>

        {/* Waypoints Sequence & Stylized Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 items-stretch">
          {/* Waypoints */}
          <div className="lg:col-span-5 flex flex-col gap-4 justify-center">
            {personalData.travelWaypoints.map((wp, idx) => {
              const isSelected = activeWaypoint === idx;
              return (
                <motion.div
                  key={wp.city}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  onClick={() => setActiveWaypoint(idx)}
                  className={`p-6 sm:p-7 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'border-[#B9974A] bg-[#0E0E0E] shadow-[0_0_24px_rgba(185,151,74,0.15)]'
                      : 'border-white/5 bg-[#080808] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#B9974A] mb-2 uppercase tracking-wider">
                    <span>WAYPOINT 0{idx + 1}</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5">{wp.status}</span>
                  </div>

                  <h4 className="font-display font-bold text-xl sm:text-2xl text-[#F5F5F5] mb-2 tracking-wide">
                    {wp.city}
                  </h4>

                  <div className="font-mono text-xs text-[#B8B8B8]/60 mb-3">
                    {wp.coords}
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-[#B8B8B8]/80 leading-relaxed font-light">
                    {wp.context}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Stylized Abstract Geometric Radar Display */}
          <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[380px] rounded-3xl border border-white/10 bg-[#0A0A0A] p-6 sm:p-8 overflow-hidden flex flex-col justify-between">
            {/* Vector grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:32px_32px] opacity-60 pointer-events-none" />

            {/* Radar Concentric Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-[#B9974A]/20 pointer-events-none animate-[ping_6s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#B9974A]/20 flex items-center justify-center pointer-events-none">
              <div className="w-2 h-2 rounded-full bg-[#B9974A] animate-pulse" />
            </div>

            {/* Top Bar of Radar */}
            <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#B8B8B8]/60">
              <div className="flex items-center gap-2 text-[#B9974A]">
                <Crosshair className="w-4 h-4 animate-spin" />
                <span className="uppercase tracking-widest text-[10px] sm:text-xs">SYNTHETIC RADAR SCAN</span>
              </div>
              <span className="text-[10px] sm:text-xs">
                TARGET: {personalData.travelWaypoints[activeWaypoint]?.city || personalData.travelWaypoints[0]?.city}
              </span>
            </div>

            {/* Bottom Coordinates & Telemetry */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-6 border-t border-white/10">
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-[#B8B8B8]/50 uppercase tracking-widest block">
                  VECTOR TELEMETRY (DESIGN PROJECTION)
                </span>
                <div className="font-mono text-base sm:text-lg text-[#F5F5F5]">
                  {virtualCoords.lat}° N, {virtualCoords.lng}° E
                </div>
              </div>

              <div className="font-serif italic text-xs sm:text-sm text-[#B8B8B8]">
                "The mind clarifies when the road is silent."
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
