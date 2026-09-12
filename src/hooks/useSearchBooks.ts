// hooks/useSearchBooks.ts
import { useMemo } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { ApiError } from "../lib/apiClient";
import { queryKeys } from "../queries/queryKeys";
import { isBookInLibrary } from "../repo/book/isBookInLibrary";
import { searchBooks } from "../services/bookSearch";
import { useBookStore } from "../store/demoBookStore";
import { useModeStore } from "../store/modeStore";

const PER_PAGE = 10;

export function useSearchBooks(query: string, page: number) {
  const trimmed = query.trim();
  const mode = useModeStore((state) => state.mode);
  const demoBooks = useBookStore((state) => state.books);

  const queryResult = useQuery({
    queryKey: queryKeys.search(trimmed, page, PER_PAGE),
    queryFn: () => searchBooks(trimmed, { page, perPage: PER_PAGE }),
    enabled: trimmed.length > 0,
    staleTime: 1000 * 60 * 5,
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 429) return false;
      return failureCount < 1;
    },
    // Keep showing the current page's data while the next page loads,
    // instead of flashing back to a loading state on every click.
    placeholderData: keepPreviousData,
  });

  const data = useMemo(() => {
    if (!queryResult.data || mode !== "demo") return queryResult.data;

    return {
      ...queryResult.data,
      results: queryResult.data.results.map((result) => ({
        ...result,
        inLibrary: isBookInLibrary(demoBooks, result.externalId, {
          title: result.title,
          author: result.author,
        }),
      })),
    };
  }, [queryResult.data, mode, demoBooks]);

  return { ...queryResult, data };
}