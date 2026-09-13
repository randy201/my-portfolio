# CLAUDE.md — point d'entrée du dépôt

**Ce fichier ne contient pas toute la connaissance du projet. Son rôle est de te
dire quel document fait autorité pour la tâche que tu t'apprêtes à faire**, et de
rassembler les faits et les règles qui valent pour *tout* changement.

Ordre de lecture : ce fichier en entier — il est court et conçu pour être lu d'un
bloc — puis **uniquement** les documents que le §2 désigne pour ta tâche.

@AGENTS.md
@.claude/RULES.md

> Les deux lignes ci-dessus sont des imports automatiques de Claude Code. Si tu
> es un autre agent, lis toi-même `AGENTS.md` et `.claude/RULES.md` : leur
> contenu est obligatoire, pas indicatif.

---

## 1. Règles absolues

Elles priment sur toute autre considération.

1. **Aucune mention d'une IA comme auteur, co-auteur ou contributeur**, nulle
   part : commits, messages de commit, PR, README, code, commentaires,
   documentation. Jamais de ligne `Co-Authored-By: Claude`.
2. **Jamais `git push`.** Les commits locaux sont autorisés quand ils sont
   demandés ; l'envoi vers le remote est une action manuelle de l'utilisateur.
3. **Format de commit imposé** : `Type(Portée) : Description` — description à
   l'impératif, sans point final, sans accent dans le sujet (convention du
   dépôt). Types : `feat`, `fix`, `refactor`, `style`, `docs`, `chore`, `perf`,
   `test`. Exemple : `feat(header) : ajoute la navigation responsive`.
4. **`pnpm`, jamais `npm` ni `yarn`** (`packageManager: pnpm@10.34.5`).
5. **Aucune chaîne d'interface en dur dans un composant.** Tout texte visible
   vient du dictionnaire i18n (§4).

Détail complet : `.claude/RULES.md`.

---

## 2. Table de routage — quel document fait autorité

Trouve la ligne qui décrit ta tâche, lis le document indiqué **avant** d'écrire
du code.

| Ta tâche touche à… | Document qui fait autorité | Statut |
|---|---|---|
| Mise en page globale, rail latéral, navigation, sommaire numéroté, barre mobile, bascule responsive | `.claude/PORTFOLIO_DESIGN-v2.md` | **En vigueur**, intégralement implémenté |
| Tokens de couleur, règle de contraste, typographie, filets, hachures, grille du footer | `.claude/PORTFOLIO_DESIGN-v2.md` §5–§7 | **En vigueur** |
| Contraintes SEO / rendu serveur / fluidité / accessibilité du layout | `.claude/PORTFOLIO_DESIGN-v2.md` §8, et §5 ci-dessous | **En vigueur** |
| Recette à passer avant de déclarer un travail fini | `.claude/PORTFOLIO_DESIGN-v2.md` §11 | **En vigueur** |
| Intention éditoriale « magazine » d'origine, maquettes de référence | `.claude/PORTFOLIO_DESIGN.md` (v1) | **Historique.** Périmé sur le layout, la navbar, la liste des composants et les valeurs exactes de la palette. N'en tirer que l'intention. |
| Règles de contribution, git, attribution | `.claude/RULES.md` | **En vigueur** |
| API Next.js : routing, layouts, `params`, métadonnées, proxy, cache | `node_modules/next/dist/docs/` (+ `AGENTS.md`) | **Source de vérité.** Prime sur tes souvenirs d'entraînement (§3). |
| Contenu du portfolio (projets, services, compétences, outils, contact) | `lib/content/*.ts`, typé par `types/content.ts` | Le code **est** la référence |
| Textes d'interface | `types/dictionary.ts` puis `app/[locale]/dictionaries/{fr,en}.ts` | Le type **est** le contrat |
| Présentation du projet à un humain | `README.md` | Destiné aux humains, **pas** aux agents. Ne pas s'en servir comme spécification. |

**En cas de contradiction**, l'ordre de priorité est :
`.claude/RULES.md` → docs Next embarquées → `PORTFOLIO_DESIGN-v2.md` → ce fichier
→ `PORTFOLIO_DESIGN.md` → `README.md`.

**Aucune ligne ne correspond à ta tâche ?** Alors aucun document ne fait autorité :
applique le §5 (invariants) et le §6 (protocole), et dis-le à l'utilisateur.

