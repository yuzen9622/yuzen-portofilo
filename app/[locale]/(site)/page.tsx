import About from "@/feature/home/section/about";
import Contact from "@/feature/home/section/contact";
import Hero from "@/feature/home/section/hero";
import Project from "@/feature/home/section/project";
import JsonLd from "@/shared/components/json-ld";
import type { Metadata } from "next";

const SITE_URL = "https://2026.yuzen.dev";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Yuzen - Full Stack Developer Portfolio",
    description:
      "歡迎來到 Yuzen 的作品集，探索全端開發專案、技術文章與開發經驗分享。精通 React、Next.js、TypeScript 等現代網頁技術。",
    alternates: {
      canonical: SITE_URL,
      languages: { en: `${SITE_URL}/en`, "zh-Hant": `${SITE_URL}/zh-Hant` },
    },
    openGraph: {
      title: "Yuzen - Full Stack Developer Portfolio",
      description:
        "歡迎來到 Yuzen 的作品集，探索全端開發專案、技術文章與開發經驗分享。",
      url: SITE_URL,
      siteName: "Yuzen Portfolio",
      images: [
        {
          url: `${SITE_URL}/avatar.webp`,
          width: 512,
          height: 512,
          alt: "Yuzen Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Yuzen - Full Stack Developer Portfolio",
      description:
        "歡迎來到 Yuzen 的作品集，探索全端開發專案、技術文章與開發經驗分享。",
      images: [`${SITE_URL}/avatar.webp`],
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yuzen",
  url: SITE_URL,
  image: `${SITE_URL}/avatar.webp`,
  jobTitle: "Full Stack Developer",
  sameAs: [],
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
    "Full Stack Development",
  ],
};
export default function Home() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero />
      <About />
      <Project />
      <Contact />
    </>
  );
}
