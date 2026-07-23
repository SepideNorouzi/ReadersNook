import { useBooks } from "./useBooks";

export function useTBRBooks() {
  const { data: books = [], ...query } = useBooks();

  return {
    books: books.filter((book) => book.status === "tbr"),
    ...query,
  };
}
