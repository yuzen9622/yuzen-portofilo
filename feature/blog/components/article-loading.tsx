import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Loader2Icon } from "lucide-react";

export default function ArticleLoading() {
  return (
    <div className="border-x-2 border-b-2 w-full max-w-7xl mx-auto h-dvh flex items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Loader2Icon className=" animate-spin" />
          </EmptyMedia>
          <EmptyTitle>Loading article</EmptyTitle>
          <EmptyDescription>
            Please wait while the article is loading...
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
