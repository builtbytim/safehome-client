"use client";

import Image from "next/image";
import React from "react";
import BellImage from "../../../../assets/images/icons/bell.svg";
import { BiMenuAltLeft, BiX } from "react-icons/bi";
import { useUiStore } from "../../../utils/store";

function Header({ user }) {
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const showSidebar = useUiStore((state) => state.showSidebar);

  return (
    <header className="w-full  ">
      <div className="w-full flex flex-row justify-between items-center ">
        <div className="flex flex-row justify-center items-center  space-x-4 md:space-x-8">
          <div className="self-center">
            <Image
              src="https://i.pravatar.cc/150?u=helios@g.com"
              width="52"
              height="52"
              alt="Avatar"
              className="rounded-full object-contain "
            />
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
          <div className="self-center relative">
            <Image
              src={BellImage}
              width="48"
              height="48"
              alt="Notification Logo"
              className="w-[34px]  h-[34px] md:w-[48px] md:h-[48px] object-contain"
            />
            <span className="border rounded-full border-[--text-brand] bg-[--text-brand] p-[0.125rem] md:p-1 inline-block absolute top-0 right-0"></span>
          </div>

          <div className="self-center p-1 ">
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
