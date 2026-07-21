import { useBooks } from "./useBooks";

export function useCurrentRead() {
  const { data: books = [], ...query } = useBooks();

  return {
    books: books.filter((book) => book.status === "current"),
    ...query,
  };
}