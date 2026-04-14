import { products } from "@/data/products";
import type { Product } from "@/types";

export function getProducts() {
  return products;
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getNewProducts() {
  return products.filter((product) => product.isNew);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product) {
  return products
    .filter(
      (candidate) =>
        candidate.id !== product.id && candidate.category === product.category,
    )
    .slice(0, 3);
}

export function getVariantById(productId: string, variantId: string) {
  const product = products.find((item) => item.id === productId);
  return product?.variants.find((variant) => variant.id === variantId);
}
