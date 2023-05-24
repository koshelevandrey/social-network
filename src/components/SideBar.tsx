import React from "react";
import { useSession } from "next-auth/react";
import { AuthShowcase } from "~/components/AuthShowcase";
import { SideBarLink } from "~/components/SideBarLink";
import { useRouter } from "next/router";

import { BsFillPersonVcardFill, IoHome } from "react-icons/all";

export const SideBar = () => {
  const { pathname, query } = useRouter();
  const pathNameWithQueryProfileId = pathname.replace(
    "[id]",
    typeof query?.id === "string" ? query.id : ""
  );

  const session = useSession();
  const user = session?.data?.user;
  const isAuthenticated = !!user?.id;

  return (
    <nav className="sticky top-0 flex min-h-screen w-[150px] flex-col items-center justify-start self-start bg-gray-900 px-4 py-3">
      <AuthShowcase />
      <ul className="mt-[20px] flex flex-col gap-y-[10px] font-spaceGrotesk">
        <SideBarLink href="/" isActive={pathname === "/"}>
          <div className="flex items-center justify-center gap-2">
            <IoHome />
            <span>Home</span>
          </div>
        </SideBarLink>
        {isAuthenticated ? (
          <SideBarLink
            href={`/profiles/${user.id}`}
            isActive={pathNameWithQueryProfileId === `/profiles/${user.id}`}
          >
            <div className="flex items-center justify-center gap-2">
              <BsFillPersonVcardFill />
              <span>Profile</span>
            </div>
          </SideBarLink>
        ) : null}
      </ul>
    </nav>
  );
};
