"use client";

import { CiImageOn } from "react-icons/ci";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import Image from "next/image";
import cn from "classnames";
import { BsX } from "react-icons/bs";

function KYCImageUpload() {
  const [imageFile, setImageFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    setImageFile(URL.createObjectURL(file));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpeg", ".jpg"],
    },

    maxFiles: 2,
    maxSize: 1024 * 1024 * 2,
  });

  return (
    <div className="space-y-10 flex flex-col justify-center items-center">
      {!!imageFile && (
        <div
          className="bg-[--b1] relative w-full lg:w-[54
        3px] rounded-brand p-4 flex flex-col justify-center items-center"
        >
          <div
            onClick={() => setImageFile(null)}
            title="Remove"
            className="absolute right-0 bottom-0 p-2 hover:cursor-pointer  rounded-br rounded-tl opacity-60 hover:opacity-80 transitioning "
          >
            <BsX className=" text-2xl"></BsX>
          </div>

          <Image
            width="150"
            height="200"
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

      <button className="btn-1 max-w-[368px]">Continue</button>
    </div>
  );
}

export default KYCImageUpload;
