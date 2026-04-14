"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ShieldCheck, ShoppingBag, Truck, ZoomIn } from "lucide-react";
import { useState } from "react";

import { ProductGrid } from "@/components/store/product-grid";
import { ShippingEstimator } from "@/components/store/shipping-estimator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useCart } from "@/providers/cart-provider";
import type { Product } from "@/types";

type ProductDetailClientProps = {
  product: Product;
  relatedProducts: Product[];
};

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.variants[0].color);
  const [selectedSize, setSelectedSize] = useState(product.variants[0].size);
  const [selectedImage, setSelectedImage] = useState(product.gallery[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const availableVariants = product.variants.filter(
    (variant) => variant.color === selectedColor,
  );

  const activeVariant =
    product.variants.find(
      (variant) => variant.color === selectedColor && variant.size === selectedSize,
    ) ?? availableVariants[0];

  const onAddToCart = () => {
    if (!activeVariant) {
      return;
    }

    addItem({
      productId: product.id,
      variantId: activeVariant.id,
      quantity,
    });

    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="space-y-16">
      <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-4">
          <div className="group relative aspect-[4/4.55] overflow-hidden rounded-[36px] border border-white/10 bg-black">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
            />
            <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-xs text-white backdrop-blur">
              <ZoomIn className="h-3.5 w-3.5" />
              Hover zoom
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/35 to-transparent p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge>{product.category}</Badge>
                {product.badge ? <Badge variant="accent">{product.badge}</Badge> : null}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
            {product.gallery.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={cn(
                  "group relative aspect-square overflow-hidden rounded-[22px] border transition-all duration-300",
                  selectedImage === image
                    ? "border-amber-300 shadow-[0_0_0_1px_rgba(242,192,107,0.45)]"
                    : "border-white/10 opacity-80 hover:-translate-y-0.5 hover:opacity-100",
                )}
                aria-label={`Ver imagen ${index + 1} de ${product.name}`}
              >
                <Image
                  src={image}
                  alt={product.name}
                  fill
                  sizes="120px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-7">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary">Stock real</Badge>
              {product.isNew ? <Badge variant="accent">Nuevo ingreso</Badge> : null}
            </div>
            <div className="space-y-3">
              <h1 className="font-display text-5xl leading-[0.88] text-white sm:text-6xl">
                {product.name}
              </h1>
              <p className="max-w-xl text-[15px] leading-8 text-stone-300 sm:text-base">
                {product.description}
              </p>
            </div>
          </div>

          <div className="flex items-end gap-3">
            <span className="text-4xl font-semibold text-white">
              {formatCurrency(product.price)}
            </span>
            {product.compareAtPrice ? (
              <span className="pb-1 text-sm text-stone-500 line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
            ) : null}
          </div>

          <Card className="border-white/8 bg-white/4">
            <CardContent className="grid gap-7 p-6">
              <Selector
                label="Color"
                value={selectedColor}
                options={product.colors}
                onSelect={(color) => {
                  setSelectedColor(color);
                  const nextVariant = product.variants.find((variant) => variant.color === color);
                  if (nextVariant) {
                    setSelectedSize(nextVariant.size);
                  }
                }}
              />

              <Selector
                label="Talle"
                value={selectedSize}
                options={availableVariants.map((variant) => variant.size)}
                onSelect={setSelectedSize}
              />

              <div className="grid gap-3 sm:grid-cols-[132px_minmax(0,1fr)]">
                <div className="flex items-center overflow-hidden rounded-full border border-white/10 bg-black/40">
                  <button
                    type="button"
                    className="h-12 w-12 text-lg text-white transition-colors hover:bg-white/6"
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-sm font-medium text-white">{quantity}</span>
                  <button
                    type="button"
                    className="h-12 w-12 text-lg text-white transition-colors hover:bg-white/6"
                    onClick={() => setQuantity((value) => value + 1)}
                  >
                    +
                  </button>
                </div>
                <Button className="h-12 w-full gap-2 shadow-[0_18px_38px_rgba(249,115,22,0.24)]" onClick={onAddToCart}>
                  <ShoppingBag className="h-4 w-4" />
                  Agregar al carrito
                </Button>
              </div>

              {added ? (
                <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
                  Producto agregado al carrito.
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="grid gap-4 py-5 text-sm text-stone-300">
              <div className="flex items-start gap-3">
                <Truck className="mt-0.5 h-4 w-4 text-amber-200" />
                <p>
                  Envios por Correo Argentino desde General Madariaga con atencion directa y stock visual real.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-amber-200" />
                <p>Cambios dentro de los 10 dias corridos. Soporte por WhatsApp para talle y disponibilidad.</p>
              </div>
              <div className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 text-amber-200" />
                <p>SKU: {activeVariant?.sku ?? "Sin definir"}.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <Card>
          <CardContent className="space-y-5">
            <h2 className="font-display text-3xl leading-none text-white">Detalles del producto</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="font-display text-[11px] uppercase tracking-[0.3em] text-stone-400">Horma</p>
                <p className="mt-2 text-sm leading-7 text-stone-300">{product.fit}</p>
              </div>
              <div>
                <p className="font-display text-[11px] uppercase tracking-[0.3em] text-stone-400">Materiales</p>
                <ul className="mt-2 space-y-1 text-sm leading-7 text-stone-300">
                  {product.materials.map((material) => (
                    <li key={material}>{material}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Link
              href="/legal/cambios-devoluciones"
              className="text-sm font-medium text-amber-100 underline underline-offset-4"
            >
              Ver politica de cambios y devoluciones
            </Link>
          </CardContent>
        </Card>

        <ShippingEstimator />
      </div>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-[11px] uppercase tracking-[0.34em] text-stone-400">
              Tambien te puede gustar
            </p>
            <h2 className="font-display text-3xl leading-none text-white">Mas de esta marca</h2>
          </div>
          <Link href="/catalogo" className="text-sm font-medium text-stone-200">
            Ver catalogo completo
          </Link>
        </div>
        <ProductGrid products={relatedProducts} />
      </section>
    </div>
  );
}

function Selector({
  label,
  value,
  options,
  onSelect,
}: {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="font-display text-[11px] uppercase tracking-[0.3em] text-stone-400">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={cn(
              "rounded-full border px-4 py-2.5 text-sm transition-all duration-300",
              value === option
                ? "border-amber-300 bg-amber-300 text-black"
                : "border-white/12 bg-white/4 text-stone-200 hover:border-white/25 hover:bg-white/7",
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
