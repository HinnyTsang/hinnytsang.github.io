"use client";

import { motion, useInView } from "framer-motion";
import { type ReactNode, useRef } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  /** If true, fades out when scrolled away. Default: false (fade in once). */
  fadeOut?: boolean;
};

const offsets = {
  up: { y: 34 },
  down: { y: -54 },
  left: { x: 34 },
  right: { x: -54 },
  none: {},
} as const;

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  fadeOut = false,
}: FadeInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: !fadeOut, margin: "-200px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offsets[direction] }}
      transition={{ duration: 0.5, delay: inView ? delay : 0, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
