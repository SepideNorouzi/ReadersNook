import { useBooks } from "./useBooks";

export function useCurrentReading() {
  const { data: books = [], ...query } = useBooks();

  return {
    books: books.filter((book) => book.status === "current"),
    ...query,
  };
}