"use client";

import { useQuery } from "react-query";
import queryKeys from "../queryKeys";
import { fetchUtil, makeUrl, extractErrorMessage } from "../fetchUtils";
import config from "../config";

export default function useRemoteSession(
  tokenObj,
  onError = null,
  onSuccess = null
) {
  const { isError, data, isSuccess, isLoading, isFetching } = useQuery({
    queryKey: [queryKeys.getSession, tokenObj],

    retry: false,

    enabled: !!tokenObj,

    keepPreviousData: true,

    queryFn: req,

    refetchInterval: 30000,

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

    cacheTime: 1000,

    staleTime: 60000,
  });

  return {
    authenticating: isLoading && !data,
    authenticated: isSuccess,
    authenticatedUser: data?.user,
    authenticatedSession: data?.session,
    authenticationFailed: isError || !tokenObj,
    isFetching,
  };
}

async function req(params) {
  const tokenObj = params.queryKey[1];

  const authStore = {
    accessToken: tokenObj.access_token,
    tokenType: tokenObj.token_type,
  };

  const res = await fetchUtil({
    url: makeUrl(config.apiPaths.getSession),
    method: "GET",
    auth: authStore,
  });

  // console.log(params);

  if (res.success) {
    return res.data;
  } else {
    throw new Error(extractErrorMessage(res));
  }
}
