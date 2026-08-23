"use client";

import LangSwitch from "@/shared/components/lang-switch";
import useTheme from "@/shared/hooks/use-theme";
import { ChevronLeftIcon, MoonIcon, Share2, SunIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { useArticleNavigation } from "../context/article-navigation-context";
import { shareArticle } from "../service/util";

export default function ArticleNavbar() {
  const { isDark, toggleTheme } = useTheme();
  const t = useTranslations("BlogPage");
  const { openMobileToc } = useArticleNavigation();
  const reduceMotion = useReducedMotion();
  const [isBackExpanded, setIsBackExpanded] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const { scrollY, scrollYProgress } = useScroll();
  const visualProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? latest;
    const delta = latest - previous;

    if (latest <= 4) {
      setIsBackExpanded(false);
    } else if (delta <= -3) {
      setIsBackExpanded(true);
    } else if (delta >= 3) {
      setIsBackExpanded(false);
    }
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgressPercent(Math.min(100, Math.max(0, Math.round(latest * 100))));
  });

  const handleShare = () => {
    shareArticle({
      onSuccess: () => toast.success(t("linkCopied")),
      onError: () => toast.error("無法複製連結，請手動複製網址"),
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const handleProgressClick = () => {
    if (window.innerWidth < 1024) {
      openMobileToc();
      return;
    }

    scrollToTop();
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] font-inter">
      <div className="pointer-events-auto flex max-w-full items-center gap-1 overflow-hidden rounded-full border border-border/50 bg-background/80 p-1 shadow-xs backdrop-blur-xl">
        <Link
          href="/blog"
          aria-label={t("backToBlog")}
          className="group flex h-11 min-w-11 shrink-0 items-center justify-center overflow-hidden rounded-full px-3 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ChevronLeftIcon
            size={18}
            aria-hidden="true"
            className="shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:transition-none"
          />
          <AnimatePresence initial={false}>
            {isBackExpanded && (
              <motion.span
                initial={
                  reduceMotion
                    ? { opacity: 1, width: "auto", marginLeft: 6 }
                    : { opacity: 0, width: 0, marginLeft: 0 }
                }
                animate={{ opacity: 1, width: "auto", marginLeft: 6 }}
                exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.28,
                  ease: "easeOut",
                }}
                className="overflow-hidden whitespace-nowrap text-xs font-medium"
              >
                {t("backToBlog")}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        <button
          type="button"
          onClick={handleShare}
          aria-label={t("shareArticle")}
          className="flex size-11 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Share2 size={17} aria-hidden="true" />
        </button>

        <div className="flex size-11 shrink-0 items-center justify-center [&_button]:size-11 [&_button]:rounded-full [&_button]:focus-visible:outline-none [&_button]:focus-visible:ring-2 [&_button]:focus-visible:ring-ring [&_button]:focus-visible:ring-offset-2 [&_button]:focus-visible:ring-offset-background">
          <LangSwitch />
        </div>

        <button
          type="button"
          onClick={(event) => toggleTheme(event)}
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          className="flex size-11 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {isDark ? (
            <SunIcon suppressHydrationWarning size={17} aria-hidden="true" />
          ) : (
            <MoonIcon suppressHydrationWarning size={17} aria-hidden="true" />
          )}
        </button>

        <button
          type="button"
          onClick={handleProgressClick}
          aria-label={`${t("tableOfContents")} / ${t("backToTop")} (${progressPercent}%)`}
          className="relative flex size-11 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <svg
            viewBox="0 0 44 44"
            className="pointer-events-none absolute inset-0 size-full -rotate-90"
            aria-hidden="true"
          >
            <circle
              cx="22"
              cy="22"
              r="17"
              className="stroke-muted/60"
              strokeWidth="2.5"
              fill="transparent"
            />
            <motion.circle
              cx="22"
              cy="22"
              r="17"
              className="stroke-primary"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="transparent"
              style={{
                pathLength: reduceMotion ? scrollYProgress : visualProgress,
              }}
            />
          </svg>
          <span className="text-[10px] font-mono font-medium tabular-nums">
            {progressPercent}
          </span>
        </button>
      </div>
    </header>
  );
}
