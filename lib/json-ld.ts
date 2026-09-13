import { siteConfig, contactInfo } from "@/lib/content/site-config";
import { skills } from "@/lib/content/skills";
import type { Locale } from "@/lib/i18n/config";

// TODO: remplacer par le vrai nom de domaine une fois le site déployé sous un domaine dédié
export const siteUrl = "https://my-portfolio-five-sepia-90.vercel.app";

/**
 * @param jobTitle intitule du poste dans la langue de la page — passer
 * `dict.hero.role`, pour que /en ne serve pas un intitule en francais.
 */
export function personJsonLd(locale: Locale, jobTitle: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle,
    url: `${siteUrl}/${locale}`,
    email: `mailto:${contactInfo.email}`,
    // schema.org n'a pas de propriete standard pour le niveau de maitrise :
    // knowsAbout ne porte que les intitules. Le niveau reste une information
    // visuelle et textuelle de la page.
    knowsAbout: skills.map((skill) => skill.name),
    sameAs: contactInfo.socials.map((social) => social.href),
  };
}
