"use client";

import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { useCart } from "@/providers/cart-provider";

export function CartPageClient() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const shipping = items.length > 0 ? 6200 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-14 text-center">
          <div className="rounded-full border border-white/10 bg-white/6 p-4">
            <ShoppingBag className="h-6 w-6 text-amber-200" />
          </div>
          <div>
            <h2 className="font-display text-4xl leading-none text-white">Tu carrito esta vacio</h2>
            <p className="mt-2 text-sm text-stone-400">
              Suma productos desde el catalogo para iniciar el pedido.
            </p>
          </div>
          <Link href="/catalogo">
            <Button>Explorar catalogo</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.variantId}>
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <h3 className="font-display text-3xl leading-none text-white">{item.product.name}</h3>
                <p className="text-sm text-stone-400">
                  {item.variant.color} · Talle {item.variant.size}
                </p>
                <p className="text-sm font-medium text-stone-100">
                  {formatCurrency(item.product.price)}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center overflow-hidden rounded-full border border-white/10 bg-black/30">
                  <button
                    type="button"
                    className="h-10 w-10 text-white"
                    onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="min-w-10 text-center text-sm text-white">{item.quantity}</span>
                  <button
                    type="button"
                    className="h-10 w-10 text-white"
                    onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <span className="min-w-24 text-right text-sm font-semibold text-white">
                  {formatCurrency(item.lineTotal)}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.variantId)}
                  aria-label={`Eliminar ${item.product.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="h-fit lg:sticky lg:top-24">
        <CardContent className="space-y-5">
          <h2 className="font-display text-3xl leading-none text-white">Resumen</h2>
          <div className="space-y-3 text-sm text-stone-300">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Envio estimado</span>
              <span>{formatCurrency(shipping)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-3 text-base font-semibold text-white">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
          <p className="text-sm leading-7 text-stone-400">
            Envios por Correo Argentino disponibles para localidades cercanas y pueblos de la zona.
          </p>
          <div className="space-y-3">
            <Link href="/checkout" className="block">
              <Button className="w-full">Continuar al checkout</Button>
            </Link>
            <Link href="/catalogo" className="block">
              <Button variant="outline" className="w-full">
                Seguir comprando
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
