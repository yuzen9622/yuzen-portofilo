import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yuzen Portfolio",
    short_name: "Yuzen",
    description:
      "Yuzen 的個人作品集網站，展示全端開發專案、技術部落格與專業技能。",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/avatar.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
  };
}
