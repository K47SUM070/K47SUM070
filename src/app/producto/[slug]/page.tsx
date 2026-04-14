import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { ProductDetailClient } from "@/components/store/product-detail-client";
import { getProductBySlug, getProducts, getRelatedProducts } from "@/lib/catalog";

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product);

  return (
    <Container className="py-10 sm:py-12">
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
    </Container>
  );
}