---

## 3. Cette version de Next.js diverge de tes connaissances

Next.js **16.3.2** / React **19.2.8** sont postérieurs à la plupart des données
d'entraînement. Avant de toucher au routing, aux layouts, aux `params` ou à une
logique de type middleware : lis `node_modules/next/dist/docs/` (résolu depuis la
racine du dépôt). Divergences déjà en usage ici :

| Ce que tu crois savoir | La réalité de ce dépôt |
|---|---|
| `middleware.ts` + export `middleware` | **`proxy.ts`** à la racine, export **`proxy()`** — détection de locale et redirection |
| `params` lu directement partout | **`next/root-params`** : `await locale()` dans les Server Components (`app/[locale]/page.tsx`, `dictionaries.ts`) |
| Types de props écrits à la main | Helpers générés : `LayoutProps<"/[locale]">`. **`params` est une `Promise`**, il faut l'`await` |
| `tailwind.config.js` | **Tailwind v4** : `@theme inline` dans `app/globals.css`, aucun fichier de config |
| `dark:` via `prefers-color-scheme` | `@custom-variant dark` ciblant la classe `.dark` sur `<html>` |
| Opacité Tailwind impossible sur un hex | v4 la gère via `color-mix()` : `bg-accent/12` marche sur les tokens hex actuels |

---

## 4. Carte du dépôt

Next.js App Router, routes préfixées par la locale (`fr`/`en`), tout est rendu
côté serveur. **Aucun CMS, aucune base de données** : le contenu est du
TypeScript en dur. Alias `@/*` → racine. TypeScript `strict`. **Aucun test
runner.**

Commandes : `pnpm dev` (localhost:3000) · `pnpm build` · `pnpm start` · `pnpm lint`.

```
app/
  [locale]/
    layout.tsx        generateMetadata (title/description/alternates/OG), polices
                      next/font, script anti-FOUC du thème, generateStaticParams
    page.tsx          racine de composition : SkipLink + SideRail + MobileBar, puis
                      <div lg:ml-[var(--rail-w)]> contenant <main> et <footer>.
                      Pose --rail-w en style inline. Injecte le JSON-LD.
    dictionaries.ts   charge le bon dictionnaire via next/root-params
    dictionaries/     fr.ts, en.ts — toutes les chaînes d'interface
  globals.css         Tailwind v4, tokens clair/sombre, @theme inline,
                      scroll-behavior, @utility hide-scrollbar
  robots.ts           robots.txt généré
  sitemap.ts          sitemap.xml généré (une entrée par locale + alternates)
proxy.ts              locale : cookie NEXT_LOCALE → Accept-Language → defaultLocale
components/
  layout/
    SideRail.tsx      Server Component. Colonne d'identité persistante : monogramme,
                      avatar, pastille dispo, l'UNIQUE <h1>, rôle, tagline, 2 CTA,
                      sommaire, LocaleSwitcher + ThemeToggle. En flux normal sous
                      lg, position:fixed à partir de lg.
    SideRailNav.tsx   "use client" — SEULE île client du layout. Surligne la section
                      active via un unique IntersectionObserver. Aucun listener de
                      scroll. Ses <a href="#…"> sont rendus côté serveur.
    MobileBar.tsx     Server Component, lg:hidden, sticky. Monogramme + langue +
                      thème + liens de section dans un <details> natif (zéro JS).
    ThemeToggle.tsx   "use client" — bascule .dark et persiste dans localStorage
    LocaleSwitcher.tsx "use client" — ancres <a> classiques (rechargement voulu)
  sections/           une par bloc de la page : Hero, Projects, Skills, Services,
                      Tools, ContactFooter (+ cartes). ContactForm est "use client"
                      (useActionState). Chaque section reçoit dict en props.
  ui/                 primitives sans état : SectionHeading, NumberedLabel,
                      VerticalLabel, SkipLink, RailHatch
lib/
  i18n/config.ts      locales, defaultLocale, isLocale
  nav.ts              getNavSections(dict) + sectionNumber(i) — SOURCE UNIQUE des
                      5 entrées de navigation, partagée par le rail et la barre
                      mobile. Les numéros 01…05 dérivent de la position, jamais
                      écrits en dur.
  content/            projects, services, skills, tools, site-config
  actions/contact.ts  "use server" — valide et journalise (aucun envoi réel)
  json-ld.ts          siteUrl + JSON-LD schema.org Person
types/                content.ts, dictionary.ts — les deux contrats du projet
public/               avatar/, cv/randy-rajaonson-cv.pdf
```

