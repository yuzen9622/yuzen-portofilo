import { cn } from "@/shared/lib/utils";
import type { ReactNode } from "react";

/**
 * Double-bezel container: a hairline outer tray holding an inner core with its
 * own top highlight, radii kept concentric (inner = outer - padding).
 */
export default function Bezel({
  children,
  className,
  innerClassName,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[2rem] bg-foreground/[0.03] p-1.5 ring-1 ring-foreground/[0.07] shadow-[0_30px_80px_-40px_oklch(0.2_0_0/0.25)] dark:bg-white/[0.03] dark:ring-white/[0.08] dark:shadow-[0_30px_80px_-40px_oklch(0_0_0/0.7)]",
        className,
      )}
    >
      <div
        className={cn(
          "relative h-full overflow-hidden rounded-[calc(2rem-0.375rem)] bg-background/70 shadow-[inset_0_1px_0_oklch(1_0_0/0.6)] dark:bg-white/[0.025] dark:shadow-[inset_0_1px_0_oklch(1_0_0/0.08)]",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
