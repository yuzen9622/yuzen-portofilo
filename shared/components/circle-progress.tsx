"use client";
import { cn } from "@/shared/lib/utils";
import { forwardRef } from "react";

export const CircleProgress = forwardRef<
  SVGCircleElement,
  {
    circumference: number;
    offset: number;
    scrollY: number;
    showText?: boolean;
    className?: string;
  }
>(({ circumference, offset, scrollY, showText = true, className }, ref) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(
        "h-full w-full text-4xl fill-primary hover:fill-primary-foreground",
        className
      )}
    >
      <circle
        cx={"50"}
        cy="50"
        ref={ref}
        r="45"
        stroke={"var(--primary)"}
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        fill="none"
      ></circle>
      {showText ? (
        <text
          x={"50"}
          y="50"
          textAnchor="middle"
          dominantBaseline={"middle"}
          className=" font-bold"
        >
          {scrollY.toFixed(0)}
        </text>
      ) : null}
    </svg>
  );
});

CircleProgress.displayName = "CircleProgress";
