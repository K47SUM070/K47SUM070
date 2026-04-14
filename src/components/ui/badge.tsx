import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "font-accent inline-flex items-center rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.22em]",
  {
    variants: {
      variant: {
        default: "border-white/12 bg-white/8 text-white",
        secondary: "border-white/8 bg-black/30 text-stone-300",
        accent: "border-amber-300/25 bg-amber-200/12 text-amber-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
