"use client";
import { Button } from "@/components/ui/button";
import LangSwitch from "@/shared/components/lang-switch";
import useTheme from "@/shared/hooks/use-theme";
import { ChevronLeftIcon, MoonIcon, Share2, SunIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion, useScroll, useSpring } from "framer-motion";

import { toast } from "sonner";
import { shareArticle } from "../service/util";

export default function ArticleNavbar() {
  const { isDark, toggleTheme } = useTheme();
  const t = useTranslations("BlogPage");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleShare = () => {
    shareArticle({
      onSuccess: () => toast.success(t("linkCopied")),
      onError: () => toast.error("無法複製連結，請手動複製網址"),
    });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border/50 font-inter">
      <div className="w-11/12 max-w-7xl mx-auto h-16 flex items-center justify-between gap-4">
        {/* Left: Back Link */}
        <Link href="/blog" className="group">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 px-3 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground gap-1.5 transition-colors"
          >
            <ChevronLeftIcon
              size={15}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            <span>{t("backToBlog")}</span>
          </Button>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Native Share Button */}
          <button
            type="button"
            onClick={handleShare}
            aria-label={t("shareArticle")}
            className="size-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <Share2 size={16} />
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={(event) => toggleTheme(event)}
            aria-label="Toggle theme"
            className="size-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
          >
            {isDark ? (
              <SunIcon suppressHydrationWarning size={16} />
            ) : (
              <MoonIcon suppressHydrationWarning size={16} />
            )}
          </button>

          {/* Language Switch */}
          <LangSwitch />
        </div>
      </div>

      {/* Reading Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="h-[2px] bg-primary origin-left w-full"
      />
    </header>
  );
}

