import type { Dictionary } from "@/types/dictionary";
import type { ContactInfo } from "@/types/content";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "./ContactForm";

export default function ContactFooter({
  dict,
  contactInfo,
}: {
  dict: Dictionary;
  contactInfo: ContactInfo;
}) {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <SectionHeading
            heading={dict.contact.heading}
            subheading={dict.contact.subheading}
            intro={dict.contact.intro}
          />
          <dl className="flex flex-col gap-2 text-sm">
            <div className="flex gap-2">
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-accent">
                  {contactInfo.email}
                </a>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground">{dict.contact.availableRemote}</dt>
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
                  className="text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-accent"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ContactForm dict={dict} />
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-10 text-xs text-muted-foreground">
        © {year} {dict.hero.name} — {dict.footer.rights}
      </div>
    </footer>
  );
}
