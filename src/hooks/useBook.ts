import { useMemo } from "react";
import { useBooks } from "./useBooks";

/**
 * Derive a single book from the shared books cache.
 * Avoids a second network/query path for the same static dataset.
 */
export function useBook(id: string | undefined) {
  const { data: books, ...query } = useBooks();

  const book = useMemo(() => {
    if (!id || !books) return undefined;
    return books.find((b) => b.id === id);
  }, [books, id]);

  return {
    data: book,
    ...query,
  };
}
