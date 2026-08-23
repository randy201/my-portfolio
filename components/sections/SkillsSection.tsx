import type { Dictionary } from "@/types/dictionary";
import type { Skill } from "@/types/content";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillBar from "./SkillBar";

export default function SkillsSection({
  dict,
  skills,
}: {
  dict: Dictionary;
  skills: Skill[];
}) {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <SectionHeading heading={dict.skills.heading} subheading={dict.skills.subheading} />
          <div className="flex flex-col gap-5">
            {skills.map((skill) => (
              <SkillBar key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
        <blockquote className="flex items-center border-l-2 border-accent pl-6 font-display text-2xl leading-snug tracking-wide sm:text-3xl">
          &ldquo;{dict.skills.quote}&rdquo;
        </blockquote>
      </div>
    </section>
  );
}
