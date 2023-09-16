"use client";

import LiveCapture, { CaptureArea, CaptureView } from "./LiveCapture";
import { useState } from "react";
import cn from "classnames";

function VisualCapture() {
  const [captureState, setCaptureState] = useState("idle");
  const [photo, setPhoto] = useState(null);

  function reset() {
    setPhoto(null);
    setCaptureState("idle");
  }

  function onTakePhoto(dataUri) {
    setPhoto(dataUri);
    setCaptureState("captured");
  }

  function handleBtnClick() {
    if (captureState === "idle") {
      setCaptureState("active");
      return;
    }
  }

  return (
    <div className="space-y-10  flex flex-col justify-center items-center">
      {!!photo && (
        <div>
          <CaptureView reset={reset} photo={photo} />
        </div>
      )}

      {captureState === "active" ? (
        <LiveCapture onCapture={onTakePhoto} />
      ) : !!!photo ? (
        <CaptureArea />
      ) : null}

      <button
        onClick={handleBtnClick}
        disabled={captureState === "active"}
        className={"btn-1 w-full max-w-[368px] absolute bottom-0 z-30"}
      >
        {captureState === "captured" ? "Continue" : "Start"}
      </button>
    </div>
  );
}

export default VisualCapture;
