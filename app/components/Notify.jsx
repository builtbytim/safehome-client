"use client";

import { BsX } from "react-icons/bs";
import Overlay from "./Overlay";
import cn from "classnames";
import { useNotifyStore } from "../utils/store";
import { BsInfoCircle } from "react-icons/bs";

export default function Notify() {
  const props = useNotifyStore((state) => state.notifyState);
  let {
    content = "",
    show,
    working,
    onAccept,
    onAcceptText = "Ok",
    onReject,
    onRejectText = "Close",
    allowClose,
  } = props;

  //   console.log(props);

  if (content.toLowerCase() === "failed to fetch") {
    content = "Please check your internet connection and try again.";
  }

  const hideMe = useNotifyStore((state) => state.hideNotify);

  function closeSelf() {
    if (show && !working) {
      hideMe();
    }
  }

  function handleAccept() {
    closeSelf();
    if (onAccept) {
      onAccept();
    }
  }

  function handleReject() {
    closeSelf();
    if (onReject) {
      onReject();
    }
  }

  if (!show) return null;

  return (
    <Overlay pos="center" z={4}>
      <div className="w-[90%] bg-white mt-4 pt-6 pb-4 max-w-sm px-4 rounded-[8px]">
        {false && (
          <div className="flex flex-row  justify-end items-center w-full">
            <div className="p-1 rounded-full hover:bg-[--b1] cursor-pointer">
              <BsX
                role="button"
                className="text-3xl lg:text-3xl  rounded-full text-[--primary] transitioning"
                onClick={closeSelf}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col text-[--placeholder] justify-center space items-center space-y-2">
          <BsInfoCircle className=" text-3xl lg:text-4xl self-center" />
          <p className=" font-bold text-[--sorta-dark] blur-[.5px] text-lg lg:text-xl  self-center  capitalize">
            Notification
          </p>
        </div>

        <p className="text-sm  md:text-base text-gray-400 text-center font-medium py-2   first-letter:uppercase">
          {content}
        </p>

        <div className="mt-4 flex flex-col space-y-2 justify-center items-center w-full">
          {onAccept && (
            <button
              onClick={handleAccept}
              disabled={working}
              className={cn(
                "px-4 py-2 w-full text-sm  bg-[#F1F1F1] hover:bg-[#D1D1D1] transition text-gray-800 rounded-[8px]",
                {
                  "cursor-not-allowed": working,
                }
              )}
            >
              {onAcceptText}
            </button>
          )}

          {(allowClose || onReject) && (
            <button
              className={cn(
                "px-4 py-2 w-full text-sm   transitioning text-gray-800 ",
                {
                  "cursor-not-allowed": working,
                }
              )}
              onClick={handleReject}
              disabled={working}
            >
              {onRejectText}
            </button>
          )}
        </div>
      </div>
    </Overlay>
  );
}
