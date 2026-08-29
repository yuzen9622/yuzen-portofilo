"use client";
import { SectionLayout } from "../components/section-layout";
import { getArchiveContent } from "@/shared/lib/content";
import type { ArchiveGroup, ArchiveItem } from "@/shared/content/types";
import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/utils";
import {
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

const FALLBACK_IMAGE = "/blog/default-placeholder.webp";

const BASE_VH = 80;
const PER_ENTRY_VH = 20;

type Entry =
  | { kind: "category"; id: string; name: string; categoryId: string }
  | { kind: "item"; id: string; item: ArchiveItem; categoryId: string };

const flattenGroup = (group: ArchiveGroup): Entry[] =>
  group.categories.flatMap((category) => [
    {
      kind: "category" as const,
      id: `cat-${category.id}`,
      name: category.name,
      categoryId: category.id,
    },
    ...category.items.map((item) => ({
      kind: "item" as const,
      id: item.id,
      item,
      categoryId: category.id,
    })),
  ]);

const getCategoryRanges = (entries: Entry[]) => {
  const slots = entries.length + 1;
  const ranges = new Map<string, [number, number]>();
  entries.forEach((entry, i) => {
    const current = ranges.get(entry.categoryId);
    const start = current ? current[0] : i / slots;
    ranges.set(entry.categoryId, [start, (i + 1) / slots]);
  });
  return ranges;
};

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

function CategoryLabel({
  name,
  range,
  progress,
  reduced,
  onJump,
  align = "left",
}: {
  name: string;
  range: [number, number];
  progress: MotionValue<number>;
  reduced: boolean;
  onJump: (target: number) => void;
  align?: "left" | "right";
}) {
  const opacity = useTransform(
    progress,
    [range[0] - 0.03, range[0], range[1], range[1] + 0.03],
    [0.3, 1, 1, 0.3],
  );
  return (
    <motion.button
      type="button"
      onClick={() => onJump(range[1])}
      style={reduced ? undefined : { opacity }}
      className={cn(
        "text-xl md:text-2xl uppercase tracking-widest cursor-pointer transition-colors hover:text-primary",
        align === "left" ? "text-start" : "text-end",
      )}
    >
      {name}
    </motion.button>
  );
}

/** 編號滾動數字：直欄 1..total，隨 wheel 值連續上滾（odometer） */
function NumberOdometer({
  wheel,
  total,
  reduced,
  align = "left",
}: {
  wheel: MotionValue<number>;
  total: number;
  reduced: boolean;
  align?: "left" | "right";
}) {
  const y = useTransform(wheel, (w) => `${-w}em`);
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 w-full",
        align === "left" ? "justify-start" : "justify-end",
      )}
    >
      <p className="flex items-center leading-none text-sm md:text-base text-muted-foreground tabular-nums">
        <span>0</span>
        {reduced ? (
          <span>1</span>
        ) : (
          <span className="relative block h-[1em] overflow-hidden">
            <motion.span style={{ y }} className="flex flex-col">
              {Array.from({ length: total }, (_, i) => (
                <span key={i} className="flex h-[1em] items-center">
                  {i + 1}
                </span>
              ))}
            </motion.span>
          </span>
        )}
        <span className="ml-1">/ {`${total}`.padStart(2, "0")}</span>
      </p>
    </div>
  );
}

/** 滾筒上的一塊：群名 + 分類清單，依 wheel 距離做 picker 式旋轉位移 */
function WheelBlock({
  group,
  index,
  wheel,
  globalProgress,
  cumBeforeVh,
  heightVh,
  denominatorVh,
  categoryRanges,
  reduced,
  onJump,
}: {
  group: ArchiveGroup;
  index: number;
  wheel: MotionValue<number>;
  globalProgress: MotionValue<number>;
  cumBeforeVh: number;
  heightVh: number;
  denominatorVh: number;
  categoryRanges: Map<string, [number, number]>;
  reduced: boolean;
  onJump: (target: number) => void;
}) {
  const groupProgress = useTransform(globalProgress, (p) =>
    clamp01((p * denominatorVh - cumBeforeVh) / (heightVh - 100)),
  );
  const offset = useTransform(wheel, (w) => index - w);
  const y = useTransform(offset, (o) => o * 280);
  const rotateX = useTransform(offset, (o) => o * -70);
  const opacity = useTransform(
    offset,
    (o) => 1 - Math.min(Math.abs(o) * 1.4, 1),
  );
  const pointerEvents = useTransform(offset, (o) =>
    Math.abs(o) < 0.5 ? "auto" : "none",
  );

  const isEven = index % 2 === 0;

  return (
    <motion.div
      style={
        reduced
          ? undefined
          : {
              y,
              rotateX,
              opacity,
              pointerEvents,
              transformOrigin: "center center",
            }
      }
      className={cn(
        "absolute inset-0 flex flex-col justify-center gap-4 md:gap-6",
        isEven ? "items-start text-start" : "items-end text-end",
      )}
    >
      <h2 className="font-inter text-5xl md:text-7xl font-semibold uppercase">
        {group.name}
      </h2>
      <div
        className={cn(
          "flex flex-col gap-3",
          isEven ? "items-start" : "items-end",
        )}
      >
        {group.categories.map((category) => (
          <CategoryLabel
            key={category.id}
            name={category.name}
            range={categoryRanges.get(category.id) ?? [0, 1]}
            progress={groupProgress}
            reduced={reduced}
            onJump={onJump}
            align={isEven ? "left" : "right"}
          />
        ))}
      </div>
    </motion.div>
  );
}

