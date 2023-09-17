import Image from "next/image";
import React from "react";
import BellImage from "../../../assets/images/icons/bell.svg";
import { BiMenuAltLeft } from "react-icons/bi";

function Header() {
  return (
    <header className="w-full  ">
      <div className="w-full flex flex-row justify-between items-center ">
        <div className="flex flex-row justify-start space-x-3">
          <BiMenuAltLeft className="text-[--text-brand] self-center text-4xl md:hidden " />
          <h1 className="self-center text-[--text-brand] capitalize text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
            {" "}
            Investment{" "}
          </h1>
        </div>

        <div className="flex flex-row justify-center items-center  space-x-4 md:space-x-8">
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

          <div className="self-center">
            <Image
              src="https://i.pravatar.cc/150?u=helios@g.com"
              width="52"
              height="52"
              alt="Avatar"
              className="rounded-full object-contain "
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
