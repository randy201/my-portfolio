import type { Dictionary } from "@/types/dictionary";
import type { Project } from "@/types/content";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection({
  dict,
  projects,
}: {
  dict: Dictionary;
  projects: Project[];
}) {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          heading={dict.projects.heading}
          subheading={dict.projects.subheading}
          intro={dict.projects.intro}
        />
      </div>
      <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index + 1}
            viewProjectLabel={dict.projects.viewProject}
          />
        ))}
      </div>
    </section>
  );
}
