import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";

export default function TermsPage() {
  return (
    <Container className="space-y-6 py-10 sm:py-12">
      <SectionHeading eyebrow="Legal" title="Terminos y condiciones" />
      <LegalText
        paragraphs={[
          "Este sitio presenta un MVP comercial de Deja Tu Huella para navegacion, armado de carrito y registro de pedidos.",
          "La confirmacion final de la compra, stock y condiciones comerciales puede requerir validacion posterior hasta integrar medios de pago y stock en tiempo real.",
          "Los precios se expresan en pesos argentinos y pueden actualizarse sin previo aviso.",
          "El uso del sitio implica aceptacion de estos terminos y de las politicas complementarias visibles en el footer.",
        ]}
      />
    </Container>
  );
}

function LegalText({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4 text-sm leading-8 text-stone-300">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}
