import ProjectDetail from "@/feature/project/components/project-detail";
import { getProjectsContent } from "@/shared/lib/content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const SITE_URL = "https://2026.yuzen.dev";

type Params = Promise<{ locale: string; slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProjectsContent(locale).find(
    (item) => item.slug === slug,
  );
  if (!project) return {};
  const image = project.picture.startsWith("/")
    ? `${SITE_URL}${project.picture}`
    : project.picture;
  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `${SITE_URL}/projects/${slug}`,
      languages: {
        en: `${SITE_URL}/en/projects/${slug}`,
        "zh-Hant": `${SITE_URL}/zh-Hant/projects/${slug}`,
      },
    },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `${SITE_URL}/projects/${slug}`,
      siteName: "Yuzen Portfolio",
      images: [{ url: image, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [image],
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const projects = getProjectsContent(locale);
  const index = projects.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return <ProjectDetail project={project} prev={prev} next={next} />;
}
