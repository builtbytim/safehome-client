"use client";

import { CiImageOn } from "react-icons/ci";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import cn from "classnames";
import { BsX } from "react-icons/bs";
import BarLoader from "../BarLoader";
import { useMutation } from "react-query";
import { createFetcher } from "../../utils/fetchUtils";
import config from "../../utils/config";
import queryKeys from "../../utils/queryKeys";
import { useNotifyStore } from "../../utils/store";
import Reviewing from "../Reviewing";
import { useSearchParams } from "next/navigation";
import { kycModesOfIdentification } from "../../utils/constants";

function KYCImageUpload({ user, token }) {
  const setNotify = useNotifyStore((state) => state.setNotify);
  const [imageFile, setImageFile] = useState(null);
  const [rawFile, setRawFile] = useState(null);
  const searchParams = useSearchParams();

  const documentType = kycModesOfIdentification.find(
    (v) => v.value === searchParams.get("documentType")
  );

  useEffect(() => {
    // cancel upload if documentType is empty

    if (!documentType) {
    }
  }, []);

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationKey: [queryKeys.kycIDPicture],

    mutationFn: createFetcher({
      url: config.apiPaths.uploadKycID,
      method: "POST",
      auth: token,
      formEncoded: true,
    }),

    onError: function (error) {
      setNotify({
        title: "Something went wrong",
        content: error.message,
        allowClose: true,
        show: true,
      });
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setRawFile(file);
    setImageFile(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpeg", ".jpg"],
    },
    maxFiles: 1,
    maxSize: 1024 * 1024 * 5,
  });

  function handleSubmit() {
    if (isLoading) return;

    mutate({
      file: rawFile,
    });
  }

  return (
    <div className="w-full">
      <p className="text-[--placeholder] text-xs pb-4">
        {" "}
        Upload a clear picture of your{" "}
        {documentType ? documentType.name : " document"}.
        <br />
        Max. Size 5MB.
        <br />
        PNG or JPEG
      </p>
      <div className="w-full space-y-10 flex flex-col justify-center items-center">
        <BarLoader v={0} active={isLoading} />

        {isSuccess && <Reviewing />}

        {!!imageFile && (
          <div
            className="bg-[--b1] relative h-[300px]  w-full lg:min-w-[54
        3px] rounded-brand p-4 flex flex-col justify-center items-center"
          >
            <div
              onClick={() => {
                setRawFile(null);
                setImageFile(null);
              }}
              title="Remove"
              className="absolute bg-white z-10 right-0 bottom-0 p-2 hover:cursor-pointer  rounded-br rounded-tl opacity-60 hover:opacity-80 transitioning "
            >
              <BsX className=" text-2xl"></BsX>
            </div>

            <Image
              className="absolute rounded aspect-video"
              fill
              priority
              src={imageFile}
              alt="uploaded image"
            />
          </div>
        )}

        <div
          {...getRootProps()}
          className={
            "bg-[--b1] lg:w-[543px] h-[100px] lg:h-[137px] rounded-brand border border-[--lines] max-w-2xl w-full  justify-center items-center space-x-2 text-black " +
            cn({
              " hidden ": !!imageFile,
              " flex ": !!!imageFile,
            })
          }
        >
          <input {...getInputProps()} />
          <CiImageOn className=" text-xl "></CiImageOn>{" "}
          {isDragActive ? (
            <span> Drag the files here </span>
          ) : (
            <span> Upload Image </span>
          )}
        </div>

        <button
          disabled={isLoading || !!!rawFile}
          className="btn-1 max-w-[368px]"
          onClick={handleSubmit}
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default KYCImageUpload;
