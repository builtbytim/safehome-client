"use client";

import { useQuery } from "react-query";
import queryKeys from "../queryKeys";
import { fetchUtil, makeUrl, extractErrorMessage } from "../fetchUtils";
import config from "../config";

export default function useUserWallet(
  tokenObj,
  onError = null,
  onSuccess = null,
  enabled = true
) {
  const { isError, data, isSuccess, isLoading, refetch } = useQuery({
    queryKey: [queryKeys.getWallet, tokenObj],

    enabled: !!tokenObj && enabled,

    queryFn: req,

    onSuccess(data) {
      if ("function" === typeof onSuccess) {
        onSuccess(data);
      }
    },

    onError(err, vars) {
      if ("function" === typeof onError) {
        onError(err, vars);
      }
    },
  });

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    refetch,
  };
}

async function req(params) {
  const tokenObj = params.queryKey[1];

  const res = await fetchUtil({
    url: makeUrl(config.apiPaths.getWallet),
    method: "GET",
    auth: tokenObj,
  });

  // console.log(params);

  if (res.success) {
    return res.data;
  } else {
    throw new Error(extractErrorMessage(res));
  }
}
