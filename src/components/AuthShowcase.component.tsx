import React from "react";

import { signIn, signOut, useSession } from "next-auth/react";
import { SyncLoader } from "react-spinners";

export const AuthShowcase: React.FC = () => {
  const { data: sessionData, status } = useSession();

  return status === "loading" ? (
    <SyncLoader color="#fff" />
  ) : (
    <div className="flex flex-col items-center justify-center gap-4">
      {sessionData?.user?.name ? (
        <div className="flex items-center gap-[10px] text-2xl text-white">
          {sessionData?.user?.image ? (
            <img
              src={sessionData?.user.image}
              className="block max-w-[32px] rounded-[50%]"
              alt=""
            />
          ) : null}
          <div className="text-center">{sessionData.user.name}</div>
        </div>
      ) : null}
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
