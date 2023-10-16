"use client";

import { useQuery } from "react-query";
import queryKeys from "../queryKeys";
import { fetchUtil, makeUrl, extractErrorMessage } from "../fetchUtils";
import config from "../config";
import { createFetcher } from "../fetchUtils";

export default function useUserInvestmentStats(
  tokenObj,
  onError = null,
  onSuccess = null,
  enabled = true
) {
  const { isError, data, isSuccess, isLoading, refetch } = useQuery({
    queryKey: [queryKeys.getInvestmentStats, tokenObj],

    enabled: !!tokenObj && enabled,

    queryFn: createFetcher({
      url: config.apiPaths.getUserInvestmentStats,
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