**Contenu localisé ou non** : ce qui dépend de la langue passe par une fonction
`get*(locale)` adossée à un `Record<Locale, T[]>` (projets, services, process) ;
ce qui n'en dépend pas est une constante exportée (compétences, outils, contact).

---

## 5. Invariants — doivent rester vrais à chaque commit

**SEO**

- Exactement **un `<h1>`** par page. Il vit dans `SideRail`, pas dans `Hero`.
- Un seul `header`, un seul `main`, un seul `footer`. Hiérarchie `h1 → h2 → h3`
  sans saut.
- Toute cible de navigation est une vraie ancre `<a href="#…">` **présente dans
  le HTML servi** : le site doit rester navigable sans JavaScript.
- `generateMetadata`, `alternates.languages`, Open Graph, JSON-LD `Person`,
  `robots.ts`, `sitemap.ts` restent valides. Nouvelle route ⇒ étendre le sitemap
  dans le même commit.
- Aucun texte enfermé dans une image, un `canvas` ou un pseudo-élément.

**Rendu serveur**

- Un composant ne devient `"use client"` que pour de l'**interaction**, jamais
  pour afficher du contenu. Zéro `useEffect` d'affichage, zéro fetch client.
- Le contenu vient de `lib/content/` et des dictionnaires, résolus à la requête.
- `generateStaticParams` sur `[locale]` : les deux langues restent prérendues.

**Fluidité**

- **Aucun listener `scroll`.** `IntersectionObserver` uniquement.
- N'animer que `opacity`, `color`, `background-color`, `transform`. Jamais
  `width`, `height`, `top`, `margin`.
- `next/image` avec `sizes` explicite ; `priority` sur le seul portrait du Hero.
  Réserver les dimensions (CLS < 0,1).

**Accessibilité**

- `SkipLink` en tête de DOM. Focus visible sur tout interactif
  (`focus-visible:ring-2 focus-visible:ring-accent-strong`).
- `aria-current="true"` sur l'entrée active du sommaire, et sur une seule.
- Cibles tactiles ≥ 44px. `prefers-reduced-motion` respecté.
- Tout élément décoratif porte `aria-hidden="true"` : titre géant du Hero, cercle
  accent, hachures, points de la grille du footer.

**Contraste — règle non négociable**

`--accent` ne fait que ~3,7:1 (clair) et ~3,0:1 (sombre) sur le fond.

| Usage | Token |
|---|---|
| Aplats, barres, pastilles, cercles, titres ≥ 24px | `accent` |
| **Tout texte < 24px** : liens, numéros, `hover:`, entrée active | **`accent-strong`** |
| Bouton plein portant du texte clair | **`accent-strong`** |
| Message d'erreur de formulaire | **`danger`** (jamais une couleur de la palette Tailwind par défaut) |

**i18n**

- Ajouter une chaîne = modifier **les trois** fichiers : `types/dictionary.ts`,
  `dictionaries/fr.ts`, `dictionaries/en.ts`. Jamais deux sur trois.
- Le nom du fichier CV servi reste en minuscules sans espace ; le nom lisible va
  dans `siteConfig.cvDownloadName` (attribut `download`).

---

## 6. Protocole de changement

1. **Router** — trouve ta ligne au §2, lis le document désigné.
2. **Vérifier l'API** — si Next.js est impliqué, lis
   `node_modules/next/dist/docs/` avant de coder (§3).
3. **Coder** — respecte les invariants du §5. Commente le *pourquoi*, jamais le
   *quoi* ; les commentaires du dépôt sont en français, sans accent.
4. **Vérifier** — `pnpm lint` **puis** `pnpm build`, les deux verts. Il n'y a pas
   de test runner : la recette est manuelle et décrite au §11 de
   `PORTFOLIO_DESIGN-v2.md`.
   - Ce qu'un agent peut vérifier seul, sur le HTML prérendu
     (`.next/server/app/fr.html`) : nombre de `<h1>`, landmarks uniques, présence
     des ancres `href="#"`, URL et attributs des liens.
   - Ce qu'il ne peut **pas** vérifier : rendu visuel, scroll horizontal, CLS,
     ordre de tabulation, contraste perçu. Le dire explicitement à l'utilisateur
     plutôt que de l'affirmer.
