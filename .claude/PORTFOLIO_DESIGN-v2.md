# Fiche design v2 — Portfolio éditorial à rail latéral

> **Statut** : **implémentée** (étapes 1 à 9 du §10 livrées). Le document reste la
> référence du layout ; les écarts assumés entre le plan et le code sont signalés
> en ligne par des notes « **Tel qu'implémenté** ».
>
> Ce document remplace `PORTFOLIO_DESIGN.md`
> pour tout ce qui concerne la **mise en page globale** et la **navigation**.
> `PORTFOLIO_DESIGN.md` reste la référence pour l'intention éditoriale/magazine
> (titre géant, labels rotés, numérotation, filets fins) : la v2 ne l'annule pas,
> elle la réorganise.

## 1. Objectif de la v2

Faire passer la navigation du **bandeau horizontal en haut de page** à un
**rail latéral gauche persistant**, en s'inspirant du procédé de
[dimension.dev](https://dimension.dev) (colonne gauche fixe + colonne droite qui
défile, séparées par un filet hachuré).

Le gain n'est pas seulement esthétique : sur un **CV numérique**, un rail
persistant garde en permanence à l'écran l'identité (nom, rôle, disponibilité,
bouton CV). Le visiteur peut lire n'importe quelle section sans jamais perdre
« qui parle » ni le moyen de recruter. C'est la principale raison de ce
changement, et elle prime sur toute considération décorative.

### Ce qui change

| Avant (v1) | Après (v2) |
|---|---|
| `Navbar` sticky horizontale en haut | `SideRail` fixe à gauche (≥ `lg`) |
| Liens de nav en ligne, en majuscules | Sommaire vertical **numéroté** `01…05` avec indicateur de section active |
| Nom / rôle / tagline / CTA dans le `Hero` | Déplacés dans le rail (persistants) |
| Toggle thème + langue dans la navbar | En pied de rail |
| `max-w-6xl` centré sur toute la page | Colonne de contenu décalée à droite du rail |

### Ce qui ne change pas

- **Palette actuelle conservée** (§5) — ajouts uniquement, aucune teinte remplacée.
- Rendu **server-rendered**, contenu dans `lib/content/`, chaînes dans les dictionnaires.
- Les sections existantes et leur ordre : Hero → Projets → Compétences → Services → Outils → Contact.
- Tokens, `@theme inline`, `.dark` par classe, script anti-FOUC.
- Le titre géant du Hero et l'esthétique magazine.

---

## 2. Anatomie du layout

```
≥ lg (1024px)
+--------------------------+#-----------------------------------------------+
|  SideRail (fixe)         |#  Colonne de contenu (défile)                  |
|  w-[clamp(18rem,26vw,    |#                                               |
|         22rem)]          |#  +-----------------------------------------+  |
|                          |#  | 00  Hero : titre géant + portrait       |  |
|  +--+                    |#  +-----------------------------------------+  |
|  |RR|  * Dispo freelance |#  +-----------------------------------------+  |
|  +--+                    |#  | 01  Projets                             |  |
|                          |#  +-----------------------------------------+  |
|  h1  RAJAONSON           |#  +-----------------------------------------+  |
|      Randy Anne          |#  | 02  Compétences                         |  |
|                          |#  +-----------------------------------------+  |
|  Développeur .NET /      |#  +-----------------------------------------+  |
|  Next.js (React)         |#  | 03  Ce que je fais                      |  |
|                          |#  +-----------------------------------------+  |
|  tagline courte          |#  +-----------------------------------------+  |
|                          |#  | 04  Outils                              |  |
|  [ Télécharger mon CV ]  |#  +-----------------------------------------+  |
|  [ Me contacter ]        |#  +-----------------------------------------+  |
|                          |#  | 05  Contact  (footer)                   |  |
|  -- Sommaire --------    |#  +-----------------------------------------+  |
|  | Projets         01    |#                                               |
|    Compétences     02    |#                                               |
|    Ce que je fais  03    |#                                               |
|    Outils          04    |#                                               |
|    Contact         05    |#                                               |
|                          |#                                               |
|  -------------------     |#                                               |
|  FR / EN            (~)  |#                                               |
+--------------------------+#-----------------------------------------------+
                            \-- filet hachuré (RailHatch)
```

### Grille et dimensions

