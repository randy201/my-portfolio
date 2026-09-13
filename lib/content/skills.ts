import type { Skill, SkillLevel } from "@/types/content";

/**
 * Rang de chaque niveau, du plus bas au plus haut.
 *
 * Un Record et non un tableau : il est exhaustif par construction. Ajouter un
 * cran a SkillLevel ne compile plus tant que son rang n'est pas declare ici,
 * ni son libelle dans les deux dictionnaires (dict.skills.levels est lui aussi
 * un Record<SkillLevel, string>). Le compilateur tient la liste des fichiers a
 * mettre a jour a notre place.
 */
export const SKILL_LEVEL_ORDER: Record<SkillLevel, number> = {
  novice: 1,
  intermediate: 2,
  experienced: 3,
  expert: 4,
};

/** Nombre de crans de l'echelle, derive de l'ordre : aucun 4 ecrit en dur. */
export const SKILL_LEVEL_COUNT = Object.keys(SKILL_LEVEL_ORDER).length;

export const skills: Skill[] = [
  { name: ".NET / C#", level: "expert" },
  { name: "Next.js / React", level: "experienced" },
  { name: "TypeScript", level: "experienced" },
  { name: "SQL Server", level: "intermediate" },
  { name: "API REST", level: "experienced" },
];
