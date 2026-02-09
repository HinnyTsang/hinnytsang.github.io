"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ─── Color stops: [scrollProgress, innerColor, outerColor] ──────────────────

type ColorStop = [at: number, inner: [number, number, number], outer: [number, number, number]];

const darkStops: ColorStop[] = [
  [0, [26, 58, 92], [10, 22, 40]], // night sky (intro)
  [0.15, [30, 58, 95], [12, 26, 48]], // deep blue (education)
  [0.3, [15, 40, 71], [6, 14, 26]], // space
  [0.45, [26, 39, 68], [13, 21, 32]], // cloud-like (oursky)
  [0.6, [22, 32, 51], [10, 15, 24]], // deeper (smartone)
  [0.8, [18, 25, 42], [8, 12, 20]], // darkest (pollock)
  [1, [15, 21, 34], [6, 10, 16]], // end (cta)
];

const lightStops: ColorStop[] = [
  [0, [135, 206, 235], [224, 240, 255]], // blue sky
  [0.15, [109, 179, 216], [208, 232, 248]], // lighter blue
  [0.3, [90, 158, 197], [192, 220, 239]], // horizon
  [0.45, [232, 224, 216], [245, 240, 235]], // warm cloud
  [0.6, [224, 216, 208], [240, 235, 229]], // warm
  [0.8, [216, 208, 200], [235, 229, 223]], // warmer
  [1, [240, 235, 229], [250, 250, 248]], // light end
];

// ─── Interpolation helpers ──────────────────────────────────────────────────

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpColor(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

function toRgb([r, g, b]: [number, number, number]): string {
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

function getColorsAtProgress(
  progress: number,
  colorStops: ColorStop[],
): { inner: string; outer: string } {
  // Clamp
  const p = Math.max(0, Math.min(1, progress));

  // Find surrounding stops
  let lowerIdx = 0;
  for (let i = 0; i < colorStops.length - 1; i++) {
    if (p >= colorStops[i][0]) lowerIdx = i;
  }
  const upperIdx = Math.min(lowerIdx + 1, colorStops.length - 1);

  const lower = colorStops[lowerIdx];
  const upper = colorStops[upperIdx];

  const range = upper[0] - lower[0];
  const t = range === 0 ? 0 : (p - lower[0]) / range;

  // Smooth easing for more gradual transitions
  const eased = t * t * (3 - 2 * t); // smoothstep

  return {
    inner: toRgb(lerpColor(lower[1], upper[1], eased)),
    outer: toRgb(lerpColor(lower[2], upper[2], eased)),
  };
}

// ─── Component ──────────────────────────────────────────────────────────────

export function ScrollBackground() {
  const { scrollYProgress } = useScroll();
  const divRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!divRef.current) return;
    const colorStops = isDark ? darkStops : lightStops;
    const { inner, outer } = getColorsAtProgress(v, colorStops);
    divRef.current.style.background = `radial-gradient(ellipse at 50% ${50 + (1 - v) * 50}%, ${inner} 0%, ${outer} 100%)`;
  });

  return (
    <div
      ref={divRef}
      className="pointer-events-none fixed inset-0 -z-10 transition-none"
      style={{
        background: `radial-gradient(ellipse at 50% 100%, ${toRgb(darkStops[0][1])} 0%, ${toRgb(darkStops[0][2])} 100%)`,
      }}
      aria-hidden="true"
    />
  );
}
