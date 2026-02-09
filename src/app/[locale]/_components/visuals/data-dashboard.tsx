"use client";

import { useEffect, useRef, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const metrics = [
  { label: "Retention ↑", value: 5, suffix: "%", accent: "#06b6d4" },
  { label: "Churn ↓", value: 7, suffix: "%", accent: "#10b981" },
  { label: "Web Logs", value: 100, suffix: "M+", accent: "#8b5cf6" },
  { label: "Models", value: 12, suffix: "", accent: "#f59e0b" },
];

const logEntries = [
  "[INFO]  retention_model  — batch scored 24,519 users",
  "[OK]    uplift_pipeline  — churn reduction  7.2 %",
  "[INFO]  web_log_etl      — 102 M rows ingested",
  "[WARN]  feature_store    — staleness > 5 min",
  "[OK]    model_registry   — v3.1.2 promoted to prod",
  "[INFO]  spark_cluster    — 48 / 64 executors active",
];

// ─── Tiny ring gauge ─────────────────────────────────────────────────────────

function RingGauge({
  value,
  max,
  accent,
  progress,
}: {
  value: number;
  max: number;
  accent: string;
  progress: number;
}) {
  const size = 40;
  const stroke = 3.5;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (Math.min(value, max) / max) * circ * progress;

  return (
    <svg
      width={size}
      height={size}
      className="shrink-0"
      role="img"
      aria-label={`${value} of ${max}`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={accent}
        strokeWidth={stroke}
        strokeDasharray={`${filled} ${circ}`}
        strokeDashoffset={circ * 0.25}
        strokeLinecap="round"
        className="transition-all duration-1000 ease-out"
      />
    </svg>
  );
}

// ─── Animated line chart ─────────────────────────────────────────────────────

function MiniLineChart() {
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
      const dpr = window.devicePixelRatio;
      ctx.clearRect(0, 0, w, h);

      // Subtle grid
      ctx.strokeStyle = "rgba(255,255,255,0.04)";
      ctx.lineWidth = 1;
      for (let i = 1; i < 4; i++) {
        const y = (h / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Two data series
      const series = [
        {
          color: "rgba(6, 182, 212, 0.8)",
          fill: "rgba(6, 182, 212, 0.12)",
          freq: 0.05,
          amp: 0.18,
          phase: 0,
        },
        {
          color: "rgba(139, 92, 246, 0.6)",
          fill: "rgba(139, 92, 246, 0.08)",
          freq: 0.07,
          amp: 0.12,
          phase: 2,
        },
      ];

      for (const s of series) {
        const steps = 80;
        const pts: { x: number; y: number }[] = [];
        for (let i = 0; i <= steps; i++) {
          const x = (w / steps) * i;
          const t = (i + offset) * s.freq + s.phase;
          const y =
            h * 0.45 +
            Math.sin(t) * h * s.amp +
            Math.sin(t * 2.7) * h * 0.06 +
            Math.cos(t * 0.5) * h * 0.08;
          pts.push({ x, y });
        }

        // Fill
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, s.fill);
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (const p of pts) ctx.lineTo(p.x, p.y);
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        // Line
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (const p of pts) ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 1.5 * dpr;
        ctx.stroke();

        // Latest dot
        const last = pts[pts.length - 1];
        ctx.beginPath();
        ctx.arc(last.x, last.y, 3 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();
      }

      offset += 0.25;
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
    <canvas
      ref={canvasRef}
      className="h-28 w-full md:h-32"
      tabIndex={-1}
      role="img"
      aria-label="Animated data chart"
    />
  );
}

// ─── Log ticker ──────────────────────────────────────────────────────────────

function LogTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % logEntries.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const entry = logEntries[index];
  const isOk = entry.startsWith("[OK]");
  const isWarn = entry.startsWith("[WARN]");

  return (
    <div className="flex items-center gap-2 overflow-hidden text-nowrap font-mono text-[10px]">
      <span
        className={`shrink-0 ${isWarn ? "text-amber-400/80" : isOk ? "text-emerald-400/80" : "text-cyan-400/60"}`}
      >
        {entry.slice(0, 6)}
      </span>
      <span className="truncate text-white/40">{entry.slice(6)}</span>
    </div>
  );
}

// ─── Dashboard composite ─────────────────────────────────────────────────────

/**
 * Fancy animated data dashboard — ring gauges, multi-series chart, log ticker.
 */
export function DataDashboard() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(1), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-white/60">Analytics Dashboard</span>
          <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[10px] font-medium text-cyan-400">
            LIVE
          </span>
        </div>
        <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
      </div>

      {/* Metric cards — 2×2 grid */}
      <div className="grid grid-cols-2 gap-px bg-white/5">
        {metrics.map(({ label, value, suffix, accent }) => (
          <div key={label} className="flex items-center gap-2.5 bg-black/30 px-3 py-2.5">
            <RingGauge value={value} max={100} accent={accent} progress={progress} />
            <div className="min-w-0">
              <div className="truncate text-[10px] text-white/40">{label}</div>
              <div className="font-mono text-sm font-semibold text-white/90">
                {Math.round(value * progress)}
                <span className="text-xs font-normal text-white/50">{suffix}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="border-t border-white/5">
        <MiniLineChart />
      </div>

      {/* Log ticker footer */}
      <div className="border-t border-white/10 px-4 py-2">
        <LogTicker />
      </div>
    </div>
  );
}
