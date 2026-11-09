"use client";

import type { Article } from "../types/blog";
import { Link } from "@/i18n/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { formatBlogDate } from "../service/util";
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
          <div className="flex min-w-0 flex-wrap items-center gap-2.5 md:col-span-3 md:flex-col md:items-start md:gap-2 lg:col-span-2 md:pt-1">
            {formattedDate && (
              <time
                dateTime={post.publishedAt}
                className="font-mono text-sm font-semibold tabular-nums text-foreground/90 sm:text-base"
              >
                {formattedDate}
              </time>
            )}
            {post.categories?.[0] && (
              <span className="inline-flex items-center rounded-full bg-secondary/80 px-2.5 py-0.5 font-mono text-[11px] font-medium tracking-wide text-secondary-foreground border border-border/60">
                {post.categories[0].name}
              </span>
            )}
          </div>

          <div className="min-w-0 md:col-span-6 lg:col-span-8">
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              <span className="relative inline-block max-w-full pb-1 transition-colors duration-200 group-hover:text-primary group-focus-visible:text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 after:ease-out after:content-[''] group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100 motion-reduce:after:transition-none">
                {post.title}
              </span>
            </h2>
            {post.description && (
              <p className="mt-3 max-w-2xl break-words text-sm leading-relaxed text-muted-foreground sm:text-base">
                {post.description}
              </p>
            )}
          </div>

          <div className="flex min-w-0 items-center justify-between gap-4 border-t border-border/60 pt-4 text-xs md:col-span-3 md:min-h-full md:self-stretch md:flex-col md:items-end md:justify-between md:border-t-0 md:pt-1 lg:col-span-2">
            <div className="text-muted-foreground md:text-right">
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
