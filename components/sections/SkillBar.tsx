import type { Skill } from "@/types/content";

/**
 * Une competence et son niveau, sous forme de paire terme / definition.
 *
 * A rendre a l'interieur d'un <dl> : le <div> racine est le groupe dt + dd que
 * la specification autorise comme enfant direct d'une liste de definitions.
 *
 * Pas de role="progressbar" : il decrit l'avancement d'une tache en cours, pas
 * une mesure, et sur quatre crans un aria-valuenow n'apprend rien a personne.
 * Le sens est porte par le libelle en clair ; la jauge n'est qu'un rappel
 * visuel, donc aria-hidden. C'est du texte reel, traduit et indexable, la ou un
 * pourcentage n'etait qu'un nombre sans echelle.
 */
export default function SkillBar({
  skill,
  levelLabel,
  levelCount,
}: {
  skill: Skill;
  levelLabel: string;
  /** Nombre de crans de l'echelle, derive du dictionnaire par SkillsSection. */
  levelCount: number;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-2">
      <dt className="text-sm">{skill.name}</dt>
      <dd className="text-sm text-muted-foreground">{levelLabel}</dd>
      <dd aria-hidden="true" className="col-span-2 flex gap-1.5">
        {Array.from({ length: levelCount }, (_, index) => (
          <span
            key={index}
            className={`h-1.5 flex-1 rounded-full ${
              index < skill.level ? "bg-accent" : "bg-foreground/10"
            }`}
          />
        ))}
      </dd>
    </div>
  );
}
