"use client";

import { GitHubCalendar, type Year } from "react-github-calendar";
import { useInView } from "framer-motion";
import { useLocale } from "next-intl";
import {
  cloneElement,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import useSWR from "swr";
import { ArrowUpRight } from "lucide-react";
import Bezel from "@/shared/components/bezel";
import useTheme from "@/shared/hooks/use-theme";

const API = "https://github-contributions-api.jogruber.de/v4/";
const DAY = 86_400_000;

const CALENDAR_THEME = {
  light: ["oklch(0.94 0 0)", "oklch(0.84 0 0)", "oklch(0.68 0 0)", "oklch(0.48 0 0)", "oklch(0.22 0 0)"],
  dark: ["oklch(0.24 0 0)", "oklch(0.36 0 0)", "oklch(0.5 0 0)", "oklch(0.68 0 0)", "oklch(0.9 0 0)"],
};

type Day = { date: string; count: number };
type Response = { total: Record<string, number>; contributions: Day[] };

const emptySubscribe = () => () => {};

function summarize(days: Day[]) {
  let longest = 0;
  let run = 0;
  let busiest: Day | null = null;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
    if (!busiest || d.count > busiest.count) busiest = d;
  }
  // current streak: count back from today, allowing today itself to be empty
  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) current++;
    else if (i !== days.length - 1) break;
  }
  return { longest, current, busiest };
}

/**
 * Contribution panel: headline total and streaks beside the calendar, whose
 * cells pop in week by week (oldest first) once the panel scrolls into view.
 */
export default function GitHubContributionCalendar({
  username = "yuzen9622",
  year = "last",
}: {
  username?: string;
  year?: Year;
}) {
  const locale = useLocale();
  const { isDark } = useTheme();
  const isZh = locale.startsWith("zh");
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  // The calendar is client-fetched; skip it during SSR so markup never diverges
  const hydrated = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const { data } = useSWR<Response>(
    `${API}${username}?y=${year}`,
    (url: string) => fetch(url).then((r) => r.json()),
    { revalidateOnFocus: false },
  );

  const total = data ? Object.values(data.total)[0] : null;
  const stats = useMemo(() => (data ? summarize(data.contributions) : null), [data]);
  const [now] = useState(() => Date.now());

  const t = isZh
    ? { title: "GitHub 貢獻", period: "過去一年的貢獻", longest: "最長連續", current: "目前連續", busiest: "最活躍的一天", days: "天" }
    : { title: "GitHub contributions", period: "contributions in the last year", longest: "Longest streak", current: "Current streak", busiest: "Busiest day", days: "days" };

  const tooltip = (a: { count: number; date: string }) =>
    isZh
      ? a.count === 0
        ? `${a.date} 無貢獻`
        : `${a.date} 有 ${a.count} 次貢獻`
      : a.count === 0
        ? `No contributions on ${a.date}`
        : `${a.count} contribution${a.count === 1 ? "" : "s"} on ${a.date}`;

  return (
    <Bezel innerClassName="p-6 md:p-10">
      <div ref={ref} data-inview={inView || undefined} className="contrib grid gap-10 md:grid-cols-12 md:gap-8">
        {/* Summary */}
        <div className="flex flex-col justify-between gap-8 md:col-span-4">
          <div className="flex items-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span>{t.title}</span>
            <span className="ml-4 h-px flex-1 bg-foreground/10" />
          </div>

          <div>
            <p className="font-sans text-[clamp(4rem,8vw,6.5rem)] font-semibold leading-[0.8] tracking-[-0.06em] tabular-nums">
              {total !== null ? total.toLocaleString("en-US") : "—"}
            </p>
            <p className="mt-3 font-serif text-xl italic text-muted-foreground">{t.period}</p>
          </div>

          <dl className="grid grid-cols-3 gap-4 border-t border-foreground/10 pt-5 md:grid-cols-1 md:gap-3">
            {[
              [t.longest, stats ? `${stats.longest} ${t.days}` : "—"],
              [t.current, stats ? `${stats.current} ${t.days}` : "—"],
              [t.busiest, stats?.busiest ? `${stats.busiest.count} · ${stats.busiest.date.slice(5)}` : "—"],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{label}</dt>
                <dd className="font-sans text-base font-medium tabular-nums">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Calendar */}
        <div className="flex min-w-0 flex-col justify-between gap-6 md:col-span-8">
          <div
            dir="rtl"
            // rtl scroll container starts at the right edge on phones, so the
            // most recent weeks are visible first
            className="-mx-2 overflow-x-auto px-2 pb-2 text-muted-foreground [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div dir="ltr" className="w-max md:w-full">
              {hydrated && (
                <GitHubCalendar
                  username={username}
                  year={year}
                  blockSize={12}
                  blockMargin={4}
                  blockRadius={3}
                  fontSize={11}
                  showTotalCount={false}
                  colorScheme={isDark ? "dark" : "light"}
                  theme={CALENDAR_THEME}
                  errorMessage={isZh ? "無法載入 GitHub 貢獻資料。" : "Unable to load GitHub contributions."}
                  tooltips={{ activity: { text: tooltip } }}
                  labels={{ legend: { less: isZh ? "少" : "Less", more: isZh ? "多" : "More" } }}
                  renderBlock={(block, activity) => {
                    const weeksAgo = Math.max(0, Math.floor((now - Date.parse(activity.date)) / (7 * DAY)));
                    return cloneElement(block, {
                      style: {
                        ...(block.props.style as CSSProperties),
                        "--d": `${(53 - weeksAgo) * 18}ms`,
                      } as CSSProperties,
                    });
                  }}
                />
              )}
            </div>
          </div>

          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-3 self-end text-sm font-medium"
          >
            @{username}
            <span className="flex size-8 items-center justify-center rounded-full ring-1 ring-foreground/10 transition-[transform,background-color,color] duration-700 ease-fluid group-hover:rotate-45 group-hover:bg-foreground group-hover:text-background">
              <ArrowUpRight aria-hidden strokeWidth={1.25} className="size-4" />
            </span>
          </a>
        </div>
      </div>
    </Bezel>
  );
}
