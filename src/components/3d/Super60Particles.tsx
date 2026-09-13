import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Orbit, Sparkles } from 'lucide-react';

interface ParticleNode {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  orbitRing: number;
  orbitAngle: number;
  orbitSpeed: number;
  targetX: number;
  targetY: number;
  glyph: '6' | '0';
  glyphIndex: number;
  radius: number;
  glow: number;
  alpha: number;
  color: string;
}

export const Super60Particles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFormed, setIsFormed] = useState(false);
  const isFormedRef = useRef(false);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<ParticleNode[]>([]);
  const convergenceFactorRef = useRef(0); // 0 = fully orbit, 1 = fully converged

  // Sync ref with state
  useEffect(() => {
    isFormedRef.current = isFormed;
  }, [isFormed]);

  // Subtle audio chime feedback on toggle
  const playToggleSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(isFormedRef.current ? 440 : 528, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(isFormedRef.current ? 330 : 660, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // AudioContext unavailable or blocked
    }
  }, []);

  const handleToggle = () => {
    setIsFormed((prev) => {
      const next = !prev;
      isFormedRef.current = next;
      playToggleSound();
      return next;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let displayWidth = 500;
    let displayHeight = 340;
    const TOTAL_PARTICLES = 60; // Exact 60 minds

    // Setup High-DPI canvas & target coordinates
    const calculateGeometry = () => {
      if (!canvas.parentElement) return;
      displayWidth = canvas.parentElement.clientWidth || 500;
      displayHeight = window.innerWidth < 640 ? 300 : 340;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);

      const centerX = displayWidth / 2;
      const centerY = displayHeight / 2;
      // Proportional scale ensuring crisp bounds on all screens (320px to 4K)
      const scale = Math.max(0.68, Math.min(displayWidth / 450, 1.05));

      /*
        Exact Mathematical Coordinates for Numeral "60":
        Total 60 particles:
        - 32 particles for numeral "6"
        - 28 particles for numeral "0"
      */
      const ox6 = centerX - 64 * scale;
      const ox0 = centerX + 64 * scale;

      // "6" Top Arch & Spine (12 points)
      // Smooth curve from top-right apex down into the circle tangent at left
      const spinePoints: { x: number; y: number }[] = [];
      for (let i = 0; i < 12; i++) {
        const t = i / 11; // 0 to 1
        // Cubic bezier control points:
        // P0: top hook (ox6 + 22, centerY - 48)
        // P1: top arch (ox6 - 15, centerY - 56)
        // P2: left shoulder (ox6 - 54, centerY - 20)
        // P3: tangent meeting loop (ox6 - 48, centerY + 18)
        const p0x = ox6 + 22 * scale;
        const p0y = centerY - 48 * scale;
        const p1x = ox6 - 15 * scale;
        const p1y = centerY - 56 * scale;
        const p2x = ox6 - 54 * scale;
        const p2y = centerY - 20 * scale;
        const p3x = ox6 - 48 * scale;
        const p3y = centerY + 18 * scale;

        const u = 1 - t;
        const bx = u * u * u * p0x + 3 * u * u * t * p1x + 3 * u * t * t * p2x + t * t * t * p3x;
        const by = u * u * u * p0y + 3 * u * u * t * p1y + 3 * u * t * t * p2y + t * t * t * p3y;
        spinePoints.push({ x: bx, y: by });
      }

      // "6" Bottom Circle Loop (20 points)
      // Centered at (ox6 - 14 * scale, centerY + 18 * scale) with radius 34 * scale
      // Note: loop touches the spine at angle pi (ox6 - 14 - 34 = ox6 - 48 * scale)!
      const loopPoints: { x: number; y: number }[] = [];
      const loopCenterX = ox6 - 14 * scale;
      const loopCenterY = centerY + 18 * scale;
      const loopRadius = 34 * scale;
      for (let i = 0; i < 20; i++) {
        const angle = Math.PI + (i / 20) * Math.PI * 2;
        loopPoints.push({
          x: loopCenterX + Math.cos(angle) * loopRadius,
          y: loopCenterY + Math.sin(angle) * loopRadius,
        });
      }

      // "0" Ellipse Loop (28 points)
      // Centered at (ox0, centerY - 2 * scale)
      // Vertical radius 53 * scale, Horizontal radius 34 * scale
      const zeroPoints: { x: number; y: number }[] = [];
      const zeroCenterX = ox0;
      const zeroCenterY = centerY - 2 * scale;
      const zeroRadiusX = 34 * scale;
      const zeroRadiusY = 53 * scale;
      for (let i = 0; i < 28; i++) {
        // Start from top apex (-PI / 2) clockwise
        const angle = -Math.PI / 2 + (i / 28) * Math.PI * 2;
        zeroPoints.push({
          x: zeroCenterX + Math.cos(angle) * zeroRadiusX,
          y: zeroCenterY + Math.sin(angle) * zeroRadiusY,
        });
      }

      // Initialize or update particle target coordinates
      if (particlesRef.current.length === 0) {
        const list: ParticleNode[] = [];
        for (let i = 0; i < TOTAL_PARTICLES; i++) {
          let tx = centerX;
          let ty = centerY;
          let glyph: '6' | '0' = '6';
          let glyphIndex = i;

          if (i < 12) {
            tx = spinePoints[i].x;
            ty = spinePoints[i].y;
            glyph = '6';
            glyphIndex = i;
          } else if (i < 32) {
            tx = loopPoints[i - 12].x;
            ty = loopPoints[i - 12].y;
            glyph = '6';
            glyphIndex = i;
          } else {
            tx = zeroPoints[i - 32].x;
            ty = zeroPoints[i - 32].y;
            glyph = '0';
            glyphIndex = i - 32;
          }

          // Assign to one of 3 concentric orbital rings
          const ringIndex = i % 3;
          const ringRadii = [60 * scale, 105 * scale, 145 * scale];
          const orbitAngle = (i / TOTAL_PARTICLES) * Math.PI * 2;
          const orbitSpeed = ringIndex === 0 ? 0.015 : ringIndex === 1 ? -0.01 : 0.008;

          const ox = centerX + Math.cos(orbitAngle) * ringRadii[ringIndex];
          const oy = centerY + Math.sin(orbitAngle) * ringRadii[ringIndex];

          const isGold = i % 4 !== 0;
          const color = isGold ? '#B9974A' : '#F5F5F5';

          list.push({
            id: i,
            x: ox,
            y: oy,
            vx: 0,
            vy: 0,
            orbitRing: ringRadii[ringIndex],
            orbitAngle,
            orbitSpeed,
            targetX: tx,
            targetY: ty,
            glyph,
            glyphIndex,
            radius: Math.random() * 0.9 + 2.2,
            glow: Math.random() * 8 + 6,
            alpha: Math.random() * 0.3 + 0.7,
            color,
          });
        }
        particlesRef.current = list;
      } else {
        // Just update target coordinates on resize
        particlesRef.current.forEach((p, idx) => {
          if (idx < 12) {
            p.targetX = spinePoints[idx].x;
            p.targetY = spinePoints[idx].y;
          } else if (idx < 32) {
            p.targetX = loopPoints[idx - 12].x;
            p.targetY = loopPoints[idx - 12].y;
          } else {
            p.targetX = zeroPoints[idx - 32].x;
            p.targetY = zeroPoints[idx - 32].y;
          }
          const ringIndex = idx % 3;
          const ringRadii = [60 * scale, 105 * scale, 145 * scale];
          p.orbitRing = ringRadii[ringIndex];
        });
      }
    };

    calculateGeometry();

    const handleResize = () => {
      calculateGeometry();
    };
    window.addEventListener('resize', handleResize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, displayWidth, displayHeight);

      const targetConvergence = isFormedRef.current ? 1 : 0;
      // Smooth interpolation for global convergence progress
      convergenceFactorRef.current += (targetConvergence - convergenceFactorRef.current) * 0.06;
      const conv = convergenceFactorRef.current;

      const centerX = displayWidth / 2;
      const centerY = displayHeight / 2;
      const particles = particlesRef.current;

      // 1. DRAW CONSTELLATION PATHS WHEN CONVERGED
      if (conv > 0.08) {
        ctx.save();
        ctx.lineWidth = 1.2;

        // Trace "6" path (spine into loop)
        ctx.strokeStyle = `rgba(185, 151, 74, ${0.45 * conv})`;
        ctx.shadowColor = '#B9974A';
        ctx.shadowBlur = 8 * conv;
        ctx.beginPath();
        for (let i = 0; i < 32; i++) {
          if (i === 0) {
            ctx.moveTo(particles[i].x, particles[i].y);
          } else {
            ctx.lineTo(particles[i].x, particles[i].y);
          }
        }
        ctx.closePath();
        ctx.stroke();

        // Trace "0" path (perimeter loop)
        ctx.beginPath();
        for (let i = 32; i < 60; i++) {
          if (i === 32) {
            ctx.moveTo(particles[i].x, particles[i].y);
          } else {
            ctx.lineTo(particles[i].x, particles[i].y);
          }
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }

      // 2. DRAW CELESTIAL ORBIT ACCENTS WHEN IN ORBIT MODE
      if (conv < 0.92) {
        const orbitOpacity = (1 - conv) * 0.12;
        ctx.save();
        ctx.strokeStyle = `rgba(185, 151, 74, ${orbitOpacity})`;
        ctx.lineWidth = 0.8;
        ctx.setLineDash([4, 8]);
        [60, 105, 145].forEach((baseRadius) => {
          const r = baseRadius * Math.max(0.68, Math.min(displayWidth / 450, 1.05));
          ctx.beginPath();
          ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
          ctx.stroke();
        });
        ctx.restore();
      }

      // 3. UPDATE & DRAW ALL 60 PARTICLES WITH SPRING PHYSICS
      particles.forEach((p, idx) => {
        // Celestial Orbit Destination
        p.orbitAngle += p.orbitSpeed;
        const wave = Math.sin(time * 1.5 + idx * 0.4) * 8;
        const currentRing = p.orbitRing + wave;
        const orbitDestX = centerX + Math.cos(p.orbitAngle) * currentRing;
        const orbitDestY = centerY + Math.sin(p.orbitAngle) * currentRing;

        // Micro-breathing when settled on target
        const settledJitterX = Math.sin(time * 2 + idx) * 0.6;
        const settledJitterY = Math.cos(time * 2.2 + idx) * 0.6;
        const targetDestX = p.targetX + settledJitterX;
        const targetDestY = p.targetY + settledJitterY;

        // Current blended destination based on conv factor
        const destX = orbitDestX * (1 - conv) + targetDestX * conv;
        const destY = orbitDestY * (1 - conv) + targetDestY * conv;

        // Fluid spring physics
        const springForce = 0.055;
        const damping = 0.82;
        p.vx = (p.vx + (destX - p.x) * springForce) * damping;
        p.vy = (p.vy + (destY - p.y) * springForce) * damping;

        p.x += p.vx;
        p.y += p.vy;

        // Interactive Mouse Magnetic Repulsion
        const mdx = p.x - mouseRef.current.x;
        const mdy = p.y - mouseRef.current.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const repelRadius = 65;
        if (mDist < repelRadius && mDist > 0) {
          const force = (repelRadius - mDist) / repelRadius;
          p.x += (mdx / mDist) * force * 7;
          p.y += (mdy / mDist) * force * 7;
        }

        // Draw particle node
        ctx.save();
        ctx.shadowBlur = p.glow + conv * 4;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + (conv > 0.5 ? 0.3 : 0), 0, Math.PI * 2);
        ctx.fill();

        // Starlight glint on primary key nodes
        if (idx % 6 === 0) {
          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = 0.85;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center">
      <div
        id="super60-canvas-container"
        className="relative w-full max-w-2xl h-[300px] sm:h-[340px] rounded-3xl border border-white/10 bg-gradient-to-b from-[#0C0C0C] to-[#070707] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden cursor-pointer group transition-all duration-300 hover:border-[#B9974A]/40"
        onClick={handleToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
        title="Click to toggle particle convergence"
      >
        {/* Background Subtle Ambience */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(185,151,74,0.06)_0%,transparent_70%)] pointer-events-none" />

        <canvas ref={canvasRef} className="w-full h-full block relative z-10" />

        {/* Top-Right Interactive Mode Pill */}
        <div className="absolute top-4 right-4 z-20 pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-[#000000]/70 backdrop-blur-md text-[10px] font-mono tracking-widest text-[#B8B8B8] uppercase">
            {isFormed ? (
              <>
                <Sparkles className="w-3 h-3 text-[#B9974A] animate-pulse" />
                <span className="text-[#B9974A] font-semibold">60 CONVERGED</span>
              </>
            ) : (
              <>
                <Orbit className="w-3 h-3 text-[#B8B8B8]/60 animate-spin" />
                <span>ORBITAL ECOSYSTEM</span>
              </>
            )}
          </div>
        </div>

        {/* Bottom Interactive Bar */}
        <div className="absolute bottom-4 inset-x-0 z-20 flex items-center justify-between px-6 text-[10px] sm:text-xs font-mono tracking-wider sm:tracking-widest text-[#B8B8B8]/70 uppercase select-none pointer-events-none">
          <span className="flex items-center gap-2">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isFormed ? 'bg-[#B9974A] animate-ping' : 'bg-white/40'
              }`}
            />
            <span>{isFormed ? 'STATE: "60" CONVERGED' : 'STATE: 60 MINDS IN ORBIT'}</span>
          </span>

          <span className="text-[#B9974A] font-sans font-medium tracking-widest group-hover:underline underline-offset-4 flex items-center gap-1.5">
            {isFormed ? 'CLICK TO DISSOLVE' : 'CLICK TO CONVERGE'}
          </span>
        </div>
      </div>
    </div>
  );
};
