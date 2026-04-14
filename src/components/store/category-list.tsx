import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { categories } from "@/data/products";

export function CategoryList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/catalogo?categoria=${category.slug}`}
          className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-black p-6"
        >
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 1280px) 50vw, 33vw"
            className="object-cover opacity-45 transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0" style={{ backgroundImage: category.accent }} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.9))]" />
          <div className="relative z-10 flex min-h-72 flex-col justify-end space-y-4">
            <p className="font-accent text-[11px] uppercase tracking-[0.28em] text-amber-100/80">
              {category.name}
            </p>
            <div className="space-y-2">
              <h3 className="font-display text-3xl leading-none text-white">{category.hero}</h3>
              <p className="max-w-sm text-sm leading-6 text-stone-300">{category.description}</p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-white">
              Ver productos{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
