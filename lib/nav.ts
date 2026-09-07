import type { Dictionary } from "@/types/dictionary";

export type NavSection = {
  /** Doit correspondre a l'attribut id de la <section> ciblee. */
  id: string;
  label: string;
};

/**
 * Source unique des entrees de navigation, partagee par le rail lateral et la
 * barre mobile. L'ordre determine la numerotation affichee (01, 02...) : ajouter
 * une section ici suffit, aucun numero n'est ecrit en dur.
 */
export function getNavSections(dict: Dictionary): NavSection[] {
  return [
    { id: "projects", label: dict.nav.projects },
    { id: "skills", label: dict.nav.skills },
    { id: "services", label: dict.nav.services },
    { id: "tools", label: dict.nav.tools },
    { id: "contact", label: dict.nav.contact },
  ];
}

/** Numero d'affichage d'une entree, a partir de son index (0 -> "01"). */
export function sectionNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}
