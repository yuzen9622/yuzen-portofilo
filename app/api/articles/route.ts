import { ARTICLES_QUERY } from "@/feature/blog/service/blog-api";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const locale = searchParams.get("lng");

    const response = await fetch(
      `${ARTICLES_QUERY}?populate=*&locale=${locale}`,
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
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch articles" },
        { status: response.status },
      );
    }
    console.log("Fetched articles data:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 },
    );
  }
}
