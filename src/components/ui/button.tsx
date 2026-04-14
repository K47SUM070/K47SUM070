import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "font-display inline-flex items-center justify-center rounded-full border text-sm uppercase tracking-[0.18em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-black",
  {
    variants: {
      variant: {
        default:
          "border-amber-300/30 bg-[linear-gradient(135deg,#f97316,#f2c06b)] text-black shadow-[0_14px_40px_rgba(249,115,22,0.2)] hover:-translate-y-0.5 hover:brightness-105 focus-visible:ring-amber-300",
        secondary:
          "border-white/12 bg-white/6 text-white hover:bg-white/10 focus-visible:ring-white/30",
        outline:
          "border-white/18 bg-black/30 text-white hover:border-amber-300/40 hover:bg-white/8 focus-visible:ring-white/30",
        ghost: "border-transparent text-white hover:bg-white/8 focus-visible:ring-white/30",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-[11px]",
        lg: "h-12 px-6 text-[12px]",
        icon: "h-10 w-10 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
