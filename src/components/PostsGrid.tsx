import React from "react";
import { api } from "~/utils/api";
import { ProfileImage } from "~/components/ProfileImage";

export const PostsGrid = () => {
  const posts = api.post.latestPosts.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  // TODO: add loading handling
  // TODO: add error handling when getting posts

  const firstPosts =
    posts?.data?.pages?.length && posts?.data?.pages[0]?.posts?.length
      ? posts?.data?.pages[0].posts
      : null;

  return (
    <div className="grid grid-cols-2 gap-6">
      {firstPosts
        ? firstPosts.map((post) => (
            <div className="flex flex-col gap-4 rounded-[15px] bg-gradient-to-b from-[#777] to-[#aaa] px-4 py-2 text-black">
              <div className="flex items-center gap-2">
                <div className="max-w-[50px]">
                  <ProfileImage imageSrc={post?.user?.image} />
                </div>
                <div className="text-2xl">{post?.user?.name}</div>
              </div>
              <div className="min-h-[100px] px-3 py-2 text-lg">
                {post?.content}
              </div>
            </div>
          ))
        : "Loading posts"}
    </div>
  );
};
