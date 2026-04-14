import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { CartPageClient } from "@/components/store/cart-page-client";

export default function CartPage() {
  return (
    <Container className="space-y-8 py-10 sm:py-12">
      <SectionHeading
        eyebrow="Carrito"
        title="Revisa tu pedido"
        description="Antes de confirmar, puedes ajustar cantidades y validar el envio estimado."
      />
      <CartPageClient />
    </Container>
  );
}
