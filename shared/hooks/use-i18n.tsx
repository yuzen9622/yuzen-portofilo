"use client";
import { useTranslations } from "next-intl";
export const useI18n = (page?: string) => {
  const t = useTranslations(page || "Shared");
  return t;
};
