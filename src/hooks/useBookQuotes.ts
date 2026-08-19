import { useBook } from "./useBook";

export function useBookQuotes(bookId: string | undefined) {
  const { data: book, ...query } = useBook(bookId);
  return { data: book?.quotes ?? [], ...query };
}
