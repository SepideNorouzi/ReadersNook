import { useMemo } from "react";
import { useBooks } from "./useBooks";

export function useCurrentRead() {
  const { data: books = [], ...query } = useBooks();

  const currentBooks = useMemo(
    () => books.filter((book) => book.status === "current"),
    [books],
  );

  return {
    books: currentBooks,
    ...query,
  };
}
