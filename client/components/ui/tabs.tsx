"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

export const Tabs = TabsPrimitive.Root;

export const TabsList: React.FC<
  React.ComponentProps<typeof TabsPrimitive.List>
> = ({ className, ...props }) => (
  <TabsPrimitive.List
    className={cn(
      "inline-flex items-center space-x-1 rounded-md bg-gray-100 p-1",
      className
    )}
    {...props}
  />
);

export const TabsTrigger: React.FC<
  React.ComponentProps<typeof TabsPrimitive.Trigger>
> = ({ className, ...props }) => (
  <TabsPrimitive.Trigger
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
      "data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow",
      className
    )}
    {...props}
  />
);

export const TabsContent: React.FC<
  React.ComponentProps<typeof TabsPrimitive.Content>
> = ({ className, ...props }) => (
  <TabsPrimitive.Content
    className={cn(
      "mt-2 rounded-md border border-gray-200 bg-white p-4 outline-none",
      className
    )}
    {...props}
  />
);
