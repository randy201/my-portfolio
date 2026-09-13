import Image from "next/image";
import type { Dictionary } from "@/types/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/content/site-config";
import { getNavSections } from "@/lib/nav";
import RailHatch from "@/components/ui/RailHatch";
import SideRailNav from "./SideRailNav";
import ThemeToggle from "./ThemeToggle";
import LocaleSwitcher from "./LocaleSwitcher";

/** Anneau de focus commun, pose sur la surface du rail. */
const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rail-surface)]";

/** Relief du bouton secondaire : contour dessine, ombre de contact, liseré interne haut. */
const RAISED =
  "shadow-[0_0_0_0.5px_rgb(20_17_15/0.12),0_2px_3px_rgb(20_17_15/0.04),0_-1px_0_0_rgb(255_255_255/0.6)_inset] dark:shadow-[0_0_0_0.5px_rgb(245_241_234/0.12),0_2px_3px_rgb(0_0_0/0.3),0_-1px_0_0_rgb(245_241_234/0.10)_inset]";

/**
 * Identite du CV — nom, role, disponibilite, CV. Server Component.
 *
 * Responsive par construction plutot que masque : bloc en flux normal sous lg
 * (le <h1> reste donc visible sur mobile, ce qu'un `hidden lg:block` aurait
 * casse), rail lateral fixe a partir de lg. Seul le sommaire est une ile
 * client, et il ne s'affiche qu'en desktop : sous lg, MobileBar porte la
 * navigation.
 *
 * Sous lg, MobileBar porte deja le monogramme : la ligne monogramme + avatar
 * n'apparait donc qu'a partir de lg, pour ne pas dedoubler l'identite. La
 * pastille de disponibilite, elle, reste ici a toutes les tailles — elle en est
 * l'unique porteuse.
 */
export default function SideRail({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const sections = getNavSections(dict);

  return (
    <header className="relative z-30 border-b border-border bg-rail-surface lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-[var(--rail-w)] lg:border-b-0">
      <div className="hidden lg:block">
        <RailHatch />
      </div>

      <div className="flex flex-col gap-8 px-6 py-10 lg:h-full lg:overflow-y-auto lg:px-8 lg:pr-10 lg:hide-scrollbar">
        {/* Identite */}
        <div className="flex flex-col gap-6">
          <div className="hidden items-center justify-between gap-4 lg:flex">
            <a
              href="#top"
              className={`font-display text-3xl tracking-wide ${FOCUS}`}
            >
              RR
            </a>
            <Image
              src={siteConfig.avatarUrl}
              // Decoratif : le <h1> juste en dessous porte deja le nom, et le
              // portrait descriptif est celui du Hero. Evite un doublon au
              // lecteur d'ecran.
              alt=""
              width={56}
              height={56}
              sizes="56px"
              className="size-14 rounded-full object-cover"
            />
          </div>

          <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span
              className="size-2 shrink-0 rounded-full bg-accent"
              aria-hidden="true"
            />
            {dict.nav.availability}
          </p>

          <div className="flex flex-col gap-3">
            <h1 className="font-display text-3xl leading-none tracking-wide xl:text-4xl">
              {dict.hero.name}
            </h1>
            <p className="text-sm text-accent-strong">{dict.hero.role}</p>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {dict.hero.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-2.5 sm:max-lg:flex-row lg:flex-col">
            <a
              href={siteConfig.cvUrl}
              download
              className={`rounded-full bg-foreground px-5 py-2.5 text-center text-sm font-medium text-background transition-colors hover:bg-accent-strong ${FOCUS}`}
            >
              {dict.hero.downloadCv}
            </a>
            <a
              href="#contact"
              className={`rounded-full bg-muted px-5 py-2.5 text-center text-sm font-medium transition-colors hover:text-accent-strong ${FOCUS} ${RAISED}`}
            >
              {dict.hero.contactCta}
            </a>
          </div>
        </div>

        {/* Sommaire — desktop uniquement, MobileBar prend le relais sous lg */}
        <div className="hidden min-h-0 flex-col gap-3 lg:flex">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            {dict.nav.sections}
          </p>
          <SideRailNav
            sections={sections}
            label={dict.nav.menuLabel}
            className="min-h-0 overflow-y-auto hide-scrollbar"
          />
        </div>

        {/* Pied de rail — desktop uniquement, MobileBar porte les memes controles */}
        <div className="mt-auto hidden items-center justify-between gap-4 border-t border-border pt-6 lg:flex">
          <LocaleSwitcher currentLocale={locale} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
