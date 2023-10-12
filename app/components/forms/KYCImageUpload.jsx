"use client";

import { CiImageOn } from "react-icons/ci";
import { useDropzone } from "react-dropzone";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import cn from "classnames";
import { BsX } from "react-icons/bs";
import BarLoader from "../BarLoader";
import { useMutation } from "react-query";
import { fetchUtil, makeUrl } from "../../utils/fetchUtils";
import config from "../../utils/config";
import queryKeys from "../../utils/queryKeys";
import { useNotifyStore } from "../../utils/store";
import Reviewing from "../Reviewing";
import { useSearchParams, useRouter } from "next/navigation";

function KYCImageUpload() {
  const setNotify = useNotifyStore((state) => state.setNotify);
  const [imageFile, setImageFile] = useState(null);
  const [rawFile, setRawFile] = useState(null);
  const [authCode, setAuthCode] = useState(null);
  const searchParams = useSearchParams();

  const router = useRouter();

  useEffect(() => {
    if (authCode) return;

    if (searchParams.has("authCode")) {
      const t = searchParams.get("authCode");

      setAuthCode(t);
    }
  }, [searchParams, authCode]);

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationKey: [queryKeys.kycIDPicture],

    mutationFn: async function (body) {
      const url = makeUrl(config.apiPaths.uploadKycID);
      const res = await fetchUtil({
        method: "POST",
        formEncoded: true,
        url,
        body,
        headers: {
          "X-AUTH-CODE": authCode,
        },
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

    onSuccess: function (data, vars) {
      router.replace(`/verify-kyc/photo?authCode=${data.code}`);
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
    maxFiles: 2,
    maxSize: 1024 * 1024 * 2,
  });

  function handleSubmit() {
    if (isLoading) return;

    mutate({
      file: rawFile,
      documentType: "PASSPORT",
    });
  }

  return (
    <div className="space-y-10 flex flex-col justify-center items-center">
      <BarLoader v={0} active={isLoading} />

      {isSuccess && <Reviewing />}

      {!!imageFile && (
        <div
          className="bg-[--b1] relative w-full lg:w-[54
        3px] rounded-brand p-4 flex flex-col justify-center items-center"
        >
          <div
            onClick={() => {
              setRawFile(null);
              setImageFile(null);
            }}
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

      <button
        disabled={isLoading || !!!rawFile}
        className="btn-1 max-w-[368px]"
        onClick={handleSubmit}
      >
        Continue
      </button>
    </div>
  );
}

export default KYCImageUpload;
