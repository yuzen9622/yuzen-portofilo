import type { Metadata } from "next";
import {
	Geist,
	Geist_Mono,
	Inter,
	LXGW_WenKai_TC,
	Shippori_Mincho,
} from "next/font/google";

import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import AmbientBackground from "@/shared/components/ambient-background";
import CustomCursor from "@/shared/components/custom-cursor";
import RouteProgress from "@/shared/components/route-progress";
import "./globals.css";
const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
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

const shipporiMincho = Shippori_Mincho({
	variable: "--font-shippori",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
	display: "swap",
});

const lxgwWenKai = LXGW_WenKai_TC({
	variable: "--font-lxgw-wenkai",
	subsets: ["latin"],
	weight: "400",
	display: "swap",
});

const SITE_URL = "https://www.yuzen.dev";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	formatDetection: {
		telephone: false,
		date: false,
		address: false,
		email: false,
		url: false,
	},
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
		<html
			lang={locale}
			suppressHydrationWarning
			className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${shipporiMincho.variable} ${lxgwWenKai.variable}`}
		>
			<body className="antialiased" suppressHydrationWarning>
				<NextIntlClientProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
						<AmbientBackground />
						<CustomCursor />
						<RouteProgress />
						{children} <Analytics />
						<Toaster />
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
