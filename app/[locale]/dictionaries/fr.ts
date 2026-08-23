import type { Dictionary } from "@/types/dictionary";

const fr = {
  meta: {
    titleTemplate: "%s | Randy Anne Rajaonson",
    defaultTitle: "Randy Anne Rajaonson — Développeur .NET / Next.js (React)",
    description:
      "Je suis développeur full stack. Je suis passionné par la technologie, ce qui fait de mon métier un rêve devenu réalité.",
  },
  nav: {
    projects: "Projets",
    skills: "Compétences",
    services: "Ce que je fais",
    contact: "Contact",
    availability: "Disponible en freelance",
  },
  hero: {
    kicker: "PORTFOLIO",
    name: "RAJAONSON Randy Anne",
    role: "Développeur .NET / Next.js (React)",
    tagline:
      "Avec ma baguette (ordinateur + internet) je réalise vos projets et bien plus encore",
    bio: "Je suis développeur full stack. Je suis passionné par la technologie, ce qui fait de mon métier un rêve devenu réalité.",
    downloadCv: "Télécharger mon CV",
    contactCta: "Me contacter",
  },
  projects: {
    heading: "Projets",
    subheading: "sélectionnés",
    intro: "Une sélection de projets récents illustrant mon travail de conception et de développement.",
    viewAll: "Voir tous les projets",
    viewProject: "Voir le projet",
  },
  skills: {
    heading: "Compétences",
    subheading: "& expertise",
    quote:
      "Je conçois et développe des applications qui ne sont pas seulement fonctionnelles, mais aussi propres, robustes et agréables à utiliser.",
  },
  services: {
    heading: "Ce que",
    subheading: "je fais",
    processHeading: "Ma méthode",
  },
  tools: {
    heading: "Outils",
    subheading: "utilisés",
  },
  contact: {
    heading: "Discutons",
    subheading: "de votre projet",
    intro: "Un projet en tête ? Écrivez-moi, je réponds rapidement.",
    formName: "Nom",
    formEmail: "Email",
    formMessage: "Message",
    formSubmit: "Envoyer",
    formSuccess: "Message envoyé, merci ! Je reviens vers vous rapidement.",
    formError: "Une erreur est survenue, merci de réessayer.",
    availableRemote: "Disponible à distance",
  },
  footer: {
    rights: "Tous droits réservés.",
  },
} as const satisfies Dictionary;

export default fr;
