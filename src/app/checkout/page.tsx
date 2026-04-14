import { Container } from "@/components/layout/container";
import { CheckoutPageClient } from "@/components/store/checkout-page-client";

export default function CheckoutPage() {
  return (
    <Container className="py-10 sm:py-12">
      <CheckoutPageClient />
    </Container>
  );
}
