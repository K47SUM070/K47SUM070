"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

import { ProductGrid } from "@/components/store/product-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { categories } from "@/data/products";
import type { Product } from "@/types";

type CatalogClientProps = {
  products: Product[];
  initialCategory?: string;
};

export function CatalogClient({
  products,
  initialCategory = "",
}: CatalogClientProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const colors = Array.from(new Set(products.flatMap((product) => product.colors)));
  const sizes = Array.from(new Set(products.flatMap((product) => product.sizes)));

  const filtered = products.filter((product) => {
    const searchValue = search.toLowerCase();
    const matchesSearch =
      searchValue.length === 0 ||
      product.name.toLowerCase().includes(searchValue) ||
      product.shortDescription.toLowerCase().includes(searchValue);

    const matchesCategory = !category || product.category === category;
    const matchesSize = !size || product.sizes.includes(size);
    const matchesColor = !color || product.colors.includes(color);

    const matchesPrice =
      !price ||
      (price === "hasta-120000" && product.price <= 120000) ||
      (price === "120000-135000" && product.price > 120000 && product.price <= 135000) ||
      (price === "mas-135000" && product.price > 135000);

    return matchesSearch && matchesCategory && matchesSize && matchesColor && matchesPrice;
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
        <Button
          variant="outline"
          className="w-full justify-between lg:hidden"
          onClick={() => setShowFilters((value) => !value)}
        >
          Filtros
          <SlidersHorizontal className="h-4 w-4" />
        </Button>

        <Card className={showFilters ? "block" : "hidden lg:block"}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="font-accent text-[11px] uppercase tracking-[0.28em] text-stone-400">Buscar</p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Dunk, Samba, Vans..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-accent text-[11px] uppercase tracking-[0.28em] text-stone-400">Marca</p>
              <Select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option value="">Todas</option>
                {categories.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <p className="font-accent text-[11px] uppercase tracking-[0.28em] text-stone-400">Talle</p>
              <Select value={size} onChange={(event) => setSize(event.target.value)}>
                <option value="">Todos</option>
                {sizes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <p className="font-accent text-[11px] uppercase tracking-[0.28em] text-stone-400">Color</p>
              <Select value={color} onChange={(event) => setColor(event.target.value)}>
                <option value="">Todos</option>
                {colors.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <p className="font-accent text-[11px] uppercase tracking-[0.28em] text-stone-400">Precio</p>
              <Select value={price} onChange={(event) => setPrice(event.target.value)}>
                <option value="">Todos</option>
                <option value="hasta-120000">Hasta $120.000</option>
                <option value="120000-135000">$120.000 a $135.000</option>
                <option value="mas-135000">Mas de $135.000</option>
              </Select>
            </div>

            <Button
              variant="secondary"
              className="w-full"
              onClick={() => {
                setSearch("");
                setCategory("");
                setSize("");
                setColor("");
                setPrice("");
              }}
            >
              Limpiar filtros
            </Button>
          </CardContent>
        </Card>
      </aside>

      <section className="space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-4xl leading-none text-white">Todos los productos</h2>
            <p className="mt-2 text-sm text-stone-400">
              {filtered.length} resultados para comprar online o reservar por WhatsApp.
            </p>
          </div>
        </div>

        {filtered.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="font-display text-3xl leading-none text-white">
                No encontramos productos con esos filtros.
              </p>
              <p className="mt-2 text-sm text-stone-400">
                Proba cambiar marca, talle o rango de precio.
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
