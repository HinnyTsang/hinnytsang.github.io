"use client";

import { useEffect, useRef } from "react";

/**
 * Animated stock chart canvas — draws a live-updating price line.
 */
export function StockChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let offset = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    }

    function draw() {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.lineWidth = 1;
      for (let i = 1; i < 5; i++) {
        const y = (h / 5) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Price line
      const points: { x: number; y: number }[] = [];
      const steps = 100;
      for (let i = 0; i <= steps; i++) {
        const x = (w / steps) * i;
        const t = (i + offset) * 0.06;
        const y =
          h * 0.5 +
          Math.sin(t) * h * 0.15 +
          Math.sin(t * 2.3) * h * 0.08 +
          Math.cos(t * 0.7) * h * 0.1;
        points.push({ x, y });
      }

      // Gradient fill below line
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, "rgba(34, 197, 94, 0.3)");
      gradient.addColorStop(1, "rgba(34, 197, 94, 0)");

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (const p of points) {
        ctx.lineTo(p.x, p.y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Line
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (const p of points) {
        ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "rgba(34, 197, 94, 0.8)";
      ctx.lineWidth = 2 * window.devicePixelRatio;
      ctx.stroke();

      // Latest price dot
      const last = points[points.length - 1];
      ctx.beginPath();
      ctx.arc(last.x, last.y, 4 * window.devicePixelRatio, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(34, 197, 94, 1)";
      ctx.fill();

      offset += 0.3;
      animationId = requestAnimationFrame(draw);
    }

    resize();
    animationId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-white/60">Global Equities</span>
          <span className="text-xs font-mono text-green-400">+2.1 SR</span>
        </div>
        <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
      </div>

      <canvas
        ref={canvasRef}
        className="h-48 w-full md:h-56"
        tabIndex={-1}
        role="img"
        aria-label="Animated stock chart"
      />

      {/* Footer stats */}
      <div className="flex justify-between border-t border-white/10 px-4 py-2 text-xs text-white/50">
        <span>Sharpe 2.1</span>
        <span>30+ Pipelines</span>
        <span>Bloomberg</span>
      </div>
    </div>
  );
}
