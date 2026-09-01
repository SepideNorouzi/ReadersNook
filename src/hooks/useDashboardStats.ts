import { useMemo } from "react";
import { useBooks } from "./useBooks";
import { useCollections } from "./useCollections";

export function useDashboardStats() {
  const { data: books = [] } = useBooks();
  const { collections = [] } = useCollections();

  const stats = useMemo(() => {
    return {
      totalBooks: books.length,

      readBooks: books.filter((book) => book.status === "read").length,

      collections: collections.length,

      // Replace when notes store exists
      notes: 0,

      // Replace when streak store exists
      streak: 0,
    };
  }, [books, collections]);

  return stats;
}
