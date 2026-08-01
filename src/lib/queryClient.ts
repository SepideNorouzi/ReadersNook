import { QueryClient } from "@tanstack/react-query";

/** Shared client — demo data is static, so keep it warm and avoid refetch churn. */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
