import Article from "@/feature/blog/article";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  return <Article slug={slug} locale={locale} />;
}
