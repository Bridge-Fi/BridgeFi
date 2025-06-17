// components/ui/textarea.tsx
"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <textarea
      className={cn(
        "form-textarea", // you defined this @apply in globals.css
        props.className
      )}
      {...props}
    />
  );
}
