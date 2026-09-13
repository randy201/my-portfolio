import { ImageResponse } from "next/og";
import { getDictionaryFor } from "./dictionaries";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/content/site-config";

/**
 * Image Open Graph generee par locale : c'est la vignette affichee quand le lien
 * du portfolio est partage (LinkedIn, WhatsApp, Slack, X...).
 *
 * Statique : elle est produite au build pour /fr et /en, pas a chaque requete.
 *
 * Contrainte de Satori (le moteur derriere ImageResponse) : uniquement flexbox,
 * pas de grid, et tout conteneur a plusieurs enfants doit porter un
 * `display: flex` explicite. Les polices du site ne sont pas reutilisables ici
 * (next/font ne produit que du woff2, que Satori ne lit pas) : on s'appuie sur
 * la police par defaut d'ImageResponse et sur les couleurs de la marque. Cette
 * police n'a qu'une seule graisse — inutile d'ecrire `fontWeight`, il est
 * ignore ; la hierarchie se joue sur la taille, la couleur et l'interlettrage.
 */
export const alt = "RAJAONSON Randy Anne — Portfolio";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

// Tokens du theme clair, recopies : une route de metadonnees ne traverse pas
// la CSS du site. Garder en phase avec :root dans app/globals.css.
const COLORS = {
  background: "#f5f1ea",
  foreground: "#14110f",
  accent: "#c1613f",
  accentStrong: "#a04f34",
  muted: "#6b645c",
  border: "rgba(20, 17, 15, 0.14)",
};

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionaryFor(isLocale(locale) ? locale : defaultLocale);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 72,
          backgroundColor: COLORS.background,
          color: COLORS.foreground,
          // Rappel du rail lateral : un filet accent sur le bord gauche.
          borderLeft: `24px solid ${COLORS.accent}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: COLORS.muted,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 14,
                height: 14,
                borderRadius: 999,
                backgroundColor: COLORS.accent,
              }}
            />
            {dict.nav.availability}
          </div>
          <div style={{ display: "flex", fontSize: 52, letterSpacing: 2 }}>
            RR
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              lineHeight: 1,
              letterSpacing: -2,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              color: COLORS.accentStrong,
            }}
          >
            {dict.hero.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 32,
            borderTop: `2px solid ${COLORS.border}`,
            fontSize: 26,
            color: COLORS.muted,
          }}
        >
          <div style={{ display: "flex" }}>{dict.hero.tagline}</div>
        </div>
      </div>
    ),
    size
  );
}
