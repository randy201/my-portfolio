export default function SectionHeading({
  heading,
  subheading,
  intro,
}: {
  heading: string;
  subheading: string;
  intro?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-display text-4xl leading-none tracking-wide sm:text-5xl">
        {heading} <span className="text-accent">{subheading}</span>
      </h2>
      {intro && <p className="max-w-md text-sm text-muted-foreground">{intro}</p>}
    </div>
  );
}
