import Project from "@/feature/home/section/project";
import type { Metadata } from "next";

const SITE_URL = "https://2026.yuzen.dev";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "專案作品",
    description:
      "瀏覽 Yuzen 的開發專案作品集，包含網頁應用、開源專案與個人作品。使用 React、Next.js、TypeScript 等技術打造。",
    alternates: {
      canonical: `${SITE_URL}/projects`,
      languages: {
        en: `${SITE_URL}/en/projects`,
        "zh-Hant": `${SITE_URL}/zh-Hant/projects`,
      },
    },
    openGraph: {
      title: "Yuzen 的專案作品",
      description:
        "瀏覽 Yuzen 的開發專案作品集，包含網頁應用、開源專案與個人作品。",
      url: `${SITE_URL}/projects`,
      siteName: "Yuzen Portfolio",
      images: [
        {
          url: `${SITE_URL}/avatar.webp`,
          width: 512,
          height: 512,
          alt: "Yuzen Projects",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Yuzen 的專案作品",
      description:
        "瀏覽 Yuzen 的開發專案作品集，包含網頁應用、開源專案與個人作品。",
      images: [`${SITE_URL}/avatar.webp`],
    },
  };
}
export default function Page() {
  return <Project all={true} />;
}
