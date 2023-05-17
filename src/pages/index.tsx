import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { CreatePostForm } from "~/components/CreatePostForm";
import { PostsGrid } from "~/components/PostsGrid";

const Home: NextPage = () => {
  const session = useSession();
  const user = session?.data?.user;
  const isAuthenticated = !!user?.id;

  return (
    <div className="flex w-[100%] flex-col gap-2 px-4 py-3">
      {isAuthenticated ? <CreatePostForm /> : null}
      <PostsGrid />
    </div>
  );
};

export default Home;
