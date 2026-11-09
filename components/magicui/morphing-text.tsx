"use client";

import { cn } from "@/shared/lib/utils";
import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

const morphTime = 1.5;
const cooldownTime = 0.6;

const useMorphingText = (texts: string[]) => {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(new Date());

  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current];
      if (!current1 || !current2) return;

      current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      const invertedFraction = 1 - fraction;
      current1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`;
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`;

      current1.textContent = texts[textIndexRef.current % texts.length];
      current2.textContent = texts[(textIndexRef.current + 1) % texts.length];
    },
    [texts],
  );

  const doMorph = useCallback(() => {
    // `animate` already advances the frame clock. Consume the negative cooldown
    // delta here so the morph progresses once per frame instead of almost 0ms.
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;

    let fraction = morphRef.current / morphTime;

    if (fraction > 1) {
      cooldownRef.current = cooldownTime;
      fraction = 1;
    }

    setStyles(fraction);

    if (fraction === 1) {
      textIndexRef.current++;
    }
  }, [setStyles]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const [current1, current2] = [text1Ref.current, text2Ref.current];
    if (!current1 || !current2) return;

    current2.style.filter = "none";
    current2.style.opacity = "100%";

    current1.style.filter = "none";
    current1.style.opacity = "0%";
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      if (text1Ref.current) {
        text1Ref.current.textContent = texts[0] || "";
        text1Ref.current.style.opacity = "100%";
        text1Ref.current.style.filter = "none";
      }
      if (text2Ref.current) {
        text2Ref.current.style.opacity = "0%";
      }
      return;
    }

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const newTime = new Date();
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
      timeRef.current = newTime;

      cooldownRef.current -= dt;

      if (cooldownRef.current <= 0) {
        doMorph();
      } else {
        doCooldown();
      }
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [doMorph, doCooldown, reduceMotion, texts]);

  return { text1Ref, text2Ref };
};

export interface MorphingTextProps {
  className?: string;
  texts: string[];
}

export function MorphingText({ className, texts }: MorphingTextProps) {
  const { text1Ref, text2Ref } = useMorphingText(texts);

  return (
    <div
      className={cn(
        "relative mx-auto w-full text-center font-bold leading-none select-none [filter:url(#threshold)_blur(0.6px)]",
        className,
      )}
    >
      {/* Invisible placeholder to establish natural height & baseline layout */}
      <span
        aria-hidden="true"
        className="invisible inline-block select-none whitespace-nowrap pointer-events-none"
      >
        {texts[0] || "YUZEN"}
      </span>

      <span
        className="absolute inset-0 m-auto flex items-center justify-center w-full whitespace-nowrap"
        ref={text1Ref}
      />
      <span
        className="absolute inset-0 m-auto flex items-center justify-center w-full whitespace-nowrap"
        ref={text2Ref}
      />

      <svg id="morphing-filters" className="fixed h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="threshold" x="-50%" y="-50%" width="200%" height="200%">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
