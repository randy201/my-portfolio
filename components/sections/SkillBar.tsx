import type { Skill } from "@/types/content";

export default function SkillBar({ skill }: { skill: Skill }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span>{skill.name}</span>
        <span className="text-muted-foreground">{skill.level}%</span>
      </div>
      <div
        className="h-1.5 w-full rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={skill.name}
      >
        <div
          className="h-full rounded-full bg-accent"
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </div>
  );
}
