import ArticlePage from "@/feature/blog/article";
import type { Metadata } from "next";
import { getFallbackSrc } from "@/feature/blog/service/util";
import type { Article } from "@/feature/blog/types/blog";
import JsonLd from "@/shared/components/json-ld";

const SITE_URL = "https://2026.yuzen.dev";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const res = await fetch(`${baseUrl}/api/articles/${slug}?lng=${locale}`, {
    next: { revalidate: 60 },
  });
  const data: Article = await res.json();
  const imageUrl = getFallbackSrc(data.cover?.formats);
  const articleUrl = `${SITE_URL}/${locale}/blog/${slug}`;

  return {
    title: data.title,
    description:
      data.description || "Yuzen 的技術部落格文章，分享開發經驗與技術心得。",
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
      languages: {
        en: `${SITE_URL}/en/blog/${slug}`,
        "zh-Hant": `${SITE_URL}/zh-Hant/blog/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: data.title,
      description:
        data.description || "Yuzen 的技術部落格文章，分享開發經驗與技術心得。",
      url: articleUrl,
      siteName: "Yuzen Blog",
      publishedTime: data.publishedAt,
      authors: [data.author?.name ?? "Yuzen"],
      tags: data.categories?.map((cat) => cat.name) ?? [],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description:
        data.description || "Yuzen 的技術部落格文章，分享開發經驗與技術心得。",
      images: [imageUrl],
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  let articleJsonLd = null;

  try {
    const res = await fetch(`${baseUrl}/api/articles/${slug}?lng=${locale}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data: Article = await res.json();
      articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: data.title,
        description: data.description,
        image: getFallbackSrc(data.cover?.formats),
        datePublished: data.publishedAt,
        author: {
          "@type": "Person",
          name: data.author?.name ?? "Yuzen",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Person",
          name: "Yuzen",
          url: SITE_URL,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SITE_URL}/${locale}/blog/${slug}`,
        },
        keywords: data.categories?.map((cat) => cat.name).join(", "),
      };
    }
  } catch {
    // silently fail - article will still render
  }

  return (
    <>
      {articleJsonLd && <JsonLd data={articleJsonLd} />}
      <ArticlePage slug={slug} locale={locale} />
    </>
  );
}
