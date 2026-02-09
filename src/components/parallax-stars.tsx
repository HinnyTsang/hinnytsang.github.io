"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Full-page parallax star layer.
 * Stars drift **downward** as the user scrolls **down**,
 * creating the illusion of ascending through space.
 */
export function ParallaxStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const { scrollYProgress } = useScroll();
  const starsRef = useRef<{ x: number; y: number; r: number; brightness: number }[]>([]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    scrollRef.current = v;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      initStars();
    }

    function initStars() {
      if (!canvas) return;
      const count = Math.floor((canvas.width * canvas.height) / 5000);
      starsRef.current = [];
      for (let i = 0; i < count; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random(), // normalized 0–1 position
          r: Math.random() * 1.2 + 0.3,
          brightness: Math.random() * 0.6 + 0.2,
        });
      }
    }

    function draw(time: number) {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Parallax: stars shift downward as scroll progresses
      const parallaxOffset = scrollRef.current * h * 0.6;

      for (const star of starsRef.current) {
        const twinkle = star.brightness * (0.7 + 0.3 * Math.sin(time * 0.002 + star.x * 0.01));

        // Star's Y position wraps around with parallax
        const rawY = star.y * h * 2 + parallaxOffset;
        const y = (((rawY % (h * 2)) + h * 2) % (h * 2)) - h * 0.5;

        if (y < -10 || y > h + 10) continue;

        ctx.beginPath();
        ctx.arc(star.x, y, star.r * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
        ctx.fill();
      }

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
      className="pointer-events-none fixed inset-0 -z-[5]"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
