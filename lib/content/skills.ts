import type { Skill } from "@/types/content";

// `level` est un rang de 1 a 4 — voir SkillLevel dans types/content.ts pour
// l'echelle et la marche a suivre pour ajouter un cran.
export const skills: Skill[] = [
  { name: ".NET / C#", level: 4 },
  { name: "Next.js / React", level: 3 },
  { name: "TypeScript", level: 3 },
  { name: "SQL Server", level: 2 },
  { name: "API REST", level: 3 },
];
