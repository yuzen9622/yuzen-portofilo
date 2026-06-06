import About from "@/feature/home/section/about";
import type { Metadata } from "next";

const SITE_URL = "https://2026.yuzen.dev";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "關於我",
    description:
      "了解 Yuzen 的背景、技術棧與開發經歷。專注於全端網頁開發，擁有 React、Next.js、TypeScript 等技術經驗。",
    alternates: {
      canonical: `${SITE_URL}/about`,
      languages: {
        en: `${SITE_URL}/en/about`,
        "zh-Hant": `${SITE_URL}/zh-Hant/about`,
      },
    },
    openGraph: {
      title: "關於 Yuzen - Full Stack Developer",
      description: "了解 Yuzen 的背景、技術棧與開發經歷。專注於全端網頁開發。",
      url: `${SITE_URL}/about`,
      siteName: "Yuzen Portfolio",
      images: [
        {
          url: `${SITE_URL}/avatar.webp`,
          width: 512,
          height: 512,
          alt: "About Yuzen",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: "關於 Yuzen - Full Stack Developer",
      description: "了解 Yuzen 的背景、技術棧與開發經歷。專注於全端網頁開發。",
      images: [`${SITE_URL}/avatar.webp`],
    },
  };
}
export default function Page() {
  return <About />;
}
