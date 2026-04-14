import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";

export default function PrivacyPage() {
  return (
    <Container className="space-y-6 py-10 sm:py-12">
      <SectionHeading eyebrow="Legal" title="Politica de privacidad" />
      <div className="space-y-4 text-sm leading-8 text-stone-300">
        <p>
          Los datos ingresados en este MVP se usan unicamente con fines demostrativos y para modelar un flujo de checkout.
        </p>
        <p>
          A futuro, cuando se conecten integraciones reales, Deja Tu Huella debera informar base legal, almacenamiento, terceros involucrados y mecanismos de actualizacion o eliminacion.
        </p>
        <p>
          El sitio no comparte informacion personal con terceros fuera de los servicios tecnicos necesarios para operar la plataforma.
        </p>
      </div>
    </Container>
  );
}
