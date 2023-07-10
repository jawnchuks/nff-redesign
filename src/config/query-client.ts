import React from "react";
import { QueryClient} from "@tanstack/react-query";

export const useQueryClientAndSettings = () => {
  const queryClientSettings = {
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        cacheTime: 3.6e6,
        refetchInterval: 3.6e6, // 1 hour
        refetchIntervalInBackground: true,
        suspense: false,
        staleTime: 3.6e6,
      },
      mutations: {
        retry: 2,
      },
    },
  };

  const queryClient = React.useMemo(() => new QueryClient(queryClientSettings), []);

  return { queryClient };
};
