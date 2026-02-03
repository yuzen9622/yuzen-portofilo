"use client";
import Image from "next/image";

import { Article, ImgResponse } from "../types/blog";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function BlogCard({
  post,
  getFallbackSrc,
}: {
  post: Article;
  getFallbackSrc: (formats?: ImgResponse) => string;
}) {
  return (
    <Link
      href={`blog/${post.slug}`}
      className="space-y-2 group flex flex-col border-r-2 border-b-2"
    >
      <div className="w-full h-auto  ">
        <Image
          width={1000}
          height={1000}
          className="w-full  object-cover scale-95 rounded-3xl group-hover:scale-100 transition-all duration-300 group-hover:rounded-none aspect-video"
          src={getFallbackSrc(post.cover?.formats)}
          alt={post.title}
        />
      </div>
      <h2 className="text-2xl font-bold mb-2  px-2  line-clamp-1">
        {post.title}
      </h2>
      <p className="line-clamp-2 overflow-hidden text-muted-foreground  px-2 ">
        {post.description}
      </p>

      <span className="p-2 space-x-3">
        {post.categories.slice(0, 2).map((category) => (
          <Badge key={category.name} className="px-3 py-2">
            {category.name}
          </Badge>
        ))}
      </span>
    </Link>
  );
}
