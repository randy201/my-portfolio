import Image from "next/image";
import type { Dictionary } from "@/types/dictionary";
import { siteConfig } from "@/lib/content/site-config";
import VerticalLabel from "@/components/ui/VerticalLabel";

/**
 * Premiere dalle de la colonne de contenu : la « couverture de magazine ».
 * Le nom, le role, la tagline et les CTA vivent desormais dans le rail lateral
 * (voir .claude/PORTFOLIO_DESIGN-v2.md) ; le Hero garde le titre geant, le
 * portrait et la bio longue.
 */
export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-10 px-6 pb-20 pt-14 lg:px-10 lg:pb-28 lg:pt-20">
      <div className="relative grid items-center gap-8 lg:grid-cols-[auto_1fr_auto]">
        {/* Seul rappel du role dans le Hero : le rail le porte deja en clair,
            et ce label rote n'apparait qu'a partir de lg. */}
        <VerticalLabel className="justify-self-start">
          {dict.hero.role}
        </VerticalLabel>

        {/* Conteneur de requete : le titre se dimensionne sur la largeur reelle
            de sa colonne (cqw) et non sur celle du viewport (vw), qui ignore
            les ~22rem mangees par le rail lateral. `text-balance` repartit le
            kicker multi-mots en lignes de longueur egale — avec
            leading-[0.85], c'est le bloc empile d'une couverture de magazine. */}
        <div className="@container min-w-0">
          <p
            aria-hidden="true"
            className="text-balance font-display text-center text-[18cqw] leading-[0.85] tracking-wide sm:text-[16cqw] lg:text-[14cqw]"
          >
            {dict.hero.kicker}
          </p>
        </div>

        <VerticalLabel className="justify-self-end">
          {dict.projects.heading}
        </VerticalLabel>
      </div>

      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative order-1 mx-auto aspect-square w-full max-w-sm">
          <div
            className="absolute inset-6 rounded-full bg-accent/80"
            aria-hidden="true"
          />
          <Image
            src={siteConfig.avatarUrl}
            alt={dict.hero.name}
            fill
            sizes="(min-width: 1024px) 22rem, 80vw"
            className="relative rounded-full object-cover"
            priority
          />
        </div>

        <div className="order-2 flex flex-col gap-6">
          {/* Le nom, le role, la tagline et les CTA sont portes par le rail
              (SideRail), a toutes les tailles d'ecran : pas de doublon ici. */}
          <p className="max-w-md text-lg leading-relaxed text-foreground">
            {dict.hero.bio}
          </p>
        </div>
      </div>
    </section>
  );
}
