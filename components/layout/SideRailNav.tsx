"use client";

import { useEffect, useState } from "react";
import { sectionNumber, type NavSection } from "@/lib/nav";

/**
 * Sommaire numerote du rail lateral.
 *
 * Composant client uniquement pour le surlignage de la section active : le App
 * Router le rend malgre tout cote serveur, donc les <a href="#..."> sont bien
 * presents dans le HTML initial, crawlables et fonctionnels sans JavaScript.
 *
 * L'observation se fait exclusivement via IntersectionObserver — aucun listener
 * de scroll, aucun getBoundingClientRect par frame.
 */
export default function SideRailNav({
  sections,
  label,
  className = "",
}: {
  sections: NavSection[];
  label: string;
  className?: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // On retient la section la plus visible parmi celles qui croisent la
        // bande centrale du viewport, ce qui evite les allers-retours quand
        // deux sections sont visibles simultanement.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label={label} className={className}>
      <ul className="flex flex-col">
        {sections.map((section, index) => {
          const isActive = activeId === section.id;

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`group flex items-center justify-between gap-3 rounded-lg py-2.5 pl-2 pr-3 text-base transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--rail-surface)] ${
                  isActive
                    ? "bg-foreground/[0.04] text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`h-5 w-[3px] rounded-[2px] transition-colors duration-200 ${
                      isActive ? "bg-accent" : "bg-transparent"
                    }`}
                  />
                  {section.label}
                </span>
                <span
                  aria-hidden="true"
                  className={`font-display text-sm transition-colors duration-200 ${
                    isActive ? "text-accent-strong" : "text-muted-foreground"
                  }`}
                >
                  {sectionNumber(index)}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
