import React from "react";
import { useSession } from "next-auth/react";
import { AuthShowcase } from "~/components/AuthShowcase";
import { SideBarLink } from "~/components/SideBarLink";
import { useRouter } from "next/router";

export const SideBar = () => {
  const { pathname } = useRouter();
  const session = useSession();
  const user = session?.data?.user;
  const isAuthenticated = !!user?.id;

  return (
    <nav className="sticky top-0 flex min-h-screen w-[150px] flex-col items-center justify-start self-start bg-gray-900 px-4 py-3">
      <AuthShowcase />
      <ul className="mt-[20px] flex flex-col gap-y-[10px] font-spaceGrotesk">
        <SideBarLink href="/" label="Home" isActive={pathname === "/"} />
        {isAuthenticated ? (
          <SideBarLink
            href={`/profiles/${user.id}`}
            label="Profile"
            isActive={pathname.startsWith("/profiles/")}
          />
        ) : null}
      </ul>
    </nav>
  );
};
