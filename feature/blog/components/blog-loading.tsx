import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Loader2Icon } from "lucide-react";
import React from "react";

export default function BlogLoading() {
  return (
    <div className="border-x-2 border-b-2 w-full max-w-7xl mx-auto h-96 flex items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Loader2Icon className=" animate-spin" />
          </EmptyMedia>
          <EmptyTitle>Loading posts</EmptyTitle>
          <EmptyDescription>
            Please wait while posts are loading...
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
