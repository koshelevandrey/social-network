import React from "react";

interface HeartIconProps {
  className?: string;
}

export const HeartIcon = ({ className = "" }: HeartIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-10 0 140.88 107.39"
      className={className}
    >
      <path
        strokeWidth="7px"
        fillRule="evenodd"
        d="M60.83,17.18c8-8.35,13.62-15.57,26-17C110-2.46,131.27,21.26,119.57,44.61c-3.33,6.65-10.11,14.56-17.61,22.32-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.55C29.16,76.89,1,55.92,0,29.94-.63,11.74,13.73.08,30.25.29c14.76.2,21,7.54,30.58,16.89Z"
      />
    </svg>
  );
};