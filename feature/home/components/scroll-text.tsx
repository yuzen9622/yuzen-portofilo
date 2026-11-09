"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useMemo, useRef } from "react";

// CJK ideographs reveal one by one; Latin runs reveal per word. A regex (not
// Intl.Segmenter) keeps server and browser output identical for hydration.
const TOKEN = /[㐀-鿿豈-﫿]|[^\s㐀-鿿豈-﫿]+|\s+/g;
function segment(text: string) {
  return text.match(TOKEN) ?? [];
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block whitespace-pre">
      {children}
    </motion.span>
  );
}

/** Paragraph that lights up word by word as it scrolls through the viewport. */
export default function ScrollText({
  text = "",
  className,
}: {
  text?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  // tokens carry their global position so each maps to its own scroll window
  const { paragraphs, total } = useMemo(() => {
    let n = 0;
    const paragraphs = text
      .split(/\n\s*\n/)
      .map((p) => segment(p.trim()).map((word) => ({ word, i: n++ })));
    return { paragraphs, total: n };
  }, [text]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {text.split(/\n\s*\n/).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      {paragraphs.map((words, pi) => (
        <p key={pi} aria-hidden>
          {words.map(({ word, i }) => {
            const start = i / total;
            // each word fades in over a short overlapping window
            const end = Math.min(1, start + 6 / total);
            return /^\s+$/.test(word) ? (
              <span key={i}>{word}</span>
            ) : (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      ))}
    </div>
  );
}
