import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "blog-cms.zeabur.app" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/requests.ts");
export default withNextIntl(nextConfig);
