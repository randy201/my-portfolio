import type { Dictionary } from "@/types/dictionary";
import type { ContactInfo } from "@/types/content";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "./ContactForm";

/**
 * Point de croisement de la grille « papier millimetree » : un disque a la
 * couleur de la surface, portant un noyau discret. Purement decoratif.
 */
function GridDot({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute z-10 hidden size-2 items-center justify-center rounded-full bg-rail-surface lg:flex ${className}`}
    >
      <span className="size-[3.5px] rounded-full bg-foreground/10" />
    </span>
  );
}

export default function ContactFooter({
  dict,
  contactInfo,
}: {
  dict: Dictionary;
  contactInfo: ContactInfo;
}) {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-border bg-rail-surface lg:scroll-mt-10"
    >
      {/* Rangee de cellules vides : dessine la trame du papier millimetre */}
      <div
        aria-hidden="true"
        className="relative mx-auto hidden max-w-5xl lg:block lg:px-10"
      >
        <div className="relative flex h-11">
          <div className="h-11 grow border-b border-r border-border" />
          <div className="h-11 grow border-b border-r border-border" />
          <div className="h-11 grow border-b border-border" />
          <GridDot className="-bottom-1 left-1/3 -translate-x-1/2" />
          <GridDot className="-bottom-1 left-2/3 -translate-x-1/2" />
        </div>
      </div>

      <div className="relative mx-auto grid max-w-5xl gap-12 px-6 py-20 lg:grid-cols-2 lg:divide-x lg:divide-border lg:px-10 lg:py-28">
        <div className="flex flex-col gap-6 lg:pr-10">
          <SectionHeading
            heading={dict.contact.heading}
            subheading={dict.contact.subheading}
            intro={dict.contact.intro}
          />
          <dl className="flex flex-col gap-2 text-sm">
            <div className="flex gap-2">
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-accent-strong"
                >
                  {contactInfo.email}
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground">
                {dict.contact.availableRemote}
              </dt>
              <dd>{contactInfo.location}</dd>
            </div>
          </dl>
          <ul className="flex gap-4">
            {contactInfo.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-accent-strong"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:pl-10">
          <ContactForm dict={dict} />
        </div>

        <GridDot className="-top-1 left-1/2 -translate-x-1/2" />
        <GridDot className="-bottom-1 left-1/2 -translate-x-1/2" />
      </div>

      <div className="mx-auto max-w-5xl border-t border-border px-6 py-8 text-xs text-muted-foreground lg:px-10">
        © {year} {dict.hero.name} — {dict.footer.rights}
      </div>
    </footer>
  );
}
