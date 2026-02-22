import type { MetadataRoute } from "next";

const SITE_URL = "https://2026.yuzen.dev";
const locales = ["en", "zh-Hant"];

type Article = {
  slug: string;
  publishedAt: string;
};

async function fetchArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${SITE_URL}/api/articles?lng=zh-Hant`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data ?? data) as Article[];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await fetchArticles();

  // Static pages
  const staticPages = ["", "/about", "/blog", "/projects", "/contact"];

  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency:
        page === "/blog" ? ("daily" as const) : ("weekly" as const),
      priority: page === "" ? 1.0 : 0.8,
    })),
  );

  // Blog article pages
  const blogEntries: MetadataRoute.Sitemap = articles.flatMap((article) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/blog/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  );

  return [...staticEntries, ...blogEntries];
}
