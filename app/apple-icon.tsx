import { ImageResponse } from "next/og";

/**
 * Icone iOS (ajout a l'ecran d'accueil). apple-icon n'accepte pas le SVG :
 * on genere un PNG, la ou le favicon des navigateurs est servi par icon.svg.
 *
 * La police par defaut d'ImageResponse n'a qu'une graisse : `fontWeight` serait
 * ignore. Le monogramme tient sa presence de sa taille et de l'interlettrage.
 */
export const size = { width: 180, height: 180 };

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#c1613f",
          color: "#f5f1ea",
          fontSize: 108,
          letterSpacing: 2,
        }}
      >
        RR
      </div>
    ),
    size
  );
}
