export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  href?: string;
};

/**
 * Rang sur l'echelle de maitrise, du plus bas au plus haut :
 *
 *   1  novice           3  experimente
 *   2  intermediaire    4  expert
 *
 * Le nombre EST le rang. Pas de table de correspondance a maintenir, et la
 * jauge se remplit directement d'apres lui. Le mot affiche vient des
 * dictionnaires (dict.skills.levels), jamais d'ici : sinon /en servirait du
 * francais.
 *
 * Ajouter un cran (5, 6...) : etendre cette union, et c'est tout. Le
 * compilateur reclame alors son libelle dans les deux dictionnaires, parce que
 * dict.skills.levels est un Record<SkillLevel, string>, donc exhaustif. Aucun
 * autre fichier a toucher — le nombre de crans affiches est lui aussi derive
 * du dictionnaire.
 */
export type SkillLevel = 1 | 2 | 3 | 4;

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
