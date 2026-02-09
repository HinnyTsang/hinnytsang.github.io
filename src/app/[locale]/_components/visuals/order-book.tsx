"use client";

import type { OrderBook as OrderBookData } from "./hooks/use-binance";

// ─── Props ───────────────────────────────────────────────────────────────────

type OrderBookProps = {
  data: OrderBookData;
  ticker: string;
};

// ─── Component ───────────────────────────────────────────────────────────────

const LEVELS = 8;

/**
 * Compact bid/ask ladder with depth bars.
 */
export function OrderBook({ data, ticker }: OrderBookProps) {
  const bids = data.bids.slice(0, LEVELS);
  const asks = data.asks.slice(0, LEVELS);

  // Max qty across both sides for relative bar sizing
  const maxQty = Math.max(
    ...bids.map((l) => l.qty),
    ...asks.map((l) => l.qty),
    0.001, // prevent division by zero
  );

  if (bids.length === 0 && asks.length === 0) {
    return (
      <div className="flex h-20 items-center justify-center text-xs text-white/30">
        Waiting for order book...
      </div>
    );
  }

  const timeStr = data.timestamp
    ? new Date(data.timestamp).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : null;

  return (
    <div className="text-[10px] font-mono">
      {/* Header with timestamp */}
      <div className="flex items-center justify-between px-2 pb-1">
        <span className="text-[9px] font-sans text-white/30">Order Book</span>
        {timeStr && <span className="text-[9px] text-white/25">{timeStr}</span>}
        <span className="text-[9px] text-white/25">{ticker}</span>
      </div>

      <div className="grid grid-cols-2 gap-px">
        {/* Bids (left) */}
        <div className="space-y-px">
          <div className="flex justify-between px-2 pb-0.5 text-[9px] text-white/30">
            <span>Price</span>
            <span>Qty</span>
          </div>
          {bids.map((level) => (
            <div key={level.price} className="relative flex justify-between px-2 py-px">
              <div
                className="absolute inset-y-0 right-0 bg-emerald-500/15"
                style={{ width: `${(level.qty / maxQty) * 100}%` }}
              />
              <span className="relative text-emerald-400/80">
                {level.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className="relative text-white/50">{level.qty.toFixed(4)}</span>
            </div>
          ))}
        </div>

        {/* Asks (right) */}
        <div className="space-y-px">
          <div className="flex justify-between px-2 pb-0.5 text-[9px] text-white/30">
            <span>Price</span>
            <span>Qty</span>
          </div>
          {asks.map((level) => (
            <div key={level.price} className="relative flex justify-between px-2 py-px">
              <div
                className="absolute inset-y-0 left-0 bg-red-500/15"
                style={{ width: `${(level.qty / maxQty) * 100}%` }}
              />
              <span className="relative text-red-400/80">
                {level.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span className="relative text-white/50">{level.qty.toFixed(4)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
