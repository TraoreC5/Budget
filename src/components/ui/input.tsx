import { InputHTMLAttributes, FC } from "react";

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input className="px-3 py-2 rounded bg-gray-800 text-white w-full" {...props} />;
};
