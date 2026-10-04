import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Code2, Users } from 'lucide-react';

interface CosmicHeroProps {
  onExploreWorkshops: () => void;
}

export const CosmicHero: React.FC<CosmicHeroProps> = ({ onExploreWorkshops }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track window scroll for the smooth scroll-driven transition into the main hero card
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight || 800;
      const progress = Math.min(Math.max(scrollY / (windowHeight * 0.45), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Milky Way starlight canvas: Soft, gentle cream and white tones with toned-down middle brightness
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particleCount = 2500;
    const particles: {
      dist: number;
      angle: number;
      speed: number;
      size: number;
      alpha: number;
      color: string;
      radialOffset: number;
    }[] = [];

    const arms = 12;
    // Predominantly gentle white and soft light cream starlight palette
    const colors = [
      'rgba(255, 255, 255, ',   // Pure White
      'rgba(254, 252, 232, ',   // Light Cream
      'rgba(255, 251, 235, ',   // Warm Ivory Cream
      'rgba(254, 249, 195, ',   // Soft Starlight Cream
      'rgba(253, 244, 215, ',   // Gentle Champagne Cream
      'rgba(248, 250, 252, ',   // Silvery White
      'rgba(241, 245, 249, ',   // Soft White
      'rgba(226, 232, 240, ',   // Muted White Starlight
    ];

    const maxRadius = Math.max(width, height) * 0.95;

    for (let i = 0; i < particleCount; i++) {
      const isField = i % 4 === 0;

      if (isField) {
        // Field stars spanning the entire screen
        const dist = Math.random() * maxRadius;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.0003 + Math.random() * 0.00035;

        particles.push({
          dist,
          angle,
          speed,
          size: Math.random() * 1.3 + 0.3,
          alpha: Math.random() * 0.5 + 0.15,
          color: colors[Math.floor(Math.random() * colors.length)],
          radialOffset: (Math.random() - 0.5) * 80,
        });
      } else {
        // Dense spiral stream particles
        const arm = i % arms;
        const dist = Math.pow(Math.random(), 1.3) * maxRadius;
        const spiralOffset = dist * 0.0042;
        const dispersion = (Math.random() - 0.5) * 0.95;
        const angle = (arm * ((2 * Math.PI) / arms)) + spiralOffset + dispersion;

        const speed = 0.00045 + (0.0015 / (dist * 0.015 + 1));

        particles.push({
          dist,
          angle,
          speed,
          size: Math.random() * 1.8 + 0.4,
          // Balanced alpha: not overly bright in the center
          alpha: Math.random() * 0.55 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          radialOffset: (Math.random() - 0.5) * 50,
        });
      }
    }

    let globalRotation = 0;

    const render = () => {
      // Gentle, slow circular rotation continuous across the whole site
      globalRotation += 0.0007;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.5;
      const maxDim = Math.max(width, height);

      // 1. Subtle, gentle outer halo
      const outerHalo = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxDim * 0.75);
      outerHalo.addColorStop(0, 'rgba(254, 252, 232, 0.06)');
      outerHalo.addColorStop(0.3, 'rgba(255, 251, 235, 0.03)');
      outerHalo.addColorStop(0.7, 'rgba(254, 249, 195, 0.01)');
      outerHalo.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = outerHalo;
      ctx.beginPath();
      ctx.arc(cx, cy, maxDim * 0.75, 0, Math.PI * 2);
      ctx.fill();

      // 2. Toned-down Mid-Core Glow (Soft, not shining too much as requested)
      const midGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxDim * 0.28);
      midGlow.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
      midGlow.addColorStop(0.3, 'rgba(254, 252, 232, 0.08)');
      midGlow.addColorStop(0.7, 'rgba(253, 244, 215, 0.02)');
      midGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = midGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, maxDim * 0.28, 0, Math.PI * 2);
      ctx.fill();

      // 3. Stars forming the continuous Milky Way
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.angle += p.speed;

        const currentAngle = p.angle + globalRotation;
        const currentDist = p.dist + p.radialOffset;

        const x = cx + Math.cos(currentAngle) * currentDist;
        const y = cy + Math.sin(currentAngle) * currentDist * 0.64;

        if (x < -30 || x > width + 30 || y < -30 || y > height + 30) continue;

        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Subtle, modest nucleus (toned down from previous 0.92 opacity and 34px radius)
      const nucleus = ctx.createRadialGradient(cx, cy, 0, cx, cy, 16);
      nucleus.addColorStop(0, 'rgba(255, 255, 255, 0.42)');
      nucleus.addColorStop(0.4, 'rgba(254, 252, 232, 0.22)');
      nucleus.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = nucleus;
      ctx.beginPath();
      ctx.arc(cx, cy, 16, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleScrollToTeam = () => {
    const el = document.getElementById('team');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToHackathon = () => {
    const el = document.getElementById('hackathon');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Massive Full-Screen Milky Way Canvas with toned-down middle brightness */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block opacity-85" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#050505]/60" />
      </div>

      {/* STAGE 1: Clean Initial Viewport (Pure rolling Milky Way and title) */}
      <section className="relative z-10 min-h-[100vh] flex flex-col justify-center items-center text-center px-6">
        {/* Center Initial Brand Title (Fades smoothly as user scrolls) */}
        <div
          className="transition-all duration-500 max-w-3xl mx-auto"
          style={{
            opacity: Math.max(1 - scrollProgress * 2, 0),
            transform: `translateY(-${scrollProgress * 40}px) scale(${1 - scrollProgress * 0.08})`,
            pointerEvents: scrollProgress > 0.6 ? 'none' : 'auto',
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono text-neutral-300 mb-6 border border-white/15 shadow-2xl backdrop-blur-md">
            <span>CAUVERY INSTITUTE OF TECHNOLOGY · MANDYA</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter font-['Clash_Display',sans-serif] uppercase drop-shadow-2xl">
            CIT DevHub
          </h1>

          <p className="text-neutral-400 text-sm sm:text-base font-mono mt-4 tracking-wider uppercase">
            The Cosmic Gateway for Student Developers
          </p>
        </div>
      </section>

      {/* STAGE 2: Combined Main Hero Content (Revealed on Scroll / Cursor Forward) */}
      <section
        id="hero-content"
        className="relative z-10 min-h-[90vh] flex items-center justify-center px-6 md:px-12 py-20 max-w-5xl mx-auto transition-all duration-700"
        style={{
          opacity: Math.min(scrollProgress * 1.5, 1),
          transform: `translateY(${Math.max((1 - scrollProgress) * 60, 0)}px)`,
        }}
      >
        <div className="glass rounded-3xl p-8 sm:p-12 md:p-16 border border-white/20 shadow-2xl backdrop-blur-xl w-full text-center relative overflow-hidden bg-black/60">
          {/* Subtle warm starlight aura accent inside card */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-100/10 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/15 text-xs font-mono text-neutral-200 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>LEARN · CODE · BUILD · SHARE</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] font-['Clash_Display',sans-serif] max-w-3xl mx-auto mb-6">
            Learn, Code &amp; Build at <span className="underline decoration-white/40 underline-offset-8">CIT DevHub</span>
          </h2>

          {/* Supporting Bio / Mission */}
          <p className="text-neutral-200 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            The student developer club at <span className="text-white font-medium">Cauvery Institute of Technology, Mandya</span>. 
            Empowering engineers to collaborate, build production-grade web applications, explore generative AI, and compete in hackathons.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <button
              onClick={onExploreWorkshops}
              className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-white/10"
            >
              <span>Explore Workshops</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleScrollToHackathon}
              className="px-6 py-3 rounded-full glass hover:bg-white/[0.12] text-white font-semibold text-sm transition-all cursor-pointer flex items-center gap-2 border border-white/20"
            >
              <Code2 className="w-4 h-4 text-neutral-300" />
              <span>Hackathons</span>
            </button>

            <button
              onClick={handleScrollToTeam}
              className="px-6 py-3 rounded-full glass hover:bg-white/[0.12] text-white font-semibold text-sm transition-all cursor-pointer flex items-center gap-2 border border-white/20"
            >
              <Users className="w-4 h-4 text-neutral-300" />
              <span>Meet Founders</span>
            </button>
          </div>

          {/* Community Highlights Bar */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6 text-center max-w-2xl mx-auto">
            <div>
              <div className="text-2xl font-bold text-white font-['Clash_Display',sans-serif]">7</div>
              <div className="text-[11px] font-mono text-neutral-300 uppercase tracking-wider mt-0.5">Founding Members</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white font-['Clash_Display',sans-serif]">100%</div>
              <div className="text-[11px] font-mono text-neutral-300 uppercase tracking-wider mt-0.5">Student &amp; Peer Led</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-2xl font-bold text-white font-['Clash_Display',sans-serif]">CIT Mandya</div>
              <div className="text-[11px] font-mono text-neutral-300 uppercase tracking-wider mt-0.5">Cauvery Tech Campus</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
