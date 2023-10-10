import { useMutation } from "react-query";
import queryKeys from "../queryKeys";
import { fetchUtil, makeUrl, extractErrorMessage } from "../fetchUtils";
import config from "../config";

export default function useSignIn(onSuccess, onError) {
  const { mutate, isError, data, isSuccess, reset, isLoading } = useMutation({
    mutationKey: [queryKeys.signIn],

    mutationFn: req,

    onSuccess,
    onError,
  });

  return {
    data,
    mutate,
    isLoading,
    isError,
    isSuccess,
    reset,
  };
}

async function req(params) {
  const res = await fetchUtil({
    url: makeUrl(config.apiPaths.signIn),
    method: "POST",
    body: params,
    formEncoded: true,
  });

  // console.log(params);

  if (res.success) {
    return res.data;
  } else {
    console.log("useSignIn: ", res.errorMessage, res.error);
    const ACTION = res.headers?.get("X-ACTION") || "";
    const authCode = res.headers?.get("X-AUTH-CODE") || "";

    const signInError = {
      action: ACTION,
      authCode,
      message: extractErrorMessage(res),
    };

    throw signInError;
  }
}
