"use client";

import Image from "next/image";
import Hero from "../../../assets/images/account-hero.png";
import { useDataStore } from "../../utils/store";

function UserSection() {
  const user = useDataStore((state) => state.data?.usr);

  return (
    <div>
      <div className="w-full relative">
        <div className="w-full h-[124px] relative overflow-hidden">
          <Image
            priority
            src={Hero}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="rounded-full h-[96px] w-[96px] overflow-hidden absolute left-[50%] bottom-[-48px] translate-x-[-50%]">
          <Image
            priority
            src={
              user && user.avatarUrl
                ? user.avatarUrl
                : "https://i.pravatar.cc/150?u=helios@g.com"
            }
            alt="User"
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <h1 className="pt-16 pb-5 font-semibold text-[--text-secondary] text-center text-2xl">
        {user ? `${user?.lastName}  ${user?.firstName}` : "Loading..."}
      </h1>
    </div>
  );
}

export default UserSection;
