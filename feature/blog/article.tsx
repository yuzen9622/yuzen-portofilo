"use client";

import Image from "next/image";
import {
  formatBlogDate,
  extractHeadings,
  getFallbackSrc,
  shareArticle,
} from "./service/util";
import useArticle from "./hooks/use-article";
import ArticleEmpty from "./components/article-empty";
import ArticleLoading from "./components/article-loading";
import ArticleMarkdown from "./components/article-markdown";
import ArticleToc from "./components/article-toc";
import { useBlogStore } from "./store/blog-store";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Calendar, Share2, Tag } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function Article({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}) {
  const { data, error, isLoading } = useArticle(slug, locale);
  const { posts } = useBlogStore();
  const t = useTranslations("BlogPage");
  const reduceMotion = useReducedMotion();

  if (isLoading && !data) {
    return <ArticleLoading />;
  }

  if (!isLoading && (!data || error)) {
    return <ArticleEmpty />;
  }

  if (!data) return null;

  const formattedDate = formatBlogDate(data.publishedAt, locale);
  const headings = extractHeadings(data.content);

  // Prev & Next article navigation
  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex >= 0 && currentIndex < posts.length - 1
      ? posts[currentIndex + 1]
      : null;

  return (
    <div className="w-11/12 max-w-7xl mx-auto border-x border-b font-inter pt-20 md:pt-24 pb-16">
      <article className="px-4 sm:px-6 md:px-10">
        {/* Header Hero Section */}
        <header className="max-w-4xl space-y-6 pb-8 md:pb-12">
          {/* Category Tag Row */}
          {data.categories?.[0] && (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium border border-primary/20">
                {data.categories[0].name}
              </span>
            </div>
          )}

          {/* Article Title */}
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance leading-[1.12]"
          >
            {data.title}
          </motion.h1>

          {/* Description Excerpt */}
          {data.description && (
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed border-l-2 border-primary/40 pl-4 py-1"
            >
              {data.description}
            </motion.p>
          )}

          {/* Meta Info Bar */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs text-muted-foreground border-t border-border/50"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">
                {data.author?.name || "Yuzen"}
              </span>
            </div>
            {formattedDate && (
              <div className="flex items-center gap-1.5 font-mono tabular-nums">
                <Calendar size={13} className="opacity-70" />
                <span>{formattedDate}</span>
              </div>
            )}
          </motion.div>
        </header>

        {/* Cover Image Banner (Retaining layoutId transition) */}
        <div className="relative w-full aspect-video md:aspect-21/9 overflow-hidden rounded-2xl md:rounded-3xl border border-border/60 bg-muted/30 mb-10 shadow-xs">
          <motion.div
            layoutId={`blog-image-${data.slug}`}
            className="w-full h-full"
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 300, damping: 30 }
            }
          >
            <Image
              src={getFallbackSrc(data.cover?.formats)}
              alt={data.title}
              width={1600}
              height={900}
              priority
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Article Body & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] xl:grid-cols-[1fr_300px] gap-10 xl:gap-14 items-start">
          {/* Main Article Content */}
          <div className="min-w-0 max-w-full">
            <ArticleMarkdown>{data.content}</ArticleMarkdown>

            {/* Article Categories & Share Footer */}
            <div className="mt-12 pt-6 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
              {data.categories && data.categories.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2">
                  <Tag size={14} className="text-muted-foreground mr-1" />
                  {data.categories.map((category) => (
                    <span
                      key={category.name}
                      className="inline-flex items-center text-xs font-medium px-3 py-1 rounded-full bg-muted/60 text-muted-foreground border border-border/60"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              ) : (
                <div />
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  shareArticle({
                    title: data.title,
                    text: data.description || data.title,
                    onSuccess: () => toast.success(t("linkCopied")),
                    onError: () => toast.error("無法複製連結，請手動複製網址"),
                  })
                }
                className="rounded-full gap-2 text-xs font-medium cursor-pointer"
              >
                <Share2 size={13} />
                <span>{t("shareArticle")}</span>
              </Button>
            </div>

            {/* Previous & Next Post Navigation */}
            {(prevPost || nextPost) && (
              <div className="mt-12 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="group flex flex-col justify-between p-4 rounded-xl border border-border/70 hover:border-primary/50 hover:bg-muted/20 transition-all text-left"
                  >
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                      <ArrowLeft size={12} />
                      {t("prevArticle")}
                    </span>
                    <span className="mt-2 text-sm font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                      {prevPost.title}
                    </span>
                  </Link>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="group flex flex-col justify-between p-4 rounded-xl border border-border/70 hover:border-primary/50 hover:bg-muted/20 transition-all text-right sm:text-right"
                  >
                    <span className="text-[11px] uppercase tracking-wider text-muted-foreground flex items-center justify-end gap-1 group-hover:text-primary transition-colors">
                      {t("nextArticle")}
                      <ArrowRight size={12} />
                    </span>
                    <span className="mt-2 text-sm font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                      {nextPost.title}
                    </span>
                  </Link>
                ) : (
                  <div className="hidden sm:block" />
                )}
              </div>
            )}
          </div>

          {/* Sticky Table of Contents (Desktop) */}
          <ArticleToc headings={headings} />
        </div>
      </article>
    </div>
  );
}

