"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type Candle = {
  time: number; // unix seconds
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type OrderBookLevel = {
  price: number;
  qty: number;
};

export type OrderBook = {
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  /** Unix ms timestamp of the last update */
  timestamp: number | null;
};

// ─── REST helpers ────────────────────────────────────────────────────────────

const REST_BASE = "https://api.binance.com";
const WS_BASE = "wss://stream.binance.com:9443/ws";

async function fetchKlines(symbol: string, interval: string, limit: number): Promise<Candle[]> {
  const url = `${REST_BASE}/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Binance REST ${res.status}`);
  const data: unknown[][] = await res.json();
  return data.map((k) => ({
    time: Math.floor((k[0] as number) / 1000),
    open: Number.parseFloat(k[1] as string),
    high: Number.parseFloat(k[2] as string),
    low: Number.parseFloat(k[3] as string),
    close: Number.parseFloat(k[4] as string),
    volume: Number.parseFloat(k[5] as string),
  }));
}

async function fetchDepthSnapshot(symbol: string, limit = 20): Promise<OrderBook> {
  const url = `${REST_BASE}/api/v3/depth?symbol=${symbol}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Binance depth REST ${res.status}`);
  const data = await res.json();
  return {
    bids: (data.bids as string[][]).map(([p, q]) => ({
      price: Number.parseFloat(p),
      qty: Number.parseFloat(q),
    })),
    asks: (data.asks as string[][]).map(([p, q]) => ({
      price: Number.parseFloat(p),
      qty: Number.parseFloat(q),
    })),
    timestamp: Date.now(),
  };
}

// ─── Hook ────────────────────────────────────────────────────────────────────

type UseBinanceReturn = {
  candles: Candle[];
  orderBook: OrderBook;
  lastPrice: number | null;
  connected: boolean;
};

export function useBinance(symbol = "BTCUSDT", interval = "1m"): UseBinanceReturn {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [orderBook, setOrderBook] = useState<OrderBook>({ bids: [], asks: [], timestamp: null });
  const [lastPrice, setLastPrice] = useState<number | null>(null);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let cancelled = false;

    const lowerSymbol = symbol.toLowerCase();

    // 1. Fetch historical candles + initial order book snapshot (parallel)
    fetchKlines(symbol, interval, 100)
      .then((hist) => {
        if (cancelled) return;
        setCandles(hist);
        if (hist.length > 0) setLastPrice(hist[hist.length - 1].close);
      })
      .catch(() => {
        /* graceful — candles stay empty */
      });

    fetchDepthSnapshot(symbol)
      .then((snapshot) => {
        if (cancelled) return;
        setOrderBook(snapshot);
      })
      .catch(() => {
        /* graceful — order book stays empty until WS kicks in */
      });

    // 2. Open combined WebSocket stream (kline + partial depth snapshot)
    //    depth20@1000ms sends full top-20 snapshots every second
    const streamName = `${lowerSymbol}@kline_${interval}/${lowerSymbol}@depth20@1000ms`;
    const ws = new WebSocket(`${WS_BASE}/${streamName}`);
    wsRef.current = ws;

    ws.onopen = () => {
      if (!cancelled) setConnected(true);
    };

    ws.onmessage = (evt) => {
      if (cancelled) return;
      try {
        const raw = JSON.parse(evt.data);

        // Combined streams wrap payload in { stream, data }
        const msg = raw.data ?? raw;

        // Kline update
        if (msg.e === "kline") {
          const k = msg.k;
          const candle: Candle = {
            time: Math.floor(k.t / 1000),
            open: Number.parseFloat(k.o),
            high: Number.parseFloat(k.h),
            low: Number.parseFloat(k.l),
            close: Number.parseFloat(k.c),
            volume: Number.parseFloat(k.v),
          };
          setLastPrice(candle.close);
          setCandles((prev) => {
            if (prev.length === 0) return [candle];
            const last = prev[prev.length - 1];
            if (last.time === candle.time) {
              // Update the latest candle in-place
              return [...prev.slice(0, -1), candle];
            }
            // New candle
            return [...prev, candle];
          });
        }

        // Partial depth snapshot (depth20 sends full top-20 every second)
        if (msg.lastUpdateId !== undefined && msg.bids && msg.asks) {
          setOrderBook({
            bids: (msg.bids as string[][]).map(([p, q]) => ({
              price: Number.parseFloat(p),
              qty: Number.parseFloat(q),
            })),
            asks: (msg.asks as string[][]).map(([p, q]) => ({
              price: Number.parseFloat(p),
              qty: Number.parseFloat(q),
            })),
            timestamp: Date.now(),
          });
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
  }, [symbol, interval]);

  return { candles, orderBook, lastPrice, connected };
}
