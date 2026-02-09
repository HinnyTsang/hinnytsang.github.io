"use client";

import { useEffect, useRef, useState } from "react";
import type { Candle } from "./use-binance";

// ─── REST helpers ────────────────────────────────────────────────────────────

const REST_BASE = "https://www.okx.com";
const WS_URL = "wss://ws.okx.com:8443/ws/v5/public";

async function fetchCandles(instId: string, bar: string, limit: number): Promise<Candle[]> {
  const url = `${REST_BASE}/api/v5/market/candles?instId=${instId}&bar=${bar}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OKX REST ${res.status}`);
  const json = await res.json();
  // OKX returns data in reverse chronological order: [[ts, o, h, l, c, vol, ...], ...]
  const data: string[][] = json.data ?? [];
  return data
    .map((k) => ({
      time: Math.floor(Number.parseInt(k[0], 10) / 1000),
      open: Number.parseFloat(k[1]),
      high: Number.parseFloat(k[2]),
      low: Number.parseFloat(k[3]),
      close: Number.parseFloat(k[4]),
      volume: Number.parseFloat(k[5]),
    }))
    .reverse(); // chronological order
}

// ─── Hook ────────────────────────────────────────────────────────────────────

type UseOkxReturn = {
  candles: Candle[];
  lastPrice: number | null;
  connected: boolean;
};

export function useOkx(instId = "BTC-USDT", bar = "1m"): UseOkxReturn {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [lastPrice, setLastPrice] = useState<number | null>(null);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let cancelled = false;

    // Map bar shorthand to OKX channel name (e.g. "1m" → "candle1m")
    const channel = `candle${bar}`;

    // 1. Fetch historical candles
    fetchCandles(instId, bar, 100)
      .then((hist) => {
        if (cancelled) return;
        setCandles(hist);
        if (hist.length > 0) setLastPrice(hist[hist.length - 1].close);
      })
      .catch(() => {
        /* graceful — candles stay empty */
      });

    // 2. Open WebSocket
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      if (cancelled) return;
      setConnected(true);
      // Subscribe to candle channel
      ws.send(
        JSON.stringify({
          op: "subscribe",
          args: [{ channel, instId }],
        }),
      );
    };

    ws.onmessage = (evt) => {
      if (cancelled) return;
      try {
        const msg = JSON.parse(evt.data);
        // Candle push: msg.arg.channel === "candle1m", msg.data is array of candle arrays
        if (msg.data && msg.arg?.channel === channel) {
          for (const k of msg.data as string[][]) {
            const candle: Candle = {
              time: Math.floor(Number.parseInt(k[0], 10) / 1000),
              open: Number.parseFloat(k[1]),
              high: Number.parseFloat(k[2]),
              low: Number.parseFloat(k[3]),
              close: Number.parseFloat(k[4]),
              volume: Number.parseFloat(k[5]),
            };
            setLastPrice(candle.close);
            setCandles((prev) => {
              if (prev.length === 0) return [candle];
              const last = prev[prev.length - 1];
              if (last.time === candle.time) {
                return [...prev.slice(0, -1), candle];
              }
              return [...prev, candle];
            });
          }
        }
      } catch {
        /* ignore malformed messages */
      }
    };

    ws.onclose = () => {
      if (!cancelled) setConnected(false);
    };

    ws.onerror = () => {
      if (!cancelled) setConnected(false);
    };

    return () => {
      cancelled = true;
      ws.close();
      wsRef.current = null;
    };
  }, [instId, bar]);

  return { candles, lastPrice, connected };
}
