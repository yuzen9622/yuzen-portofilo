import { ARTICLES_QUERY } from "@/feature/blog/service/blog-api";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const locale = searchParams.get("lng");
    const slug = (await params).slug;
    console.log("Fetching article with slug:", slug, "and locale:", locale);
    const response = await fetch(
      `${ARTICLES_QUERY}?filters[slug][$eqi]=${slug}&locale=zh-Hans`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN ?? ""}`,
        },
        next: { revalidate: 60 },
      },
    );
    const data = await response.json();
    console.log("Fetched articles data:", data);
    return NextResponse.json(data.data[0]);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 },
    );
  }
}
