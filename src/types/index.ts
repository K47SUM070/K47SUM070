export type CategorySlug = "nike" | "vans" | "adidas";

export type ProductCategory = {
  slug: CategorySlug;
  name: string;
  description: string;
  hero: string;
  image: string;
  accent: string;
};

export type ProductVariant = {
  id: string;
  color: string;
  size: string;
  stock: number;
  sku: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  compareAtPrice?: number;
  shortDescription: string;
  description: string;
  materials: string[];
  fit: string;
  colors: string[];
  sizes: string[];
  featured: boolean;
  isNew?: boolean;
  badge?: string;
  image: string;
  gallery: string[];
  variants: ProductVariant[];
};

export type CartItem = {
  productId: string;
  variantId: string;
  quantity: number;
};

export type CheckoutFormValues = {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  dni: string;
  localidad: string;
  provincia: string;
  codigoPostal: string;
  direccion: string;
  pisoDepartamento?: string;
  notas?: string;
  metodoEntrega: "correo-argentino" | "retiro-local";
  aceptaTerminos: boolean;
};

export type FAQItem = {
  question: string;
  answer: string;
};
