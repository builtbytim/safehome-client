"use client";

import { BsX } from "react-icons/bs";
import Overlay from "./Overlay";
import cn from "classnames";
import { useNotifyStore } from "../utils/store";
import { BsInfoCircle } from "react-icons/bs";
import { useRef } from "react";
import useOutsideClickDetector from "../utils/hooks/useOutsideClickDetector";

export default function Notify() {
  const props = useNotifyStore((state) => state.notifyState);
  let {
    content,
    title,
    show,
    working,
    onAccept,
    onAcceptText,
    onReject,
    onRejectText,
    allowClose,
  } = props;

  //   console.log(props);

  if (content.toLowerCase() === "failed to fetch") {
    content = "Please check your internet connection and try again.";
  }

  const ref = useRef(null);

  const hideMe = useNotifyStore((state) => state.hideNotify);

  useOutsideClickDetector(ref, closeSelf);

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
    <Overlay z={3}>
      <div ref={ref} className="w-full bg-white mt-4 py-3 px-4 rounded">
        {allowClose && (
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

        <div className="flex flex-row text-[--color-brand] justify-start space-x-2 items-center">
          <BsInfoCircle className=" text-2xl self-center" />
          <p className=" font-bold text-lg  self-center  capitalize">
            Notification
          </p>
        </div>

        <p className="text-[--primary] mt-3   first-letter:uppercase">
          {content}
        </p>

        <div className="mt-4 flex flex-row justify-end items-center w-full">
          {onReject && (
            <button
              className={cn(
                "px-4 py-2 rounded-md text-sm font-semibold text-[#8d4000]/80 hover:text-[#8d4000]/60 transition-flow",
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

          {onAccept && (
            <button
              className={cn(
                "px-4 py-2 rounded-md text-sm font-semibold text-[#8d4000]/80 hover:text-[#8d4000]/60 transition-flow ml-4",
                {
                  "cursor-not-allowed": working,
                }
              )}
              onClick={handleAccept}
              disabled={working}
            >
              {onAcceptText}
            </button>
          )}
        </div>
      </div>
    </Overlay>
  );
}
