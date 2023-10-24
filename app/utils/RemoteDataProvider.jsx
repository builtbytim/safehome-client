"use client";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5,
      networkMode: "offlineFirst",
    },

    mutations: {
      retry: 0,
      networkMode: "offlineFirst",
    },

    networkMode: "offlineFirst",
  },
});
function RemoteDataProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default RemoteDataProvider;
