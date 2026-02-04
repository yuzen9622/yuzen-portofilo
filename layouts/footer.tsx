import React from "react";
import { NAVIGATION_LINKS, SocialBase } from "../shared/content/base";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
export default function Footer() {
  return (
    <div className="w-full  text-center">
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
          <span className="flex gap-2">
            {NAVIGATION_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.name}
              </Link>
            ))}
          </span>
        </div>
        <div className=" text-end self-end space-y-2">
          <span className="flex gap-2 w-full items-center justify-between">
            {Object.entries(SocialBase).map(([key, value]) => (
              <motion.div className=" uppercase" key={key}>
                <Link className=" " href={value.url}>
                  {key}
                </Link>
              </motion.div>
            ))}
          </span>
          <p className="text-lg font-semibold">Social Links</p>
        </div>
      </div>
      <h1 className="w-full mt-10 text-center font-bold font-inter leading-[0.9] text-[clamp(3rem,13vw,22rem)] whitespace-nowrap">
        YUZEN©2026
      </h1>
    </div>
  );
}
