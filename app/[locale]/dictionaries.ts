import { notFound } from "next/navigation";
import { locale } from "next/root-params";
import { isLocale, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/types/dictionary";

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  fr: () => import("./dictionaries/fr").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
};

/**
 * Charge un dictionnaire pour une locale connue. A utiliser quand la locale est
 * deja resolue — typiquement les routes de metadonnees (opengraph-image), ou
 * next/root-params n'est pas disponible et ou `params` fait foi.
 */
export async function getDictionaryFor(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}

export async function getDictionary(): Promise<Dictionary> {
  const current = await locale();
  if (!current || !isLocale(current)) notFound();
  return getDictionaryFor(current);
}
