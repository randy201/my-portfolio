import type { Dictionary } from "@/types/dictionary";
import type { Locale } from "@/lib/i18n/config";
import ThemeToggle from "./ThemeToggle";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Navbar({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const links = [
    { href: "#projects", label: dict.nav.projects },
    { href: "#skills", label: dict.nav.skills },
    { href: "#services", label: dict.nav.services },
    { href: "#contact", label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 text-sm">
        <a href="#top" className="font-display text-2xl tracking-wide">
          RR
        </a>
        <ul className="hidden items-center gap-6 uppercase tracking-wide text-xs font-medium sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-accent">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground sm:flex">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            {dict.nav.availability}
          </span>
          <LocaleSwitcher currentLocale={locale} />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
