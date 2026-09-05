"use client";

import { GitHubCalendar, type Year } from "react-github-calendar";
import { useLocale } from "next-intl";
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

type GitHubContributionCalendarProps = {
  username?: string;
  year?: Year;
};

export default function GitHubContributionCalendar({
  username = "yuzen9622",
  year = "last",
}: GitHubContributionCalendarProps) {
  const { isDark } = useTheme();
  const locale = useLocale();
  const isZh = locale.startsWith("zh");

  const totalCountTemplate = isZh
    ? "今年共 {{count}} 次貢獻"
    : "{{count}} contributions this year";

  const getTooltipText = (activity: { count: number; date: string }) => {
    if (isZh) {
      if (activity.count === 0) return `${activity.date} 無貢獻`;
      return `${activity.date} 有 ${activity.count} 次貢獻`;
    }
    if (activity.count === 0) return `No contributions on ${activity.date}`;
    if (activity.count === 1) return `1 contribution on ${activity.date}`;
    return `${activity.count} contributions on ${activity.date}`;
  };

  return (
    <div className="mt-8 w-full min-w-0 max-w-full overflow-x-auto border-y border-border py-4 text-muted-foreground">
      <GitHubCalendar
        username={username}
        year={year}
        colorScheme={isDark ? "dark" : "light"}
        theme={CALENDAR_THEME}
        errorMessage={
          isZh
            ? "無法載入 GitHub 貢獻資料。"
            : "Unable to load GitHub contributions."
        }
        tooltips={{
          activity: {
            text: getTooltipText,
          },
        }}
        labels={{
          totalCount: totalCountTemplate,
          legend: {
            less: isZh ? "少" : "Less",
            more: isZh ? "多" : "More",
          },
        }}
      />
    </div>
  );
}
