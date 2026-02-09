"use client";

import { useEffect, useState } from "react";

const codeLines = [
  'import { Router } from "express";',
  "",
  "const app = new Router();",
  "",
  'app.get("/api/leases", async (req, res) => {',
  "  const leases = await db.leases.findAll();",
  "  res.json({ data: leases });",
  "});",
  "",
  'app.post("/api/leases", async (req, res) => {',
  "  const lease = await db.leases.create(req.body);",
  "  res.status(201).json(lease);",
  "});",
  "",
  "export default app;",
];

/**
 * Animated code editor — types out code lines one character at a time.
 */
export function CodeEditor() {
  const [visibleChars, setVisibleChars] = useState(0);
  const totalChars = codeLines.join("\n").length;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    function tick() {
      if (cancelled) return;
      setVisibleChars((prev) => {
        if (prev >= totalChars - 1) return prev; // will be handled below
        return prev + 1;
      });
      timer = setTimeout(tick, 40);
    }

    timer = setTimeout(tick, 40);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [totalChars]);

  // Pause for 2 seconds when typing completes, then restart
  useEffect(() => {
    if (visibleChars < totalChars - 1) return;
    const timer = setTimeout(() => setVisibleChars(0), 2000);
    return () => clearTimeout(timer);
  }, [visibleChars, totalChars]);

  // Build a per-line character budget so we know how much of each line to show
  let remaining = visibleChars;
  const lineBudgets: number[] = [];
  for (const line of codeLines) {
    const budget = Math.min(remaining, line.length);
    lineBudgets.push(budget);
    remaining -= budget;
    if (remaining > 0) remaining--; // account for the "\n" between lines
  }

  // Find which line the cursor is on
  const cursorLine = lineBudgets.findIndex((b, i) => b < codeLines[i].length);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-sm">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-white/40">server.ts</span>
      </div>

      {/* Code area — all lines rendered upfront to reserve height */}
      <div className="whitespace-pre p-4 font-mono text-xs leading-relaxed md:text-sm">
        {codeLines.map((line, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: display-only typing animation
          <div key={i} className="flex">
            <span className="mr-4 w-6 select-none text-right text-white/20">{i + 1}</span>
            <span className="text-emerald-400/90">
              {line.slice(0, lineBudgets[i])}
              {i === cursorLine && (
                <span className="inline-block h-4 w-2 animate-pulse bg-white/60" />
              )}
            </span>
            {/* Invisible placeholder to reserve line width */}
            <span className="invisible">{line.slice(lineBudgets[i])}</span>
          </div>
        ))}
        {cursorLine === -1 && <span className="inline-block h-4 w-2 animate-pulse bg-white/60" />}
      </div>
    </div>
  );
}
