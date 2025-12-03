import { FC, ReactNode } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

export const Tabs: FC<{ children: ReactNode; defaultValue?: string }> = ({ children, defaultValue }) => (
  <TabsPrimitive.Root defaultValue={defaultValue}>{children}</TabsPrimitive.Root>
);

export const TabsList = TabsPrimitive.List;
export const TabsTrigger = TabsPrimitive.Trigger;
export const TabsContent = TabsPrimitive.Content;
