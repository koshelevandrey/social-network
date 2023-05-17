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
      className={`rounded-[5px] bg-[#CFE0C3] px-2 py-1 font-medium text-black transition-colors 
      hover:bg-[#9EC1A3] disabled:cursor-not-allowed 
      disabled:opacity-50 disabled:hover:bg-[#CFE0C3] ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
};
