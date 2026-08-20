"use client";

import { useEffect, useState } from "react";
import { TocItem } from "../types/blog";
import { cn } from "@/shared/lib/utils";
import { AlignLeft, ArrowUp, ListCollapse, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, useScroll } from "framer-motion";
import { toast } from "sonner";
import { shareArticle } from "../service/util";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface ArticleTocProps {
  headings: TocItem[];
}

export default function ArticleToc({ headings }: ArticleTocProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const t = useTranslations("BlogPage");

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setProgressPercent(Math.min(100, Math.round(latest * 100)));
    });
  }, [scrollYProgress]);

  useEffect(() => {
    if (!headings.length) return;

    const handleScroll = () => {
      const headingElements = headings
        .map((h) => document.getElementById(h.id))
        .filter((el): el is HTMLElement => el !== null);

      if (!headingElements.length) return;

      const scrollPosition = window.scrollY + 120;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el.offsetTop <= scrollPosition) {
          setActiveId(el.id);
          return;
        }
      }

      setActiveId(headingElements[0].id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const scrollToHeading = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShare = () => {
    shareArticle({
      onSuccess: () => toast.success(t("linkCopied")),
      onError: () => toast.error("無法複製連結，請手動複製網址"),
    });
  };

  if (!headings.length) return null;

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-full sticky top-24 self-start space-y-6 font-inter select-none">
        <div className="rounded-2xl border border-border/80 bg-background/50 backdrop-blur-md p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-border/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <div className="flex items-center gap-2">
              <AlignLeft size={14} />
              <span>{t("tableOfContents")}</span>
            </div>
            <span className="font-mono text-[11px] tabular-nums font-normal text-muted-foreground">
              {progressPercent}%
            </span>
          </div>

          <nav className="mt-4 max-h-[calc(100vh-280px)] overflow-y-auto pr-2 space-y-1 text-xs">
            {headings.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToHeading(item.id)}
                  className={cn(
                    "block w-full text-left py-1.5 px-2.5 rounded-md transition-all truncate cursor-pointer",
                    item.level === 1 && "font-medium",
                    item.level === 2 && "pl-4",
                    item.level === 3 && "pl-6 text-[11px]",
                    isActive
                      ? "bg-primary/10 text-primary font-semibold translate-x-1"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
                  )}
                  title={item.text}
                >
                  {item.text}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Desktop Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={scrollToTop}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-border/80 bg-background/50 hover:bg-muted/50 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowUp size={13} />
            <span>{t("backToTop")}</span>
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="size-10 flex items-center justify-center rounded-xl border border-border/80 bg-background/50 hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label={t("shareArticle")}
          >
            <Share2 size={14} />
          </button>
        </div>
      </aside>

      {/* Mobile Floating Bubble with shadcn Sheet */}
      <div className="fixed bottom-6 right-6 z-40 lg:hidden font-inter">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              className="relative size-13 rounded-full bg-background/90 backdrop-blur-xl border border-border shadow-xl flex items-center justify-center cursor-pointer text-foreground focus:outline-none"
              aria-label={t("tableOfContents")}
            >
              {/* Circular Progress SVG */}
              <svg className="absolute inset-0 size-full -rotate-90 pointer-events-none" viewBox="0 0 48 48">
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  className="text-muted/40 stroke-current"
                  strokeWidth="2.5"
                  fill="transparent"
                />
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  className="text-primary stroke-current transition-all duration-150"
                  strokeWidth="2.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Icon inside bubble */}
              <div className="flex flex-col items-center justify-center">
                <ListCollapse size={18} className="text-foreground" />
              </div>
            </motion.button>
          </SheetTrigger>

          <SheetContent
            side="bottom"
            className="rounded-t-3xl max-h-[82vh] border-t border-border bg-background/95 backdrop-blur-2xl p-6 font-inter z-50 flex flex-col"
          >
            {/* Drawer Drag Bar */}
            <div className="w-12 h-1 rounded-full bg-muted-foreground/30 mx-auto -mt-2 mb-2" />

            <SheetHeader className="p-0 pb-3 border-b border-border/70 flex flex-row items-center justify-between">
              <SheetTitle className="flex items-center gap-2 text-base font-semibold">
                <AlignLeft size={16} className="text-primary" />
                <span>{t("tableOfContents")}</span>
                <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-full tabular-nums font-normal">
                  {progressPercent}%
                </span>
              </SheetTitle>
            </SheetHeader>

            {/* Headings List */}
            <div className="overflow-y-auto py-3 space-y-1.5 flex-1 pr-1">
              {headings.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToHeading(item.id)}
                    className={cn(
                      "block w-full text-left py-2.5 px-3 rounded-lg text-sm transition-all truncate cursor-pointer",
                      item.level === 1 && "font-medium",
                      item.level === 2 && "pl-5 text-[13px]",
                      item.level === 3 && "pl-7 text-xs text-muted-foreground",
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-foreground hover:bg-muted/50",
                    )}
                  >
                    {item.text}
                  </button>
                );
              })}
            </div>

            {/* Footer Actions */}
            <div className="pt-3 border-t border-border/70 flex items-center gap-3">
              <button
                type="button"
                onClick={scrollToTop}
                className="flex-1 py-2.5 rounded-xl border border-border bg-muted/30 text-xs font-medium text-foreground flex items-center justify-center gap-1.5 hover:bg-muted transition-colors cursor-pointer"
              >
                <ArrowUp size={14} />
                <span>{t("backToTop")}</span>
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="flex-1 py-2.5 rounded-xl border border-border bg-muted/30 text-xs font-medium text-foreground flex items-center justify-center gap-1.5 hover:bg-muted transition-colors cursor-pointer"
              >
                <Share2 size={14} />
                <span>{t("shareArticle")}</span>
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}


