import type { Locale } from "@/lib/i18n/config";
import type { Project } from "@/types/content";

// TODO: remplacer par les projets réels (titre, catégorie, description, lien)
const projectsByLocale: Record<Locale, Project[]> = {
  fr: [
    {
      slug: "gestion-stock",
      title: "Application de gestion de stock",
      category: ".NET · SQL Server",
      description:
        "Application desktop/web de suivi des stocks et des commandes pour une PME, avec tableau de bord temps réel.",
    },
    {
      slug: "portail-client",
      title: "Portail client",
      category: "Next.js · React",
      description:
        "Portail web permettant aux clients de suivre leurs dossiers et d'échanger des documents en toute sécurité.",
    },
    {
      slug: "api-facturation",
      title: "API de facturation",
      category: ".NET · API REST",
      description:
        "API REST sécurisée pour la génération et l'envoi automatisé de factures, intégrée à un ERP existant.",
    },
  ],
  en: [
    {
      slug: "gestion-stock",
      title: "Inventory management app",
      category: ".NET · SQL Server",
      description:
        "Desktop/web application to track stock and orders for a small business, with a real-time dashboard.",
    },
    {
      slug: "portail-client",
      title: "Client portal",
      category: "Next.js · React",
      description:
        "Web portal allowing clients to track their files and exchange documents securely.",
    },
    {
      slug: "api-facturation",
      title: "Billing API",
      category: ".NET · REST API",
      description:
        "Secure REST API for automated invoice generation and delivery, integrated with an existing ERP.",
    },
  ],
};

export function getProjects(locale: Locale): Project[] {
  return projectsByLocale[locale];
}
