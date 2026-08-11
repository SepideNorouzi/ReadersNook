import type { BookSearchResult } from "../../types/searchResults";
import type { Book } from "../../types/book";

const FALLBACK_COVER = "https://via.placeholder.com/128x192?text=No+Cover";

/**
 * Bridges the search domain (BookSearchResult) into the book domain
 * (Book — what bookRepository actually stores). Every key below is a
 * REQUIRED field on Book, so every one needs an explicit value — a
 * search result doesn't carry a rating, quotes, or reading progress,
 * so those get sane empty defaults instead of being left undefined.
 */
export function mapSearchResultToBook(
  result: BookSearchResult,
): Omit<Book, "id" | "addedAt"> {
  return {
    title: result.title,
    author: result.author,
    summary: result.description || "No summary available yet.",
    coverUrl: result.coverUrl ?? FALLBACK_COVER,
    aestheticImages: [],
    currentPage: 0,
    totalPages: result.pageCount ?? 0,
    status: "tbr",
    rating: 0,
    quotes: [],
    sourceId: result.id,
    genres: result.categories,
  };
}
