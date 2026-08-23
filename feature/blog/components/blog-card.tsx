"use client";

import type { Article } from "../types/blog";
import { Link } from "@/i18n/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Clock } from "lucide-react";
import { estimateReadingTime, formatBlogDate } from "../service/util";
import { useTranslations } from "next-intl";

export default function BlogCard({
  post,
  index = 0,
  locale = "zh-Hant",
}: {
  post: Article;
  index?: number;
  locale?: string;
}) {
  const router = useRouter();
  const t = useTranslations("BlogPage");
  const readingTime = estimateReadingTime(post.content || post.description);
  const formattedDate = formatBlogDate(post.publishedAt, locale);
  const reduceMotion = useReducedMotion();
  const entryDelay = Math.min(index, 5) * 0.05;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.32, delay: entryDelay, ease: "easeOut" }
      }
      className="border-b border-border last:border-b-0"
    >
      <Link
        onMouseEnter={() => router.prefetch(`blog/${post.slug}`)}
        href={`blog/${post.slug}`}
        prefetch={true}
        data-cursor-text="READ"
        className="group relative block min-h-11 overflow-hidden px-5 py-6 font-inter transition-colors duration-200 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:px-7 sm:py-7 md:px-8 md:py-8"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-start md:gap-x-6 lg:gap-x-8">
          <div className="flex min-w-0 items-start gap-4 md:col-span-3 md:flex-col md:gap-3 lg:col-span-2">
            <span className="font-mono text-2xl font-medium tabular-nums text-foreground sm:text-3xl">
              {`${index + 1}`.padStart(2, "0")}
            </span>

            <div className="min-w-0 space-y-1 text-xs leading-relaxed">
              {formattedDate && (
                <time
                  dateTime={post.publishedAt}
                  className="block font-mono tabular-nums text-muted-foreground"
                >
                  {formattedDate}
                </time>
              )}
              {post.categories?.[0] && (
                <span className="block truncate font-mono uppercase tracking-[0.14em] text-foreground/80">
                  {post.categories[0].name}
                </span>
              )}
            </div>
          </div>

          <div className="min-w-0 md:col-span-6 lg:col-span-7">
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              <span className="border-b border-transparent pb-1 transition-colors duration-200 group-hover:border-foreground group-hover:text-primary group-focus-visible:border-foreground group-focus-visible:text-primary">
                {post.title}
              </span>
            </h2>
            {post.description && (
              <p className="mt-3 max-w-2xl break-words text-sm leading-relaxed text-muted-foreground sm:text-base">
                {post.description}
              </p>
            )}
          </div>

          <div className="flex min-w-0 items-center justify-between gap-4 border-t border-border/60 pt-4 text-xs md:col-span-3 md:min-h-full md:flex-col md:items-end md:justify-between md:border-t-0 md:pt-0 lg:col-span-3">
            <div className="space-y-1.5 text-muted-foreground md:text-right">
              <span className="flex items-center gap-1.5 font-mono tabular-nums md:justify-end">
                <Clock size={13} aria-hidden="true" />
                {readingTime} {t("minRead")}
              </span>
              <span className="block truncate font-medium text-foreground/80">
                {post.author?.name || "Yuzen"}
              </span>
            </div>

            <span className="inline-flex shrink-0 items-center gap-1.5 font-medium text-foreground transition-colors duration-200 group-hover:text-primary group-focus-visible:text-primary">
              <span>{t("readMore")}</span>
              <ArrowUpRight
                size={15}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5"
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
