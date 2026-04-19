import { products } from "@/data/products";
import type { Product, ProductVariant } from "@/types";

export function getProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getNewProducts(): Product[] {
  return products.filter((product) => product.isNew);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(
      (candidate) =>
        candidate.category === product.category && candidate.id !== product.id,
    )
    .slice(0, limit);
}

export function getVariantById(
  productId: string,
  variantId: string,
): ProductVariant | undefined {
  const product = products.find((candidate) => candidate.id === productId);
  return product?.variants.find((variant) => variant.id === variantId);
}
