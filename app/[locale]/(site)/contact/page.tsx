import Contact from "@/feature/home/section/contact";
import React from "react";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Yuzen - Contact",
    description:
      "Welcome to the portfolio of Yuzen, showcasing projects and skills.",
    openGraph: {
      title: "Yuzen - Contact",
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
  return <Contact />;
}
