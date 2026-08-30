"use client";

import { GitHubCalendar } from "react-github-calendar";
import useTheme from "@/shared/hooks/use-theme";

const CALENDAR_THEME = {
  light: [
    "oklch(0.97 0 0)",
    "oklch(0.88 0 0)",
    "oklch(0.72 0 0)",
    "oklch(0.5 0 0)",
    "oklch(0.25 0 0)",
  ],
  dark: [
    "oklch(0.23 0 0)",
    "oklch(0.35 0 0)",
    "oklch(0.49 0 0)",
    "oklch(0.65 0 0)",
    "oklch(0.82 0 0)",
  ],
};

export default function GitHubContributionCalendar() {
  const { isDark } = useTheme();

  return (
    <div className="mt-8 w-full min-w-0 max-w-full overflow-x-auto border-y border-border py-4 text-muted-foreground">
      <GitHubCalendar
        username="yuzen9622"
        colorScheme={isDark ? "dark" : "light"}
        theme={CALENDAR_THEME}
        errorMessage="Unable to load GitHub contributions."
      />
    </div>
  );
}
