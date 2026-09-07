export type Dictionary = {
  meta: {
    titleTemplate: string;
    defaultTitle: string;
    description: string;
  };
  nav: {
    projects: string;
    skills: string;
    services: string;
    tools: string;
    contact: string;
    availability: string;
    /** Titre du sommaire numerote du rail lateral. */
    sections: string;
    /** aria-label du <nav> et libelle du menu deroulant mobile. */
    menuLabel: string;
    /** Lien d'evitement vers le contenu principal (accessibilite clavier). */
    skipToContent: string;
  };
  hero: {
    kicker: string;
    name: string;
    role: string;
    tagline: string;
    bio: string;
    downloadCv: string;
    contactCta: string;
  };
  projects: {
    heading: string;
    subheading: string;
    intro: string;
    viewAll: string;
    viewProject: string;
  };
  skills: {
    heading: string;
    subheading: string;
    quote: string;
  };
  services: {
    heading: string;
    subheading: string;
    processHeading: string;
  };
  tools: {
    heading: string;
    subheading: string;
  };
  contact: {
    heading: string;
    subheading: string;
    intro: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    formSubmit: string;
    formSuccess: string;
    formError: string;
    availableRemote: string;
  };
  footer: {
    rights: string;
  };
};
