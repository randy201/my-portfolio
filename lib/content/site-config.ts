import type { ContactInfo } from "@/types/content";

export const contactInfo: ContactInfo = {
  email: "randy.rajaonson@gmail.com",
  location: "Madagascar — disponible à distance",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/randy-rajaonson" },
    { label: "WhatsApp", href: "https://wa.me/261343413421" },
    { label: "GitHub", href: "https://github.com/randy201" },
  ],
};

export const siteConfig = {
  name: "RAJAONSON Randy Anne",
  avatarUrl: "/avatar/rr-placeholder.svg",
  cvUrl: "/cv/randy-rajaonson-cv.pdf",
  /**
   * Nom propose au telechargement, independant du nom servi : l'URL reste en
   * minuscules sans espace (pas d'encodage %20 dans le HTML), le visiteur
   * recupere quand meme un fichier lisible.
   */
  cvDownloadName: "Randy-Rajaonson-CV.pdf",
};
