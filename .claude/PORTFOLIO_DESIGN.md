# Fiche design — Portfolio éditorial "magazine"

Référence : deux maquettes fournies par l'utilisateur (un thème clair, un thème sombre) d'un portfolio de type designer/créatif, style éditorial/magazine. Cette fiche sert de guide d'implémentation étape par étape pour la page d'accueil du site.

## Analyse des maquettes

### Thème clair
- Fond crème/beige clair, texte noir, accent **terracotta/orange**
- Titre "PORTFOLIO" en très grande police display bold (effet couverture de magazine)
- Photo portrait détourée devant un cercle de couleur accent
- Labels verticaux (rotation 90°) le long des bords : catégories de compétences ("WEB DESIGNER", "UI/UX DESIGN", "BRANDING"...)
- Signature manuscrite (police script)

### Thème sombre
- Fond noir/bordeaux très sombre, texte blanc/beige, accent **rouge sombre**
- Même structure éditoriale (titre géant, photo, labels rotés)
- Compteurs chiffrés mis en avant (ex. "4+ ans d'expérience", "28+ projets", "12+ clients")
- Icônes de compétences dans des cartes (grille "What I do")
- Étapes de process numérotées (Discover → Define → Design → Develop → Deliver)

## Structure globale (one-page, sections empilées)

1. **Header / nav minimal** — logo/nom à gauche, statut "available for freelance" à droite, éventuellement toggle thème clair/sombre
2. **Hero** — titre géant "PORTFOLIO", nom, rôle, tagline courte, photo, cercle décoratif, labels rotés, bouton/lien contact
3. **Projets sélectionnés** — grille de cartes (image, numéro 01/02/03, titre projet, sous-titre/catégorie), lien "voir tous les projets"
4. **Compétences & expertise** — barres de progression ou liste, citation mise en avant, points forts (design centré utilisateur, code propre, responsive, performance)
5. **Ce que je fais / Process** (variante image sombre) — grille d'icônes services + étapes numérotées du processus de travail
6. **Témoignages clients** — cartes avec photo, nom, poste, citation
7. **Outils utilisés** — rangée de logos/icônes (Figma, Adobe XD, Photoshop, Illustrator, etc.)
8. **Contact / footer CTA** — accroche "Let's create/collaborate", QR code, email, réseaux sociaux, localisation

## Design tokens à définir

- **Typographie** : une police display condensée/bold pour les titres (effet magazine), une police sans-serif classique pour le corps de texte, éventuellement une police script pour la signature
- **Couleurs** :
  - Clair : fond `#F5F1EA`-like, texte `#111`, accent terracotta `#C1613F`-like
  - Sombre : fond `#140A0A`-like, texte `#F5F1EA`-like, accent rouge sombre `#8B1E1E`-like
  - Définir ces tokens dans `app/globals.css` via `@theme inline` (cohérent avec l'existant)
- **Layout** : grille asymétrique, beaucoup de marge/espace, séparateurs fins, numérotation (01, 02...), labels verticaux `writing-mode: vertical-rl` ou `rotate(-90deg)`

## Composants à construire

- `Navbar` (liens ancres + statut disponibilité + toggle thème)
- `Hero` (titre + photo + cercle accent + labels rotés)
- `ProjectCard` / `ProjectsGrid`
- `SkillBar` / `SkillsSection`
- `ProcessStep` / `ServiceCard`
- `TestimonialCard` / `TestimonialsSection`
- `ToolIcon` (rangée d'outils)
- `ContactFooter` (QR code, coordonnées, réseaux sociaux)
- `ThemeToggle`

## Étapes d'implémentation suggérées

1. Design tokens (couleurs clair/sombre, polices) dans `app/globals.css`
2. Layout de base + `ThemeToggle` (si toggle manuel demandé)
3. Section `Hero`
4. Section `Projets`
5. Section `Compétences`
6. Section `Process`/`Services`
7. Section `Témoignages`
8. Section `Outils`
9. `Footer`/Contact
10. SEO : métadonnées (title/description/OG), JSON-LD `Person`, sitemap, `robots.txt`, `next/image` partout avec `alt` descriptifs
11. Accessibilité (contrastes, focus states, hiérarchie des titres, `aria-label` sur icônes)
12. Responsive (mobile-first, labels rotés adaptés/masqués sur mobile)
13. Animations légères optionnelles (apparition au scroll, hover sur cartes)

## Points à personnaliser avant de coder (voir plan d'implémentation)

- Contenu réel (nom, rôle, bio, photo, projets, compétences, outils, témoignages)
- Choix du thème (un seul thème, ou toggle clair/sombre)
- Langue du contenu
- Typographies exactes à charger via `next/font`
