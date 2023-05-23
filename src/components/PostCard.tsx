import React from "react";
import { ProfileImage } from "~/components/ProfileImage";
import type { User } from "next-auth";
import Link from "next/link";
import { LikeButton } from "~/components/LikeButton";

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
  return (
    <div
      key={id}
      className="flex min-w-[300px] flex-grow flex-col rounded-[15px] shadow-xl"
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
      <div className="relative min-h-[100px] flex-grow rounded-b-[15px] bg-gray-200 px-4 py-2 pb-[35px] text-lg text-black ">
        <p className="whitespace-pre-wrap">{content}</p>
        <LikeButton
          likesCount={likesCount}
          likedByMe={likedByMe}
          className="absolute bottom-[5px] right-[10px]"
        />
      </div>
    </div>
  );
};
