"use client";

import Image from "next/image";
import { AvatarPlaceholder } from "../../account/UserAvatarArea";
import { BiMenuAltLeft, BiX } from "react-icons/bi";
import { useUiStore } from "../../../utils/store";
import NotificationBell from "../../NotificationBell";
import Link from "next/link";

function Header({ user, token }) {
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const showSidebar = useUiStore((state) => state.showSidebar);
  const toggleNotifications = useUiStore((state) => state.toggleNotifications);

  // console.log(toggleNotifications, toggleSidebar);

  return (
    <header className="w-full  ">
      <div className="w-full flex flex-row justify-between items-center ">
        <div className="flex flex-row justify-center items-center  space-x-4 md:space-x-8">
          <div className="self-center overflow-hidden relative min-h-[52px] min-w-[52px] ">
            {user.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                fill
                alt="Avatar"
                className="rounded-full absolute object-cover "
              />
            ) : (
              <Link href="/account/profile?tab=0">
                <AvatarPlaceholder width={52} height={52} />
              </Link>
            )}
          </div>

          <div className="self-center">
            <h1 className="self-center text-[--text-secondary] capitalize text-xl sm:text-2xl md:text-3xl lg:text-4xl  font-semibold">
              <span className="font-normal">Hello</span> {user.firstName}
              {"!"}
            </h1>

            <span className="text-sm text-[--text-secondary]">
              {" "}
              Take the bold step{" "}
            </span>
          </div>
        </div>

        <div className="flex flex-row justify-start space-x-4 lg:space-x-0">
          <NotificationBell
            token={token}
            toggleNotifications={toggleNotifications}
          />

          <div className="self-center p-1 hidden md:block ">
            {showSidebar ? (
              <BiX
                onClick={toggleSidebar}
                className="text-[--text-secondary]   text-4xl md:hidden "
              />
            ) : (
              <BiMenuAltLeft
                onClick={toggleSidebar}
                className="text-[--text-secondary]   text-4xl md:hidden "
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
