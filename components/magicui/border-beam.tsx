"use client";

import { cn } from "@/shared/lib/utils";
import React from "react";

export interface BorderBeamProps {
        className?: string;
        size?: number;
        duration?: number;
        borderWidth?: number;
        anchor?: number;
        colorFrom?: string;
        colorTo?: string;
        delay?: number;
}

export function BorderBeam({
        className,
        size = 250,
        duration = 12,
        anchor = 90,
        borderWidth = 1,
        colorFrom = "var(--primary)",
        colorTo = "transparent",
        delay = 0,
}: BorderBeamProps) {
        return (
                <div
                        style={
                                {
                                        "--size": size,
                                        "--duration": duration,
                                        "--anchor": anchor,
                                        "--border-width": borderWidth,
                                        "--color-from": colorFrom,
                                        "--color-to": colorTo,
                                        "--delay": `-${delay}s`,
                                } as React.CSSProperties
                        }
                        className={cn(
                                "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
                                "![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
                                "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[animation-duration:calc(var(--duration)*1s)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
                                className,
                        )}
                />
        );
}
