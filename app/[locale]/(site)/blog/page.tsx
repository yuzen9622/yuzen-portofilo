import BlogHome from "@/feature/blog";
import type { Metadata } from "next";

const SITE_URL = "https://2026.yuzen.dev";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "部落格",
    description:
      "Yuzen 的技術部落格，分享前端開發、後端技術、軟體工程最佳實踐與學習心得。涵蓋 React、Next.js、TypeScript 等主題。",
    alternates: {
      canonical: `${SITE_URL}/blog`,
      languages: {
        en: `${SITE_URL}/en/blog`,
        "zh-Hant": `${SITE_URL}/zh-Hant/blog`,
      },
    },
    openGraph: {
      title: "Yuzen 的技術部落格",
      description: "分享前端開發、後端技術、軟體工程最佳實踐與學習心得。",
      url: `${SITE_URL}/blog`,
      siteName: "Yuzen Portfolio",
      images: [
        {
          url: `${SITE_URL}/avatar.webp`,
          width: 512,
          height: 512,
          alt: "Yuzen Blog",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Yuzen 的技術部落格",
      description: "分享前端開發、後端技術、軟體工程最佳實踐與學習心得。",
      images: [`${SITE_URL}/avatar.webp`],
    },
  };
}
export default function Page() {
  return <BlogHome />;
}
