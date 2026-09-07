/**
 * Filet hachure separant le rail lateral de la colonne de contenu.
 * Purement decoratif : aucun etat, aucun JS, rendu cote serveur.
 */
export default function RailHatch() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 box-content h-full w-2 border-r border-border px-1.5"
    >
      <defs>
        <pattern
          id="rail-hatch"
          width="8"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <path d="M0 0H16" stroke="var(--hatch)" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#rail-hatch)" />
    </svg>
  );
}
