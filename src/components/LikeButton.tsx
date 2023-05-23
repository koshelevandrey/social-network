import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Tooltip } from "~/components/Tooltip";

interface LikeButtonProps {
  likesCount: number;
  likedByMe?: boolean;
  className?: string;
}

const LIKED_COLOR = "#ed1b24";

export const LikeButton = ({
  likesCount,
  likedByMe = false,
  className = "",
}: LikeButtonProps) => {
  const session = useSession();
  const isAuthenticated = !!session?.data?.user?.id;

  const [totalLikesCount, setTotalLikesCount] = useState<number>(likesCount);
  const [isPostLikedByMe, setIsPostLikedByMe] = useState<boolean>(likedByMe);

  const handleLike = () => {
    if (isPostLikedByMe) {
      setTotalLikesCount((prevState) => prevState - 1);
    } else {
      setTotalLikesCount((prevState) => prevState + 1);
    }
    setIsPostLikedByMe((prevState) => !prevState);

    // TODO: send request to backend
  };

  return (
    <div
      className={`flex select-none items-center justify-center text-sm ${className}`}
    >
      <div className="mb-[3px] leading-[100%]">{totalLikesCount}</div>
      <Tooltip message={!isAuthenticated ? "Sign in to like posts" : ""}>
        <button
          className="ml-[5px] h-[20px] w-[20px] overflow-visible transition-all duration-[200ms] enabled:cursor-pointer hover:enabled:scale-[1.1] hover:enabled:opacity-80
            disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!isAuthenticated}
          onClick={handleLike}
        >
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-10 0 140.88 107.39"
          >
            <path
              fill={isPostLikedByMe ? LIKED_COLOR : "#fff"}
              stroke={isPostLikedByMe ? LIKED_COLOR : "#000"}
              strokeWidth="7px"
              fillRule="evenodd"
              d="M60.83,17.18c8-8.35,13.62-15.57,26-17C110-2.46,131.27,21.26,119.57,44.61c-3.33,6.65-10.11,14.56-17.61,22.32-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.55C29.16,76.89,1,55.92,0,29.94-.63,11.74,13.73.08,30.25.29c14.76.2,21,7.54,30.58,16.89Z"
            />
          </svg>
        </button>
      </Tooltip>
    </div>
  );
};
