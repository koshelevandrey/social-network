import React from "react";

interface TooltipProps {
  message: string;
  children: React.ReactElement;
}

export const Tooltip = ({ message, children }: TooltipProps) => {
  return message ? (
    <div className="group relative">
      {children}
      <div
        className="pointer-events-none absolute left-[-50px] top-[-70px] z-10 rounded-[7px]
      bg-[#ff9966] px-2 py-1 text-center text-white opacity-0 transition-opacity group-hover:opacity-100"
      >
        {message}
      </div>
    </div>
  ) : (
    children
  );
};
