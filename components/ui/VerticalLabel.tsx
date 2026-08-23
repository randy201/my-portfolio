export default function VerticalLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`hidden select-none text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground [writing-mode:vertical-rl] lg:inline-block ${className}`}
    >
      {children}
    </span>
  );
}
