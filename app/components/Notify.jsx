"use client";

import { BsX } from "react-icons/bs";
import Overlay from "./Overlay";
import cn from "classnames";
import { Slide } from "react-reveal";
import { useNotifyStore } from "../utils/store";

export default function Notify() {
  const {
    content,
    title,
    show,
    working,
    onAccept,
    onAcceptText,
    onReject,
    onRejectText,
  } = useNotifyStore((state) => state.notifyState);

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

  console.log("SHOW:", show);

  if (!show) return null;

  return (
    <Overlay z={3}>
      <Slide
        top
        className="flex w-full flex-row justify-center items-center"
        duration={300}
      >
        {/* <Zoom top right duration="250" className="w-full"> */}
        <div className="w-full bg-[--text-secondary] py-4 px-4">
          <div className="flex flex-row justify-end items-center w-full">
            <BsX
              role="button"
              className="text-3xl text-white hover:text-white/80 transition-flow"
              onClick={closeSelf}
            />
          </div>

          <p className="text-white text-lg font-semibold">{title}</p>

          <p className="text-white text-sm">{content}</p>

          <div className="mt-4 flex flex-row justify-end items-center w-full">
            {onReject && (
              <button
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-semibold text-white/80 hover:text-white/60 transition-flow",
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
                  "px-4 py-2 rounded-md text-sm font-semibold text-white/80 hover:text-white/60 transition-flow ml-4",
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
        {/* </Zoom> */}
      </Slide>
    </Overlay>
  );
}
