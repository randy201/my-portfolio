export default function NumberedLabel({ index }: { index: number }) {
  return (
    <span className="font-display text-lg text-accent" aria-hidden="true">
      {String(index).padStart(2, "0")}
    </span>
  );
}
