import React from "react";
import { ProfileImage } from "~/components/ProfileImage";
import { User } from "next-auth";

interface PostCardProps {
  id: string;
  user: User;
  content: string;
  likesCount: number;
  likedByMe?: boolean;
  createdAt: Date;
}

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
      className="flex min-w-[300px] flex-grow flex-col rounded-[15px] "
    >
      <div className="flex items-center gap-2 rounded-t-[15px] border-b bg-gradient-to-b from-neutral-700 to-neutral-800 px-4 py-2">
        <div className="max-w-[50px]">
          <ProfileImage imageSrc={user.image} />
        </div>
        <div className="flex flex-col gap-[0px] leading-[100%] text-white ">
          <div className="text-2xl">{user.name}</div>
          <div className="text-sm">{createdAt.toLocaleDateString()}</div>
        </div>
      </div>
      <div className="min-h-[100px] rounded-b-[15px] bg-gray-200 px-4 py-2 text-lg text-black">
        {content}
      </div>
    </div>
  );
};
