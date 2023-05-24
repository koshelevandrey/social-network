import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { api } from "~/utils/api";
import { PostCard } from "~/components/PostCard";

interface PostsGridProps {
  className?: string;
}

export const PostsGrid = ({ className = "" }: PostsGridProps) => {
  const {
    data: postsData,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = api.post.latestPosts.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  const posts =
    postsData?.pages?.length && postsData?.pages[0]?.posts?.length
      ? postsData?.pages[0].posts
      : null;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error...</h1>;
  }

  if (!posts?.length) {
    return <h1>No posts yet</h1>;
  }

  return (
    <InfiniteScroll
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={"Loading..."}
      dataLength={posts.length}
    >
      <div className={`flex flex-wrap gap-6 overflow-hidden ${className}`}>
        {posts.map((post) => (
          <PostCard key={post.id} likesCount={post._count.likes} {...post} />
        ))}
      </div>
    </InfiniteScroll>
  );
};
