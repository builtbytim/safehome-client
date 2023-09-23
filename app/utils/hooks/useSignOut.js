import { useMutation } from "react-query";
import { fetchUtil, makeUrl, extractErrorMessage } from "../fetchUtils";
import config from "../config";

export default function useSignOut(onSuccess) {
  const { mutate, isLoading, isSuccess, isError, reset } = useMutation({
    mutationFn: signOutReq,

    onError: (error) => {
      console.log("useSignOut Error: ", error);
    },

    onSuccess,
  });

  return {
    mutate,
    isLoading,
    isSuccess,
    isError,
    reset,
  };
}

async function signOutReq(data) {
  const res = await fetchUtil({
    url: makeUrl(config.apiPaths.signOut),
    method: "POST",
    auth: data,
  });

  if (!res.success) {
    console.log("fetchUtil: ", res.error);
    throw new Error(extractErrorMessage(res));
  }

  return res.data;
}
