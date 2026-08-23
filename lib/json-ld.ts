import { siteConfig, contactInfo } from "@/lib/content/site-config";
import type { Locale } from "@/lib/i18n/config";

// TODO: remplacer par le vrai nom de domaine une fois le site déployé sous un domaine dédié
export const siteUrl = "https://my-portfolio-five-sepia-90.vercel.app";

export function personJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Développeur .NET / Next.js (React)",
    url: `${siteUrl}/${locale}`,
    email: `mailto:${contactInfo.email}`,
    // TODO: ajouter les liens sociaux réels une fois disponibles
    sameAs: contactInfo.socials.map((social) => social.href),
  };
}
