import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionPanelProps = {
  id?: string;
  direction?: "left" | "right";
  visual: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * Alternating two-panel section layout.
 *
 * - `direction="left"`: visual on the left, content on the right.
 * - `direction="right"`: content on the left, visual on the right.
 * - On mobile: stacks vertically (visual on top, content below).
 */
export function SectionPanel({
  id,
  direction = "left",
  visual,
  children,
  className,
}: SectionPanelProps) {
  return (
    <section
      id={id}
      className={cn(
        "flex min-h-screen w-full flex-col items-center justify-center gap-8 px-6 py-16 md:flex-row md:gap-16 md:px-16",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-full items-center justify-center md:w-1/2",
          direction === "right" && "md:order-2",
        )}
      >
        {visual}
      </div>
      <div
        className={cn("flex w-full flex-col gap-4 md:w-1/2", direction === "right" && "md:order-1")}
      >
        {children}
      </div>
    </section>
  );
}
