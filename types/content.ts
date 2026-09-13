export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  href?: string;
};

/**
 * Echelle de maitrise, du plus bas au plus haut. Une cle, pas un libelle : le
 * mot affiche vient des dictionnaires (dict.skills.levels), sinon /en servirait
 * du francais. Le rang de chaque cle est declare dans lib/content/skills.ts.
 */
export type SkillLevel = "novice" | "intermediate" | "experienced" | "expert";

export type Skill = {
  name: string;
  level: SkillLevel;
};

export type Service = {
  title: string;
  description: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type Tool = {
  name: string;
};

export type ContactInfo = {
  email: string;
  location: string;
  socials: { label: string; href: string }[];
};
