import { useMutation } from "react-query";
import queryKeys from "../queryKeys";
import { fetchUtil, makeUrl } from "../fetchUtils";
import config from "../config";

export default function useSignIn(onError = null, onSuccess = null) {
  const { mutate, isError, data, isSuccess, reset, isLoading } = useMutation({
    mutationKey: [queryKeys.signUp],

    mutationFn: req,

    onSuccess(data) {
      if ("function" === typeof onSuccess) {
        onSuccess(data);
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
  });

  // console.log(params);

  if (res.success) {
    return res.data;
  } else {
    const ACTION = res.headers.get("X-ACTION") || "";

    throw new Error(ACTION || res.error?.detail || res.errorMessage);
  }
}
