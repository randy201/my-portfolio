import type { Locale } from "@/lib/i18n/config";
import type { ProcessStep, Service } from "@/types/content";

// TODO: remplacer par les services réels proposés
const servicesByLocale: Record<Locale, Service[]> = {
  fr: [
    {
      title: "Développement backend .NET",
      description: "APIs et services robustes, sécurisés et performants avec .NET/C#.",
    },
    {
      title: "Développement frontend React/Next.js",
      description: "Interfaces modernes, rapides et accessibles avec React et Next.js.",
    },
    {
      title: "Bases de données",
      description: "Conception et optimisation de bases de données SQL Server.",
    },
    {
      title: "Intégration & API",
      description: "Connexion de systèmes existants via des API REST bien pensées.",
    },
  ],
  en: [
    {
      title: "Backend development (.NET)",
      description: "Robust, secure and performant APIs and services with .NET/C#.",
    },
    {
      title: "Frontend development (React/Next.js)",
      description: "Modern, fast and accessible interfaces with React and Next.js.",
    },
    {
      title: "Databases",
      description: "Design and optimization of SQL Server databases.",
    },
    {
      title: "Integration & APIs",
      description: "Connecting existing systems through well-designed REST APIs.",
    },
  ],
};

// TODO: remplacer par le process de travail réel
const processStepsByLocale: Record<Locale, ProcessStep[]> = {
  fr: [
    { title: "Découverte", description: "Comprendre vos objectifs, votre audience et vos contraintes." },
    { title: "Cadrage", description: "Définir le périmètre technique et fonctionnel du projet." },
    { title: "Développement", description: "Construire une solution propre, testée et évolutive." },
    { title: "Livraison", description: "Déployer, ajuster et vous accompagner après la mise en ligne." },
  ],
  en: [
    { title: "Discover", description: "Understand your goals, audience and constraints." },
    { title: "Define", description: "Scope the technical and functional perimeter of the project." },
    { title: "Develop", description: "Build a clean, tested and scalable solution." },
    { title: "Deliver", description: "Deploy, fine-tune and support you after launch." },
  ],
};

export function getServices(locale: Locale): Service[] {
  return servicesByLocale[locale];
}

export function getProcessSteps(locale: Locale): ProcessStep[] {
  return processStepsByLocale[locale];
}
