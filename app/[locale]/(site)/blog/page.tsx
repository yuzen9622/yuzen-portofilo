import BlogHome from "@/feature/blog";

export const dynamic = "force-static";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Yuzen - Blog",
    description:
      "Welcome to the portfolio of Yuzen, showcasing projects and skills.",
    openGraph: {
      title: "Yuzen - Blog",
      description:
        "Welcome to the portfolio of Yuzen, showcasing projects and skills.",
      url: "https://2026.yuzen.dev",
      siteName: "Yuzen Portfolio",
      images: [
        {
          url: "https://2026.yuzen.dev/avatar.webp",
        },
      ],
    },
  };
}
export default function Page() {
  return <BlogHome />;
}
