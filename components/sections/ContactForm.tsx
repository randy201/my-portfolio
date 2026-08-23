"use client";

import { useActionState } from "react";
import type { Dictionary } from "@/types/dictionary";
import { submitContactForm, type ContactState } from "@/lib/actions/contact";

const initialState: ContactState = { status: "idle" };

export default function ContactForm({ dict }: { dict: Dictionary }) {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-xs uppercase tracking-wide text-muted-foreground">
          {dict.contact.formName}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="border-b border-border bg-transparent py-2 outline-none focus:border-accent"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-xs uppercase tracking-wide text-muted-foreground">
          {dict.contact.formEmail}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border-b border-border bg-transparent py-2 outline-none focus:border-accent"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-xs uppercase tracking-wide text-muted-foreground">
          {dict.contact.formMessage}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="border-b border-border bg-transparent py-2 outline-none focus:border-accent"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 self-start rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent disabled:opacity-60"
      >
        {dict.contact.formSubmit}
      </button>

      <p role="status" aria-live="polite" className="text-sm">
        {state.status === "success" && (
          <span className="text-accent">{dict.contact.formSuccess}</span>
        )}
        {state.status === "error" && (
          <span className="text-red-500">{dict.contact.formError}</span>
        )}
      </p>
    </form>
  );
}
