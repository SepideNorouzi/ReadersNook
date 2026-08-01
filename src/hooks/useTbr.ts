import { useMemo } from "react";
import { useBooks } from "./useBooks";

export function useTBRBooks() {
  const { data: books = [], ...query } = useBooks();

  const tbrBooks = useMemo(
    () => books.filter((book) => book.status === "tbr"),
    [books],
  );

  return {
    books: tbrBooks,
    ...query,
  };
}
