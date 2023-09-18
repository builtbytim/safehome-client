import { useMutation } from "react-query";
import queryKeys from "../queryKeys";
import { fetchUtil, makeUrl } from "../fetchUtils";
import config from "../config";

export default function useSignUp(onError = null, onSuccess = null) {
  const { mutate, isError, data, isSuccess, reset, isLoading } = useMutation({
    mutationKey: [queryKeys.signUp],

    mutationFn: req,

    onSuccess(data) {
      if ("function" === typeof onSuccess) {
        onSuccess(data);
      }
    },

    onError(err) {
      if ("function" === typeof onError) {
        onError(err);
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
    url: makeUrl(config.apiPaths.createUser),
    method: "POST",
    body: params,
  });

  // console.log(params);

  if (res.success) {
    return res.data;
  } else {
    console.log(res.errorMessage, res.error);
    throw new Error("Unable to create user, try again.");
  }
}
