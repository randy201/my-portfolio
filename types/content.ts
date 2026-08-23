export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  href?: string;
};

export type Skill = {
  name: string;
  level: number;
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
