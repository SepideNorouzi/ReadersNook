import { useMemo } from "react";
import { useBooks } from "./useBooks";
import { useCollections } from "./useCollections";
import { useAllQuotes } from "./useQuotes";

export function useDashboardStats() {
  const { data: books = [] } = useBooks();
  const { data: quotes = [] } = useAllQuotes();

  const { collections = [] } = useCollections();

  const stats = useMemo(() => {
    return {
      totalBooks: books.length,
      streak: 0,
      quotes: quotes.length,
      collections: collections.length,
    };
  }, [books.length, quotes.length, collections.length]);

  return stats;
}
