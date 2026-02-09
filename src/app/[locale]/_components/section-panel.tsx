"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";
import { FadeIn } from "@/components/fade-in";
import { cn } from "@/lib/utils";

type SectionPanelProps = {
  id?: string;
  direction?: "left" | "right";
  visual: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * Alternating two-panel section layout with parallax + fade-in.
 *
 * As the user scrolls down, the section drifts slightly **downward**
 * relative to normal scroll, reinforcing the "ascending" illusion.
 */
export function SectionPanel({
  id,
  direction = "left",
  visual,
  children,
  className,
}: SectionPanelProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Subtle parallax: section drifts 40px downward across its scroll range
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ y }}
      className={cn(
        "flex min-h-screen w-full flex-col items-center justify-center gap-8 px-6 py-16 md:flex-row md:gap-16 md:px-16",
        className,
      )}
    >
      <FadeIn
        direction={direction === "left" ? "left" : "right"}
        className={cn(
          "flex w-full items-center justify-center md:w-1/2",
          direction === "right" && "md:order-2",
        )}
      >
        {visual}
      </FadeIn>
      <FadeIn
        direction={direction === "left" ? "right" : "left"}
        delay={0.15}
        className={cn("flex w-full flex-col gap-4 md:w-1/2", direction === "right" && "md:order-1")}
      >
        {children}
      </FadeIn>
    </motion.section>
  );
}
