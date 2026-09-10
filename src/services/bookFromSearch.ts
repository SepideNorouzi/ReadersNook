import { mapSearchResultToBook } from "../repo/book/searchResultToBook";
import type { Book } from "../types/book";
import type { BookSearchResult } from "../types/searchResults";

export function bookFromSearchResult(
  result: BookSearchResult,
): Omit<Book, "id" | "addedAt"> {
  return mapSearchResultToBook(result);
}