function EntryRow({
  entry,
  range,
  progress,
  reduced,
  onPoint,
  isEven = true,
}: {
  entry: Entry;
  range: [number, number];
  progress: MotionValue<number>;
  reduced: boolean;
  onPoint: (image: string | null) => void;
  isEven?: boolean;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const rawX = useTransform(progress, range, [isEven ? 48 : -48, 0]);
  const x = useSpring(rawX, { stiffness: 100, damping: 30, mass: 0.2 });

  if (entry.kind === "category") {
    return (
      <motion.p
        style={reduced ? undefined : { opacity, x }}
        className="pt-5 pb-1.5 text-sm uppercase tracking-widest text-muted-foreground border-b"
      >
        {entry.name}
      </motion.p>
    );
  }

  const { item } = entry;
  const content = (
    <div
      onMouseEnter={() => onPoint(item.image ?? null)}
      onMouseLeave={() => onPoint(null)}
      className={cn(
        "flex items-baseline gap-3 py-2.5 border-b border-border/60 group/row",
        (item.link || item.image) && "cursor-pointer",
      )}
    >
      <span className="w-24 md:w-28 shrink-0 text-xs md:text-sm text-muted-foreground tabular-nums whitespace-nowrap">
        {item.date}
      </span>
      <span
        className={cn(
          "font-inter text-base sm:text-xl md:text-2xl transition-colors",
          item.highlight
            ? "font-semibold text-primary"
            : "font-medium group-hover/row:text-primary",
        )}
      >
        {item.title}
      </span>
      <span className="hidden md:block flex-1 truncate text-end text-sm text-muted-foreground">
        {item.description}
      </span>
    </div>
  );

  return (
    <motion.div style={reduced ? undefined : { opacity, x }}>
      {item.link ? <Link href={item.link}>{content}</Link> : content}
    </motion.div>
  );
}

function GroupPanel({
  group,
  index,
  total,
  reduced,
  onPoint,
}: {
  group: ArchiveGroup;
  index: number;
  total: number;
  reduced: boolean;
  onPoint: (image: string | null) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const entries = useMemo(() => flattenGroup(group), [group]);
  const slots = entries.length + 1;
  const isEven = index % 2 === 0;

  const [dimensions, setDimensions] = useState({
    listHeight: 0,
    viewportHeight: 0,
    containerHeight: 0,
    isMobile: false,
  });

  useEffect(() => {
    if (reduced) return;
    const listEl = listRef.current;
    const stickyEl = stickyRef.current;
    const listContainerEl = listContainerRef.current;
    if (!listEl || !stickyEl) return;

    const updateDimensions = () => {
      const isMob = window.innerWidth < 768;
      setDimensions({
        listHeight: listEl.offsetHeight,
        viewportHeight: stickyEl.offsetHeight,
        containerHeight: listContainerEl
          ? listContainerEl.offsetHeight
          : stickyEl.offsetHeight,
        isMobile: isMob,
      });
    };

    updateDimensions();

    const observer = new ResizeObserver(() => {
      updateDimensions();
    });

    observer.observe(listEl);
    observer.observe(stickyEl);
    if (listContainerEl) {
      observer.observe(listContainerEl);
    }

    window.addEventListener("resize", updateDimensions);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, [reduced]);

  const { listHeight, viewportHeight, containerHeight, isMobile } = dimensions;

  let startY = 0;
  let endY = 0;

  if (isMobile) {
    // 手機端：標題置頂，列表在 listContainer 內部平滑滾動，避免整塊 grid 垂直置中導致標題被向上推擠截斷
    const availableHeight =
      containerHeight || (viewportHeight > 0 ? viewportHeight - 160 : 400);
    const hasOverflow = listHeight > availableHeight;
    startY = 0;
    endY = hasOverflow ? -(listHeight - availableHeight) : 0;
  } else {
    // 桌機端：兩欄佈局，列表於 viewport 垂直置中並依上下限滾動
    const topLimit = 120;
    const bottomLimit = 100;
    const availableHeight = viewportHeight - topLimit - bottomLimit;
    const hasOverflow = listHeight > availableHeight;

    startY = hasOverflow ? topLimit - (viewportHeight / 2 - listHeight / 2) : 0;

    endY = hasOverflow
      ? viewportHeight - bottomLimit - (viewportHeight / 2 + listHeight / 2)
      : 0;
  }

  const listY = useTransform(scrollYProgress, [0, 1], [startY, endY]);

  return (
    <div
      ref={wrapperRef}
      style={{
        height: reduced
          ? "auto"
          : `${BASE_VH + entries.length * PER_ENTRY_VH}vh`,
      }}
      className="relative"
    >
      <div
        ref={stickyRef}
        className={cn(
          reduced
            ? "py-12"
            : "sticky top-0 h-screen h-dvh flex md:items-center overflow-hidden",
        )}
      >
        <div
          className={cn(
            "w-11/12 max-w-6xl mx-auto flex flex-col md:grid md:gap-16 md:items-center",
            reduced ? "h-auto" : "h-full md:h-auto",
            isEven ? "md:grid-cols-[1fr_1.8fr]" : "md:grid-cols-[1.8fr_1fr]",
          )}
        >
          {/* 桌機左欄交給跨群滾筒（rail），這格只當佔位；手機與 reduced-motion 顯示群名 */}
          <div
            className={cn(
              "shrink-0 pt-20 sm:pt-24 pb-3 md:pt-0 md:pb-0 z-10",
              !isEven && "md:order-2",
            )}
          >
            <div
              className={cn(
                reduced ? "flex flex-col gap-2" : "md:hidden",
                !isEven && "md:items-end md:text-end",
              )}
            >
              <p className="text-xs sm:text-sm text-muted-foreground tabular-nums">
                {`${index + 1}`.padStart(2, "0")} /{" "}
                {`${total}`.padStart(2, "0")}
              </p>
              <h2 className="font-inter text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight">
                {group.name}
              </h2>
            </div>
          </div>

          {/* 列表容器：手機端設定為 flex-1 填滿高度並裁切上方滾出內容；桌機端由 y transform 控制位置 */}
          <div
            ref={listContainerRef}
            className={cn(
              "relative flex-1 w-full pb-6 md:pb-0 min-h-0",
              reduced
                ? "h-auto overflow-visible"
                : "overflow-hidden md:overflow-visible md:h-auto",
              !isEven && "md:order-1",
            )}
          >
            <motion.div
              ref={listRef}
              style={reduced ? undefined : { y: listY }}
              className="flex flex-col w-full"
            >
              {entries.map((entry, i) => (
                <EntryRow
                  key={entry.id}
                  entry={entry}
                  range={[i / slots, (i + 1) / slots]}
                  progress={scrollYProgress}
                  reduced={reduced}
                  onPoint={onPoint}
                  isEven={isEven}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Archive() {
  const t = useTranslations("ArchivePage");
  const { locale }: { locale: string } = useParams();
  const archive = getArchiveContent(locale);
  const reducedMotion = useReducedMotion() ?? false;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pointImage, setPointImage] = useState<string>("");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const imageOpacity = useMotionValue(0);
  const springX = useSpring(mouseX, {
    stiffness: 180,
    damping: 24,
    mass: 0.15,
  });
  const springY = useSpring(mouseY, {
    stiffness: 180,
    damping: 24,
    mass: 0.15,
  });
  const opacitySpring = useSpring(imageOpacity, {
    stiffness: 180,
    damping: 24,
    mass: 0.15,
  });

  const [activeIdx, setActiveIdx] = useState(0);

  // 群的滾動幾何（vh 單位），供滾筒與點擊跳轉換算
  const geometry = useMemo(() => {
    const entriesPerGroup = archive.groups.map((group) => flattenGroup(group));
    const heights = entriesPerGroup.map(
      (entries) => BASE_VH + entries.length * PER_ENTRY_VH,
    );
    const cumBefore = heights.map((_, i) =>
      heights.slice(0, i).reduce((sum, h) => sum + h, 0),
    );
    const totalVh = heights.reduce((sum, h) => sum + h, 0);
    return {
      entriesPerGroup,
      heights,
      cumBefore,
      denominator: totalVh - 100,
    };
  }, [archive]);

  const { scrollYProgress: globalProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 滾筒位置 wheel ∈ [0, groups-1]：群 i 穩定時 = i，
  // 面板交接（下一群 sticky 蓋上來的那 100vh）期間連續滾動 i → i+1
  const wheel = useTransform(globalProgress, (p) => {
    const scrollVh = p * geometry.denominator;
    let w = 0;
    for (let i = 0; i < geometry.heights.length - 1; i++) {
      const boundary = geometry.cumBefore[i + 1];
      w += clamp01((scrollVh - (boundary - 100)) / 100);
    }
    return w;
  });

  useEffect(() => {
    return wheel.on("change", (latest) => {
      setActiveIdx(Math.round(latest));
    });
  }, [wheel]);

  const { xInput, xOutput } = useMemo(() => {
    const input: number[] = [];
    const output: string[] = [];
    const total = archive.groups.length;
    for (let i = 0; i < total; i++) {
      const isEven = i % 2 === 0;
      const val = isEven ? "calc(0% + 0px)" : "calc(180% + 4rem)";
      if (i === 0) {
        input.push(0);
        output.push(val);
      } else {
        input.push(i - 0.6, i - 0.4);
        output.push(output[output.length - 1], val);
      }
      if (i === total - 1) {
        input.push(total - 1);
        output.push(val);
      }
    }
    return { xInput: input, xOutput: output };
  }, [archive.groups.length]);

  const xShift = useTransform(wheel, xInput, xOutput);

  const jumpTo = (groupIndex: number, target: number) => {
    const container = containerRef.current;
    if (!container) return;
    const vhPx = window.innerHeight / 100;
    const containerTop = window.scrollY + container.getBoundingClientRect().top;
    const scrollVh =
      geometry.cumBefore[groupIndex] +
      (geometry.heights[groupIndex] - 100) * clamp01(target);
    window.scrollTo({
      top: containerTop + scrollVh * vhPx,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX + 20);
      mouseY.set(event.clientY + 20);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handlePoint = (image: string | null) => {
    if (image) {
      setPointImage(image);
      imageOpacity.set(1);
    } else {
      imageOpacity.set(0);
    }
  };

  return (
    <SectionLayout
      id="archive"
      className="overflow-visible"
      leftContent={t("title.leftContent")}
      rightContent={t("title.rightContent")}
    >
      <div ref={containerRef} className="relative">
        {archive.groups.map((group, index) => (
          <GroupPanel
            key={group.id}
            group={group}
            index={index}
            total={archive.groups.length}
            reduced={reducedMotion}
            onPoint={handlePoint}
          />
        ))}

        {/* 跨群左欄滾筒（桌機）：時間選擇器式轉盤 + 編號 odometer */}
        {!reducedMotion && (
          <div className="pointer-events-none absolute inset-0 hidden md:block">
            <div className="sticky top-0 h-screen flex items-center">
              <div className="grid grid-cols-[1fr_1.8fr] gap-16 items-center w-11/12 max-w-6xl mx-auto">
                <motion.div
                  style={{ x: xShift }}
                  className="pointer-events-auto flex flex-col gap-5 w-full"
                >
                  <NumberOdometer
                    wheel={wheel}
                    total={archive.groups.length}
                    reduced={reducedMotion}
                    align={activeIdx % 2 === 0 ? "left" : "right"}
                  />
                  <div
                    className="relative h-[340px]"
                    style={{ perspective: 900 }}
                  >
                    {archive.groups.map((group, index) => (
                      <WheelBlock
                        key={group.id}
                        group={group}
                        index={index}
                        wheel={wheel}
                        globalProgress={globalProgress}
                        cumBeforeVh={geometry.cumBefore[index]}
                        heightVh={geometry.heights[index]}
                        denominatorVh={geometry.denominator}
                        categoryRanges={getCategoryRanges(
                          geometry.entriesPerGroup[index],
                        )}
                        reduced={reducedMotion}
                        onJump={(target) => jumpTo(index, target)}
                      />
                    ))}
                  </div>
                </motion.div>
                <div />
              </div>
            </div>
          </div>
        )}

        <motion.div
          style={{ x: springX, y: springY, opacity: opacitySpring }}
          className="pointer-events-none hidden md:block fixed left-0 top-0 z-50 h-40 w-56 rotate-3 overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-2xl shadow-black/20"
        >
          {pointImage !== "" && (
            <Image
              src={pointImage === FALLBACK_IMAGE ? FALLBACK_IMAGE : pointImage}
              alt="preview"
              fill
              sizes="224px"
              className="object-cover"
              unoptimized={pointImage.startsWith("http")}
            />
          )}
        </motion.div>
      </div>
    </SectionLayout>
  );
}
