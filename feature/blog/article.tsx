"use client";

import Image from "next/image";
import { getFallbackSrc } from "./service/util";

import useArticle from "./hooks/use-article";
import ArticleEmpty from "./components/article-empty";
import ArticleLoading from "./components/article-loading";
import { Badge } from "@/components/ui/badge";
import ArticleMarkdown from "./components/article-markdown";
import { motion } from "framer-motion";

export default function Article({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}) {
  const { data, error, isLoading } = useArticle(slug, locale);

  const publishedAt = data?.publishedAt ? new Date(data.publishedAt) : null;

  return (
    <div className="w-full max-w-7xl mx-auto border-x-2 border-b-2  py-8">
      {!isLoading && (!data || error) && <ArticleEmpty />}

      {data && !error && (
        <article className="space-y-8">
          <header className="space-y-4">
            <motion.div
              layoutId={`blog-image-${data.slug}`}
              className="relative w-full h-72 md:h-112 overflow-hidden  mb-6"
            >
              <Image
                src={getFallbackSrc(data.cover?.formats)}
                alt={data.title}
                width={1000}
                height={1000}
                className="absolute inset-0 h-full w-full object-cover object-bottom"
              />

              <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/35 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
                <motion.h1
                  className="text-3xl md:text-5xl font-extrabold leading-tight"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {data.title}
                </motion.h1>

                <motion.p
                  className="mt-3 max-w-2xl text-sm md:text-lg font-semibold text-muted-foreground"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 }}
                >
                  {data.description}
                </motion.p>
              </div>
            </motion.div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground px-4">
              {data.author?.name && <span>By {data.author.name}</span>}
              {publishedAt && (
                <span>
                  {publishedAt.toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
              {data.categories?.length > 0 && (
                <span className="flex flex-wrap gap-2">
                  {data.categories.map((category) => (
                    <Badge key={category.name} className="px-3 py-1">
                      {category.name}
                    </Badge>
                  ))}
                </span>
              )}
            </div>
          </header>
          {data && (
            <div className="space-y-4 px-4">
              <ArticleMarkdown>{data.content}</ArticleMarkdown>
            </div>
          )}
        </article>
      )}
      {!data && isLoading && <ArticleLoading />}
    </div>
  );
}
