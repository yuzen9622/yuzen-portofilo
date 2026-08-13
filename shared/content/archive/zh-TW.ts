import type { ArchiveContent, ArchiveItem } from "../types";
import { Projects_zhTW } from "../projects/zh-TW";

const projectItem = (slug: string): ArchiveItem => {
	const project = Projects_zhTW.find((item) => item.slug === slug)!;
	return {
		id: `project-${slug}`,
		title: project.title,
		description: project.tech?.slice(0, 3).join(" · "),
		date: project.datetime,
		image: project.picture,
		link: `/projects/${slug}`,
	};
};

export const Archive_zhTW: ArchiveContent = {
	groups: [
		{
			id: "projects",
			name: "專案",
			categories: [
				{
					id: "frontend",
					name: "前端",
					items: ["weather-app", "web3", "weast"].map(projectItem),
				},
				{
					id: "backend",
					name: "後端",
					items: ["chatto", "dcard-clone", "accessible-navigation"].map(
						projectItem,
					),
				},
				{
					id: "ai",
					name: "AI",
					items: ["makentu2026", "termexpander-ai"].map(projectItem),
				},
			],
		},
		{
			id: "academic",
			name: "學術",
			categories: [
				{
					id: "conferences",
					name: "研討會",
					items: [
						{
							id: "20251012-nstc-conf",
							title: "國科會學術研討會",
							description: "學術發表・參與",
							date: "2025.10",
							image: "/awards/nstc.webp",
						},
						{
							id: "20260305-twlef",
							title: "2026 台灣數位學習研討會",
							description: "基於 SINKT 模型融入可解釋性人工智慧助教系統",
							date: "2026.03",
						},
						{
							id: "2026-mlmi",
							title:
								"The 9th International Conference on Machine Learning and Machine Intelligence (MLMI)",
							description:
								"An Artificial Intelligence Teaching Assistant System Based on the SINKT Model",
							date: "2026.08",
						},
					],
				},
				{
					id: "research",
					name: "研究計畫",
					items: [
						{
							id: "20260626-nstc-project",
							title: "國科會大專生研究計畫",
							description: "115-2813-C-025-001-H",
							date: "2026.06",
							highlight: true,
						},
					],
				},
			],
		},
		{
			id: "experience",
			name: "經歷",
			categories: [
				{
					id: "competitions",
					name: "競賽",
					items: [
						{
							id: "20250609-lhpc",
							title: "龍華程式競賽",
							description: "佳作",
							date: "2025.06",
							image: "/awards/lhpc.webp",
						},
						{
							id: "20250823-ytp",
							title: "YTP 少年圖靈計畫",
							description: "決賽入圍",
							date: "2025.08",
							image: "/awards/ytp.webp",
						},
						{
							id: "20251106-ai-node",
							title: "AI 城市節點創意競賽",
							description: "佳作",
							date: "2025.11",
							image: "/awards/ai-node.webp",
						},
						{
							id: "20251213-ai-competition",
							title: "全國 AI 專題創意競賽",
							description: "佳作",
							date: "2025.12",
							image: "/awards/ai-competition.webp",
						},
					],
				},
				{
					id: "hackathons",
					name: "黑客松",
					items: [
						{
							id: "20250914-fgj",
							title: "FGJ (Faust Game Jam)",
							description: "參賽",
							date: "2025.09",
							image: "/awards/fgj.webp",
						},
						{
							id: "20250928-daydream",
							title: "Daydream 競賽",
							description: "第七名",
							date: "2025.09",
							image: "/awards/daydream.webp",
						},
						{
							id: "20251108-tp-code",
							title: "台北秋季程式設計節",
							description: "城市通微服務・參賽",
							date: "2025.11",
							image: "/awards/tp-code.webp",
						},
						{
							id: "20260425-ytp-hackathon",
							title: "2026 YTP 黑客松",
							description: "參賽",
							date: "2026.04",
						},
						{
							id: "20260508-makentu",
							title: "2026 MakeNTU",
							description: "Agentic RAG 語音助理「易策」",
							date: "2026.05",
							link: "/projects/makentu2026",
						},
					],
				},
				{
					id: "certifications",
					name: "證照",
					items: [
						{
							id: "20250613-tqc",
							title: "TQC+ Python 程式設計檢定",
							description: "合格",
							date: "2025.06",
							image: "/awards/tqc.webp",
						},
						{
							id: "20250614-apcs",
							title: "APCS 先修檢測",
							description: "觀念 4 級分・實作 3 級分",
							date: "2025.06",
							image: "/awards/apcs.webp",
						},
						{
							id: "20251209-cpe",
							title: "CPE 大學程式能力檢定",
							description: "1 題",
							date: "2025.12",
							image: "/awards/cpe.webp",
						},
						{
							id: "20260523-ipas",
							title: "iPAS 資訊安全工程師",
							description: "初級",
							date: "2026.05",
						},
					],
				},
			],
		},
	],
};
