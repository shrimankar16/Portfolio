"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number; // depth 0..1, closer = faster + bigger
  r: number;
  speed: number;
  twinkle: number;
  twinkleSpeed: number;
  hue: string;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  life: number;
}

const PALETTE = ["255,255,255", "200,215,255", "180,190,255", "255,230,200"];

export default function CssStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let width = 0;
    let height = 0;
    const STAR_COUNT = 320;

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random(),
        r: 0.4 + Math.random() * 1.4,
        speed: 0.04 + Math.random() * 0.18,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.02 + Math.random() * 0.06,
        hue: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      }));
    };

    const createShootingStar = () => {
      if (Math.random() > 0.98) {
        shootingStars.push({
          x: width + 100,
          y: Math.random() * height * 0.5,
          vx: -8 - Math.random() * 4,
          vy: 8 + Math.random() * 4,
          length: 60 + Math.random() * 80,
          opacity: 1,
          life: 1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw stars
      for (const s of stars) {
        // twinkle
        s.twinkle += s.twinkleSpeed;
        const alpha = 0.35 + Math.abs(Math.sin(s.twinkle)) * 0.65;

        // drift upward-ish (slow motion toward top-left for parallax feel)
        s.x -= s.speed * s.z;
        s.y -= s.speed * s.z * 0.4;

        // wrap around
        if (s.x < -4) s.x = width + 4;
        if (s.y < -4) s.y = height + 4;

        const size = s.r * (0.6 + s.z);
        ctx.beginPath();
        ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.hue},${alpha})`;
        ctx.fill();

        // soft glow for larger stars
        if (s.z > 0.7) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.hue},${alpha * 0.12})`;
          ctx.fill();
        }
      }

      // Create new shooting stars
      createShootingStar();

      // Draw and update shooting stars
      shootingStars = shootingStars.filter((meteor) => {
        meteor.x += meteor.vx;
        meteor.y += meteor.vy;
        meteor.life -= 0.01;
        meteor.opacity = Math.max(0, meteor.life);

        if (meteor.life <= 0) return false;

        // Draw meteor trail
        const gradient = ctx.createLinearGradient(
          meteor.x,
          meteor.y,
          meteor.x - meteor.vx * 10,
          meteor.y - meteor.vy * 10
        );
        gradient.addColorStop(0, `rgba(135, 206, 250, ${meteor.opacity})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${meteor.opacity * 0.8})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x - meteor.vx * 8, meteor.y - meteor.vy * 8);
        ctx.stroke();

        // Glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(135, 206, 250, ${meteor.opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(meteor.x, meteor.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${meteor.opacity})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        return true;
      });

      raf = requestAnimationFrame(draw);
    };

    init();
    draw();

    const onResize = () => init();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      />

      {/* Real Galaxy Images in background */}
      <div className="absolute left-[8%] top-[15%] h-[250px] w-[250px] opacity-20" 
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=400&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '50%',
          filter: 'blur(2px) brightness(0.7)',
          mixBlendMode: 'screen',
          transform: 'rotate(45deg)',
        }}
      />
      
      <div className="absolute right-[12%] top-[35%] h-[200px] w-[200px] opacity-15" 
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '50%',
          filter: 'blur(1.5px) brightness(0.8)',
          mixBlendMode: 'screen',
          transform: 'rotate(120deg)',
        }}
      />

      <div className="absolute left-[15%] top-[60%] h-[180px] w-[180px] opacity-18" 
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '50%',
          filter: 'blur(2px) brightness(0.75)',
          mixBlendMode: 'screen',
          transform: 'rotate(220deg)',
        }}
      />

      <div className="absolute right-[20%] top-[70%] h-[220px] w-[220px] opacity-16" 
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '50%',
          filter: 'blur(1.8px) brightness(0.7)',
          mixBlendMode: 'screen',
          transform: 'rotate(310deg)',
        }}
      />

      {/* Nebula glow blobs */}
      <div className="nebula-blob absolute -left-32 top-10 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl" />
      <div className="nebula-blob absolute right-[-6rem] top-1/3 h-[28rem] w-[28rem] rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="nebula-blob absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
    </div>
  );
}
