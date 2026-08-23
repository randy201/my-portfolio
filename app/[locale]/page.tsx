import { locale } from "next/root-params";
import { getDictionary } from "./dictionaries";
import { isLocale, defaultLocale } from "@/lib/i18n/config";
import { getProjects } from "@/lib/content/projects";
import { skills } from "@/lib/content/skills";
import { getServices, getProcessSteps } from "@/lib/content/services";
import { tools } from "@/lib/content/tools";
import { contactInfo } from "@/lib/content/site-config";
import { personJsonLd } from "@/lib/json-ld";
import Navbar from "@/components/layout/Navbar";
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(resolvedLocale)) }}
      />
      <Navbar dict={dict} locale={resolvedLocale} />
      <main className="flex-1">
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
    </>
  );
}
