import type { Service } from "@/types/content";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-border p-6 transition-colors hover:border-accent">
      <h3 className="font-display text-xl tracking-wide">{service.title}</h3>
      <p className="text-sm text-muted-foreground">{service.description}</p>
    </div>
  );
}