| Jeton | Valeur | Note |
|---|---|---|
| Largeur du rail | `clamp(18rem, 26vw, 22rem)` | exposée en `--rail-w` pour que le contenu s'aligne |
| Filet séparateur | `0.5px` + bande hachurée de `8px` | `border-border`, motif SVG |
| Décalage du contenu | `lg:ml-[var(--rail-w)]` | pas de `grid` sur `body` : le rail est `fixed`, donc hors flux |
| Largeur utile du contenu | `max-w-5xl` + `px-6 lg:px-10` | plus étroit qu'en v1 (`max-w-6xl`) puisque le rail mange la gauche |
| Rythme vertical des sections | `py-20 lg:py-28` | inchangé, un cran plus aéré en desktop |
| `scroll-mt` des sections | `scroll-mt-24 lg:scroll-mt-10` | compense la barre mobile ; quasi nul en desktop |

### Comportement responsive

| Palier | Navigation |
|---|---|
| `< lg` | **Barre horizontale sticky en haut** (`MobileBar`) : `RR` + `FR/EN` + toggle thème. Les liens de section passent dans un `details`/`summary` natif (aucun JS). |
| `≥ lg` | Rail latéral fixe complet, tel que schématisé ci-dessus. |

> **Tel qu'implémenté** : sous `lg`, le rail ne disparaît pas — son **bloc
> d'identité** (pastille dispo, `h1`, rôle, tagline, 2 CTA) reste en flux normal
> juste sous la barre, ce qui garde le `h1` et les CTA visibles sur mobile. Un
> `hidden lg:block` sur tout le rail les aurait supprimés du mobile, ce qui est
> inacceptable sur un CV. La règle qui en découle, à tenir : **chaque élément
> d'identité n'a qu'un seul porteur à un palier donné**. Le monogramme et
> l'avatar sont donc `hidden lg:flex` dans `SideRail` (c'est `MobileBar` qui
> porte `RR` sous `lg`), et la pastille de disponibilité n'existe **que** dans
> `SideRail`. Le sommaire et le pied (langue + thème) du rail restent
> `hidden lg:flex`, `MobileBar` en tenant lieu.

> **Décision** : on ne fait pas de « rail réduit en icônes » sur tablette. Un rail
> à 26vw est illisible sous 1024px, et un rail d'icônes sans libellé est mauvais
> pour l'accessibilité comme pour le SEO. Un seul point de bascule, franc.

---

## 3. Contenu du rail — correspondance avec l'existant

Le rail absorbe **l'intégralité de la `Navbar` v1** plus la **moitié gauche du `Hero` v1**.

| Bloc du rail | Provenance | Source de la chaîne |
|---|---|---|
| Monogramme `RR` | `Navbar` | en dur (`font-display`) |
| Avatar (petit, `size-14`, rond) | nouveau | `siteConfig.avatarUrl` |
| Pastille « Disponible en freelance » | `Navbar` | `dict.nav.availability` |
| `h1` nom | `Hero` | `dict.hero.name` |
| Rôle | `Hero` | `dict.hero.role` |
| Tagline (2 lignes max) | `Hero` | `dict.hero.tagline` |
| Bouton « Télécharger mon CV » | `Hero` | `dict.hero.downloadCv` + `siteConfig.cvUrl` |
| Bouton « Me contacter » | `Hero` | `dict.hero.contactCta` |
| Titre du sommaire | nouveau | **`dict.nav.sections` à créer** |
| Sommaire numéroté | `Navbar` (liens) | `dict.nav.*` |
| `LocaleSwitcher` + `ThemeToggle` | `Navbar` | inchangés |

### Ce qui reste dans le `Hero` (première dalle de droite)

- Le titre géant (`dict.hero.kicker`) — l'effet « couverture de magazine ».
  > **Tel qu'implémenté** : le kicker n'est plus le mot unique « PORTFOLIO » mais
  > une locution (« DEVELOPPEUR FULL STACK » / « FULL STACK DEVELOPER »). Deux
  > conséquences à ne pas défaire :
  > 1. **Le titre se dimensionne en `cqw`, pas en `vw`.** Un `@container` enveloppe
  >    le `<p>` : la taille suit la largeur réelle de la colonne, alors que `vw`
  >    ignorait les ~22rem prises par le rail et surdimensionnait le titre en
  >    desktop. Échelle : `text-[18cqw] sm:text-[16cqw] lg:text-[14cqw]`, calibrée
  >    pour que le mot le plus long tienne sur une ligne de 320px à 2560px.
  > 2. **`text-balance` + `leading-[0.85]`** : le kicker se replie en lignes de
  >    longueur égale, empilées serré — c'est le bloc de titre d'une couverture,
  >    pas un débordement. Une locution plus longue exige de rebaisser l'échelle.
  >
  > Le kicker reste `aria-hidden` : il redit le rôle que le rail énonce déjà en
  > clair, et un lecteur d'écran n'a pas à l'entendre deux fois. Ce n'est plus
  > « du décor », c'est un doublon assumé — si le kicker cessait un jour de
  > paraphraser le rôle, il faudrait le ré-exposer.
