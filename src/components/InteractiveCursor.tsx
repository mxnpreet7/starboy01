import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export const InteractiveCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHovered = useRef(false);
  const isMouseDown = useRef(false);
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    // Check if device is touch-enabled
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Spawn subtle stardust particles on movement
      const count = isMouseDown.current ? 3 : 1;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + (isMouseDown.current ? 2.5 : 0.5);
        const goldTones = ['#B9974A', '#E8D297', '#F5E6C8', '#FFFFFF'];
        const color = goldTones[Math.floor(Math.random() * goldTones.length)];

        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2 + 1,
          color,
          alpha: 0.8,
          life: 0,
          maxLife: Math.random() * 25 + 20,
        });
      }

      // Check for clickable hover targets
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('input') ||
        target?.getAttribute('data-cursor') === 'pointer' ||
        target?.getAttribute('role') === 'button'
      ) {
        isHovered.current = true;
      } else {
        isHovered.current = false;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isMouseDown.current = true;
      // Burst of particles on click!
      for (let i = 0; i < 18; i++) {
        const angle = (Math.PI * 2 * i) / 18 + (Math.random() - 0.5) * 0.2;
        const speed = Math.random() * 3 + 2;
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2.5 + 1.2,
          color: '#B9974A',
          alpha: 1,
          life: 0,
          maxLife: 35,
        });
      }
    };

    const onMouseUp = () => {
      isMouseDown.current = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });

    let animFrameId: number;

    const render = () => {
      // Smooth ring position lag (lerp)
      const lerpFactor = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (cursorRingRef.current) {
        const scale = isHovered.current ? 1.8 : isMouseDown.current ? 0.85 : 1.0;
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(${scale})`;
        cursorRingRef.current.style.borderColor = isHovered.current ? '#B9974A' : 'rgba(255, 255, 255, 0.28)';
      }

      // Draw particle canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (p.life >= p.maxLife) {
          particles.current.splice(i, 1);
        }
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50 hidden md:block"
      />
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#B9974A] z-50 transition-opacity duration-150 hidden md:block shadow-[0_0_8px_#B9974A]"
      />
      <div
        ref={cursorRingRef}
        className="pointer-events-none fixed top-0 left-0 -ml-4 -mt-4 h-8 w-8 rounded-full border border-white/30 z-50 transition-[border-color,transform] duration-200 hidden md:block"
      />
    </>
  );
};
