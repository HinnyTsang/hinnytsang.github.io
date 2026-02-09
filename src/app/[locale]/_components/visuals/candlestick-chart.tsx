"use client";

import {
  type CandlestickData,
  CandlestickSeries,
  ColorType,
  createChart,
  type IChartApi,
  type ISeriesApi,
  type Time,
} from "lightweight-charts";
import { useEffect, useRef } from "react";
import type { Candle } from "./hooks/use-binance";

// ─── Types ───────────────────────────────────────────────────────────────────

/** A single data series to render on the chart. */
export type CandleSeries = {
  /** Unique key for React reconciliation and internal tracking. */
  key: string;
  candles: Candle[];
  /** Color when close >= open. */
  upColor: string;
  /** Color when close < open. */
  downColor: string;
};

type CandlestickChartProps = {
  series: CandleSeries[];
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toChartData(candles: Candle[]): CandlestickData<Time>[] {
  return candles.map((c) => ({
    time: c.time as Time,
    open: c.open,
    high: c.high,
    low: c.low,
    close: c.close,
  }));
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Generic multi-series candlestick chart powered by lightweight-charts.
 * Pass any number of `CandleSeries` — the chart is data-source agnostic.
 */
export function CandlestickChart({ series }: CandlestickChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesMapRef = useRef<Map<string, ISeriesApi<"Candlestick">>>(new Map());

  // Create chart once
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chart = createChart(container, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "rgba(255, 255, 255, 0.5)",
        fontSize: 10,
      },
      grid: {
        vertLines: { color: "rgba(255, 255, 255, 0.04)" },
        horzLines: { color: "rgba(255, 255, 255, 0.04)" },
      },
      rightPriceScale: {
        borderColor: "rgba(255, 255, 255, 0.1)",
      },
      timeScale: {
        borderColor: "rgba(255, 255, 255, 0.1)",
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        vertLine: { color: "rgba(255, 255, 255, 0.15)", width: 1 },
        horzLine: { color: "rgba(255, 255, 255, 0.15)", width: 1 },
      },
    });
    chartRef.current = chart;

    // Resize observer
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      chart.applyOptions({ width, height });
    });
    ro.observe(container);

    return () => {
      ro.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesMapRef.current.clear();
    };
  }, []);

  // Sync series data — add/update series as needed
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    let shouldFit = false;

    for (const s of series) {
      if (s.candles.length === 0) continue;

      let chartSeries = seriesMapRef.current.get(s.key);

      // Create series if it doesn't exist yet
      if (!chartSeries) {
        chartSeries = chart.addSeries(CandlestickSeries, {
          upColor: s.upColor,
          downColor: s.downColor,
          borderUpColor: s.upColor,
          borderDownColor: s.downColor,
          wickUpColor: s.upColor,
          wickDownColor: s.downColor,
        });
        seriesMapRef.current.set(s.key, chartSeries);
        shouldFit = true;
      }

      chartSeries.setData(toChartData(s.candles));
    }

    if (shouldFit) {
      chart.timeScale().fitContent();
    }
  }, [series]);

  return <div ref={containerRef} className="h-44 w-full md:h-52" />;
}
