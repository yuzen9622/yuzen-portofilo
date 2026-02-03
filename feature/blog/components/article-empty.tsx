import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Rss } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ArticleEmpty() {
  return (
    <div className=" w-full max-w-7xl mx-auto h-dvh flex items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Rss />
          </EmptyMedia>
          <EmptyTitle>No article</EmptyTitle>
          <EmptyDescription>No articles found</EmptyDescription>
          <EmptyContent>
            Please check back.
            <Button>
              <Link href="/blog">Back to Blog</Link>
            </Button>
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
