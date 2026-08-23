"use server";

export type ContactState = {
  status: "idle" | "success" | "error";
};

export async function submitContactForm(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.includes("@") ||
    typeof message !== "string" ||
    !message.trim()
  ) {
    return { status: "error" };
  }

  // TODO(intégration email) : brancher un vrai service d'envoi (Resend, SMTP, etc.)
  // une fois le service choisi par l'utilisateur. Pour l'instant, on valide et on logge.
  console.log("[contact] Nouveau message (non envoyé, intégration à finaliser) :", {
    name,
    email,
    message,
  });

  return { status: "success" };
}
