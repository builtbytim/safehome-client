import { useMutation } from "react-query";
import queryKeys from "../queryKeys";
import { fetchUtil, makeUrl } from "../fetchUtils";
import config from "../config";

export default function useSignIn(onError = null, onSuccess = null) {
  const { mutate, isError, data, isSuccess, reset, isLoading } = useMutation({
    mutationKey: [queryKeys.signIn],

    mutationFn: req,

    onSuccess(data, vars) {
      if ("function" === typeof onSuccess) {
        onSuccess(data, vars);
      }
    },

    onError(err, vars, ctx) {
      if ("function" === typeof onError) {
        onError(err, vars, ctx);
      }
    },
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
    console.log(res.errorMessage, res.error);
    const ACTION = res.headers.get("X-ACTION") || "";

    throw new Error(ACTION || res.error?.detail || res.errorMessage);
  }
}
