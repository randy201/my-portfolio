import type { Skill } from "@/types/content";

// `level` est un rang de 1 a 4 — voir SkillLevel dans types/content.ts pour
// l'echelle et la marche a suivre pour ajouter un cran.
export const skills: Skill[] = [
  { name: "Conception", level: 2 },
  { name: "Administration des infrastructures (ops)", level: 2 },
  { name: ".NET / C#", level: 3 },
  { name: "Next.js / React", level: 3 },
  { name: "TypeScript", level: 3 },
];
