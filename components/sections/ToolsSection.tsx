import type { Dictionary } from "@/types/dictionary";
import type { Tool } from "@/types/content";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ToolsSection({
  dict,
  tools,
}: {
  dict: Dictionary;
  tools: Tool[];
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading heading={dict.tools.heading} subheading={dict.tools.subheading} />
      <ul className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
        {tools.map((tool) => (
          <li
            key={tool.name}
            className="text-sm font-medium uppercase tracking-wide text-muted-foreground"
          >
            {tool.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
