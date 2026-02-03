import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Rss } from "lucide-react";

export default function BlogEmpty() {
  return (
    <div className="border-x-2 border-b-2 w-full max-w-7xl mx-auto h-96 flex items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Rss />
          </EmptyMedia>
          <EmptyTitle>No posts</EmptyTitle>
          <EmptyDescription>No posts found</EmptyDescription>
          <EmptyContent>
            There are no blog posts available at the moment. Please check back.
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
