"use client";
import { useState, useEffect } from "react";

export default function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setIsMobile(width <= 768);
      }
    });

    resizeObserver.observe(document.body);
    return () => resizeObserver.disconnect();
  }, []);

  return isMobile;
}
