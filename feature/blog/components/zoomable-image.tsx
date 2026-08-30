"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  LayoutGroup,
} from "framer-motion";
import { X, ZoomIn, ZoomOut } from "lucide-react";

interface ZoomableImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

const emptySubscribe = () => () => {};

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

export default function ZoomableImage({
  src,
  alt = "",
  width = 800,
  height = 600,
  className = "",
}: ZoomableImageProps) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [naturalSize, setNaturalSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const rawId = useId();
  const id = rawId.replace(/:/g, "-");
  const inlineRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Lock body scroll and listen for Escape key / window resize
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const smoothTransition = reduceMotion
    ? { duration: 0 }
    : {
        duration: 0.35,
        ease: SMOOTH_EASE,
      };

  return (
    <LayoutGroup id={`zoom-group-${id}`}>
      {/* Inline Image in Markdown Content */}
      <span
        ref={inlineRef}
        onClick={handleOpen}
        className="group relative my-6 inline-block max-w-full overflow-hidden rounded-lg cursor-zoom-in border border-border/60 bg-muted/30 transition-colors duration-200 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        role="button"
        tabIndex={0}
        aria-label={alt ? `點擊放大圖片：${alt}` : "點擊放大圖片"}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOpen();
          }
        }}
      >
        {/* Placeholder maintaining exact dimensions when zoomed */}
        {isOpen && (
          <span
            aria-hidden="true"
            className="block invisible max-w-full pointer-events-none select-none"
          >
            <Image
              src={src}
              alt=""
              width={width}
              height={height}
              unoptimized
              className="max-w-full h-auto rounded-lg"
            />
          </span>
        )}

        {/* Inline Morphing Image */}
        {!isOpen && (
          <motion.span
            layoutId={`zoom-image-${id}`}
            transition={smoothTransition}
            className="block max-w-full overflow-hidden rounded-lg"
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              unoptimized
              onLoad={(e) => {
                const img = e.currentTarget;
                if (img.naturalWidth && img.naturalHeight) {
                  setNaturalSize({
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                  });
                }
              }}
              className={`max-w-full h-auto rounded-lg transition-transform duration-200 group-hover:scale-[1.01] ${className}`}
            />
          </motion.span>
        )}

        {/* Inline Bottom Floating Capsule (Title / Zoom Hint) */}
        {!isOpen && (
          <motion.span
            layoutId={`zoom-capsule-${id}`}
            transition={smoothTransition}
            className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full  px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur-md border border-border/50 shadow-sm opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            <ZoomIn size={12} className="text-primary shrink-0" />
            <span className="max-w-[160px] truncate">{alt || "放大"}</span>
          </motion.span>
        )}
      </span>

      {/* Zoomed Overlay Portal */}
      {isMounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[99999] isolate select-none ${
              isOpen ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            {/* Backdrop with Blur */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  key={`zoom-backdrop-${id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.35,
                    ease: SMOOTH_EASE,
                  }}
                  className="fixed inset-0 bg-black/75 dark:bg-black/85 backdrop-blur-md cursor-zoom-out"
                  onClick={handleClose}
                />
              )}
            </AnimatePresence>

            {/* Centered Zoomed Image Container */}
            {isOpen && (
              <div
                className="fixed inset-0 flex items-center justify-center p-3 sm:p-6 md:p-8 pointer-events-none"
                role="dialog"
                aria-modal="true"
                aria-label={alt || "放大的圖片"}
              >
                <motion.div
                  layoutId={`zoom-image-${id}`}
                  transition={smoothTransition}
                  className="pointer-events-auto cursor-zoom-out relative flex items-center justify-center rounded-xl overflow-hidden will-change-transform"
                  onClick={handleClose}
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={naturalSize?.width || 1600}
                    height={naturalSize?.height || 1000}
                    unoptimized
                    onLoad={(e) => {
                      const img = e.currentTarget;
                      if (img.naturalWidth && img.naturalHeight) {
                        setNaturalSize({
                          width: img.naturalWidth,
                          height: img.naturalHeight,
                        });
                      }
                    }}
                    style={{
                      maxWidth: "min(94vw, 1500px)",
                      maxHeight: "86vh",
                      width: "min(94vw, 1500px)",
                      height: "auto",
                      aspectRatio: naturalSize
                        ? `${naturalSize.width} / ${naturalSize.height}`
                        : undefined,
                    }}
                    className="block object-contain rounded-xl select-none shadow-2xl"
                  />
                </motion.div>
              </div>
            )}

            {/* Centered Bottom Floating Capsule Morphed via layoutId */}
            {isOpen && (
              <div className="fixed bottom-5 inset-x-0 mx-auto w-fit max-w-[88vw] flex justify-center pointer-events-none z-20">
                <motion.div
                  layoutId={`zoom-capsule-${id}`}
                  transition={smoothTransition}
                  onClick={handleClose}
                  className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-background/90 dark:bg-neutral-900/90 backdrop-blur-md border border-border/50 text-foreground text-xs md:text-sm font-medium text-center shadow-2xl cursor-pointer hover:bg-background transition-colors"
                >
                  <ZoomOut size={13} className="text-primary shrink-0" />
                  <span className="line-clamp-1 max-w-[70vw]">
                    {alt || "點擊回到原位"}
                  </span>
                </motion.div>
              </div>
            )}

            {/* Close Button Hint */}
            <AnimatePresence>
              {isOpen && (
                <motion.button
                  key={`zoom-close-btn-${id}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.25,
                    ease: SMOOTH_EASE,
                  }}
                  onClick={handleClose}
                  aria-label="關閉放大圖片"
                  className="fixed top-5 right-5 p-2.5 rounded-full bg-background/80 dark:bg-neutral-900/80 backdrop-blur-md border border-border/50 text-muted-foreground hover:text-foreground hover:bg-background transition-colors cursor-pointer shadow-lg z-10"
                >
                  <X size={18} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>,
          document.body,
        )}
    </LayoutGroup>
  );
}
