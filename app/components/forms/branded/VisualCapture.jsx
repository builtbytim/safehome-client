"use client";

import LiveCapture, { CaptureArea, CaptureView } from "./LiveCapture";
import { useState } from "react";
import cn from "classnames";
import { useMutation } from "react-query";
import { fetchUtil, makeUrl } from "../../../utils/fetchUtils";
import config from "../../../utils/config";
import { useNotifyStore } from "../../../utils/store";
import queryKeys from "../../../utils/queryKeys";
import BarLoader from "../../BarLoader";
import Reviewing from "../../Reviewing";

function VisualCapture({ user, token }) {
  const setNotify = useNotifyStore((state) => state.setNotify);
  const [captureState, setCaptureState] = useState("idle");
  const [photo, setPhoto] = useState(null);

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationKey: [queryKeys.kycPicture],

    mutationFn: async function (body) {
      const url = makeUrl(config.apiPaths.uploadKycPicture);
      const res = await fetchUtil({
        method: "POST",
        formEncoded: true,
        url,
        body,
        auth: token,
      });

      if (res.success) {
        return res.data;
      } else {
        console.log(res.errorMessage, res.error);
        throw new Error(res?.error?.detail || res.errorMessage);
      }
    },

    onError: function (error) {
      setNotify({
        title: "Something went wrong",
        content: error.message,
        allowClose: true,
        show: true,
      });
    },
  });

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

    if (captureState === "captured" && !isLoading) {
      mutate({
        file: dataURItoFile(photo, "kyc-picture.jpg"),
      });
    }
  }

  return (
    <div className="space-y-10  w-full flex flex-col justify-center items-center">
      {isSuccess && <Reviewing />}

      <BarLoader v={0} active={isLoading} />
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
        disabled={captureState === "active" || isLoading}
        className={"btn-1 w-full max-w-[368px]  bottom-0 z-10"}
      >
        {captureState === "captured" ? "Continue" : "Start"}
      </button>
    </div>
  );
}

export default VisualCapture;

function dataURItoFile(dataURI, filename) {
  // Split the Data URI to extract the media type and data portion
  const splitDataURI = dataURI.split(",");
  const mediaType = splitDataURI[0].match(/:(.*?);/)[1];
  const dataString = atob(splitDataURI[1]);

  // Create a Uint8Array from the data string
  const dataArray = new Uint8Array(dataString.length);
  for (let i = 0; i < dataString.length; i++) {
    dataArray[i] = dataString.charCodeAt(i);
  }

  // Create a Blob from the Uint8Array
  const blob = new Blob([dataArray], { type: mediaType });

  // Create a File from the Blob with the specified filename
  return new File([blob], filename);
}
