import { locale } from "next/root-params";
import { getDictionary } from "./dictionaries";
import { isLocale, defaultLocale } from "@/lib/i18n/config";
import { getProjects } from "@/lib/content/projects";
import { skills } from "@/lib/content/skills";
import { getServices, getProcessSteps } from "@/lib/content/services";
import { tools } from "@/lib/content/tools";
import { contactInfo } from "@/lib/content/site-config";
import { personJsonLd } from "@/lib/json-ld";
import SideRail from "@/components/layout/SideRail";
import MobileBar from "@/components/layout/MobileBar";
import SkipLink from "@/components/ui/SkipLink";
import Hero from "@/components/sections/Hero";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ToolsSection from "@/components/sections/ToolsSection";
import ContactFooter from "@/components/sections/ContactFooter";

export default async function Home() {
  const dict = await getDictionary();
  const current = await locale();
  const resolvedLocale = current && isLocale(current) ? current : defaultLocale;

  return (
    <div
      id="top"
      // --rail-w est resolu une seule fois ici, puis partage par le rail et le
      // contenu : les deux restent alignes sans duplication du clamp().
      style={{ "--rail-w": "clamp(18rem, 26vw, 22rem)" } as React.CSSProperties}
      className="flex min-h-full flex-col overflow-x-clip"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd(resolvedLocale)),
        }}
      />

      <SkipLink label={dict.nav.skipToContent} />
      <SideRail dict={dict} locale={resolvedLocale} />
      <MobileBar dict={dict} locale={resolvedLocale} />

      <div className="flex flex-1 flex-col lg:ml-[var(--rail-w)]">
        <main id="content" className="flex-1">
          <Hero dict={dict} />
          <ProjectsSection dict={dict} projects={getProjects(resolvedLocale)} />
          <SkillsSection dict={dict} skills={skills} />
          <ServicesSection
            dict={dict}
            services={getServices(resolvedLocale)}
            processSteps={getProcessSteps(resolvedLocale)}
          />
          <ToolsSection dict={dict} tools={tools} />
        </main>
        <ContactFooter dict={dict} contactInfo={contactInfo} />
      </div>
    </div>
  );
}
