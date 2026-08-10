import { useQuery } from "@tanstack/react-query";

import { searchBooks } from "../services/googleBooks";

export function useSearchBooks(query: string) {
  const trimmed = query.trim();

  return useQuery({
    queryKey: ["search", trimmed],
    queryFn: () => searchBooks(trimmed),

    // Don't fire a request for an empty query — there's
    // nothing to search for, and this avoids a flash of "no results."
    enabled: trimmed.length > 0,

    // Search results for "harry potter" won't change in the next few
    // minutes. If the user searches, navigates to a book, then hits
    // back, this skips a redundant network call and shows cached data
    // instantly instead of a loading spinner.
    staleTime: 1000 * 60 * 5,
  });
}
