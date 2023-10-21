"use client";

import { useQuery } from "react-query";
import queryKeys from "../queryKeys";
import config from "../config";
import { createFetcher } from "../fetchUtils";

export default function useUserSavingsStats(
  tokenObj,
  onError = null,
  onSuccess = null,
  enabled = true
) {
  const { isError, data, isSuccess, isLoading, refetch } = useQuery({
    queryKey: [queryKeys.getSavingsStats, tokenObj],

    enabled: !!tokenObj && enabled,

    queryFn: createFetcher({
      url: config.apiPaths.getUserSavingsStats,
      method: "GET",
      auth: tokenObj,
    }),

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
