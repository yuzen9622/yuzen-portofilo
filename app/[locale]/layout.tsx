import type { Metadata } from "next";
import { Geist, Geist_Mono, BBH_Bartle, Inter } from "next/font/google";
import "../globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bbhBartle = BBH_Bartle({
  variable: "--font-bbh-bartle",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const SITE_URL = "https://2026.yuzen.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yuzen - Full Stack Developer Portfolio",
    template: "%s | Yuzen",
  },
  description:
    "Yuzen 的個人作品集網站，展示全端開發專案、技術部落格與專業技能。探索網頁開發、React、Next.js 等技術內容。",
  keywords: [
    "taiwan",
    "yuzen",

    "oscar",
    "Yuzen",
    "Portfolio",
    "Full Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "宇鎮",
    "前端開發",
    "全端工程師",
    "作品集",
    "技術部落格",
  ],
  authors: [{ name: "Yuzen", url: SITE_URL }],
  creator: "Yuzen",
  publisher: "Yuzen",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: `${SITE_URL}/en`,
      "zh-Hant": `${SITE_URL}/zh-Hant`,
    },
  },
  icons: {
    icon: `${SITE_URL}/avatar.webp`,
    shortcut: `${SITE_URL}/avatar.webp`,
    apple: `${SITE_URL}/avatar.webp`,
  },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    alternateLocale: "en_US",
    title: "Yuzen - Full Stack Developer Portfolio",
    description:
      "Yuzen 的個人作品集網站，展示全端開發專案、技術部落格與專業技能。",
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
      "Yuzen 的個人作品集網站，展示全端開發專案、技術部落格與專業技能。",
    images: [`${SITE_URL}/avatar.webp`],
  },
  verification: {
    // 填入你的 Google Search Console 驗證碼
    // google: "your-google-verification-code",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: Readonly<Props>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${bbhBartle.variable} antialiased `}
      >
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children} <Analytics />
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
