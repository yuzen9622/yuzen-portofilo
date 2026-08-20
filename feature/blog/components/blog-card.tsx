"use client";
import Image from "next/image";
import { Article, ImgResponse } from "../types/blog";
import { Link } from "@/i18n/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Clock } from "lucide-react";
import { estimateReadingTime, formatBlogDate } from "../service/util";
import { useTranslations } from "next-intl";

export default function BlogCard({
  post,
  index = 0,
  getFallbackSrc,
  locale = "zh-Hant",
}: {
  post: Article;
  index?: number;
  getFallbackSrc: (formats?: ImgResponse) => string;
  locale?: string;
}) {
  const router = useRouter();
  const t = useTranslations("BlogPage");
  const readingTime = estimateReadingTime(post.content || post.description);
  const formattedDate = formatBlogDate(post.publishedAt, locale);
  const reduceMotion = useReducedMotion();

  return (
    <Link
      onMouseEnter={() => router.prefetch(`blog/${post.slug}`)}
      href={`blog/${post.slug}`}
      prefetch={true}
      data-cursor-text="READ"
      className="group relative flex flex-col justify-between p-6 sm:p-7 border-b border-r border-border hover:bg-muted/20 transition-colors font-inter overflow-hidden"
    >
      <div className="space-y-4">
        {/* Cover Image Container */}
        <div className="relative overflow-hidden rounded-2xl bg-muted/40 aspect-video w-full">
          <motion.div
            layoutId={`blog-image-${post.slug}`}
            className="w-full h-full"
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 300, damping: 30 }
            }
          >
            <Image
              width={800}
              height={450}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              src={getFallbackSrc(post.cover?.formats)}
              alt={post.title}
              loading="lazy"
            />
          </motion.div>

          {/* Category Tag on Top of Image */}
          {post.categories?.[0] && (
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center rounded-full bg-background/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-foreground border border-border/60 shadow-xs">
                {post.categories[0].name}
              </span>
            </div>
          )}
        </div>

        {/* Metadata Line */}
        {formattedDate && (
          <div className="text-xs text-muted-foreground pt-1 font-mono tabular-nums">
            {formattedDate}
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h2>

        {/* Description */}
        <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
          {post.description}
        </p>
      </div>

      {/* Card Footer */}
      <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          {post.author?.name ? (
            <span className="font-medium text-foreground/80">
              {post.author.name}
            </span>
          ) : (
            <span className="font-medium text-foreground/80">Yuzen</span>
          )}
        </div>

        <div className="inline-flex items-center gap-1 text-primary font-medium group-hover:underline underline-offset-4">
          <span>{t("readMore")}</span>
          <ArrowUpRight
            size={14}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
          />
        </div>
      </div>

      {/* Index Watermark */}
      <div className="absolute bottom-2 right-4 text-7xl font-inter font-extrabold text-foreground/[0.03] select-none pointer-events-none tabular-nums group-hover:text-foreground/[0.06] transition-colors">
        {`${index + 1}`.padStart(2, "0")}
      </div>
    </Link>
  );
}

