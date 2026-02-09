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

  useEffect(() => {
    const totalChars = codeLines.join("\n").length;
    const interval = setInterval(() => {
      setVisibleChars((prev) => {
        if (prev >= totalChars) return 0;
        return prev + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const fullText = codeLines.join("\n");
  const displayedText = fullText.slice(0, visibleChars);
  const displayedLines = displayedText.split("\n");

  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-sm">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-white/40">server.ts</span>
      </div>

      {/* Code area */}
      <div className="p-4 font-mono text-xs leading-relaxed md:text-sm">
        {displayedLines.map((line, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: display-only typing animation
          <div key={i} className="flex">
            <span className="mr-4 w-6 select-none text-right text-white/20">{i + 1}</span>
            <span className="text-emerald-400/90">{line}</span>
          </div>
        ))}
        <span className="inline-block h-4 w-2 animate-pulse bg-white/60" />
      </div>
    </div>
  );
}
