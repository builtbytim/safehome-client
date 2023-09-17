"use client";

import Camera, { IMAGE_TYPES, FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { BsX } from "react-icons/bs";
import Image from "next/image";

function LiveCapture({ onCapture }) {
  function handleTakePhoto(dataUri) {
    onCapture(dataUri);
  }

  return (
    <div className="max-w-full p-2 rounded-brand bg-black min-h-[250px] mb-16">
      <Camera
        // isMaxResolution
        idealFacingMode={FACING_MODES.USER}
        imageType={IMAGE_TYPES.PNG}
        isImageMirror={false}
        idealResolution={{ width: 600, height: 600 }}
        onTakePhotoAnimationDone={(dataUri) => {
          handleTakePhoto(dataUri);
        }}
      />
    </div>
  );
}

export default LiveCapture;

export function CaptureArea({ children }) {
  return (
    <div className="relative w-64 h-52 lg:h-64 border-4 border-[--lines] rounded-brand mb-16">
      <div className="absolute  bg-white top-[50%] right-[50%] translate-x-[50%] z-10 -translate-y-[50%] min-w-[120%] min-h-[60%]"></div>

      <div className="absolute  bg-white top-[50%] right-[50%] translate-x-[50%] z-10 -translate-y-[50%] min-h-[120%] min-w-[60%]"></div>

      {/* {children && (
        <div className="absolute top-[50%] right-[50%] translate-x-[50%]  -translate-y-[50%] z-20 w-full h-full ">
          {children}
        </div>
      )} */}
    </div>
  );
}

export function CaptureView({ photo, reset }) {
  return (
    <div className="relative mb-16">
      <div
        onClick={reset}
        title="Remove"
        className="absolute bg-white right-0 bottom-0 p-2 hover:cursor-pointer  rounded-br rounded-tl opacity-60 hover:opacity-80 transitioning "
      >
        <BsX className=" text-2xl"></BsX>
      </div>

      <Image
        height="64"
        width="64"
        src={photo}
        alt="capture image"
        className="rounded-brand"
      />
    </div>
  );
}
