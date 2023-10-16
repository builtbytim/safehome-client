import Image from "next/image";
import { RoundShape } from "react-placeholder/lib/placeholders";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import Spinner from "../Spinner";
import { BiImageAdd } from "react-icons/bi";
import { useMutation, useQueryClient } from "react-query";
import {
  extractErrorMessage,
  fetchUtil,
  makeUrl,
} from "../../utils/fetchUtils";
import config from "../../utils/config";
import queryKeys from "../../utils/queryKeys";
import { useNotifyStore } from "../../utils/store";

export function AvatarPlaceholder({ width, height }) {
  return <RoundShape color="#e6e6e6" style={{ width, height }} />;
}

function UserAvatarArea({ user, token }) {
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState(null);
  const [rawFile, setRawFile] = useState(null);

  const setNotify = useNotifyStore((state) => state.setNotify);

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
    maxFiles: 5,
    maxSize: 1024 * 1024 * 2,
  });

  const { mutate, isLoading, isSuccess } = useMutation({
    mutationKey: [queryKeys.kycIDPicture],

    mutationFn: async function (body) {
      const url = makeUrl(config.apiPaths.setAvatar);
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
        throw new Error(extractErrorMessage(res));
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
      setImageFile(null);
      setRawFile(null);

      queryClient.invalidateQueries({ queryKey: [queryKeys.getSession] });

      setNotify({
        title: "Success",
        content: "Avatar uploaded successfully",
        allowClose: true,
        show: true,
      });
    },
  });

  function handleUploadAvatar() {
    if (imageFile && !isLoading) {
      mutate({ avatar: rawFile });
    }
  }

  return (
    <div className="flex gap-2 items-center">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {(user && user.avatarUrl) || imageFile ? (
          <div className="rounded-full h-[96px] w-[96px] overflow-hidden border">
            <Image
              priority
              src={imageFile || user.avatarUrl}
              alt="User"
              width={96}
              height={96}
              className="w-full h-full  object-cover"
            />
          </div>
        ) : (
          <div className="min-w-[96px] min-h-[96px] relative">
            <AvatarPlaceholder width={84} height={84} />
            <BiImageAdd className="absolute p-[2px] bg-[--primary] rounded right-[15%] bottom-[15%] text-white text-2xl z-20" />
          </div>
        )}
      </div>
      <p className="p-3 text-sm">
        {!imageFile &&
          (isDragActive ? (
            <span> Drag the Image here </span>
          ) : (
            <span> Tap to Change Avatar </span>
          ))}

        {imageFile && (
          <button
            onClick={handleUploadAvatar}
            className="ml-4 rounded-brand py-1 border text-sm px-4 hover:bg-[--lines] transitioning"
          >
            {isLoading ? <Spinner size="tiny" /> : <span>Save</span>}
          </button>
        )}
      </p>
    </div>
  );
}

export default UserAvatarArea;
