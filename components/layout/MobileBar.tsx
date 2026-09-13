import type { Dictionary } from "@/types/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { getNavSections, sectionNumber } from "@/lib/nav";
import ThemeToggle from "./ThemeToggle";
import LocaleSwitcher from "./LocaleSwitcher";

/**
 * Barre de navigation compacte sous le palier lg, ou le rail lateral n'a pas la
 * place d'exister. Les liens de section vivent dans un <details> natif : aucun
 * JavaScript, et le contenu reste dans le HTML servi.
 */
export default function MobileBar({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const sections = getNavSections(dict);

  return (
    // <div> et non <header> : le role banner de la page appartient a SideRail,
    // et deux banner visibles simultanement sous lg seraient un doublon de
    // landmark. Le <nav> interne porte a lui seul le landmark utile.
    <div className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur lg:hidden">
      <div className="flex items-center justify-between gap-4 px-6 py-3">
        <a href="#top" className="font-display text-2xl tracking-wide">
          RR
        </a>

        {/* Pas de pastille de disponibilite ici : SideRail, juste en dessous
            dans le flux sous lg, la porte deja. */}
        <div className="flex items-center gap-4">
          <LocaleSwitcher currentLocale={locale} />
          <ThemeToggle label={dict.nav.themeToggle} />
        </div>
      </div>

      <details className="group border-t border-border">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-6 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {dict.nav.menuLabel}
          <span
            aria-hidden="true"
            className="transition-transform group-open:rotate-180"
          >
            &#9662;
          </span>
        </summary>
        <nav aria-label={dict.nav.menuLabel}>
          <ul className="flex flex-col pb-2">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="flex min-h-11 items-center justify-between px-6 py-2.5 text-base text-muted-foreground"
                >
                  {section.label}
                  <span
                    aria-hidden="true"
                    className="font-display text-sm text-muted-foreground"
                  >
                    {sectionNumber(index)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </details>
    </div>
  );
}
