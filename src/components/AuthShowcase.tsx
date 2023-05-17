import React, { useState } from "react";

import { signIn, signOut, useSession } from "next-auth/react";
import { SyncLoader, ClipLoader } from "react-spinners";
import { ProfileImage } from "~/components/ProfileImage";

export const AuthShowcase: React.FC = () => {
  const { data: sessionData, status } = useSession();
  const user = sessionData?.user;
  const isAuthenticated = !!user?.id;

  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  const onSignOut = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);
    try {
      await signOut();
    } finally {
      setIsSigningOut(false);
    }
  };

  return status === "loading" ? (
    <SyncLoader color="#fff" />
  ) : (
    <div className="flex w-full flex-col items-center justify-center gap-4 break-all">
      {sessionData?.user?.name ? (
        <div className="flex flex-col items-center text-white">
          <ProfileImage imageSrc={user?.image} />
          <div className="mt-[5px] text-center text-2xl">
            {sessionData.user.name}
          </div>
        </div>
      ) : null}
      <button
        className="w-full rounded-[15px] bg-white/10 px-1 py-2 text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void onSignOut() : () => void signIn()}
      >
        {isSigningOut ? (
          <ClipLoader color="#fff" size={20} />
        ) : isAuthenticated ? (
          "Sign out"
        ) : (
          "Sign in"
        )}
      </button>
    </div>
  );
};
