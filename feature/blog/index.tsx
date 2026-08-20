"use client";

import { SectionLayout } from "../home/components/section-layout";
import { useParams } from "next/navigation";
import { useBlogLoader } from "./hooks/use-blog";
import BlogCard from "./components/blog-card";
import BlogSearch from "./components/blog-search";
import { useCallback, useMemo, useState } from "react";
import BlogEmpty from "./components/blog-empty";
import BlogLoading from "./components/blog-loading";
import { motion, useReducedMotion } from "framer-motion";

export default function BlogHome() {
  const { locale } = useParams<{ locale: string }>();
  const { posts, loading, error, getFallbackSrc } = useBlogLoader(locale);
  const [search, setSearch] = useState("");
  const [publishedOnly, setPublishedOnly] = useState(true);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const handleResetFilters = useCallback(() => {
    setSearch("");
    setSelectedTag(null);
    setPublishedOnly(true);
    setSortOrder("newest");
  }, []);

  const allTags = useMemo(() => {
    if (!posts) return [];
    const tags = new Set<string>();
    posts.forEach((post) =>
      post.categories?.forEach((category) => tags.add(category.name)),
    );
    return Array.from(tags);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const list = (posts ?? []).filter((post) => {
      const matchesSearch =
        post.title?.toLowerCase().includes(search.toLowerCase()) ||
        post.description?.toLowerCase().includes(search.toLowerCase());
      const matchesTag =
        !selectedTag ||
        post.categories?.some((category) => category.name === selectedTag);
      const matchesPublished = !publishedOnly || post.isPublished;
      return matchesSearch && matchesTag && matchesPublished;
    });

    return list.slice().sort((a, b) => {
      const aTime = Date.parse(a.publishedAt ?? "") || 0;
      const bTime = Date.parse(b.publishedAt ?? "") || 0;
      return sortOrder === "newest" ? bTime - aTime : aTime - bTime;
    });
  }, [posts, search, selectedTag, publishedOnly, sortOrder]);

  return (
    <SectionLayout
      id="blog"
      leftContent="my Blog"
      rightContent="Write.Thinking."
    >
      {/* Editorial Title Header */}
      <div className="w-11/12 max-w-7xl mx-auto border-x border-b py-10 md:py-14 px-6 md:px-8 font-inter">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-mono">
              JOURNAL & INSIGHTS
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              ARTICLES
            </h1>
          </div>
          <p className="text-sm md:text-base text-muted-foreground max-w-md leading-relaxed">
            紀錄前端架構、AI 系統、後端工程與軟體開發的實踐心得與深度技術探索。
          </p>
        </motion.div>
      </div>

      {/* Search & Filter Toolbar */}
      <BlogSearch
        search={search}
        setSearch={setSearch}
        publishedOnly={publishedOnly}
        setPublishedOnly={setPublishedOnly}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        allTags={allTags}
        totalResults={filteredPosts.length}
      />

      {/* Loading Skeleton */}
      {loading && <BlogLoading />}

      {/* Error Message */}
      {error && (
        <div className="w-11/12 max-w-7xl mx-auto border-x border-b py-16 text-center text-destructive">
          <p>載入文章時發生錯誤: {error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredPosts && filteredPosts.length === 0 && (
        <BlogEmpty onReset={handleResetFilters} />
      )}

      {/* Articles Grid */}
      {!loading && filteredPosts && filteredPosts.length > 0 && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-11/12 max-w-7xl mx-auto border-x border-b divide-y md:divide-y-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredPosts.map((post, idx) => (
            <BlogCard
              post={post}
              index={idx}
              getFallbackSrc={getFallbackSrc}
              locale={locale}
              key={post.slug}
            />
          ))}
        </motion.div>
      )}
    </SectionLayout>
  );
}

