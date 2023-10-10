import { useMutation } from "react-query";
import queryKeys from "../queryKeys";
import { fetchUtil, makeUrl, extractErrorMessage } from "../fetchUtils";
import config from "../config";

export default function useChangePassword(onSuccess, onError) {
  const { mutate, isError, data, isSuccess, reset, isLoading } = useMutation({
    mutationKey: [queryKeys.changePassword],

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
    url: makeUrl(config.apiPaths.changePassword),
    method: "POST",
    body: params.body,
    auth: params.token,
  });

  // console.log(params);

  if (res.success) {
    return res.data;
  } else {
    console.log("useChangePassword: ", res.errorMessage, res.error);
    const ACTION = res.headers?.get("X-ACTION") || "";

    const resError = {
      action: ACTION,
      message: extractErrorMessage(res),
    };

    throw resError;
  }
}
