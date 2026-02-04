import About from "@/feature/home/section/about";
import Contact from "@/feature/home/section/contact";
import Hero from "@/feature/home/section/hero";
import Project from "@/feature/home/section/project";
import type { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Yuzen - Portfolio",
    description:
      "Welcome to the portfolio of Yuzen, showcasing projects and skills.",
    openGraph: {
      title: "Yuzen - Portfolio",
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
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Project />
      <Contact />
    </>
  );
}
