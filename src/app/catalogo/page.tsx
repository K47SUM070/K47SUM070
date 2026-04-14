import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { CatalogClient } from "@/components/store/catalog-client";
import { getProducts } from "@/lib/catalog";

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const params = await searchParams;
  const products = getProducts();

  return (
    <Container className="space-y-10 py-10 sm:py-12">
      <SectionHeading
        eyebrow="Catalogo"
        title="Compra por marca, talle, color o precio"
        description="El catalogo ahora trabaja con fotos reales y filtros rapidos para mobile y desktop."
      />
      <CatalogClient products={products} initialCategory={params.categoria} />
    </Container>
  );
}
