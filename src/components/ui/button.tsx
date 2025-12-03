import { ButtonHTMLAttributes, FC } from "react";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "px-4 py-2 rounded font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => {
  return <button className={buttonVariants()} {...props} />;
};
