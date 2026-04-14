import Image from "next/image";

import { cn } from "@/lib/utils";

type ProductImageProps = {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
};

export function ProductImage({
  src,
  alt,
  label,
  className,
  priority = false,
}: ProductImageProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%),linear-gradient(180deg,#121212,#060606)]",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.38))]" />
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
      />
      {label ? (
        <span className="font-accent absolute left-4 top-4 z-10 rounded-full border border-white/12 bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white backdrop-blur">
          {label}
        </span>
      ) : null}
    </div>
  );
}
