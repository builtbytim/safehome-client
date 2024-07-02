"use client";

import Image from "next/image";
import Hero from "../../../assets/images/account-hero.png";
import { useDataStore } from "../../utils/store";
import { AvatarPlaceholder } from "../account/UserAvatarArea";
import Link from "next/link";
import VerifiedImage from "../../../assets/images/verified.png";

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
        <div className=" h-[96px] w-[96px] rounded-full absolute left-[50%] bottom-[-48px] translate-x-[-50%]">
          {user && user.avatarUrl ? (
            <div className="relative rounded-full w-full h-full ">
              <Image
                priority
                src={user.avatarUrl}
                alt="User"
                width={96}
                height={96}
                className="w-full h-full object-cover rounded-full border border-gray-50"
              />

              {user.kycStatus === "APPROVED" && (
                <Image
                  src={VerifiedImage}
                  alt="verified"
                  width={20}
                  height={20}
                  className="absolute bottom-[3%] right-[3%] z-20"
                />
              )}
            </div>
          ) : (
            <Link href="/account/profile?tab=0">
              <AvatarPlaceholder width={96} height={96} />
            </Link>
          )}
        </div>
      </div>
      <h2 className="pt-16  font-semibold text-[--text] text-center text-2xl ">
        {user ? `${user?.lastName}  ${user?.firstName}` : "Loading..."}
      </h2>

      <h3 className="text-sm pb-4 text-[--highlight] text-center">
        {user ? user.email : `Loading...`}
      </h3>
    </div>
  );
}

export default UserSection;
