// components/ui/input.tsx
"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-white text-foreground border-gray-300",
        outline:
          "bg-white text-foreground border-gray-300 hover:border-gray-400",
        filled: "bg-gray-50 text-foreground border-gray-200 hover:bg-white",
      },
      size: {
        default: "h-10",
        sm: "h-8 text-sm px-2",
        lg: "h-12 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  asChild?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, variant, size: variantSize, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "input";
    return (
      <Comp
        className={cn(inputVariants({ variant, size: variantSize }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