5. **Committer** — un commit par intention, au format du §1. Pas de push.
6. **Documenter** — voir la table ci-dessous.

**Quel document mettre à jour, dans le même lot de commits :**

| Ton changement | À mettre à jour |
|---|---|
| Nouvelle section de page | `lib/nav.ts`, les 3 fichiers i18n, `PORTFOLIO_DESIGN-v2.md` §4, le sitemap si nouvelle route |
| Layout, rail, navigation | `PORTFOLIO_DESIGN-v2.md` — si tu t'écartes du plan, ajoute une note « **Tel qu'implémenté** » disant pourquoi |
| Nouveau token de couleur | `app/globals.css`, `PORTFOLIO_DESIGN-v2.md` §5, et le tableau de contraste du §5 ici si la règle bouge |
| Nouveau fichier dans `components/` ou `lib/` | la carte du §4 de ce fichier |
| Nouvelle chaîne d'interface | `types/dictionary.ts` + `fr.ts` + `en.ts` |
| Nouvelle dépendance | `README.md`, section Stack |
| Un `TODO` de contenu enfin rempli | le §7 de ce fichier |
| Une décision d'architecture durable | ce fichier : §5 si elle contraint, §7 si elle constate |

---

## 7. État connu

### Écarts assumés — ne pas « corriger »

- **Le bloc d'identité du rail reste visible sous `lg`** : le `h1` et les CTA ne
  doivent pas disparaître sur mobile. Corollaire à tenir — chaque élément
  d'identité n'a **qu'un seul porteur par palier** : monogramme et avatar en
  `hidden lg:flex` dans `SideRail`, pastille de disponibilité uniquement dans
  `SideRail`, monogramme mobile uniquement dans `MobileBar`.
- **Deux `<nav>` et deux monogrammes dans le HTML servi** : ils sont exclusifs
  par palier (`lg:hidden` / `hidden lg:flex`). Un seul est affiché et exposé aux
  technologies d'assistance à un instant donné.
- **Deux conteneurs `overflow-y-auto` dans le rail** : le sommaire absorbe le
  manque de place en premier, celui du rail ne sert que sur écran bas.
- **Le titre géant du Hero est `aria-hidden`** : il paraphrase le rôle que le
  rail énonce déjà en clair. S'il cesse un jour de le paraphraser, le ré-exposer.
- **Ce titre se dimensionne en `cqw` dans un `@container`**, pas en `vw` : `vw`
  ignore les ~22rem prises par le rail et surdimensionne le titre en desktop.
- **`LocaleSwitcher` utilise des `<a>` et non `next/link`** : le root layout
  dépend de la locale, le rechargement complet est voulu.
- **Tokens en hex, pas en triplets RGB** : inutile en Tailwind v4 (§3).

### Dette réelle — à corriger en passant à proximité

- **`lib/actions/contact.ts` journalise sans envoyer** : aucun service d'e-mail
  n'est branché. Conséquence à connaître avant de toucher au formulaire — le
  message `contact.formSuccess` affirme au visiteur « Message envoyé », ce qui
  est faux aujourd'hui. Brancher l'envoi, ou corriger la formulation.
- `ContactForm` supprime l'outline natif de ses champs (`outline-none`) et ne la
  remplace que par un changement de couleur de bordure, là où le §5 demande un
  `focus-visible:ring-2`.

*Corrigés (pour mémoire, ne pas réintroduire)* : `aria-label` en dur du
`ThemeToggle`, `hover:bg-accent` et `text-red-500` de `ContactForm`, `README.md`
décrivant la navbar d'avant le rail.

### Contenu encore factice

`lib/content/` est balisé de `TODO`.

- **Réels** : coordonnées de contact, liens sociaux, CV
  (`public/cv/randy-rajaonson-cv.pdf`).
- **Factices** : projets, services, étapes de process, compétences, outils,
  avatar (`rr-placeholder.svg`), et `siteUrl` dans `lib/json-ld.ts` (URL de
  préversion Vercel, en attente d'un domaine).

C'est le vrai reliquat du projet : aucun raffinement de mise en page ne
compensera un portfolio rempli de placeholders.
