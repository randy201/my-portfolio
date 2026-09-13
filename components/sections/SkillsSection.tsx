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
  // Le nombre de crans vient du dictionnaire, pas d'une constante : etendre
  // SkillLevel et traduire le nouveau libelle suffit a allonger la jauge.
  const levelCount = Object.keys(dict.skills.levels).length;

  return (
    <section id="skills" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-20 lg:scroll-mt-10 lg:px-10 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <SectionHeading heading={dict.skills.heading} subheading={dict.skills.subheading} />
          {/* Liste de definitions : chaque competence est un terme, son niveau
              la definition. Un lecteur d'ecran annonce « TypeScript,
              Experimente » sans qu'aucun ARIA ne soit necessaire. */}
          <dl className="flex flex-col gap-5">
            {skills.map((skill) => (
              <SkillBar
                key={skill.name}
                skill={skill}
                levelLabel={dict.skills.levels[skill.level]}
                levelCount={levelCount}
              />
            ))}
          </dl>
        </div>
        <blockquote className="flex items-center border-l-2 border-accent pl-6 font-display text-2xl leading-snug tracking-wide sm:text-3xl">
          &ldquo;{dict.skills.quote}&rdquo;
        </blockquote>
      </div>
    </section>
  );
}
