import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Accordion } from "@/components/ui/accordion";
import { faqItems } from "@/data/content";

export default function FAQPage() {
  return (
    <Container className="space-y-10 py-10 sm:py-12">
      <SectionHeading
        eyebrow="FAQ"
        title="Preguntas frecuentes antes de cerrar compra"
        description="Respuestas rapidas para reducir friccion y sostener claridad comercial en el flujo."
      />
      <Accordion items={faqItems} />
    </Container>
  );
}
