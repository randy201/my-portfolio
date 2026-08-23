import type { Dictionary } from "@/types/dictionary";
import type { ProcessStep, Service } from "@/types/content";
import SectionHeading from "@/components/ui/SectionHeading";
import NumberedLabel from "@/components/ui/NumberedLabel";
import ServiceCard from "./ServiceCard";

export default function ServicesSection({
  dict,
  services,
  processSteps,
}: {
  dict: Dictionary;
  services: Service[];
  processSteps: ProcessStep[];
}) {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading heading={dict.services.heading} subheading={dict.services.subheading} />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>

      <div className="mt-16">
        <h3 className="font-display text-2xl tracking-wide">{dict.services.processHeading}</h3>
        <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-2">
              <NumberedLabel index={index + 1} />
              <h4 className="font-medium">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
