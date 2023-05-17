import React, { FormEvent, useLayoutEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { ProfileImage } from "~/components/ProfileImage";
import { Button } from "~/components/Button";
import { api } from "~/utils/api";
import { ClipLoader } from "react-spinners";

function updateTextAreaSize(textArea?: HTMLTextAreaElement | null) {
  if (!textArea) return;
  textArea.style.height = "0";
  textArea.style.height = `${textArea.scrollHeight}px`;
}

export const CreatePostForm = () => {
  const { data: sessionData } = useSession();
  const user = sessionData?.user;

  const [inputValue, setInputValue] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [inputValue]);

  const createNewPost = api.post.create.useMutation({
    onSuccess: () => {
      toast.success("Post was created");
    },
    onError: () => {
      toast.error("Failed to create a post");
    },
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    createNewPost.mutate({ content: inputValue });
  }

  return user ? (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 rounded-[15px] border-2 bg-gray-800 px-4 py-2"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="max-w-[50px]">
            <ProfileImage imageSrc={user?.image} />
          </div>
          <div className="text-2xl">{user?.name}</div>
        </div>
        <textarea
          ref={textAreaRef}
          style={{ height: 0 }}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="min-h-[100px] flex-grow resize-none overflow-hidden rounded-[10px] px-3 py-2 text-lg text-black
          outline-none disabled:cursor-not-allowed disabled:bg-gray-300"
          placeholder="Add some text and publish a post (max 500 chars)"
          disabled={createNewPost.isLoading}
        />
      </div>
      <Button
        className="mx-auto mt-[5px] md:w-[300px]"
        disabled={
          createNewPost.isLoading ||
          !inputValue ||
          (!!inputValue?.length && inputValue.length > 500)
        }
      >
        {createNewPost.isLoading ? (
          <ClipLoader color="#000" size={20} />
        ) : (
          "Publish"
        )}
      </Button>
    </form>
  ) : null;
};
