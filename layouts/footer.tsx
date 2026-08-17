"use client";
import { NAVIGATION_LINKS, SocialBase } from "../shared/content/base";
import { Link } from "@/i18n/navigation";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { ArrowUp } from "lucide-react";
export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // 錨定整個 footer（而非標題本身）：滾動距離從 footer 進視窗一路到頁底，
  // 動效行程更長、聚焦速度更慢
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  // 模糊從 18px 聚集成清晰、字距從 0.35em 收縮至 0（減少動態時保持靜態）
  const blurPx = useTransform(
    scrollYProgress,
    [0.4, 1],
    reduceMotion ? [0, 0] : [18, 0],
  );

  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <div ref={footerRef} className="w-full  text-center">
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="hover:scale-105 transition-all  p-4 bg-primary rounded-full text-background my-10 text-center"
      >
        <ArrowUp size={30} />
      </button>
      <div className="flex px-4 items-center  justify-between  md:flex-row flex-col">
        <div className="space-y-2 self-start text-start ">
          <p className="text-lg font-semibold">Quick Links</p>
          <div className="flex gap-2">
            {NAVIGATION_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className=" text-end self-end space-y-2">
          <div className="flex gap-2 w-full items-center justify-between">
            {Object.entries(SocialBase).map(([key, value]) => (
              <motion.div className=" uppercase" key={key}>
                <Link className=" " href={value.url}>
                  {key}
                </Link>
              </motion.div>
            ))}
          </div>
          <p className="text-lg font-semibold">Social Links</p>
        </div>
      </div>
      <motion.h1
        style={{ filter }}
        className="w-full select-none mt-10 text-center font-bold  font-inter leading-[0.9] text-[clamp(3rem,13vw,22rem)] whitespace-nowrap"
      >
        YUZEN©2026
      </motion.h1>
    </div>
  );
}
