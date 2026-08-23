import type { Project } from "@/types/content";
import NumberedLabel from "@/components/ui/NumberedLabel";

export default function ProjectCard({
  project,
  index,
  viewProjectLabel,
}: {
  project: Project;
  index: number;
  viewProjectLabel: string;
}) {
  return (
    <div className="group flex flex-col gap-4 border-t border-border pt-6 transition-colors hover:border-accent">
      <div className="flex items-center justify-between">
        <NumberedLabel index={index} />
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-wide text-muted-foreground hover:text-accent"
          >
            {viewProjectLabel}
          </a>
        )}
      </div>
      <div className="aspect-[4/3] w-full rounded-md bg-muted" aria-hidden="true" />
      <div>
        <h3 className="font-display text-2xl tracking-wide">{project.title}</h3>
        <p className="text-xs uppercase tracking-wide text-accent">{project.category}</p>
        <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
      </div>
    </div>
  );
}
