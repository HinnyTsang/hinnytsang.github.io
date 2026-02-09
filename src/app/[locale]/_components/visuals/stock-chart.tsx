"use client";

import { useEffect, useMemo, useRef } from "react";
import { type CandleSeries, CandlestickChart } from "./candlestick-chart";
import { useBinance } from "./hooks/use-binance";
import { useOkx } from "./hooks/use-okx";
import { OrderBook } from "./order-book";

// ─── Mock fallback (original sine-wave animation) ────────────────────────────

function MockChart() {
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

      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.lineWidth = 1;
      for (let i = 1; i < 5; i++) {
        const y = (h / 5) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

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

      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, "rgba(34, 197, 94, 0.3)");
      gradient.addColorStop(1, "rgba(34, 197, 94, 0)");
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (const p of points) ctx.lineTo(p.x, p.y);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (const p of points) ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = "rgba(34, 197, 94, 0.8)";
      ctx.lineWidth = 2 * window.devicePixelRatio;
      ctx.stroke();

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
    <canvas
      ref={canvasRef}
      className="h-44 w-full md:h-52"
      tabIndex={-1}
      role="img"
      aria-label="Animated stock chart"
    />
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPrice(price: number): string {
  return price.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// ─── Composite ───────────────────────────────────────────────────────────────

/**
 * Live BTC/USDT trading dashboard with candlestick charts from
 * Binance + OKX and a live Binance order book.
 * Falls back to an animated mock chart if connections fail.
 */
export function StockChart() {
  const binance = useBinance("BTCUSDT", "1m");
  const okx = useOkx("BTC-USDT", "1m");

  const isLive = binance.connected || okx.connected;
  const hasData = binance.candles.length > 0 || okx.candles.length > 0;
  const price = binance.lastPrice ?? okx.lastPrice;

  // Build generic series array for the chart
  const chartSeries = useMemo<CandleSeries[]>(
    () => [
      {
        key: "binance",
        candles: binance.candles,
        upColor: "#22c55e",
        downColor: "#ef4444",
      },
      {
        key: "okx",
        candles: okx.candles,
        upColor: "rgba(6, 182, 212, 0.45)",
        downColor: "rgba(217, 70, 239, 0.45)",
      },
    ],
    [binance.candles, okx.candles],
  );

  // Compute 24h-ish change from the earliest candle we have
  const refPrice = binance.candles.length > 0 ? binance.candles[0].open : null;
  const change = price && refPrice ? ((price - refPrice) / refPrice) * 100 : null;

  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-white/60">BTC / USDT</span>
          {price && <span className="font-mono text-xs text-white/90">${formatPrice(price)}</span>}
          {change !== null && (
            <span
              className={`font-mono text-[10px] ${change >= 0 ? "text-emerald-400" : "text-red-400"}`}
            >
              {change >= 0 ? "+" : ""}
              {change.toFixed(2)}%
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {isLive && (
            <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400">
              LIVE
            </span>
          )}
          <span
            className={`h-2 w-2 rounded-full ${isLive ? "animate-pulse bg-green-400" : "bg-white/20"}`}
          />
        </div>
      </div>

      {/* Chart area */}
      {hasData ? <CandlestickChart series={chartSeries} /> : <MockChart />}

      {/* Footer */}
      <div className="flex justify-between border-t border-white/10 px-4 py-1.5 text-[10px] text-white/40">
        <div className="flex items-center gap-1.5">
          <span
            className={`h-1.5 w-1.5 rounded-full ${binance.connected ? "bg-emerald-400" : "bg-white/20"}`}
          />
          <span>Binance</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className={`h-1.5 w-1.5 rounded-full ${okx.connected ? "bg-cyan-400" : "bg-white/20"}`}
          />
          <span>OKX</span>
        </div>
        <span>1m candles</span>
      </div>

      {/* Order book */}
      {hasData && (
        <div className="border-t border-white/5 px-1 py-1.5">
          <OrderBook data={binance.orderBook} ticker="BTC/USDT (Binance)" />
        </div>
      )}
    </div>
  );
}
