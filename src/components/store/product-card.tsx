import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProductImage } from "@/components/store/product-image";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/producto/${product.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-white/18 group-hover:shadow-[0_34px_70px_rgba(0,0,0,0.42)]">
        <ProductImage
          src={product.image}
          alt={product.name}
          label={product.badge ?? product.category}
          className="aspect-[4/4.2] rounded-none"
        />
        <CardContent className="space-y-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-[11px] uppercase tracking-[0.28em] text-stone-400">
                {product.category}
              </p>
              <h3 className="font-display text-[1.8rem] leading-[0.9] text-white">{product.name}</h3>
            </div>
            {product.isNew ? <Badge variant="accent">Nuevo</Badge> : null}
          </div>
          <p className="text-sm leading-6 text-stone-300">{product.shortDescription}</p>
          <div className="flex items-center gap-3 text-stone-400">
            <span className="font-display text-[11px] uppercase tracking-[0.24em]">
              {product.sizes.join(" / ")}
            </span>
          </div>
          <div className="flex items-end justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-white">
              {formatCurrency(product.price)}
              </span>
              {product.compareAtPrice ? (
                <span className="text-sm text-stone-500 line-through">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              ) : null}
            </div>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