- Le portrait grand format devant le cercle `accent`.
- Les `VerticalLabel` rotés. Le `VerticalLabel` de gauche reprend `dict.hero.role`,
  et c'est **le seul rappel du rôle dans le Hero** : pas de sur-titre en clair
  au-dessus du mot géant. Le rail porte déjà le rôle en toutes lettres, et le
  label roté n'existe qu'à partir de `lg` — sous `lg`, le rôle n'est donc affiché
  qu'une fois, dans le bloc d'identité.
- La `bio` longue (`dict.hero.bio`), qui n'a pas sa place dans un rail étroit.

Le `h1` **quitte** le Hero pour le rail : dans l'ordre du DOM le rail vient en
premier, donc le `h1` reste le premier titre de la page. Le mot `PORTFOLIO`
demeure `aria-hidden` comme en v1.

### Chaînes à ajouter aux dictionnaires

`types/dictionary.ts` → `nav` :

```ts
nav: {
  projects: string;
  skills: string;
  services: string;
  tools: string;      // AJOUT — la section Outils n'avait pas de libellé de nav
  contact: string;
  availability: string;
  sections: string;   // AJOUT — titre du sommaire du rail
  menuLabel: string;  // AJOUT — aria-label du <nav> et du <summary> mobile
}
```

| Clé | `fr` | `en` |
|---|---|---|
| `nav.tools` | `Outils` | `Tools` |
| `nav.sections` | `Sommaire` | `Contents` |
| `nav.menuLabel` | `Navigation principale` | `Main navigation` |

---

## 4. Le sommaire numéroté

Le procédé le plus directement repris de dimension.dev.

### Structure des entrées

Une source unique, dérivée du dictionnaire, partagée par le rail et la barre mobile :

```ts
// lib/nav.ts
import type { Dictionary } from "@/types/dictionary";

export type NavSection = { id: string; label: string };

export function getNavSections(dict: Dictionary): NavSection[] {
  return [
    { id: "projects", label: dict.nav.projects },
    { id: "skills", label: dict.nav.skills },
    { id: "services", label: dict.nav.services },
    { id: "tools", label: dict.nav.tools },
    { id: "contact", label: dict.nav.contact },
  ];
}
```

L'index d'affichage (`01`…`05`) est **calculé à partir de la position**, jamais
écrit en dur, pour qu'ajouter une section ne demande aucune renumérotation.

### Rendu d'une entrée

```
+-----------------------------------------+
| | Projets                         01    |   <- active : barre 3px accent + fond
|   Compétences                     02    |
+-----------------------------------------+
```

- Libellé à gauche (`text-base`), numéro à droite (`font-display`, `text-muted-foreground`).
- Entrée active : barre verticale `w-[3px] h-5 rounded-[2px] bg-accent` +
  `bg-foreground/[0.04]` sur la ligne, et le numéro passe en `text-accent-strong`.
- Transition `duration-200` sur `color` et `background-color` uniquement
  (jamais sur `width`/`height` : ça déclenche du layout).
- Hauteur de cible tactile ≥ 44px (`py-2.5` minimum).

### État actif — la seule île client de la v2

`components/layout/SideRailNav.tsx` en `"use client"` :

- `IntersectionObserver` sur les 5 `section`, `threshold: 0.5`, `rootMargin`
  ajusté pour que la section « active » soit celle qui occupe le centre du viewport.
- Un seul observer, créé une fois, nettoyé au démontage.
- Aucune écoute de `scroll` (pas de `requestAnimationFrame`, pas de
  `getBoundingClientRect` à chaque frame).
- L'`id` actif est aussi reflété en `aria-current="true"` sur le lien.

> **Point SEO important** : un composant `"use client"` est **quand même rendu
> côté serveur** par le App Router. Les cinq `<a href="#projects">` sont donc
> présents dans le HTML initial, crawlables, et fonctionnels sans JavaScript.
> Le JS n'ajoute que le surlignage. C'est la différence exacte avec
> dimension.dev, dont le `body` servi est vide.

### Défilement

