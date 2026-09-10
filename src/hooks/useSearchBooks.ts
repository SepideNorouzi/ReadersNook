import { useQuery } from "@tanstack/react-query";

import { ApiError } from "../lib/apiClient";
import { queryKeys } from "../queries/queryKeys";
import { searchBooks } from "../services/bookSearch";

export function useSearchBooks(query: string) {
  const trimmed = query.trim();

  return useQuery({
    queryKey: queryKeys.search(trimmed),
    queryFn: () => searchBooks(trimmed),

    // Don't fire a request for an empty/whitespace query — there's
    // nothing to search for, and this avoids a flash of "no results."
    enabled: trimmed.length > 0,

    // Search results for a given query won't change in the next few
    // minutes. If the user searches, navigates to a book, then hits
    // back, this skips a redundant network call and shows cached data
    // instantly instead of a loading spinner.
    staleTime: 1000 * 60 * 5,

    // TanStack Query retries failed queries 3x by default.
    // Retry anything else once; skip retrying rate limits entirely.
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 429) {
        return false;
      }
      return failureCount < 1;
    },
  });
}
