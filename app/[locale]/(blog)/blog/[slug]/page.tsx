import ArticlePage from "@/feature/blog/article";
import type { Metadata } from "next";
import { getFallbackSrc } from "@/feature/blog/service/util";
import type { Article } from "@/feature/blog/types/blog";
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

  return {
    title: data.title,
    description:
      data.description ||
      "Welcome to the portfolio of Yuzen, showcasing projects and skills.",
    openGraph: {
      title: data.title,
      description:
        data.description ||
        "Welcome to the portfolio of Yuzen, showcasing projects and skills.",
      url: `https://2026.yuzen.dev/blog/${slug}`,
      siteName: "Yuzen - Portfolio",
      images: [
        {
          url: getFallbackSrc(data.cover?.formats),
        },
      ],
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  return <ArticlePage slug={slug} locale={locale} />;
}
