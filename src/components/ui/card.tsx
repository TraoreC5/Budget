import { FC, ReactNode } from "react";

export const Card: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div className={`bg-gray-700 rounded-md p-4 shadow ${className || ""}`}>
      {children}
    </div>
  );
};
