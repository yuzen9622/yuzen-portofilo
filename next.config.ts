import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "blog-cms.zeabur.app" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "www.nangong5421.com" },
      { protocol: "https", hostname: "twcat0503.org" },
      { protocol: "https", hostname: "justin0711.com" },
      { protocol: "https", hostname: "guatw.net" },
    ],
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/requests.ts");
export default withNextIntl(nextConfig);
