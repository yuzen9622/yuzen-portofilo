"use client";

import React, { useEffect, useRef } from "react";
import { annotate } from "rough-notation";
import type {
  RoughAnnotation,
  RoughAnnotationType,
} from "rough-notation/lib/model";
import useTheme from "@/shared/hooks/use-theme";
import { cn } from "@/shared/lib/utils";

export interface RoughHighlightProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  type?: RoughAnnotationType;
  color?: string;
  darkColor?: string;
  animationDuration?: number;
  iterations?: number;
  multiline?: boolean;
  padding?: number | [number, number] | [number, number, number, number];
  triggerOnView?: boolean;
  "data-color"?: string;
}

const COLOR_PALETTES: Record<string, { light: string; dark: string }> = {
  default: {
    light: "rgba(253, 224, 71, 0.55)", // warm fluorescent yellow
    dark: "rgba(234, 179, 8, 0.32)", // glowing amber
  },
  yellow: {
    light: "rgba(253, 224, 71, 0.55)",
    dark: "rgba(234, 179, 8, 0.32)",
  },
  pink: {
    light: "rgba(244, 114, 182, 0.5)",
    dark: "rgba(236, 72, 153, 0.28)",
  },
  cyan: {
    light: "rgba(103, 232, 249, 0.5)",
    dark: "rgba(6, 182, 212, 0.28)",
  },
  blue: {
    light: "rgba(125, 211, 252, 0.5)",
    dark: "rgba(14, 165, 233, 0.28)",
  },
  green: {
    light: "rgba(134, 239, 172, 0.5)",
    dark: "rgba(34, 197, 94, 0.28)",
  },
  orange: {
    light: "rgba(253, 186, 116, 0.5)",
    dark: "rgba(249, 115, 22, 0.28)",
  },
  purple: {
    light: "rgba(216, 180, 254, 0.5)",
    dark: "rgba(168, 85, 247, 0.28)",
  },
  red: {
    light: "rgba(252, 165, 165, 0.5)",
    dark: "rgba(239, 68, 68, 0.28)",
  },
};

function resolveColorKey(className?: string, dataColor?: string): string {
  if (dataColor && COLOR_PALETTES[dataColor.toLowerCase()]) {
    return dataColor.toLowerCase();
  }

  if (className) {
    for (const key of Object.keys(COLOR_PALETTES)) {
      if (className.includes(`flexible-marker-${key}`)) {
        return key;
      }
    }
  }

  return "default";
}

export function RoughHighlight({
  children,
  type = "highlight",
  color,
  darkColor,
  animationDuration = 700,
  iterations = 2,
  multiline = true,
  padding = [1, 3],
  triggerOnView = true,
  className,
  "data-color": dataColor,
  ...props
}: RoughHighlightProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const annotationRef = useRef<RoughAnnotation | null>(null);
  const { isDark } = useTheme();

  const colorKey = resolveColorKey(className, dataColor);
  const palette = COLOR_PALETTES[colorKey] || COLOR_PALETTES.default;
  const activeColor = isDark
    ? darkColor || color || palette.dark
    : color || palette.light;

  // React to theme changes without re-animating
  useEffect(() => {
    if (annotationRef.current) {
      annotationRef.current.color = activeColor;
    }
  }, [activeColor]);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Check prefers-reduced-motion
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const annotation = annotate(el, {
      type,
      color: activeColor,
      animate: !reduceMotion,
      animationDuration,
      iterations,
      multiline,
      padding,
    });

    annotationRef.current = annotation;

    if (!triggerOnView) {
      annotation.show();
      return () => {
        annotation.remove();
        annotationRef.current = null;
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            annotation.show();
            observer.disconnect();
            break;
          }
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      annotation.remove();
      annotationRef.current = null;
    };
  }, [
    type,
    activeColor,
    animationDuration,
    iterations,
    multiline,
    padding,
    triggerOnView,
  ]);

  return (
    <mark
      ref={elementRef}
      className={cn(
        "bg-transparent text-inherit font-inherit relative inline decoration-clone",
        className,
      )}
      data-color={dataColor}
      {...props}
    >
      {children}
    </mark>
  );
}

export default RoughHighlight;
