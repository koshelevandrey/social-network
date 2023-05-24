import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Tooltip } from "~/components/Tooltip";
import { HeartIcon } from "~/components/icons/HeartIcon";
import { api } from "~/utils/api";

interface LikeButtonProps {
  postId: string;
  likesCount: number;
  likedByMe?: boolean;
  className?: string;
}

export const LikeButton = ({
  postId,
  likesCount,
  likedByMe = false,
  className = "",
}: LikeButtonProps) => {
  const session = useSession();
  const isAuthenticated = !!session?.data?.user?.id;

  const toggleLikeApi = api.post.toggleLike.useMutation();

  const [totalLikesCount, setTotalLikesCount] = useState<number>(likesCount);
  const [isPostLikedByMe, setIsPostLikedByMe] = useState<boolean>(likedByMe);
  const [hasUserAddedLike, setHasUserAddedLike] = useState<boolean>(false);

  const handleLike = () => {
    if (isPostLikedByMe) {
      setTotalLikesCount((prevState) => prevState - 1);
      setHasUserAddedLike(false);
    } else {
      setTotalLikesCount((prevState) => prevState + 1);
      setHasUserAddedLike(true);
    }

    setIsPostLikedByMe((prevState) => !prevState);

    toggleLikeApi.mutate({ id: postId });
  };

  return (
    <div
      className={`flex select-none items-center justify-center text-sm ${className}`}
    >
      <div className="leading-[100%]">{totalLikesCount}</div>
      <Tooltip message={!isAuthenticated ? "Sign in to like posts" : ""}>
        <button
          className="group ml-[5px] h-[20px] w-[20px] overflow-visible transition-all duration-[200ms]
            enabled:cursor-pointer hover:enabled:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!isAuthenticated}
          onClick={handleLike}
        >
          <HeartIcon
            className={`transition-all duration-200
              ${
                isPostLikedByMe
                  ? `fill-[#ed1b24] stroke-[#ed1b24]`
                  : "fill-[#fff] stroke-[#000] group-hover:stroke-[#ed1b24]"
              }
              ${hasUserAddedLike ? "animate-snap-heart" : ""}`}
          />
        </button>
      </Tooltip>
    </div>
  );
};
