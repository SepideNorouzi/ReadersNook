import { mapSearchResultToBook } from "../repo/book/searchResultToBook";
import type { Book } from "../types/book";
import type { BookSearchResult } from "../types/searchResults";
import { getBookDetails } from "./openLibrary";

/**
 * Turns a search hit into a full library Book payload.
 *
 * Search results alone are enough for the search cards (title, author,
 * cover, pages, rating). The book detail page also needs a real summary
 * and genres, which Open Library only exposes on the works endpoint —
 * so we hydrate those here right before the book is saved.
 */
export async function bookFromSearchResult(
  result: BookSearchResult,
): Promise<Omit<Book, "id" | "addedAt">> {
  try {
    const details = await getBookDetails(result.id);
    return mapSearchResultToBook(result, details);
  } catch {
    // Detail lookup can fail (404, network). Still let the user save
    // the book with whatever the search hit already had.
    return mapSearchResultToBook(result);
  }
}
