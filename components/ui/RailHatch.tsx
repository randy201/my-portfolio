/**
 * Filet hachure separant le rail lateral de la colonne de contenu.
 * Purement decoratif : aucun etat, aucun JS, rendu cote serveur.
 *
 * Le motif est une tuile de 8x8 portant trois segments a 45 deg : celui du
 * centre traverse la tuile, les deux autres completent les coins pour que les
 * tuiles voisines se raccordent sans rupture visible.
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
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-2 2 L2 -2 M0 8 L8 0 M6 10 L10 6"
            stroke="var(--hatch)"
            strokeWidth="1"
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#rail-hatch)" />
    </svg>
  );
}
