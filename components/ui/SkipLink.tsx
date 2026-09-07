/**
 * Lien d'evitement vers le contenu principal. Indispensable ici : le rail
 * lateral place cinq liens de navigation avant le contenu dans l'ordre du DOM.
 * Invisible jusqu'a la prise de focus au clavier.
 */
export default function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-foreground focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-background"
    >
      {label}
    </a>
  );
}
