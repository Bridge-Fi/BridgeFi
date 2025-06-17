// components/ui/alert-dialog.tsx
"use client";

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";

export const Dialog = AlertDialogPrimitive.Root;
export const DialogTrigger = AlertDialogPrimitive.Trigger;
export const DialogPortal = AlertDialogPrimitive.Portal;

export const DialogOverlay: React.FC<
  React.ComponentProps<typeof AlertDialogPrimitive.Overlay>
> = ({ className, ...props }) => (
  <AlertDialogPrimitive.Overlay
    className={cn("fixed inset-0 bg-black/50 backdrop-blur-sm", className)}
    {...props}
  />
);

export const DialogContent: React.FC<
  React.ComponentProps<typeof AlertDialogPrimitive.Content>
> = ({ className, children, ...props }) => (
  <DialogPortal>
    <DialogOverlay />
    <AlertDialogPrimitive.Content
      className={cn(
        "fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg animate-in zoom-in-90",
        className
      )}
      {...props}
    >
      {children}
    </AlertDialogPrimitive.Content>
  </DialogPortal>
);

export const DialogHeader: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => <div className="mb-4">{children}</div>;

export const DialogFooter: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => <div className="mt-6 flex justify-end space-x-2">{children}</div>;

export const DialogTitle: React.FC<
  React.ComponentProps<typeof AlertDialogPrimitive.Title>
> = ({ className, ...props }) => (
  <AlertDialogPrimitive.Title
    className={cn("text-lg font-medium text-gray-900", className)}
    {...props}
  />
);

export const DialogDescription: React.FC<
  React.ComponentProps<typeof AlertDialogPrimitive.Description>
> = ({ className, ...props }) => (
  <AlertDialogPrimitive.Description
    className={cn("text-sm text-gray-500", className)}
    {...props}
  />
);

export const DialogCancel: React.FC<
  React.ComponentProps<typeof AlertDialogPrimitive.Cancel>
> = ({ className, ...props }) => (
  <AlertDialogPrimitive.Cancel
    className={cn(
      "inline-flex items-center rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300",
      className
    )}
    {...props}
  />
);

export const DialogAction: React.FC<
  React.ComponentProps<typeof AlertDialogPrimitive.Action>
> = ({ className, ...props }) => (
  <AlertDialogPrimitive.Action
    className={cn(
      "inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500",
      className
    )}
    {...props}
  />
);
