import { useMutation } from "react-query";
import queryKeys from "../queryKeys";
import { fetchUtil, makeUrl } from "../fetchUtils";
import config from "../config";

export default function useConfirmOtp(onError = null, onSuccess = null) {
  const { mutate, isError, data, isSuccess, reset, isLoading } = useMutation({
    mutationKey: [queryKeys.confirmEmailOtp],

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
async function req(body) {
  const res = await fetchUtil({
    body,
    method: "POST",
    url: makeUrl(config.apiPaths.confirmEmailOtp),
  });

  if (res.success) {
    return res.data;
  } else {
    console.log(res.errorMessage, res.error);
    throw new Error(res?.error?.detail || res.errorMessage);
  }
}
