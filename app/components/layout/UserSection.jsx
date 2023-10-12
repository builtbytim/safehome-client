"use client";

import Image from "next/image";
import Hero from "../../../assets/images/account-hero.png";
import { useDataStore } from "../../utils/store";
import { AvatarPlaceholder } from "../account/UserAvatarArea";

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
          {user && user.avatarUrl ? (
            <Image
              priority
              src={user.avatarUrl}
              alt="User"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <AvatarPlaceholder width={96} height={96} />
          )}
        </div>
      </div>
      <h2 className="pt-16  font-semibold text-[--text-secondary] text-center text-2xl ">
        {user ? `${user?.lastName}  ${user?.firstName}` : "Loading..."}
      </h2>

      <h3 className="text-sm pb-4 text-[--text-brand-2] text-center">
        {user ? user.email : `Loading...`}
      </h3>
    </div>
  );
}

export default UserSection;
