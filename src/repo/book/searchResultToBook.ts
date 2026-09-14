import type { Book } from "../../types/book";
import type { BookSearchResult } from "../../types/searchResults";

export function mapSearchResultToBook(
  result: BookSearchResult,
): Omit<Book, "id" | "addedAt"> {
  return {
    title: result.title,
    author: result.author,
    summary: result.summary?.trim() || "No summary available yet.",
    coverUrl: result.coverUrl ?? "",
    totalPages: result.totalPages,
    currentPage: 0,
    status: "tbr",
    // Left at 0 rather than result.rating — that's the shared catalog
    // rating, not a personal one; pre-filling it would imply you'd
    // already rated a book you just added.
    rating: 0,
    quotes: [],
    aestheticImages: [],
    genres: result.genres,
    sourceId: result.externalId,
  };
}