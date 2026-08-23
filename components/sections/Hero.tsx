import Image from "next/image";
import type { Dictionary } from "@/types/dictionary";
import { siteConfig } from "@/lib/content/site-config";
import VerticalLabel from "@/components/ui/VerticalLabel";

export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="top"
      className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-20 pt-16 sm:pt-24"
    >
      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
        <span>{dict.hero.role}</span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          {dict.nav.availability}
        </span>
      </div>

      <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
        <VerticalLabel className="justify-self-start">
          {dict.hero.role}
        </VerticalLabel>

        <p
          aria-hidden="true"
          className="font-display text-center text-[18vw] leading-[0.85] tracking-wide sm:text-[13vw] lg:text-[8vw]"
        >
          {dict.hero.kicker}
        </p>

        <VerticalLabel className="justify-self-end">{dict.projects.heading}</VerticalLabel>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="flex flex-col gap-6 order-2 lg:order-1">
          <h1 className="font-display text-4xl leading-none tracking-wide sm:text-5xl">
            {dict.hero.name}
          </h1>
          <p className="max-w-md text-lg text-accent">{dict.hero.role}</p>
          <p className="max-w-md text-base text-muted-foreground">{dict.hero.tagline}</p>
          <p className="max-w-md text-sm text-muted-foreground">{dict.hero.bio}</p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={siteConfig.cvUrl}
              download
              className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
            >
              {dict.hero.downloadCv}
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              {dict.hero.contactCta}
            </a>
          </div>
        </div>

        <div className="relative order-1 mx-auto aspect-square w-full max-w-sm lg:order-2">
          <div
            className="absolute inset-6 rounded-full bg-accent/80"
            aria-hidden="true"
          />
          <Image
            src={siteConfig.avatarUrl}
            alt={dict.hero.name}
            fill
            sizes="(min-width: 1024px) 24rem, 80vw"
            className="relative rounded-full object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
