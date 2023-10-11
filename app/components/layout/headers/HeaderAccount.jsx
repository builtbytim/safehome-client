"use client";

import { BsArrowLeftShort } from "react-icons/bs";
import { useUiStore } from "../../../utils/store";
import NotificationBell from "../../NotificationBell";
import { useRouter, usePathname } from "next/navigation";

function HeaderAccount({ title = "", extraClasses = "" }) {
  const toggleNotifications = useUiStore((state) => state.toggleNotifications);

  const router = useRouter();
  const currentPathname = usePathname();

  function goBack() {
    router.back();
  }

  return (
    <header className="w-full  mb-6">
      <div className="w-full flex flex-row justify-between items-center ">
        <div className="flex flex-row justify-start space-x-2">
          {currentPathname !== "/account" && (
            <BsArrowLeftShort
              onClick={goBack}
              className=" self-center text-4xl md:hidden "
            />
          )}
          <h1
            className={
              "self-center text-[--text-secondary] capitalize text-2xl md:text-3xl lg:text-4xl  font-semibold " +
              extraClasses
            }
          >
            {title || "Account"}
          </h1>
        </div>

        <div className="flex flex-row justify-center items-center  space-x-4 md:space-x-8">
          <NotificationBell toggleNotifications={toggleNotifications} />
        </div>
      </div>
    </header>
  );
}

export default HeaderAccount;
