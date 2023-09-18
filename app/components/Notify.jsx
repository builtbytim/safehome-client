"use client";

import { BsX } from "react-icons/bs";
import Overlay from "./Overlay";
import cn from "classnames";
import { Slide } from "react-reveal";
import { useNotifyStore } from "../utils/store";

export default function Notify() {
  const props = useNotifyStore((state) => state.notifyState);
  const {
    content,
    title,
    show,
    working,
    onAccept,
    onAcceptText,
    onReject,
    onRejectText,
  } = props;

  //   console.log(props);

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
    <Overlay z={3}>
      <Slide top className="" duration={300}>
        {/* <Zoom top right duration="250" className="w-full"> */}
        <div className="w-full bg-[--color-brand] mt-4 py-4 px-4">
          <div className="flex flex-row justify-end items-center w-full">
            <BsX
              role="button"
              className="text-3xl text-white hover:text-white/80 transition-flow"
              onClick={closeSelf}
            />
          </div>

          <p className="text-white   uppercase">{title}</p>

          <p className="text-white  font-semibold first-letter:uppercase">
            {content}
          </p>

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
