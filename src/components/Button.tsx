import React, { type DetailedHTMLProps } from "react";

type ButtonProps = {
  className?: string;
} & DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button = ({ className = "", ...props }: ButtonProps) => {
  return (
    <button
      className={`rounded-[5px] bg-[#ffbb66] px-2 py-1 font-medium text-black transition-colors 
      enabled:hover:bg-[#ffcc66] disabled:cursor-not-allowed disabled:bg-gray-200
      disabled:opacity-50 ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
};
