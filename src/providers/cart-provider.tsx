"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { getProducts, getVariantById } from "@/lib/catalog";
import type { CartItem, Product, ProductVariant } from "@/types";

type ResolvedCartItem = CartItem & {
  product: Product;
  variant: ProductVariant;
  lineTotal: number;
};

type CartContextValue = {
  items: ResolvedCartItem[];
  totalItems: number;
  subtotal: number;
  addItem: (payload: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "casa-olmo-cart";

const CartContext = createContext<CartContextValue | null>(null);

function resolveItems(rawItems: CartItem[]) {
  const products = getProducts();

  return rawItems
    .map((item) => {
      const product = products.find((candidate) => candidate.id === item.productId);
      const variant = getVariantById(item.productId, item.variantId);

      if (!product || !variant) {
        return null;
      }

      return {
        ...item,
        product,
        variant,
        lineTotal: product.price * item.quantity,
      };
    })
    .filter((item): item is ResolvedCartItem => item !== null);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [rawItems, setRawItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CartItem[];
        setRawItems(parsed);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rawItems));
  }, [hydrated, rawItems]);

  const items = resolveItems(rawItems);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.lineTotal, 0);

  const addItem = (payload: CartItem) => {
    setRawItems((current) => {
      const existing = current.find((item) => item.variantId === payload.variantId);

      if (existing) {
        return current.map((item) =>
          item.variantId === payload.variantId
            ? { ...item, quantity: item.quantity + payload.quantity }
            : item,
        );
      }

      return [...current, payload];
    });
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    setRawItems((current) =>
      current
        .map((item) => (item.variantId === variantId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (variantId: string) => {
    setRawItems((current) => current.filter((item) => item.variantId !== variantId));
  };

  const clearCart = () => setRawItems([]);

  return (
    <CartContext.Provider
      value={{ items, totalItems, subtotal, addItem, updateQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
