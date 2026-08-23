import { notFound } from "next/navigation";
import { locale } from "next/root-params";
import { isLocale, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/types/dictionary";

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  fr: () => import("./dictionaries/fr").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
};

export async function getDictionary(): Promise<Dictionary> {
  const current = await locale();
  if (!current || !isLocale(current)) notFound();
  return loaders[current]();
}
