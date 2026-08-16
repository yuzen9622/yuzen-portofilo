"use client";
import { useEffect, useState } from "react";

const CHARSET = "!<>-_\\/[]{}—=+*^?#0123456789";

type GlitchTextProps = {
  text: string;
  className?: string;
  /** Decode 階段總時長（ms），結束後進入 CSS glitch 循環 */
  decodeDuration?: number;
};

/**
 * 字符 Decode → Glitch 效果：進場時以亂碼逐字解碼成目標文字，
 * 解碼完成後套用 CSS glitch（::before/::after 切片抖動，見 globals.css）。
 * prefers-reduced-motion 時直接顯示靜態文字。
 */
export default function GlitchText({
  text,
  className = "",
  decodeDuration = 900,
}: GlitchTextProps) {
  const [display, setDisplay] = useState(text);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // 排程回呼內 setState，避免 effect body 內同步 setState（lint rule）
      const id = window.setTimeout(() => setSettled(true), 0);
      return () => window.clearTimeout(id);
    }

    let frame = 0;
    const totalFrames = Math.max(1, Math.round(decodeDuration / 40));
    const id = window.setInterval(() => {
      frame += 1;
      const progress = frame / totalFrames;
      const next = text
        .split("")
        .map((char, index) => {
          if (char === " ") return char;
          if (index / text.length < progress) return char;
          return CHARSET[Math.floor(Math.random() * CHARSET.length)];
        })
        .join("");
      setDisplay(next);
      if (frame >= totalFrames) {
        setDisplay(text);
        setSettled(true);
        window.clearInterval(id);
      }
    }, 40);

    return () => window.clearInterval(id);
  }, [text, decodeDuration]);

  return (
    <span
      className={`relative inline-block ${settled ? "glitch" : ""} ${className}`}
      data-text={settled ? text : undefined}
      aria-label={text}
    >
      <span aria-hidden>{display}</span>
    </span>
  );
}
