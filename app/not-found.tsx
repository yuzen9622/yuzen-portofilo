import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileQuestion className="w-16 h-16" />
          </EmptyMedia>
          <EmptyTitle className="text-4xl font-bold">404</EmptyTitle>
          <EmptyDescription className="text-lg">
            Page Not Found
          </EmptyDescription>
          <EmptyContent className="max-w-md text-center">
            The page you are looking has been moved.
            <Button asChild className="mt-4">
              <Link href="/">Back to Home</Link>
            </Button>
          </EmptyContent>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
