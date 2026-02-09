"use client";

import { useEffect, useRef } from "react";

/**
 * Animated starfield canvas — twinkling stars with a slow parallax drift.
 */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const stars: { x: number; y: number; r: number; speed: number; phase: number }[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    }

    function init() {
      if (!canvas) return;
      resize();
      stars.length = 0;
      const count = Math.floor((canvas.width * canvas.height) / 3000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.3 + 0.05,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw(time: number) {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(time * 0.001 * star.speed + star.phase);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * 0.9})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    init();
    animationId = requestAnimationFrame(draw);
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-64 w-full rounded-xl md:h-80"
      tabIndex={-1}
      role="img"
      aria-label="Animated starfield"
    />
  );
}
