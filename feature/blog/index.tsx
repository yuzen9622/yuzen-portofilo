"use client";

import { SectionLayout } from "../home/components/section-layout";
import { useParams } from "next/navigation";
import { useBlogLoader } from "./hooks/use-blog";

import BlogCard from "./components/blog-card";
import BlogSearch from "./components/blog-search";
import { useMemo, useState } from "react";
import BlogEmpty from "./components/blog-empty";
import BlogLoading from "./components/blog-loading";

export default function BlogHome() {
  const { locale } = useParams<{ locale: string }>();
  const { posts, loading, error, getFallbackSrc } = useBlogLoader(locale);
  const [search, setSearch] = useState("");
  const [publishedOnly, setPublishedOnly] = useState(true);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    if (!posts) return [];
    const tags = new Set<string>();
    posts.forEach((post) =>
      post.categories.forEach((category) => tags.add(category.name)),
    );
    return Array.from(tags);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const list = (posts ?? []).filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase());
      const matchesTag =
        !selectedTag ||
        post.categories.some((category) => category.name === selectedTag);
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
      />

      {loading && <BlogLoading />}
      {error && <p>Error loading blog posts: {error}</p>}
      {!loading && filteredPosts && filteredPosts.length === 0 && <BlogEmpty />}

      {filteredPosts && filteredPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l-2 max-w-11/12  w-7xl mx-auto ">
          {filteredPosts.map((post) => (
            <BlogCard
              post={post}
              getFallbackSrc={getFallbackSrc}
              key={post.slug}
            />
          ))}
        </div>
      )}
    </SectionLayout>
  );
}
