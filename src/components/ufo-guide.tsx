"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { profile, socialLinks } from "@/lib/data";

// ─── Path waypoints ─────────────────────────────────────────────────────────
// Each waypoint maps a scroll progress to an (x%, y%) viewport position.
// The UFO smoothly interpolates between these using cubic easing.
//
// x: 50 = center, <50 = left, >50 = right
// y: viewport percentage (top)

type Waypoint = { at: number; x: number; y: number };

const waypoints: Waypoint[] = [
  { at: 0.0, x: 50, y: 75 }, // start: center bottom (near "See my journey")
  { at: 0.12, x: 50, y: 50 }, // rising up center
  { at: 0.22, x: 78, y: 45 }, // education: drift right (visual is left)
  { at: 0.38, x: 22, y: 50 }, // oursky: swing left (visual is right)
  { at: 0.54, x: 78, y: 45 }, // smartone: swing right (visual is left)
  { at: 0.72, x: 22, y: 50 }, // pollock: swing left (visual is right)
  { at: 0.99, x: 50, y: 40 }, // approach center for landing
];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function getPositionAtProgress(v: number): { x: number; y: number } {
  const p = Math.max(0, Math.min(1, v));

  // Find surrounding waypoints
  let lowerIdx = 0;
  for (let i = 0; i < waypoints.length - 1; i++) {
    if (p >= waypoints[i].at) lowerIdx = i;
  }
  const upperIdx = Math.min(lowerIdx + 1, waypoints.length - 1);

  const lower = waypoints[lowerIdx];
  const upper = waypoints[upperIdx];

  const range = upper.at - lower.at;
  const t = range === 0 ? 0 : smoothstep((p - lower.at) / range);

  return {
    x: lerp(lower.x, upper.x, t),
    y: lerp(lower.y, upper.y, t),
  };
}

// ─── Component ──────────────────────────────────────────────────────────────

export function UfoGuide() {
  const { scrollYProgress } = useScroll();
  const [pos, setPos] = useState({ x: 50, y: 75 });
  const [rotate, setRotate] = useState(0);
  const [isLanding, setIsLanding] = useState(false);
  const prevX = useRef(50);

  // biome-ignore lint/suspicious/noExplicitAny: dynamic i18n keys
  const t: any = useTranslations();

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const landing = v > 0.95;
    setIsLanding(landing);

    if (landing) {
      // Landing: ease to center
      const landingProgress = Math.min((v - 0.95) / 0.12, 1);
      const eased = smoothstep(landingProgress);
      setPos({ x: 50, y: lerp(55, 40, eased) });
      setRotate(rotate * (1 - eased));
    } else {
      const { x, y } = getPositionAtProgress(v);
      setPos({ x, y });

      // Tilt based on horizontal movement direction
      const dx = x - prevX.current;
      setRotate(Math.max(-20, Math.min(20, dx * 3)));
      prevX.current = x;
    }
  });

  return (
    <div
      className="pointer-events-none fixed z-40 -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: 1,
          scale: isLanding ? 2.5 : 1,
        }}
        transition={{
          opacity: { duration: 0.5 },
          scale: { duration: 0.6, ease: "easeInOut" },
        }}
      >
        {/* Tractor beam */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{
              height: isLanding ? 80 : 20,
              width: isLanding ? 40 : 10,
              opacity: isLanding ? 0.4 : 0.2,
            }}
            transition={{ duration: 0.6 }}
            style={{
              background: "linear-gradient(180deg, rgba(134, 239, 172, 0.6) 0%, transparent 100%)",
              clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
            }}
          />
        </div>

        {/* UFO body */}
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotate,
          }}
          transition={{
            y: { duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            rotate: { duration: 0.3, ease: "easeOut" },
          }}
          className="relative flex flex-col items-center"
        >
          {/* Dome */}
          <div className="mx-auto h-5 w-7 rounded-t-full bg-linear-to-t from-slate-400/80 to-slate-300/60" />

          {/* Saucer */}
          <div className="relative h-3.5 w-14 rounded-full bg-linear-to-b from-slate-300/80 to-slate-500/80 shadow-lg">
            <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-around px-2">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-green-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
              />
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-yellow-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
              />
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-red-400"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
              />
            </div>
          </div>

          {/* Glow */}
          <div className="mx-auto h-1.5 w-10 rounded-full bg-green-400/30 blur-sm" />
        </motion.div>

        {/* CTA from tractor beam */}
        <AnimatePresence>
          {isLanding && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="pointer-events-auto mt-6 flex flex-col items-center gap-3"
            >
              <p className="text-sm font-bold text-white/90">{t("section.cta.title")}</p>
              <p className="text-xs font-medium text-white/80">{t("section.cta.subtitle")}</p>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white shadow-lg transition-colors hover:bg-green-400"
              >
                <Mail className="h-3 w-3" />
                {t("section.cta.email")}
              </a>
              <div className="flex gap-3">
                {socialLinks.map(({ platform, url }) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-white/50 underline-offset-2 hover:text-white/80 hover:underline"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
