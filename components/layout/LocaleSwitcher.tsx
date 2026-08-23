"use client";

import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";

function pathWithLocale(pathname: string, locale: Locale) {
  const segments = pathname.split("/");
  segments[1] = locale;
  return segments.join("/") || "/";
}

export default function LocaleSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 text-xs font-medium uppercase tracking-wide">
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-1">
          {index > 0 && <span className="text-muted-foreground">/</span>}
          {locale === currentLocale ? (
            <span className="text-accent">{locale}</span>
          ) : (
            // Ancre classique (pas next/link) : le root layout dépend de la
            // locale, un rechargement complet évite de le re-rendre côté client.
            <a
              href={pathWithLocale(pathname, locale)}
              className="text-muted-foreground hover:text-foreground"
            >
              {locale}
            </a>
          )}
        </span>
      ))}
    </div>
  );
}
