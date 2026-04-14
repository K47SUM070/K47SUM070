import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";

export default function ReturnsPage() {
  return (
    <Container className="space-y-6 py-10 sm:py-12">
      <SectionHeading eyebrow="Legal" title="Cambios y devoluciones" />
      <div className="space-y-4 text-sm leading-8 text-stone-300">
        <p>
          Aceptamos cambios por talle o color dentro de los 10 dias corridos desde la recepcion del pedido.
        </p>
        <p>
          El producto debe estar sin uso, limpio y con su etiquetado original. Los costos logisticos pueden variar segun la localidad y la causa del cambio.
        </p>
        <p>
          Para iniciar una gestion, recomendamos contacto directo por WhatsApp para acelerar la resolucion.
        </p>
      </div>
    </Container>
  );
}
