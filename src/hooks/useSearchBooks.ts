import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { ApiError } from "../lib/apiClient";
import { queryKeys } from "../queries/queryKeys";
import { isBookInLibrary } from "../repo/book/isBookInLibrary";
import { searchBooks } from "../services/bookSearch";
import { useBookStore } from "../store/demoBookStore";
import { useModeStore } from "../store/modeStore";

export function useSearchBooks(query: string) {
  const trimmed = query.trim();
  const mode = useModeStore((state) => state.mode);
  const demoBooks = useBookStore((state) => state.books);

  const queryResult = useQuery({
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

  // Search still hits the catalog API in demo, so `in_library` is the
  // authenticated backend user's library (or a leftover admin session).
  // Overlay the demo store so Add reflects local membership instead.
  const data = useMemo(() => {
    if (!queryResult.data || mode !== "demo") return queryResult.data;

    return queryResult.data.map((result) => ({
      ...result,
      inLibrary: isBookInLibrary(demoBooks, result.externalId, {
        title: result.title,
        author: result.author,
      }),
    }));
  }, [queryResult.data, mode, demoBooks]);

  return { ...queryResult, data };
}
