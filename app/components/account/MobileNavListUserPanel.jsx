"use client";
import Image from "next/image";
import { useDataStore } from "../../utils/store";

function MobileNavListUserPanel() {
  const data = useDataStore((state) => state.data);

  const user = data.user;

  return (
    <div className="flex justify-start space-x-3 items-center">
      <div className="rounded-full h-[56px] w-[56px] overflow-hidden">
        {" "}
        <Image
          priority
          src={
            user && user.avatarUrl
              ? user.avatarUrl
              : "https://i.pravatar.cc/150"
          }
          alt="User"
          width={56}
          height={56}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h2 className="font-bold text-base text-[--color-brand-2] text-left">
          {user ? `${user.firstName} ${user.lastName}` : `Loading...`}
        </h2>
        <h3 className="text-sm text-[--text-brand-2] text-left">
          {user ? user.email : `Loading...`}
        </h3>
      </div>
    </div>
  );
}

export default MobileNavListUserPanel;
