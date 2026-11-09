"use client";
import { NAVIGATION_LINKS, navKey } from "@/shared/content/base";
import { SectionLayout } from "../components/section-layout";
import AboutCard from "../components/about-card";
import ScrollText from "../components/scroll-text";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("HomePage");
  const nav = useTranslations("Nav");
  return (
    <SectionLayout
      id="about"
      leftContent={t("about.title.leftContent")}
      rightContent={t("about.title.rightContent")}
    >
      <div className="mx-auto mt-16 grid w-11/12 max-w-6xl gap-16 md:mt-24 md:grid-cols-12 md:gap-10">
        <ScrollText
          text={t("about.description")}
          className="space-y-8 text-2xl font-medium leading-[1.35] tracking-[-0.02em] md:col-span-8 md:text-[2.15rem]"
        />

        {/* Sticky index rail */}
        <aside className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <ul className="border-t border-foreground/10">
              {NAVIGATION_LINKS.map((link, index) => (
                <AboutCard
                  key={link.href}
                  href={link.href}
                  title={nav(navKey(link.href))}
                  index={index}
                />
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </SectionLayout>
  );
}
