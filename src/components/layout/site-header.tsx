"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { useCart } from "@/providers/cart-provider";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catalogo" },
  { href: "/categorias", label: "Marcas" },
  { href: "/envios", label: "Envios" },
  { href: "/faq", label: "FAQ" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-black/72 backdrop-blur-xl">
      <Container className="flex h-[4.5rem] items-center justify-between gap-4 py-2">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/6 p-1 shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur">
            <Image
              src="/brand-logo.png"
              alt={`Logo de ${siteConfig.name}`}
              width={48}
              height={48}
              priority
              className="h-full w-full object-contain"
            />
          </span>
          <span className="flex flex-col">
            <span className="font-display text-[10px] uppercase tracking-[0.34em] text-amber-200/75">
              Ropa urbana y sneakers
            </span>
            <span className="font-display text-3xl leading-none text-white">{siteConfig.name}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-[11px] uppercase tracking-[0.26em] text-stone-300 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/catalogo" aria-label="Buscar en catalogo">
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/carrito" aria-label="Ver carrito" className="relative">
            <Button variant="outline" size="icon">
              <ShoppingBag className="h-4 w-4" />
            </Button>
            {totalItems > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-300 px-1 text-[10px] font-semibold text-black">
                {totalItems}
              </span>
            ) : null}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link href="/carrito" aria-label="Ver carrito" className="relative">
            <Button variant="outline" size="icon">
              <ShoppingBag className="h-4 w-4" />
            </Button>
            {totalItems > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-300 px-1 text-[10px] font-semibold text-black">
                {totalItems}
              </span>
            ) : null}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Abrir menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </Container>

      <div
        className={cn(
          "overflow-hidden border-t border-white/8 bg-black/92 transition-all md:hidden",
          open ? "max-h-96" : "max-h-0 border-t-0",
        )}
      >
        <Container className="flex flex-col gap-4 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-[12px] uppercase tracking-[0.24em] text-stone-200"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </Container>
      </div>
    </header>
  );
}
