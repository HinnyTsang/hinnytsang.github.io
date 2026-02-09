"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";

// ─── Shared canvas hook ──────────────────────────────────────────────────────

type DrawFn = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  dt: number,
) => void;

/**
 * Sets up a full-viewport fixed canvas with a resize-aware animation loop.
 * Returns the canvas ref to render.
 */
function useCanvasLayer(draw: DrawFn) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let lastTime = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
    }

    function loop(time: number) {
      if (!ctx || !canvas) return;
      const dt = lastTime ? (time - lastTime) / 1000 : 0.016;
      lastTime = time;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw(ctx, canvas.width, canvas.height, time, dt);
      animationId = requestAnimationFrame(loop);
    }

    resize();
    animationId = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [draw]);

  return canvasRef;
}

// ─── Star field layer ────────────────────────────────────────────────────────

type StarFieldProps = {
  /** Stars per 10 000 px² (default 2). */
  density?: number;
};

type Star = { x: number; y: number; r: number; brightness: number };

/**
 * Twinkling static stars with scroll-based parallax.
 */
export function StarFieldLayer({ density = 2 }: StarFieldProps) {
  const starsRef = useRef<Star[]>([]);
  const prevSize = useRef({ w: 0, h: 0 });
  const scrollRef = useRef(0);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollRef.current = v;
  });

  const canvasRef = useCanvasLayer((ctx, w, h, time) => {
    // Re-seed stars when canvas size changes
    if (w !== prevSize.current.w || h !== prevSize.current.h) {
      prevSize.current = { w, h };
      const count = Math.floor((density * w * h) / 10_000);
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random(),
        r: Math.random() * 1.2 + 0.3,
        brightness: Math.random() * 0.6 + 0.2,
      }));
    }

    const parallaxOffset = scrollRef.current * h * 0.6;
    const dpr = window.devicePixelRatio;

    for (const star of starsRef.current) {
      const twinkle = star.brightness * (0.7 + 0.3 * Math.sin(time * 0.002 + star.x * 0.01));
      const rawY = star.y * h * 2 + parallaxOffset;
      const y = (((rawY % (h * 2)) + h * 2) % (h * 2)) - h * 0.5;
      if (y < -10 || y > h + 10) continue;

      ctx.beginPath();
      ctx.arc(star.x, y, star.r * dpr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
      ctx.fill();
    }
  });

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-5"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

// ─── Shooting star layer ─────────────────────────────────────────────────────

type ShootingStarLayerProps = {
  /** [min, max] interval between spawns in ms (default [2000, 6000]). */
  frequency?: [min: number, max: number];
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  life: number;
  maxLife: number;
  width: number;
};

function spawnShootingStar(w: number, h: number): ShootingStar {
  const x = Math.random() * w;
  const y = Math.random() * h * 0.6;
  const angleSign = Math.random() > 0.5 ? 1 : -1;
  const angle = (Math.PI / 6 + Math.random() * (Math.PI / 6)) * angleSign;
  const speed = 8 + Math.random() * 10;
  const maxLife = 0.6 + Math.random() * 0.6;

  return {
    x,
    y,
    vx: Math.sin(angle) * speed,
    vy: Math.cos(angle) * speed,
    len: 60 + Math.random() * 100,
    life: maxLife,
    maxLife,
    width: 1 + Math.random() * 1.5,
  };
}

/**
 * Randomly spawning shooting stars that streak and fade.
 */
export function ShootingStarLayer({ frequency = [2000, 6000] }: ShootingStarLayerProps) {
  const shootingRef = useRef<ShootingStar[]>([]);
  const nextSpawnRef = useRef(0);
  const [minInterval, maxInterval] = frequency;

  const canvasRef = useCanvasLayer((ctx, w, h, time, dt) => {
    // Spawn
    if (time > nextSpawnRef.current) {
      shootingRef.current.push(spawnShootingStar(w, h));
      nextSpawnRef.current = time + minInterval + Math.random() * (maxInterval - minInterval);
    }

    // Update & draw
    const dpr = window.devicePixelRatio;
    const alive: ShootingStar[] = [];

    for (const s of shootingRef.current) {
      s.life -= dt;
      if (s.life <= 0) continue;

      s.x += s.vx * dpr;
      s.y += s.vy * dpr;

      const alpha = s.life / s.maxLife;
      const norm = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
      const tailX = s.x - (s.vx / norm) * s.len * dpr;
      const tailY = s.y - (s.vy / norm) * s.len * dpr;

      const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
      grad.addColorStop(0, "rgba(255, 255, 255, 0)");
      grad.addColorStop(1, `rgba(255, 255, 255, ${alpha})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(s.x, s.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = s.width * dpr;
      ctx.lineCap = "round";
      ctx.stroke();

      alive.push(s);
    }

    shootingRef.current = alive;
  });

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-5"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

// ─── Composite ───────────────────────────────────────────────────────────────

type ParallaxStarsProps = StarFieldProps & {
  /** [min, max] interval between shooting star spawns in ms. */
  shootingStarFrequency?: [min: number, max: number];
};

/**
 * Full-page parallax star background with shooting stars.
 * Composed of independent canvas layers — add more layers by rendering
 * additional layer components alongside this one.
 */
export function ParallaxStars({ density, shootingStarFrequency }: ParallaxStarsProps) {
  return (
    <>
      <StarFieldLayer density={density} />
      <ShootingStarLayer frequency={shootingStarFrequency} />
    </>
  );
}
