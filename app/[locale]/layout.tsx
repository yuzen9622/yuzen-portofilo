import type { Metadata } from "next";
import { Geist, Geist_Mono, BBH_Bartle, Inter } from "next/font/google";
import "../globals.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
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

export const metadata: Metadata = {
  title: "Yuzen - Portfolio",
  description:
    "Welcome to the portfolio of Yuzen, showcasing projects and skills.",
  alternates: {
    canonical: "https://2026.yuzen.dev",
    languages: {
      en: "https://2026.yuzen.dev/en",
      "zh-Hans": "https://2026.yuzen.dev/zh-Hans",
    },
  },
  icons: {
    icon: "http://2026.yuzen.dev/avatar.webp",
    shortcut: "http://2026.yuzen.dev/avatar.webp",
    apple: "http://2026.yuzen.dev/avatar.webp",
  },
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
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${bbhBartle.variable} antialiased `}
      >
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children} <Analytics />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
