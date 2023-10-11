"use client";

import { BsX } from "react-icons/bs";
import Overlay from "./Overlay";
import cn from "classnames";
import { Zoom } from "react-awesome-reveal";
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
    allowClose,
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
    <Zoom direction="up" delay={200} duration={300}>
      <div className="w-full bg-white mt-4 py-4 px-4">
        {allowClose && (
          <div className="flex flex-row justify-end items-center w-full">
            <BsX
              role="button"
              className="text-3xl text-[#8d4000] hover:text-[#8d4000]/80 transition-flow"
              onClick={closeSelf}
            />
          </div>
        )}
        <p className="text-[--color-brand] font-bold text-lg    capitalize">
          {" "}
          Notification{" "}
        </p>

        <p className="text-[--primary] mt-2   first-letter:uppercase">
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
      {/* </Zoom> */}
    </Zoom>
  );
}
