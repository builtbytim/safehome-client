"use client";

import { BsX } from "react-icons/bs";
import Overlay from "./Overlay";
import { FcEmptyFilter } from "react-icons/fc";
import { Slide } from "react-reveal";
import { useUiStore } from "../utils/store";
import Image from "next/image";
import CampaignRoundedImage from "../../assets/images/icons/campaign-rounded.svg";

export default function Notifications() {
  const showNotifications = useUiStore((state) => state.showNotifications);
  const toggleNotifications = useUiStore((state) => state.toggleNotifications);

  // console.log(showNotifications, toggleNotifications);

  function closeSelf() {
    toggleNotifications();
  }

  if (!showNotifications) return null;

  return (
    <Overlay
      ClickBack={() => {
        return (
          <div className="hidden md:block" onClick={toggleNotifications}>
            <BsX className="text-4xl text-[--invert]" />
          </div>
        );
      }}
      skipWrapper
      z={3}
    >
      <Slide left className="" duration={300}>
        {/* <Zoom top right duration="250" className="w-full"> */}

        <div
          className={
            "fixed  inset-y-0  bg-white mx-auto flex flex-col lg:justify-center items-center w-full lg:w-[80%] max-w-lg inset-x-0  md:right-auto md:left-0  z-40"
          }
        >
          <div className="w-full min-h-screen bg-white mt-4  px-4  space-y-4 relative">
            <div className="  flex md:hidden  flex-row justify-end items-center w-full">
              <BsX
                role="button"
                className="text-3xl text-[#8d4000] hover:text-[#8d4000]/80 transition-flow"
                onClick={closeSelf}
              />
            </div>

            <div className="flex flex-row justify-between items-center ">
              <p className="text-[--color-brand] font-bold text-lg    capitalize">
                {" "}
                Notifications
              </p>

              <span className="text-[--text-danger] transitioning hover:cursor-pointer text-sm hover:text-[#ff0000]/80">
                Mark all as read
              </span>
            </div>
            {/* Notification items  */}

            <div className="pb-32  max-h-[80vh] overflow-y-auto scrollbar-fix">
              <div className="w-full flex h-full flex-col justify-center items-center">
                <div className="h-full py-16   space-y-4  mt-4 flex flex-col justify-center items-center text-[--color-brand-2]">
                  <FcEmptyFilter className="text-4xl text-[--color-brand-2] hover:text-[--color-brand-2]/80 transition-flow" />
                  <p className="text-center text-xl md:text-2xl">
                    {" "}
                    No notifications at the moment.
                  </p>
                </div>
              </div>

              {Array.from({ length: 0 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-row justify-between items-center w-full mt-4"
                >
                  <div className="flex flex-row justify-between items-start space-x-4">
                    <div className="self-start  p-2 rounded-full bg-[#FF61000D] ">
                      <Image
                        src={CampaignRoundedImage}
                        alt="avatar"
                        width="22"
                        height="22"
                        className="rounded-full min-h-[22px] min-w-[22px] object-contain"
                      />
                    </div>

                    <div className="self-center space-y-2">
                      <p className="text-[--color-brand-2]  text-sm">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nesciunt, cupiditate. Similique, maiores obcaecati rem
                        itaque fuga consectetur explicabo.
                      </p>
                      <p className="text-[--placeholder] text-xs">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons  */}

            <div className="bg-white absolute bottom-4 inset-x-0 px-4 pt-4 pb-4 w-full flex flex-col justify-center itens-center space-y-4 py-2">
              <button className="btn-2 text-[--color-brand-2] font-medium border-[--color-brand-2] hover:bg-[#1E0700]/10">
                Clear All
              </button>
            </div>
          </div>
          {/* </Zoom> */}
        </div>
      </Slide>
    </Overlay>
  );
}
