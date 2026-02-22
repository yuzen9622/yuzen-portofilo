import Contact from "@/feature/home/section/contact";
import React from "react";
import type { Metadata } from "next";

const SITE_URL = "https://2026.yuzen.dev";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "聯絡我",
    description:
      "有專案合作、技術諮詢或任何問題？歡迎透過此頁面聯絡 Yuzen，期待與您交流！",
    alternates: {
      canonical: `${SITE_URL}/contact`,
      languages: {
        en: `${SITE_URL}/en/contact`,
        "zh-Hant": `${SITE_URL}/zh-Hant/contact`,
      },
    },
    openGraph: {
      title: "聯絡 Yuzen",
      description: "有專案合作、技術諮詢或任何問題？歡迎透過此頁面聯絡 Yuzen。",
      url: `${SITE_URL}/contact`,
      siteName: "Yuzen Portfolio",
      images: [
        {
          url: `${SITE_URL}/avatar.webp`,
          width: 512,
          height: 512,
          alt: "Contact Yuzen",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: "聯絡 Yuzen",
      description: "有專案合作、技術諮詢或任何問題？歡迎透過此頁面聯絡 Yuzen。",
      images: [`${SITE_URL}/avatar.webp`],
    },
  };
}
export default function Page() {
  return <Contact />;
}
