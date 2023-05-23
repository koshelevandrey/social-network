import React, { useState } from "react";
import { ProfileImage } from "~/components/ProfileImage";
import type { User } from "next-auth";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface PostCardProps {
  id: string;
  user: User;
  content: string;
  likesCount: number;
  likedByMe?: boolean;
  createdAt: Date;
}

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
  timeStyle: "short",
});

export const PostCard = ({
  id,
  user,
  content,
  likesCount,
  likedByMe = false,
  createdAt,
}: PostCardProps) => {
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
      key={id}
      className="flex min-w-[300px] flex-grow flex-col rounded-[15px] "
    >
      <div className="flex items-center gap-2 rounded-t-[15px] border-b bg-gradient-to-b from-neutral-700 to-neutral-800 px-4 py-2">
        <div className="max-w-[50px]">
          <Link href={`/profiles/${user.id}`}>
            <ProfileImage imageSrc={user.image} />
          </Link>
        </div>
        <div className="flex flex-col gap-[0px] leading-[100%] text-white ">
          <Link
            href={`/profiles/${user.id}`}
            className="text-2xl outline-none hover:underline focus-visible:underline"
          >
            <div className="text-2xl">{user.name}</div>
          </Link>
          <div className="text-sm">{dateTimeFormatter.format(createdAt)}</div>
        </div>
      </div>
      <div className="relative min-h-[100px] rounded-b-[15px] bg-gray-200 px-4 py-2 pb-[35px] text-lg text-black ">
        <p className="whitespace-pre-wrap">{content}</p>
        <div className="absolute bottom-[5px] right-[10px] flex items-center justify-center text-sm">
          <div className="mb-[3px] leading-[100%]">{totalLikesCount}</div>
          <button
            className="ml-[5px] h-[20px] w-[20px] transition-all duration-[200ms] enabled:cursor-pointer hover:enabled:scale-[1.1] hover:enabled:opacity-80
            disabled:opacity-50"
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
                fill={isPostLikedByMe ? "#ed1b24" : "#fff"}
                stroke={isPostLikedByMe ? "#ed1b24" : "#000"}
                strokeWidth="7px"
                fillRule="evenodd"
                d="M60.83,17.18c8-8.35,13.62-15.57,26-17C110-2.46,131.27,21.26,119.57,44.61c-3.33,6.65-10.11,14.56-17.61,22.32-8.23,8.52-17.34,16.87-23.72,23.2l-17.4,17.26L46.46,93.55C29.16,76.89,1,55.92,0,29.94-.63,11.74,13.73.08,30.25.29c14.76.2,21,7.54,30.58,16.89Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
