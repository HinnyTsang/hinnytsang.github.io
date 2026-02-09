"use client";

import { useEffect, useState } from "react";

const metrics = [
  { label: "Retention", value: 95, suffix: "%", color: "bg-cyan-500" },
  { label: "Churn ↓", value: 7, suffix: "%", color: "bg-emerald-500" },
  { label: "Web Logs", value: 100, suffix: "M+", color: "bg-violet-500" },
  { label: "Models", value: 12, suffix: "", color: "bg-amber-500" },
];

/**
 * Animated data dashboard — bars that grow on mount with live-updating numbers.
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
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="text-xs font-medium text-white/60">Analytics Dashboard</span>
        <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
      </div>

      {/* Metrics */}
      <div className="space-y-4 p-4">
        {metrics.map(({ label, value, suffix, color }) => (
          <div key={label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/60">{label}</span>
              <span className="font-mono text-white/90">
                {Math.round(value * progress)}
                {suffix}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
                style={{ width: `${(value / 100) * progress * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Mini chart */}
      <div className="flex items-end gap-1 border-t border-white/10 px-4 py-3">
        {Array.from({ length: 20 }).map((_, i) => {
          const h = 8 + Math.sin(i * 0.8) * 6 + Math.random() * 4;
          return (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length decorative bars
              key={i}
              className="flex-1 rounded-t bg-cyan-500/60 transition-all duration-700"
              style={{
                height: `${h * progress}px`,
                transitionDelay: `${i * 30}ms`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
