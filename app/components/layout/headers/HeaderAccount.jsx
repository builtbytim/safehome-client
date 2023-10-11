"use client";

import { BiMenuAltLeft } from "react-icons/bi";
import { useUiStore } from "../../../utils/store";
import NotificationBell from "../../NotificationBell";

function HeaderAccount({ title = "", extraClasses = "" }) {
  const toggleNotifications = useUiStore((state) => state.toggleNotifications);

  return (
    <header className="w-full  ">
      <div className="w-full flex flex-row justify-between items-center ">
        <div className="flex flex-row justify-start space-x-0">
          <BiMenuAltLeft className="text-[--text-brand] self-center text-4xl hidden " />
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
