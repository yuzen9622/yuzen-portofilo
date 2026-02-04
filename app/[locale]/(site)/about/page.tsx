import About from "@/feature/home/section/about";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Yuzen - About",
    description:
      "Welcome to the portfolio of Yuzen, showcasing projects and skills.",
    openGraph: {
      title: "Yuzen - About",
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
  return <About />;
}
