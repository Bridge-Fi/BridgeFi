"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X as CloseIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DialogTitle } from "./dialog";

// Re-export the root and trigger for ease of use
export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;

// Side variants for the sheet
export type SheetSide = "top" | "right" | "bottom" | "left";

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {
  side?: SheetSide;
}

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ className, children, side = "right", ...props }, ref) => (
  <SheetPrimitive.Portal>
    <SheetPrimitive.Overlay className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm" />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 h-full bg-background p-6 outline-none",
        side === "top" && "top-0 left-0 right-0 h-1/3",
        side === "right" && "right-0 top-0",
        side === "bottom" && "bottom-0 left-0 right-0 h-1/3",
        side === "left" && "left-0 top-0",
        className
      )}
      {...props}
    >
      <DialogTitle className="text-lg font-bold">Menu</DialogTitle>
      <div className="flex justify-end">
        <SheetPrimitive.Close asChild>
          <button className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none">
            <CloseIcon className="h-5 w-5" />
          </button>
        </SheetPrimitive.Close>
      </div>
      {children}
    </SheetPrimitive.Content>
  </SheetPrimitive.Portal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;
