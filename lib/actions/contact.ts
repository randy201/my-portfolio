"use server";

import { Resend } from "resend";
import { contactInfo } from "@/lib/content/site-config";

export type ContactState = {
  status: "idle" | "success" | "error";
};

/**
 * Bornes de saisie. Elles ne remplacent pas la validation du navigateur (qui
 * est contournable), elles la doublent cote serveur : une action serveur est
 * une entree publique.
 */
const MAX_LENGTH = {
  name: 100,
  email: 200,
  message: 5000,
} as const;

/** Adresse de secours si Resend n'a pas encore de domaine verifie. */
const FALLBACK_FROM = "Portfolio <onboarding@resend.dev>";

function readField(
  formData: FormData,
  key: string,
  maxLength: number
): string | null {
  const value = formData.get(key);
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maxLength) return null;

  return trimmed;
}

/**
 * Envoi du formulaire de contact via Resend.
 *
 * Ne retourne "success" que si Resend a effectivement accepte le message : tant
 * que la cle d'API est absente ou que l'envoi echoue, le visiteur voit une
 * erreur. Il ne doit jamais repartir en croyant avoir ecrit alors que rien
 * n'est parti.
 *
 * Variables d'environnement (voir .env.example) :
 * - RESEND_API_KEY      obligatoire
 * - CONTACT_FROM_EMAIL  expediteur, sur un domaine verifie dans Resend
 * - CONTACT_TO_EMAIL    destinataire, par defaut celui de site-config
 */
export async function submitContactForm(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = readField(formData, "name", MAX_LENGTH.name);
  const email = readField(formData, "email", MAX_LENGTH.email);
  const message = readField(formData, "message", MAX_LENGTH.message);

  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Volontairement sans le contenu du message : ce serait consigner la
    // correspondance d'un visiteur dans les journaux du serveur.
    console.error(
      "[contact] RESEND_API_KEY absente : le message n'a pas ete envoye."
    );
    return { status: "error" };
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: process.env.CONTACT_FROM_EMAIL || FALLBACK_FROM,
      to: process.env.CONTACT_TO_EMAIL || contactInfo.email,
      // Repondre depuis sa boite mail ecrit directement au visiteur.
      replyTo: email,
      subject: `Portfolio — message de ${name}`,
      text: `De : ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend a refuse l'envoi :", error);
      return { status: "error" };
    }
  } catch (cause) {
    console.error("[contact] Echec reseau lors de l'envoi :", cause);
    return { status: "error" };
  }

  return { status: "success" };
}