```css
/* app/globals.css */
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

- Ancres HTML natives (`href="#projects"`), pas de `scrollIntoView` en JS.
- **Pas de `scroll-snap-type: y mandatory`.** dimension.dev l'utilise pour son
  récit de journée ; sur un CV c'est nuisible : le visiteur veut survoler,
  revenir, comparer. Le snap lui confisque le contrôle du défilement et pénalise
  la lisibilité au clavier et au lecteur d'écran.
- **Pas de hero `sticky` recouvert par un panneau blanc.** Trop coûteux en
  repaints pour le bénéfice, et redondant avec un rail déjà fixe.

---

## 5. Palette — conservée, complétée

### 5.1 Les tokens actuels restent tels quels

Aucune des valeurs de `app/globals.css` n'est remplacée :

```
CLAIR   --background #f5f1ea   --foreground #14110f   --accent #c1613f
        --muted #ffffff        --muted-foreground #6b645c
SOMBRE  --background #140a0a   --foreground #f5f1ea   --accent #a8382c
        --muted #1c1010        --muted-foreground #c9beb6
```

Ratios WCAG mesurés sur la palette actuelle :

| Paire | Ratio | Verdict |
|---|---|---|
| clair `foreground` / `background` | **16,70:1** | AAA |
| clair `muted-foreground` / `background` | **5,18:1** | AA |
| clair `muted-foreground` / `muted` | **5,83:1** | AA |
| clair `foreground` / `muted` | **18,80:1** | AAA |
| sombre `foreground` / `background` | **17,31:1** | AAA |
| sombre `muted-foreground` / `background` | **10,70:1** | AAA |
| sombre `muted-foreground` / `muted` | **10,19:1** | AAA |
| sombre `accent-foreground` / `accent` | **5,71:1** | AA |
| clair `accent` / `background` | **3,69:1** | ⚠️ grand texte seulement |
| clair `accent-foreground` / `accent` | **3,69:1** | ⚠️ grand texte seulement |
| sombre `accent` / `background` | **3,03:1** | ⚠️ grand texte seulement |

Le corps de texte et les surfaces sont donc **très bons**. Le seul point faible
est le terracotta **en petit texte** — or c'est précisément l'usage que la v2
multiplie (numéros du sommaire, libellé actif, liens survolés, pastille de
disponibilité).

### 5.2 Ajout : `--accent-strong` (amélioration nécessaire)

On **garde `--accent` pour les aplats, les grands titres, les barres et les
pastilles**, et on ajoute une variante assombrie/éclaircie réservée au **texte de
petite taille et aux états interactifs** :

```css
:root {
  --accent-strong: #a04f34; /* 5,09:1 sur --background · 5,73:1 sur --muted */
}
.dark {
  --accent-strong: #bd685f; /* 4,93:1 sur --background · 4,69:1 sur --muted */
}
```

Mappé dans `@theme inline` :

```css
@theme inline {
  --color-accent-strong: var(--accent-strong);
}
```

Règle d'emploi, à appliquer sans exception :

| Usage | Token |
|---|---|
| Aplat de fond, cercle du portrait, barre de compétence, pastille, barre active | `accent` |
| Titre ≥ 24px, ou ≥ 18,66px gras | `accent` |
| Texte < 24px : liens, numéros `01…05`, libellé actif, `hover:` | **`accent-strong`** |
| Fond de bouton plein portant du texte clair | **`accent-strong`** (5,09:1 en clair) |

Cela corrige au passage deux défauts de la v1 : `Hero` utilise `text-accent` sur
un `text-lg` (18px non gras → 3,69:1, insuffisant) et `Navbar` utilise
`hover:text-accent` sur du `text-xs`.

### 5.3 Ajout : tokens de structure du rail

```css
:root {
  --rail-surface: #f0ebe2; /* légèrement plus dense que --background */
  --hatch: rgb(20 17 15 / 0.14);
}
.dark {
  --rail-surface: #1a0e0e;
  --hatch: rgb(245 241 234 / 0.14);
}
```

Le rail est **très légèrement plus sombre que la page en clair, très légèrement
plus clair en sombre**. C'est ce qui le fait lire comme un « bord de page » sans
recourir à une ombre portée — coûteuse et étrangère au style éditorial.

`--rail-w` est posée sur le conteneur de page (pas dans `:root`) afin que le
`clamp()` soit résolu une seule fois et partagé par le rail et le `main`.

### 5.4 Tokens en canaux RGB — **écarté, sans objet**

dimension.dev stocke ses couleurs en triplets (`--gray-200: 229 229 229`) et les
consomme en `rgba(var(--gray-200) / 1)` pour débloquer les modificateurs
d'opacité Tailwind. Cette contorsion était nécessaire en **Tailwind v3**.

**En Tailwind v4, elle ne l'est plus** : le moteur applique un modificateur
d'opacité à n'importe quelle couleur, hex compris, via `color-mix()`.
`bg-accent/12` et `bg-foreground/[0.04]` (la ligne active du sommaire)
fonctionnent tels quels sur les tokens hex actuels. Migrer la palette en
triplets serait une refonte mécanique de `globals.css` pour **zéro gain** :
ne pas la faire.

Seule limite réelle, à connaître : `--border` est déjà stocké *avec* son alpha
(`rgb(20 17 15 / 0.12)`), donc `border-border/50` ne compose pas. Si le besoin
apparaît un jour, c'est **ce token-là seul** qu'il faudra scinder en
`--border-rgb` + alpha, pas la palette entière.

---

## 6. Typographie et micro-labels

Aucune police n'est ajoutée : `Bebas Neue` (display), `Geist` (sans) et
`Geist Mono` restent.

### Échelle du rail

| Élément | Classes |
|---|---|
| Monogramme `RR` | `font-display text-3xl tracking-wide` |
| `h1` nom | `font-display text-3xl leading-none tracking-wide xl:text-4xl` |
| Rôle | `text-sm text-accent-strong` |
| Tagline | `text-sm text-muted-foreground` (2 lignes max) |
| Titre du sommaire | `text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground` |
| Entrée de sommaire | `text-base` |
| Numéro | `font-display text-sm text-muted-foreground` (actif : `text-accent-strong`) |
| Pastille dispo | `text-[11px] uppercase tracking-[0.2em]` |

### Micro-labels

On conserve la signature v1 (`uppercase` + `tracking-[0.2em→0.3em]` +
`text-muted-foreground`) pour tous les sur-titres. C'est déjà le bon vocabulaire
éditorial ; le rail l'utilise pour « Sommaire » et pour la pastille.

> **À ne pas reprendre de dimension.dev** : leur échelle sémantique en classes
> utilitaires (`heading-3xl`, `body-md`). Elle est bonne dans un produit à
> centaines d'écrans, mais ici elle ajouterait une couche d'indirection pour une
> quinzaine de tailles distinctes. `SectionHeading` joue déjà ce rôle de garde-fou.

---

## 7. Procédés repris de dimension.dev

### 7.1 Le filet hachuré (`RailHatch`) — à faire

Le séparateur rail/contenu. Un `pattern` SVG de traits, dans une bande de 8px
bordée d'un filet, `aria-hidden`.

```tsx
// components/ui/RailHatch.tsx  (Server Component, aucun état)
export default function RailHatch() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 box-content h-full w-2 border-r border-border px-1.5"
    >
      <defs>
        <pattern id="rail-hatch" width="8" height="8" patternUnits="userSpaceOnUse">
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
```

Coût : ~15 lignes, aucun JS, aucune image, rendu statique côté serveur.

> **Attention au motif.** Une tuile ne doit contenir que des segments **obliques**
> qui se raccordent d'une tuile à l'autre : le segment central traverse la tuile,
> les deux autres complètent les coins. Un `d="M0 0H16"` (trait **horizontal**,
> tuile `8×16`) — la première version de cette fiche — ne produit pas des
> hachures mais une échelle de traits horizontaux, et le `path` déborde de la
> tuile où il est écrêté. Le `strokeWidth` est explicite : la valeur par défaut
> de `1` n'est pas une garantie sur laquelle s'appuyer.

### 7.2 La grille « papier millimétré » du footer — à faire

Reprise pour `ContactFooter` : cellules bordées `border-border` avec un point de
`8px` à chaque intersection (`size-2 rounded-full bg-[var(--rail-surface)]`
contenant un noyau `size-[3.5px] bg-foreground/10`). Cohérent avec l'intention
« filets fins + numérotation » de `PORTFOLIO_DESIGN.md`, et purement décoratif
donc entièrement `aria-hidden`.

### 7.3 Le liseré interne des boutons — à faire

Le détail qui donne le relief, sur le CTA **secondaire** du rail :

```
shadow-[0_0_0_0.5px_rgb(20_17_15/0.12),0_2px_3px_rgb(20_17_15/0.04),0_-1px_0_0_rgb(255_255_255/0.6)_inset]
```

La dernière ombre — un trait blanc de 1px **à l'intérieur, en haut** — simule une
arête biseautée. Version sombre : `rgb(245_241_234/0.10)` en inset.

> **Tel qu'implémenté** : uniquement sur « Me contacter ». Le bouton « Télécharger
> mon CV » est un aplat `bg-foreground` : un liseré clair posé dessus lirait comme
> un défaut d'impression, pas comme un biseau. Un bouton plein n'a pas besoin de
> ce relief, son contraste le porte déjà.

### 7.4 `mix-blend-plus-lighter` — écarté pour l'instant

Excellent chez dimension.dev parce que leurs textes discrets sont posés sur des
dégradés photographiques. Nos fonds sont des aplats : `text-muted-foreground`
suffit et est mesurable (5,18:1). À ressortir si une section reçoit un jour une
image de fond.

### 7.5 Verre cannelé WebGL, ciel narratif, morph `layoutId` — écartés

- **Shader WebGL** : `canvas` non indexable, coût GPU, dépendance externe. Rédhibitoire.
- **Ciel qui change selon l'heure** : superbe, mais raconte une journée de travail
  — un récit qui appartient à leur produit, pas à un CV. Un décalage d'accent
  discret par section est le maximum souhaitable (§12, optionnel).
- **Morph `layoutId` Framer Motion** : ajouterait ~40 Ko de JS pour ouvrir une
  fiche projet. Une page `/[locale]/projets/[slug]` server-rendered est meilleure
  pour le SEO **et** plus rapide.

---

## 8. Contraintes non négociables

Ces quatre règles arbitrent la v2. En cas de conflit entre une idée visuelle et
l'une d'elles, l'idée visuelle cède.

### SEO

- Le rail est un **Server Component**. Seul `SideRailNav` est `"use client"`, et
  uniquement pour l'état actif : ses `<a>` sont dans le HTML servi.
- **Un seul `h1`** sur la page, dans le rail (`dict.hero.name`). Les sections
  gardent leurs `h2`. Vérifier qu'aucun `h3` n'apparaît sans `h2` parent.
- Balises sémantiques : `header` pour le rail, `nav aria-label` pour le sommaire,
  `main` pour la colonne de contenu, `footer` pour le contact.
- Toutes les ancres restent des `<a href="#…">` réels — un crawler sans JS voit et
  suit la structure complète de la page.
- Aucun texte n'entre dans une image, un `canvas` ou un pseudo-élément.
- `sitemap.ts`, `robots.ts`, `generateMetadata`, JSON-LD `Person` : intacts. Si
  des pages projet arrivent, étendre le sitemap dans le même mouvement.

### Server-rendered

- Zéro `useEffect` pour afficher du contenu. Le seul effet de la v2 observe le
  scroll pour décorer.
- Le contenu continue de venir de `lib/content/` et des dictionnaires, résolus à
  la requête. Pas de fetch client.
- `generateStaticParams` sur `[locale]` conservé : les deux langues restent prérendues.

### Fluidité

- **Aucun listener `scroll`.** `IntersectionObserver` uniquement.
- N'animer que `opacity`, `color`, `background-color`, `transform`. Jamais
  `width`, `height`, `top`, `margin`.
- Rail en `position: fixed` → hors flux, il ne provoque aucun reflow au scroll.
- `next/image` avec `sizes` explicite partout ; `priority` sur le portrait du Hero
  et **pas** sur l'avatar du rail (petit, et non déterminant pour le LCP).
- Objectif Core Web Vitals à ne pas dégrader : **CLS < 0,1** (réserver la hauteur
  de l'avatar et du portrait), **LCP** = le portrait du Hero.
- Le rail ne doit jamais introduire de scroll horizontal : `overflow-x: clip` sur
  le conteneur, et le sommaire scrolle en interne (`max-h`, `overflow-y-auto`,
  `hide-scrollbar`) s'il dépasse.
  > **Deux conteneurs de défilement, et c'est voulu** : `overflow-y-auto` sur le
  > sommaire *et* sur le corps du rail. Ils ne font pas doublon. Le bloc
  > d'identité a un `min-height: auto` implicite de flex item : il ne se comprime
  > pas. C'est donc le sommaire (`min-h-0`) qui absorbe le manque de place et
  > scrolle le premier ; celui du rail ne sert que dans le cas extrême où
  > identité + pied dépassent à eux seuls la hauteur du viewport (écran bas).
  > Ne pas en supprimer un « pour simplifier ».

### Accessibilité (indissociable de l'UX d'un CV)

- Un lien **« Aller au contenu »** en tête de DOM (`sr-only focus:not-sr-only`) :
  avec un rail de 5 liens avant le contenu, il devient indispensable.
- `aria-current="true"` sur l'entrée active du sommaire.
- Focus visible sur tous les interactifs :
  `focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2`.
- Cibles tactiles ≥ 44px dans la barre mobile.
- `prefers-reduced-motion` respecté pour le `scroll-behavior` et toute transition.
- Tout élément décoratif (hachures, points de grille, mot `PORTFOLIO`, cercle
  accent) porte `aria-hidden="true"`.

---

## 9. Découpage des fichiers

```
app/[locale]/
  page.tsx                      MODIFIÉ   compose SideRail + <main> décalé
  layout.tsx                    inchangé
