import { FC, ReactNode } from "react";

type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "caption";

interface TypographyProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

export const Typography: FC<TypographyProps> = ({ children, variant = "body", className }) => {
  const baseClasses = "text-white";
  const variantClasses: Record<Variant, string> = {
    h1: "text-4xl font-bold",
    h2: "text-3xl font-bold",
    h3: "text-2xl font-semibold",
    h4: "text-xl font-semibold",
    h5: "text-lg font-medium",
    h6: "text-base font-medium",
    body: "text-base",
    caption: "text-sm text-gray-400",
  };

  return <p className={`${baseClasses} ${variantClasses[variant]} ${className || ""}`}>{children}</p>;
};