components/layout/
  SideRail.tsx                  NOUVEAU   Server Component — le rail complet
  SideRailNav.tsx               NOUVEAU   "use client" — sommaire + section active
  MobileBar.tsx                 NOUVEAU   barre sticky < lg
  Navbar.tsx                    SUPPRIMÉ  après migration
  ThemeToggle.tsx               inchangé
  LocaleSwitcher.tsx            inchangé
components/ui/
  RailHatch.tsx                 NOUVEAU   filet hachuré SVG
  SkipLink.tsx                  NOUVEAU   « Aller au contenu »
  SectionHeading.tsx            inchangé
  NumberedLabel.tsx             inchangé
  VerticalLabel.tsx             inchangé
components/sections/
  Hero.tsx                      MODIFIÉ   perd h1/rôle/tagline/CTA, garde PORTFOLIO + portrait
  ToolsSection.tsx              MODIFIÉ   ajout de id="tools"
  ContactFooter.tsx             MODIFIÉ   grille « papier millimétré »
  (autres)                      MODIFIÉ   scroll-mt + largeur de conteneur
lib/
  nav.ts                        NOUVEAU   getNavSections(dict)
types/dictionary.ts             MODIFIÉ   nav.tools, nav.sections, nav.menuLabel
app/[locale]/dictionaries/*.ts  MODIFIÉ   les 3 clés ci-dessus
app/globals.css                 MODIFIÉ   --accent-strong, --rail-surface, --hatch, scroll-behavior
```

---

## 10. Plan d'implémentation

Neuf étapes, chacune vérifiable et committable seule. Format de commit imposé par
`.claude/RULES.md` : `Type(Portée) : description à l'impératif`.

| # | Étape | Livrable | Commit suggéré |
|---|---|---|---|
| 1 | **Tokens** — `--accent-strong` (clair + sombre), `--rail-surface`, `--hatch`, mapping `@theme inline`, `scroll-behavior` sous `prefers-reduced-motion` | `app/globals.css` | `style(tokens) : ajoute l'accent renforce et les tokens du rail` |
| 2 | **Dictionnaires** — `nav.tools`, `nav.sections`, `nav.menuLabel` dans le type puis en `fr`/`en` ; `lib/nav.ts` | type + 2 dicos + `lib/nav.ts` | `feat(i18n) : ajoute les libelles de navigation du rail` |
| 3 | **Ancres** — `id="tools"` sur `ToolsSection`, `scroll-mt-*` sur les 5 sections, `id="top"` conservé | 5 sections | `fix(sections) : harmonise les ancres et le decalage de scroll` |
| 4 | **Primitives** — `RailHatch`, `SkipLink` | 2 fichiers | `feat(ui) : ajoute le filet hachure et le lien d'evitement` |
| 5 | **Sommaire** — `SideRailNav` avec `IntersectionObserver`, `aria-current`, numérotation dérivée | 1 fichier | `feat(nav) : ajoute le sommaire numerote a section active` |
| 6 | **Rail** — `SideRail` : monogramme, avatar, pastille, `h1`, rôle, tagline, 2 CTA, sommaire, langue + thème | 1 fichier | `feat(layout) : ajoute le rail lateral persistant` |
| 7 | **Bascule** — `MobileBar` `< lg`, et `page.tsx` : `<main className="lg:ml-[var(--rail-w)]">` | `MobileBar` + `page.tsx` | `feat(layout) : bascule la navigation sur le rail lateral` |
| 8 | **Hero allégé** — retire `h1`/rôle/tagline/CTA, garde `PORTFOLIO`, portrait, `bio`, labels rotés ; **supprime `Navbar.tsx`** | `Hero.tsx`, suppression | `refactor(hero) : recentre le hero sur la couverture editoriale` |
| 9 | **Footer millimétré** — grille de filets + points sur `ContactFooter` | 1 fichier | `style(contact) : habille le footer d'une grille millimetree` |

### Ordre imposé

Les étapes 1→4 sont additives et sans effet visible : elles peuvent être
committées sans rien casser. La bascule réelle a lieu à l'**étape 7** ; c'est le
seul commit où le site est visuellement à mi-chemin, d'où l'intérêt de le garder
court. L'étape 8 supprime `Navbar.tsx` **seulement après** que le rail et la barre
mobile sont en place.

### Vérification à chaque étape

`pnpm lint` puis `pnpm build`. Aucun test runner n'est configuré : la recette est
manuelle (§11). Ne pas exécuter `git push` — le push reste une action manuelle de
l'utilisateur.

---

## 11. Checklist de recette

### Fonctionnel

- [ ] Les 5 ancres du rail défilent vers la bonne section, en `fr` et en `en`.
- [ ] L'entrée active suit le scroll dans les deux sens et se stabilise (pas de clignotement entre deux sections).
- [ ] `FR / EN` bascule la langue sans écran blanc, et le rail reste identique.
- [ ] Le toggle de thème bascule, la préférence survit au rechargement, aucun FOUC.
- [ ] Bouton CV : télécharge bien `siteConfig.cvUrl`.

### Sans JavaScript (test décisif)

- [ ] JS désactivé : le rail, le nom, le sommaire, les 5 liens et tout le contenu
      des sections sont **visibles et utilisables**. Seul le surlignage de section
      active disparaît.
- [ ] `curl -s http://localhost:3000/fr | grep -c 'href="#'` retourne au moins 5.

### SEO

- [ ] Un seul `h1` par page ; hiérarchie `h1 → h2` sans saut.
- [ ] `header` / `nav aria-label` / `main` / `footer` présents et uniques.
- [ ] `generateMetadata`, `alternates.languages`, OG, JSON-LD `Person` inchangés et valides.
- [ ] `/robots.txt` et `/sitemap.xml` répondent toujours.
- [ ] Toutes les images ont un `alt` : descriptif pour le portrait et l'avatar,
      **vide** (`alt=""`) pour le décoratif.

### Performance

- [ ] Aucun listener de scroll dans le bundle client
      (`grep -rn "addEventListener" components/`).
- [ ] Aucun scroll horizontal, de 320px à 2560px de large.
- [ ] CLS < 0,1 (avatar et portrait à dimensions réservées).
- [ ] Le rail ne repeint pas pendant le scroll (DevTools → Rendering → Paint flashing).

### Accessibilité

- [ ] Tabulation : `SkipLink` → rail → sommaire → contenu, dans cet ordre, focus toujours visible.
- [ ] `aria-current="true"` sur l'entrée active, et sur une seule.
- [ ] Contrastes conformes au tableau du §5.2 — vérifier en particulier qu'aucun
      texte < 24px n'utilise `text-accent` au lieu de `text-accent-strong`.
- [ ] `prefers-reduced-motion: reduce` : plus de défilement animé, plus de transition.
- [ ] Cibles tactiles ≥ 44px sur la barre mobile.

### Responsive

- [ ] `< lg` : barre horizontale sticky, aucun rail, aucun décalage résiduel à gauche.
- [ ] `≥ lg` : rail fixe, contenu décalé de `--rail-w`, filet hachuré aligné.
- [ ] Sommaire long : scrolle en interne sans déborder du rail.

---

## 12. Améliorations optionnelles, après la v2

À n'ouvrir qu'une fois la §11 verte, et chacune dans son propre commit.

1. **Pages projet** `/[locale]/projets/[slug]` server-rendered, avec
   `generateStaticParams`, métadonnées par projet, JSON-LD `CreativeWork` et
   extension du `sitemap.ts`. Remplace avantageusement le morph de carte de
   dimension.dev.
2. **Décalage d'accent par section** — version sobre du « ciel narratif » : une
   variable `--section-tint` qui glisse très légèrement d'une section à l'autre.
   À ne tenter qu'en garantissant les contrastes du §5.2 sur **chaque** teinte.
3. **Pilule de navigation flottante en bas** sur mobile (comme sur la capture de
   dimension.dev) en remplacement du `details`, si le sommaire mobile s'avère trop
   enfoui à l'usage.
4. **Contenu réel** — c'est le vrai reliquat : `lib/content/` est encore truffé de
   `TODO` (projets, CV, liens sociaux, nom de domaine dans `lib/json-ld.ts`). Aucun
   raffinement de layout ne compensera un portfolio rempli de placeholders.
